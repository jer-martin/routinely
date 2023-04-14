package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/jer-martin/routinely/src/server/config"
// 	// "github.com/jer-martin/routinely/config"
// 	// "github.com/jer-martin/routinely/config"
// )

// func setUpRouter() *gin.Engine {

// 	router := gin.Default()
// 	router.GET("/ping", func(c *gin.Context) {
// 		c.String(200, "pong")
// 	})

// 	router.POST("/create-table", createTable)
// 	api := router.Group("/api")
// 	{
// 		api.GET("/userList", getAllUsers)
// 		api.POST("/createUser", createUser)
// 		api.POST("/addEvent", addEvent)
// 		api.GET("/viewEvents", getEvents)
// 	}

// 	return router
// }

// func createTable(c *gin.Context) {
// 	// Create user table if it doesn't exist
// 	_, err := config.AppConfig.SQL.Exec(`CREATE TABLE IF NOT EXISTS users (
// 	id INT AUTO_INCREMENT PRIMARY KEY,
// 	username VARCHAR(50) NOT NULL,
// 	password VARCHAR(50) NOT NULL
// )`)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	c.String(http.StatusOK, "User table created successfully")
// }

// func createUser(c *gin.Context) {
// 	var user User
// 	err := json.NewDecoder(c.Request.Body).Decode(&user)
// 	if err != nil {
// 		c.String(http.StatusBadRequest, "Invalid request body")
// 		return
// 	}

// 	//check if user exist in our db
// 	exist, err := IsUserExist(user.Username)
// 	if err != nil {
// 		c.String(http.StatusInternalServerError, "Failed to get user by from database")
// 		return
// 	}

// 	if exist {
// 		c.String(http.StatusBadRequest, fmt.Sprintf("User with username: %s already exist", user.Username))
// 		return
// 	}

// 	// Insert new user into the user table
// 	result, err := config.AppConfig.SQL.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, user.Password)
// 	if err != nil {
// 		c.String(http.StatusInternalServerError, "Failed to insert user into the database")
// 		return
// 	}

// 	lastInsertID, err := result.LastInsertId()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Printf("User added successfully with ID %d\n", lastInsertID)

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "User added successfully",
// 		"user_id": lastInsertID,
// 	})
// }

// func getAllUsers(c *gin.Context) {
// 	var users = make([]User, 0)
// 	rows, err := config.AppConfig.SQL.Query(`select id,username,password from users`)
// 	if err != nil {
// 		c.String(http.StatusInternalServerError, "Failed to get users from database")
// 		return
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		var id int
// 		var username, password string
// 		err := rows.Scan(&id, &username, &password)
// 		if err != nil {
// 			c.String(http.StatusInternalServerError, "Failed to get users from database")
// 			return
// 		}
// 		users = append(users, User{
// 			ID:       id,
// 			Username: username,
// 			Password: password,
// 		})
// 	}
// 	c.JSON(http.StatusOK, users)
// }

// // =================================Helper Functions ====================
// func IsUserExist(username string) (bool, error) {
// 	exist := false
// 	rows, err := config.AppConfig.SQL.Query(`select username from users where username = ?`, username)
// 	if err != nil {
// 		return exist, err
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		err := rows.Scan(&username)
// 		if err != nil {
// 			return exist, nil
// 		}
// 		exist = true
// 	}
// 	return exist, nil
// }

// func CheckUserExistByID(userID int) (bool, error) {
// 	exist := false
// 	rows, err := config.AppConfig.SQL.Query(`select id from users where id = ?`, userID)
// 	if err != nil {
// 		return exist, err
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		err := rows.Scan(&userID)
// 		if err != nil {
// 			return exist, nil
// 		}
// 		exist = true
// 	}
// 	return exist, nil
// }

// func findUser(c *gin.Context) bool {
// 	var newUser User
// 	for i := 0; i < len(users); i++ {
// 		if users[i].ID == newUser.ID {
// 			return false
// 		}
// 	}
// 	return false
// }

// // func getAllUsers(c *gin.Context) {
// // 	var users User
// // 	c.JSON(http.StatusOK, users)
// // }

// // func createUser(c *gin.Context) {
// // 	var newUser User

// // 	c.BindJSON((&newUser))
// // 	for i := 0; i < len(users); i++ {
// // 		if strings.EqualFold(users[i].Username, newUser.Username) {
// // 			c.IndentedJSON(http.StatusBadGateway, "Username already exists , please enter new username")
// // 			return
// // 		}
// // 	}

// // 	users = append(users, newUser)
// // 	c.IndentedJSON(http.StatusOK, "Successfully added user")
// // }
