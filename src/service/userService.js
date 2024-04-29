import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
// create the connection, specify bluebird as Promise


// query database


// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);

    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log("check error", error)
    }
}


const getUserList = async () => {

    let users = [];
    users = await db.User.findAll();
    return users;
    // return connection.query(
    //     'SELECT * from user ',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return user;
    //         }
    //         user = results
    //         return user;
    //     }
    // );

    // try {
    //     const [rows, fields] = await connection.execute('SELECT * from user ');
    //     return rows
    // } catch (error) {
    //     console.log("check error", error)
    // }

    console.log("cheeck users", users)

}

const deleteUser = async (userId) => {
    try {
        await db.User.destroy({
            uwhere: { id: userId }
        })
    } catch (error) {
        console.log("check error", error)
    }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true });

}
module.exports = {
    hashUserPassword, createNewUser, getUserList, deleteUser, getUserById
}