package structs

import "github.com/golang-jwt/jwt"

var Secretkey = []byte("super-secret-key")

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Event struct {
	ID             int    `json:"id"`
	UserID         int    `json:"userID"`
	EventName      string `json:"eventName"`
	EventCategory  string `json:"eventCategory"`
	StartEventDate string `json:"startEventDate"`
	EndEventDate   string `json:"endEventDate"`
}

type EventDeleteBody struct {
	EventID int `json:"id"`
}

type Authentication struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	UserName string `json:"username"`
	jwt.StandardClaims
}

var Users = []User{
	{ID: 1, Username: "Student", Password: "123"},
	{ID: 1, Username: "Student2", Password: "123"},
	{ID: 1, Username: "Student3", Password: "123"},
}
