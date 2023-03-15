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

func main(){
	r := setUpRouter()
	r.Run("localhost:5000")
}