package middleware

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var secretkey = "super-secret-key"

// add the Auth middleware function
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Header.Get("Token") == "" {
			err := errors.New("no token found")
			c.String(412, err.Error())
			c.Abort()
			return
		}

		var mySigningKey = []byte(secretkey)

		token, err := jwt.Parse(c.Request.Header.Get("Token"), func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("There was an error in parsing")
			}
			return mySigningKey, nil
		})

		if err != nil {
			err := errors.New("token is expired")
			c.String(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			if claims["isAuthorized"] == true {
				c.Next()
				return
			}
		}
		c.String(http.StatusUnauthorized, "Invalid Token")
		c.Abort()
	}
}
