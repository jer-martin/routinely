package main

// import (
// 	"bytes"
// 	"encoding/json"
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/stretchr/testify/assert"
// )

// func TestGetAllUsers(t *testing.T) {
// 	users := ("[{\"id\":\"bryan\",\"userType\":\"Student\"},{\"id\":\"Jeremy\",\"userType\":\"Student\"},{\"id\":\"Anand\",\"userType\":\"Basic\"},{\"id\":\"Madhav\",\"userType\":\"Basic\"}]")

// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/api/userList", nil)
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, users, w.Body.String())
// }
// func TestCreateUser(t *testing.T) {
// 	message := "\"Successfuly added user\""
// 	type User struct {
// 		ID       string `json:"id"`
// 		UserType string `json:"userType"`
// 	}
// 	userToAdd := User{
// 		ID:       `newUser`,
// 		UserType: "newUser",
// 	}
// 	jsonValue, _ := json.Marshal(userToAdd)
// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("POST", "/api/createUser", bytes.NewBuffer(jsonValue))
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, message, w.Body.String())
// }
// func TestCreateUserFAILURE(t *testing.T) {
// 	message := "\"Username already exists , please enter new username\""
// 	type User struct {
// 		ID       string `json:"id"`
// 		UserType string `json:"userType"`
// 	}
// 	userToAdd := User{
// 		ID:       `bryan`,
// 		UserType: "Student",
// 	}
// 	jsonValue, _ := json.Marshal(userToAdd)
// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("POST", "/api/createUser", bytes.NewBuffer(jsonValue))
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 502, w.Code, "The user was added")
// 	assert.Equal(t, message, w.Body.String())

// }
// func TestStartup(t *testing.T) {
// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/ping", nil)
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, "pong", w.Body.String())
// }

// func TestViewEvents(t *testing.T) {
// 	events := ("[{\"eventName\":\"CEN3031\",\"eventCategory\":\"Classes\"}]")

// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/api/viewEvents", nil)
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, events, w.Body.String())
// }
// func TestAddEvent(t *testing.T) {
// 	message := "\"Successfuly created event\""
// 	type Event struct {
// 		EventName     string `json:"eventName"`
// 		EventCategory string `json:"eventCategory"`
// 	}
// 	eventToAdd := Event{
// 		EventName:     `COP4600`,
// 		EventCategory: "Classes",
// 	}
// 	jsonValue, _ := json.Marshal(eventToAdd)
// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("POST", "/api/addEvent", bytes.NewBuffer(jsonValue))
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, message, w.Body.String())
// }
// func TestAddEventFAILURE(t *testing.T) {
// 	events := ("[{\"eventName\":\"CEN3031\",\"eventCategory\":\"Classes\"}]")

// 	router := setUpRouter()
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/api/viewEvents", nil)
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, 200, w.Code)
// 	assert.Equal(t, events, w.Body.String())
// }
