// actiallsdsanidasndi

package main

import (
	_ "github.com/go-sql-driver/mysql"
	userEndpoints "github.com/jer-martin/routinely/src/server/userEndspoints"
)

// type User struct {
// 	ID       int    `json:"id"`
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// type Event struct {
// 	UserID        int    `json:"userID"` // id of the user
// 	EventName     string `json:"eventName"`
// 	EventCategory string `json:"eventCategory"`
// 	EventDate     string `json:"eventDate"`
// }

// var users = []User{
// 	{ID: 1, Username: "Student", Password: "123"},
// 	{ID: 1, Username: "Student2", Password: "123"},
// 	{ID: 1, Username: "Student3", Password: "123"},
// }

//	var events = []Event{
//		{EventName: "CEN3031", EventCategory: "Classes"},
//	}

func main() {
	r := userEndpoints.SetUpRouter()
	r.Run("localhost:3000")
}

// func setUpRouter() *gin.Engine {
// 	db, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/test")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Println("Connection to db established successfully")

// 	router := gin.Default()

// 	router.POST("/create-table", func(c *gin.Context) {
// 		// Create user table if it doesn't exist
// 		_, err := db.Exec(`CREATE TABLE IF NOT EXISTS users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(50) NOT NULL,
//             password VARCHAR(50) NOT NULL
//         )`)
// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		c.String(http.StatusOK, "User table created successfully")
// 	})

// 	router.POST("/add-user", func(c *gin.Context) {
// 		var user User
// 		err := json.NewDecoder(c.Request.Body).Decode(&user)
// 		if err != nil {
// 			c.String(http.StatusBadRequest, "Invalid request body")
// 			return
// 		}

// 		// Insert new user into the user table
// 		result, err := db.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, user.Password)
// 		if err != nil {
// 			c.String(http.StatusInternalServerError, "Failed to insert user into the database")
// 			return
// 		}

// 		lastInsertID, err := result.LastInsertId()
// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		fmt.Printf("User added successfully with ID %d\n", lastInsertID)

// 		c.JSON(http.StatusOK, gin.H{
// 			"message": "User added successfully",
// 			"user_id": lastInsertID,
// 		})
// 	})

// 	return router
// }
