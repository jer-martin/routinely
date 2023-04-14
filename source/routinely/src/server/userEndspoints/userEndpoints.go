package userEndpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/jer-martin/routinely/src/server/config"
	eventsendpoints "github.com/jer-martin/routinely/src/server/eventsEndpoints"
	"github.com/jer-martin/routinely/src/server/middleware"

	"github.com/jer-martin/routinely/src/server/structs"
)

var secretkey = "super-secret-key"

func SetUpRouter() *gin.Engine {

	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	router.POST("/create-table", createTable)
	router.POST("/login", Login)
	router.POST("/createUser",createUser)
	api := router.Group("/api").Use(middleware.AuthMiddleware())
	{
		api.GET("/userList", getAllUsers)
		api.POST("/addEvent", eventsendpoints.AddEvent)
		api.GET("/viewEvents", eventsendpoints.GetEvents)
		api.DELETE("/deleteEvent", DeleteEvent)
	}

	return router
}

func createTable(c *gin.Context) {
	// Create user table if it doesn't exist
	_, err := config.AppConfig.SQL.Exec(`CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL
)`)
	if err != nil {
		log.Fatal(err)
	}

	c.String(http.StatusOK, "User table created successfully")
}

func Login(c *gin.Context) {
	var user structs.Authentication
	err := json.NewDecoder(c.Request.Body).Decode(&user)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid request body")
		return
	}
	auth, exist, err := GetUserByUserName(user.Username)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to check users from database")
		return
	}
	if !exist {
		c.String(http.StatusBadRequest, "username Or password is incorrect")
		return
	}

	if user.Password != auth.Password {
		c.String(http.StatusBadRequest, "username Or password is incorrect")
		return
	}

	validToken, err := GenerateJWT(auth.Username)
	if err != nil {
		c.String(http.StatusInternalServerError, "unable to generate JWT")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "login successfully", "Token": validToken})
}

func createUser(c *gin.Context) {
	var user structs.User
	err := json.NewDecoder(c.Request.Body).Decode(&user)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid request body")
		return
	}

	//check if user exist in our db
	exist, err := IsUserExist(user.Username)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get user by from database")
		return
	}

	if exist {
		c.String(http.StatusBadRequest, fmt.Sprintf("User with username: %s already exist", user.Username))
		return
	}

	// Insert new user into the user table
	result, err := config.AppConfig.SQL.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, user.Password)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to insert user into the database")
		return
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("User added successfully with ID %d\n", lastInsertID)

	c.JSON(http.StatusOK, gin.H{
		"message": "User added successfully",
		"user_id": lastInsertID,
	})
}

func getAllUsers(c *gin.Context) {
	var users = make([]structs.User, 0)
	rows, err := config.AppConfig.SQL.Query(`select id,username,password from users`)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get users from database")
		return
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var username, password string
		err := rows.Scan(&id, &username, &password)
		if err != nil {
			c.String(http.StatusInternalServerError, "Failed to get users from database")
			return
		}
		users = append(users, structs.User{
			ID:       id,
			Username: username,
			Password: password,
		})
	}
	c.JSON(http.StatusOK, users)
}

func DeleteEvent(c *gin.Context) {
	eventID := c.Query("eventID")
	if eventID == "" {
		c.String(http.StatusBadRequest, "missing ID of the event in request parameters")
		return
	}

	id, err := strconv.Atoi(eventID)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error in conversion string to int")
		return
	}

	exist, err := CheckEventExistByID(id)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error in validating event")
		return
	}
	if !exist {
		c.String(http.StatusBadRequest, "event not exist in our database")
		return
	}

	// Insert new event into the events table
	_, err = config.AppConfig.SQL.Exec("DELETE from events where id = ?", id)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to delete event from database")
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "event deleted successfully"})
}

// =================================Helper Functions ====================

func GetUserByUserName(username string) (structs.Authentication, bool, error) {
	exist := false
	rows, err := config.AppConfig.SQL.Query(`select username,password from users where username = ?`, username)
	if err != nil {
		return structs.Authentication{}, exist, err
	}
	defer rows.Close()
	var userName, password string
	for rows.Next() {
		err := rows.Scan(&userName, &password)
		if err != nil {
			return structs.Authentication{}, exist, nil
		}
		exist = true
	}

	var user = structs.Authentication{
		Username: userName,
		Password: password,
	}

	return user, exist, nil
}

func CheckEventExistByID(eventID int) (bool, error) {
	exist := false
	rows, err := config.AppConfig.SQL.Query(`select id from events where id = ?`, eventID)
	if err != nil {
		return exist, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&eventID)
		if err != nil {
			return exist, nil
		}
		exist = true
	}
	return exist, nil
}

func GenerateJWT(userName string) (string, error) {
	var mySigningKey = []byte(secretkey)
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["isAuthorized"] = true
	claims["username"] = userName
	claims["role"] = "user"
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		fmt.Errorf("Something Went Wrong: %s", err.Error())
		return "", err
	}
	return tokenString, nil
}

func IsUserExist(username string) (bool, error) {
	exist := false
	rows, err := config.AppConfig.SQL.Query(`select username from users where username = ?`, username)
	if err != nil {
		return exist, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&username)
		if err != nil {
			return exist, nil
		}
		exist = true
	}
	return exist, nil
}

func CheckUserExistByID(userID int) (bool, error) {
	exist := false
	rows, err := config.AppConfig.SQL.Query(`select id from users where id = ?`, userID)
	if err != nil {
		return exist, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&userID)
		if err != nil {
			return exist, nil
		}
		exist = true
	}
	return exist, nil
}

func findUser(c *gin.Context) bool {
	var newUser structs.User
	for i := 0; i < len(structs.Users); i++ {
		if structs.Users[i].ID == newUser.ID {
			return false
		}
	}
	return false
}

// func getAllUsers(c *gin.Context) {
// 	var users User
// 	c.JSON(http.StatusOK, users)
// }

// func createUser(c *gin.Context) {
// 	var newUser User

// 	c.BindJSON((&newUser))
// 	for i := 0; i < len(users); i++ {
// 		if strings.EqualFold(users[i].Username, newUser.Username) {
// 			c.IndentedJSON(http.StatusBadGateway, "Username already exists , please enter new username")
// 			return
// 		}
// 	}

// 	users = append(users, newUser)
// 	c.IndentedJSON(http.StatusOK, "Successfully added user")
// }
