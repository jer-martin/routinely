# Sprint 4

Front-end video | Back-end video


## Work Synopsis
### Frontend
 - Added time picking
 - Added to-do list
 - Added event category manipulation
 - Added filtering
 - Remade day view
 - Implemented day view
 - Implemented week view
 - Input validation
 - Minor design changes
 - Fully integrated frontend and backend

### Backend
 - 

## Testing
### Frontend
#### Test 1:

### Backend
The tests can be found in the "main_test.go" file located in the "backend" folder.
#### Test 1:

## Backend Documentation

The prupose of this API is to retrieve and create User data. This includes user Login / creation as well as retreiving the users calender and customization settings. The APi is written in Golang with the GIN framework and is still in development. Currently you can get a list of users, create users and find users. The api is reached at the ednpoint: "/api". 
Here is a list of a few completed endpoints:

```
GET REQUEST:
"/ping"

RESPONSE:
"pong"
```
This get request simply pings the API to make sure it is running properly and sends a code 200 if everything is ok.
```
GET REQUEST:
"/userList"

RESPONSE:
[
    {
        "id": "bryan",
        "userType": "Student"
    },
    {
        "id": "Jeremy",
        "userType": "Student"
    },
    {
        "id": "Anand",
        "userType": "Basic"
    },
    {
        "id": "Madhav",
        "userType": "Basic"
    }
]
```
This get request retrieves the entire list of users currently identified by a unique username and also consists of a userType. This responds with a code 200 if userlist is retrieved properly.

```
POST REQUEST:
"/createUser"

RESEPONSE:
"Successfuly added user"
```
This post request takes in a username and usertype as arguments and attempts to create a user with the given username. If the username is already taken it will inform the user to create a new username. This responds with a code 200 if user is created and a code 500 if the username is already taken.
```
POST REQUEST:
"/addEvent"

RESEPONSE:
"Successfuly created event"
```
This post request takes in an event name,event type and event date as arguments and creates an event on the given date. 
```
GET REQUEST:
"/viewEvents"

RESPONSE:
[
    {
        "eventName": "CEN3031",
        "eventCategory": "Classes"
    }
]
```

This screenshot shows the creation of the database that will store the values from the website.
![Screenshot 2023-03-01 235611](https://user-images.githubusercontent.com/88696930/222335181-860fdc53-2b48-4835-9eca-fbba51a73c31.jpg)

This screenshot shows how passwords are being sent into databases thorugh use of golang which is accessing and posting information to the database.
![image](https://user-images.githubusercontent.com/88696930/228712731-128b18e8-c7af-4089-af78-a85e93a50ed0.png)

These are some curret issues that occur due to servers shutting down instantly for some reason I cannot figure out as of right now. 
![image](https://user-images.githubusercontent.com/88696930/228716858-dfa03a4f-3a68-4575-a173-229b08f2a333.png)

```
func setUpRouter() *gin.Engine {
	r := gin.Default()

	// Set up database connection
	db, err := sql.Open("mysql", "user:password@tcp(localhost:3306)/database_name")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Test database connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	// Set up API endpoints
	r.GET("/users", getUsers)
	r.POST("/users", addUser)

	return r
}
```

