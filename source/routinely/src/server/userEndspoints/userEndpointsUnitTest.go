package userEndpoints
/*
import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/jer-martin/routinely/src/server/config"
	"github.com/jer-martin/routinely/src/server/middleware"
	"github.com/jer-martin/routinely/src/server/structs"
	"github.com/jer-martin/routinely/src/server/userEndpoints"
)

func TestSetUpRouter(t *testing.T) {
	router := userEndpoints.SetUpRouter()

	assert.NotNil(t, router)
}

func TestCreateTable(t *testing.T) {
	configMock := new(MockConfig)
	config.AppConfig = configMock
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	userEndpoints.CreateTable(c)
	require.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "User table created successfully", w.Body.String())
}

func TestLogin(t *testing.T) {
	configMock := new(MockConfig)
	config.AppConfig = configMock
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// Create a new user
	username := "testuser"
	password := "testpass"
	_, err := config.AppConfig.SQL.Exec("INSERT INTO users (username, password) VALUES (?, ?)", username, password)
	require.NoError(t, err)

	// Test with a valid user
	auth := structs.Authentication{Username: username, Password: password}
	body, _ := json.Marshal(auth)
	req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	c.Request = req

	userEndpoints.Login(c)
	require.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "login successfully")

	// Test with an invalid user
	auth = structs.Authentication{Username: "invaliduser", Password: "invalidpass"}
	body, _ = json.Marshal(auth)
	req, _ = http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	c.Request = req

	userEndpoints.Login(c)
	require.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "username Or password is incorrect")
}

func TestCreateUser(t *testing.T) {
	configMock := new(MockConfig)
	config.AppConfig = configMock
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// Test with a new user
	user := structs.User{Username: "newuser", Password: "newpass"}
	body, _ := json.Marshal(user)
	req, _ := http.NewRequest("POST", "/createUser", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	c.Request = req

	configMock.On("Exec", mock.AnythingOfType("string"), user.Username, user.Password).Return(mock.Anything)
	userEndpoints.CreateUser(c)
	require.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "User added successfully")

	// Test with an existing user
	body, _ = json.Marshal(user)
	req, _ = http.NewRequest("POST", "/createUser", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	c.Request = req

	config
*/