package eventsendpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jer-martin/routinely/src/server/config"
	"github.com/jer-martin/routinely/src/server/structs"
)

func AddEvent(c *gin.Context) {
	var event structs.Event

	err := json.NewDecoder(c.Request.Body).Decode(&event)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid request body")
		return
	}

	// Insert new event into the events table
	result, err := config.AppConfig.SQL.Exec("INSERT INTO events (userid, name, category, eventdate) VALUES (?, ?, ?,?)", event.UserID, event.EventName, event.EventCategory, event.EventDate)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to insert user into the database")
		return
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Event added successfully with ID %d\n", lastInsertID)

	c.JSON(http.StatusOK, gin.H{
		"message":  "event added successfully",
		"event_id": lastInsertID,
	})
}

func GetEvents(c *gin.Context) {
	var events = make([]structs.Event, 0)

	userID := c.Query("userID")
	if userID == "" {
		c.String(http.StatusBadRequest, "Missing ID of the user in request parameters")
		return
	}

	id, err := strconv.Atoi(userID)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error in conversion string to int")
		return
	}

	//check if user Exist in our datbase
	exist, err := CheckUserExistByID(id)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to verify users from database")
		return
	}

	//if user not exist in our database then return error
	if !exist {
		c.String(http.StatusBadRequest, "user not exist in database")
		return
	}

	rows, err := config.AppConfig.SQL.Query(`select userid,name,category,eventdate from events where userid = ?`, id)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get events from database")
		return
	}
	defer rows.Close()
	for rows.Next() {
		var userID int
		var eventName, category, eventDate string
		err := rows.Scan(&userID, &eventName, &category, &eventDate)
		if err != nil {
			c.String(http.StatusInternalServerError, "Failed to get users from database")
			return
		}
		events = append(events, structs.Event{
			UserID:        userID,
			EventName:     eventName,
			EventCategory: category,
			EventDate:     eventDate,
		})
	}
	c.JSON(http.StatusOK, events)
}

// ==================== HELPER Function =======================
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

// func addEvent(c *gin.Context) {
// 	var event Event

// 	c.BindJSON((&event))
// 	events = append(events, event)
// 	c.IndentedJSON(http.StatusOK, "Successfuly created event")
// }
// func getEvents(c *gin.Context) {
// 	c.JSON(http.StatusOK, events)
// }
