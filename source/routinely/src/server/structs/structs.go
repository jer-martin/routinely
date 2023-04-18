package structs

type UserInfo struct {
	ID    int
	token string
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Event struct {
	UserID        int    `json:"userID"` // id of the user
	EventName     string `json:"eventName"`
	EventCategory string `json:"eventCategory"`
	EventDate     string `json:"eventDate"`
}

type Authentication struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var Users = []User{
	{ID: 1, Username: "Student", Password: "123"},
	{ID: 1, Username: "Student2", Password: "123"},
	{ID: 1, Username: "Student3", Password: "123"},
}
