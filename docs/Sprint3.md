# Sprint 3

[Front-end video]() | [Back-end video]() [Back-end Database Video]()


## Work Synopsis
### Frontend
 - We fleshed out the Add Event modal and added some basic functionality for recurring events
 - Submitting the form now converts the input data into forms usable by the backend and the database
 - Fixed sizing and alignment errors
 - Calendar now opens to month view on default
 - Form now closes after pressing submit and does a POST request
 - Events added through the Add Event modal are now reflected in the calendar
 - Input fields on the form now reset after pressing submit
 - Minor design changes

### Backend
 - 

## Testing
### Frontend
#### Test 1 (Cypress):
```

```

#### Test 2:
```

```

#### Test 3:
```

```
#### Test 4:
```

```

### Backend
The tests can be found in the "main_test.go" file located in the "backend" folder.
#### Test 1:
```

```

#### Test 2:
```

```

#### Test 3:
```
```
#### Test 4:
```
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


