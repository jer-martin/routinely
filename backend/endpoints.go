package main
import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)
func setUpRouter() *gin.Engine{
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})
	api := router.Group("/api") 
	{
	api.GET("/userList",getAllUsers)
	api.POST("/createUser",createUser)
	}
	//router.Run("localhost:5000")
	return router
}
func getAllUsers(c *gin.Context){
	c.JSON(http.StatusOK,users)
}

// func findUser(c *gin.Context) bool{
// 	var newUser User
// 	for i := 0;i < len(users);i++{
// 		if(users[i].ID == newUser.ID){
// 			 return false
// 		}
// 	}
// 	return false
// }

func createUser(c *gin.Context){
		var newUser User
		
		c.BindJSON((&newUser))
	for i := 0;i < len(users);i++{
		if(strings.EqualFold(users[i].ID,newUser.ID)){
			c.IndentedJSON(http.StatusBadGateway, "Username already exists , please enter new username")
			 return
		}
	}
	
	users = append(users,newUser )
c.IndentedJSON(http.StatusOK,"Successfuly added user")
}