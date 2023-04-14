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

	connect, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/test")
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
