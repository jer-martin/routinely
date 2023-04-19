package middleware

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/jer-martin/routinely/src/server/structs"
)

// add the Auth middleware function
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		Cookie, err := c.Request.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				c.String(http.StatusUnauthorized, err.Error())
				c.Abort()
				return
			}
			c.String(http.StatusBadRequest, err.Error())
			c.Abort()
			return
		}
		tokenString := Cookie.Value

		claims := &structs.Claims{}

		tkn, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
			return structs.Secretkey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				c.String(http.StatusUnauthorized, err.Error())
				c.Abort()
				return
			}
			c.String(http.StatusBadRequest, err.Error())
			c.Abort()
			return
		}
		if !tkn.Valid {
			err = errors.New("invalid Token")
			c.String(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}

	}
}

// var secretkey = "super-secret-key"

// add the Auth middleware function
// func AuthMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		if c.Request.Header.Get("Token") == "" {
// 			err := errors.New("no token found")
// 			c.String(412, err.Error())
// 			c.Abort()
// 			return
// 		}

// 		var mySigningKey = []byte(secretkey)

// 		token, err := jwt.Parse(c.Request.Header.Get("Token"), func(token *jwt.Token) (interface{}, error) {
// 			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 				return nil, fmt.Errorf("There was an error in parsing")
// 			}
// 			return mySigningKey, nil
// 		})

// 		if err != nil {
// 			err := errors.New("token is expired")
// 			c.String(http.StatusUnauthorized, err.Error())
// 			c.Abort()
// 			return
// 		}

// 		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 			if claims["isAuthorized"] == true {
// 				c.Next()
// 				return
// 			}
// 		}
// 		c.String(http.StatusUnauthorized, "Invalid Token")
// 		c.Abort()
// 	}
// }
