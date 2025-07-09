import { connection } from "../../DB/connectionDB.js";


export const getAllUsers = (req, res, next) => {
    connection.query(`select * from users`, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "error query", err });
      }
      console.log(result);
      return res.status(200).json({ message: "done query request", result });
    });
  }


  export const singUp = (req, res, next) => {
    const { fName, lName, email, password, gender, DOB } = req.body;

    const findQuery = `select u_email from users where u_email=?`;
    connection.execute(findQuery, [email], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on Query", error: err });
      }
      if (result.length != 0) {
        return res.status(409).json({ message: "user already exist" });
      }

      const insertQuery = `insert into users(u_fName, u_lName, u_email,u_password, u_gender, u_DOB) values (?,?,?,?,?,?)`;

      connection.execute(
        insertQuery,
        [fName, lName, email, password, gender, DOB],
        (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "fail on Query", error: err });
          }
          return res.status(201).json({ message: "DONE" });
        }
      );
    });
  }


  export const singIn = (req, res, next) => {
    const { email, password } = req.body;
    const findQuery = `select u_email,u_password from users where u_email=? and u_password=?`;
    connection.execute(findQuery, [email, password], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on query", error: err });
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ message: "email not exist or wrong password" });
      }
      return res.status(200).json({ message: "Done", user: result[0] });
    });
  }

  export const getProfile = (req, res, next) => {
    const { id } = req.params;
    const findQuery = `select 
    u_id,u_email,
    TIMESTAMPDIFF(YEAR, u_DOB,CURDATE()) AS age,
    CONCAT(u_fName," ",u_lName) as fullName from users where u_id=?`;
    connection.execute(findQuery, [id], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on Query", error: err });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "user not exist" });
      }
      return res.status(200).json({ message: "done", users: result[0] });
    });
  }

  export const search = (req, res, next) => {
    const findQuery = ` select * from users where u_fName like ? or u_lName like ?`;
    connection.execute(
      findQuery,
      ["%" + req.query.name + "%", req.query.name + "%"],
      (err, result) => {
        if (err) {
          return res.status(400).json({ message: "fail on query", error: err });
        }

        return res.status(200).json({ message: "done", users: result });
      }
    );
  }

  export const updateUser = (req, res, next) => {
    const { gender } = req.body;
    const { id } = req.params;
    const updateQuery = ` update users set u_gender=? where u_id=?`;
    connection.execute(updateQuery, [gender, id], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on query", error: err });
      }

      if (result.affectedRows == 0) {
        return res.status(400).json({ message: "user not exist" });
      }

      return res.status(200).json({ message: "done" });
    });
  }

  export const deleteUser = (req, res, next) => {
    const { id } = req.params;
    const deleteQuery = ` delete from users where u_id=?`;
    connection.execute(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on query", error: err });
      }

      if (result.affectedRows == 0) {
        return res.status(400).json({ message: "user not exist" });
      }

      return res.status(200).json({ message: "done" });
    });
  }