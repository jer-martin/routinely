package main
type User struct {
	ID             string `json:"id"`
	UserType       string `json:"userType"`
}


var users = []User{
	{ID: "bryan", UserType: "Student" },
	{ID: "Jeremy", UserType: "Student" },
	{ID: "Anand", UserType: "Basic"},
	{ID: "Madhav", UserType: "Basic"},

}

type Event struct {
	EventName             string `json:"eventName"`
	Description       string `json:"description"`
}


var events = []Event{
	{EventName: "CEN3031", Description: "Class for school" },

}
func main(){
	r := setUpRouter()
	r.Run("localhost:3000")
}