import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogappdb",
});

export const checkConnectionDB = () => {
  connection.connect((err) => {
    if (err) {
      console.log({ message: "failed to connect to db", error: err });
    } else {
      console.log("db connected successfully ");
    }
  });
};
