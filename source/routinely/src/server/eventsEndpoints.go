package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func addEvent(c *gin.Context) {
	var event Event

	c.BindJSON((&event))
	events = append(events, event)
	c.IndentedJSON(http.StatusOK, "Successfuly created event")
}
func getEvents(c *gin.Context) {
	c.JSON(http.StatusOK, events)
}
