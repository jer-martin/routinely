package config

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var (
	AppConfig = App{}
)

type App struct {
	SQL *sql.DB
}

func init() {
	InitializePostgress()
}

func InitializePostgress() {

	connect, err := sql.Open("mysql", "uojygbr7zyjudks0:yN2IY5BYZ6Wi7HoxmH4J@tcp(bii0fawltglwiz2qnyky-mysql.services.clever-cloud.com:3306)/bii0fawltglwiz2qnyky")
	if err != nil {
		log.Println(err)
		return
	}

	if connect.Ping(); err != nil {
		log.Println("failed to to initialize MySql with err: ", err.Error())
		return
	}

	AppConfig.SQL = connect
}
