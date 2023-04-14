# Sprint 2

[Front-end video](https://www.youtube.com/watch?v=5beDx5UT23Q&ab_channel=AnandMathi) | [Back-end video](https://youtu.be/wxfjVYqEYUQ) [Back-end Database Video](https://youtu.be/bNA8dUg2HJg)


## Work Synopsis
### Frontend
 - We fleshed out the calendar page design with more features, like an event filter and a view switcher.
 - We created a radio button group that allows us to switch between week, month, and day views for the schedule. We have also made the month, week, and day views.
 - We updated the preferences page to include options to change the header color and switch between light/dark mode.
 - We built a microservice to locally store dates and preferences across pages on the site.
 - We created an "Add Event" modal, which allows you to input an event's name, category, and date.
 - We lined up the month intervals with the days of the week, so that the numbering of days on the calendar lines up with real-time. For example, this year, March starts on a Wednesday. On the calendar, the days are numbered beginning on Wednesday.
 - We added animations to switching months.

### Backend
 - Studied (alot of) documenation to better understand gin framework and also read angular documentation in order to properly integrate services.
 - Updated proxy services in the front end to be able to send requests to the backend (backend listens on port 5000)
 - Finished up user login , right now the user is identified by a unique username and "user type" with the intention of differentiating between students and "regular" users. (Subject to change)
 - User creation completed with guards in place to make sure all usernames are unique (no duplicates)
 - Updated some more front end code to better integrate with backend, havent merged with main because its still in progress. This work is on bryans branch "test branch".
 - Compelted unit tests for current functions , mocked data is hardcoded but also looking into mocking frameworks to integrate.

## Testing
### Frontend
#### Test 1 (Cypress):
```
import { PreferencesComponent } from "src/app/preferences/preferences.component"
// this is an end to end test
describe('template spec', () => {
  it('passes', () => {
    // click cog
    cy.visit('http://localhost:4200')
    // click cog
    cy.get('.cog').click()
    cy.contains('Preferences').click()
    // click clr-dropdown
    cy.contains('Header Color').click()
    // check for purple
    cy.contains('Purple').click()
    // check for blue
    cy.contains('Blue').click()
    // check for slate
    cy.contains('Slate').click()
    // click account
    cy.contains('Account').click()
    // click logo
    cy.contains('Routinely').click()
    // click cog
    cy.get('.cog').click()
    // check login
    cy.contains('Log in').click()
    // check clock link works
    cy.get('.clock').click()
    // check sidebar link works
    cy.get('.bug-report').click()
  })
  
})
```

#### Test 2:
```
describe('genMonth()', () => {
  it('should give the interval (1, 28)', () => {
    const month = genMonth(DateTime.fromObject({year: 2023, month: 2, day: 6}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(28);
  });
  it('should give the interval (1, 29)', () => {
    const month = genMonth(DateTime.fromObject({year: 2024, month: 2, day: 1}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(29);
  });
  it('should give the interval (1, 31)', () => {
    const month = genMonth(DateTime.fromObject({year: 2023, month: 1, day: 31}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(31);
  })
});
```

#### Test 3:
```
describe('genBackfillMonth()', () => {
  it('should give the interval (29, 11) and months january and march', () => {
    const month = genBackfillMonth(DateTime.fromObject({year: 2023, month: 2, day: 6}));
    expect(month.start.day).toBe(29);
    expect(month.end.day).toBe(11);
    expect(month.start.month).toBe(1);
    expect(month.end.month).toBe(3);
  });
});
```
#### Test 4:
```
describe('genDay()', () => {
  it('should give the interval (1, 31)', () => {
    const day = genMonth(DateTime.fromObject({year: 2023, month: 1, day: 31}));
    expect(day.start.day).toBe(31);
    expect(day.end.day).toBe(31);
  })
});
```

### Backend
The tests can be found in the "main_test.go" file located in the "backend" folder.
#### Test 1:
```
func TestGetAllUsers(t *testing.T) {
	users :=("[{\"id\":\"bryan\",\"userType\":\"Student\"},{\"id\":\"Jeremy\",\"userType\":\"Student\"},{\"id\":\"Anand\",\"userType\":\"Basic\"},{\"id\":\"Madhav\",\"userType\":\"Basic\"}]")
	
	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/userList", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, users, w.Body.String())
}
```

#### Test 2:
```
func TestCreateUser(t *testing.T) {
	message := "\"Successfuly added user\""
	type User struct {
		ID             string `json:"id"`
		UserType       string `json:"userType"`
	}
	userToAdd := User{
        ID: `newUser`,
        UserType: "newUser",
    }
	jsonValue,_ := json.Marshal(userToAdd)
	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/createUser", bytes.NewBuffer(jsonValue))
	router.ServeHTTP(w, req)
	
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, message, w.Body.String())
}
```

#### Test 3:
```
func TestCreateUserFAILURE(t *testing.T) {
	message := "\"Username already exists , please enter new username\""
	type User struct {
		ID             string `json:"id"`
		UserType       string `json:"userType"`
	}
	userToAdd := User{
        ID: `bryan`,
        UserType: "Student",
    }
	jsonValue,_ := json.Marshal(userToAdd)
	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/createUser", bytes.NewBuffer(jsonValue))
	router.ServeHTTP(w, req)
	
	assert.Equal(t, 502, w.Code)
	assert.Equal(t, message, w.Body.String())

}
```
#### Test 4:
```
func TestStartup(t *testing.T) {
	router := setUpRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "pong", w.Body.String())
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

This screenshot shows the creation of the database that will store the values from the website.
![Screenshot 2023-03-01 235611](https://user-images.githubusercontent.com/88696930/222335181-860fdc53-2b48-4835-9eca-fbba51a73c31.jpg)



