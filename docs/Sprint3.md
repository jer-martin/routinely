# Sprint 3

[Front-end video](https://youtu.be/V71Mdj1SkS0) | [Back-end video](https://youtu.be/uJrb4pV2Wxo) | https://youtu.be/EFbNtUtZvAg


## Work Synopsis
### Frontend
 - We fleshed out the Add Event modal and added some basic functionality for recurring events
 - Submitting the form now converts the input data into forms usable by the backend and the database
 - Fixed sizing and alignment errors
 - Calendar now opens to month view on default
 - Form now closes after pressing submit and does a POST request
 - Events added through the Add Event modal are now reflected in the calendar
 - Input fields on the form now reset after pressing submit
 - Input validation for recurring events
 - Minor design changes

### Backend
 - Finished event creation functionality.
 - Properly recieves data from front end and formats it to send to database.
 - Currently experimenting with go maps to store events with the date as the key in order to quickly store and retrieve events.
 - Added makefile to be able to start server with a simple "make run" commmand.
 - Refactored code to separate by different services,will eventually be completely separated to easily distinguish functionality ie. userCreation        Service, eventCreation Service etc. This will look similar to the layout of a springboot application for simplicity. 
 - Completed unit tests for event creation.

## Testing
### Frontend
#### Test 1 (Cypress):
```
describe('modal', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200')
    cy.get('.addEvent').click()
    cy.get('.startdate').eq(8).should('be.disabled')
    cy.get('.enddate').eq(8).should('be.disabled')
    cy.get('.startdate').eq(8).should('not.be.disabled')
    cy.contains('Recurring').click()
    cy.get('.startdate').eq(8).should('not.be.disabled')
    cy.get('.enddate').eq(8).should('not.be.disabled')
    cy.get('.startdate').eq(8).should('be.disabled')
  })

})
```

#### Test 2:
```
describe('validateRecurringInterval()', () => {
  it('should say that the dates are invalid', () => {
    const startDate = DateTime.fromObject({year:2023, month: 1, day: 31});
    const endDate = DateTime.fromObject({year:2022, month: 3, day: 28});
    expect(validateRecurringInterval(startDate, endDate)).toBe(false);
  })
})
```

#### Test 3:
```
describe('validateRecurringInterval()', () => {
  it('should say that the dates are valid', () => {
    const startDate = DateTime.fromObject({year:2021, month: 3, day: 30});
    const endDate = DateTime.fromObject({year:2026, month: 1, day: 28});
    expect(validateRecurringInterval(startDate, endDate)).toBe(true);
  })
})
```

### Backend
The tests can be found in the "main_test.go" file located in the "backend" folder.
#### Test 1:
```
func TestViewEvents(t *testing.T) {
	events := ("[{\"eventName\":\"CEN3031\",\"eventCategory\":\"Classes\"}]")

	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/viewEvents", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, events, w.Body.String())
}
```

#### Test 2:
```
func TestAddEvent(t *testing.T) {
	message := "\"Successfuly created event\""
	type Event struct {
		EventName     string `json:"eventName"`
		EventCategory string `json:"eventCategory"`
	}
	eventToAdd := Event{
		EventName:     `COP4600`,
		EventCategory: "Classes",
	}
	jsonValue, _ := json.Marshal(eventToAdd)
	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/addEvent", bytes.NewBuffer(jsonValue))
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, message, w.Body.String())
}
```

#### Test 3:
```
func TestAddEventFAILURE(t *testing.T) {
	events := ("[{\"eventName\":\"CEN3031\",\"eventCategory\":\"Classes\"}]")

	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/addEvent", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, events, w.Body.String())
}
```
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


