import userService from '../service/userService';

const e = require("express");

// get the client






const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUser = async (req, res) => {
    let usersList = await userService.getUserList()
    console.log("check usersList", usersList)
    return res.render("user.ejs", usersList);
}

// const handleUser = async (req, res) => {
//     try {
//         const usersList = await userService.getUserList();
//         console.log("check usersList", usersList);
//         res.send(usersList); // Trả về danh sách người dùng dưới dạng JSON
//     } catch (error) {
//         console.error("Error retrieving user list:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }

const handleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    userService.createNewUser(email, password, username)
    //userService.getUserList()

    // return res.redirect("/user");
}


const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const handleUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
}

const handleCreateNewProfileUser = async (req, res) => {
    let fullName = req.body.fullName
    let dateOfBirth = req.body.dateOfBirth
    let gender = req.body.gender
    let idCardVisaNo = req.body.idCardVisaNo
    let bloodGroup = req.body.bloodGroup
    let mobile = req.body.mobile
    let city = req.body.city
    await userService.createNewProfileUser(
        fullName,
        dateOfBirth,
        gender,
        idCardVisaNo,
        bloodGroup,
        mobile,
        city)
}

module.exports = {
    handleHelloWorld, handleUser, handleCreateNewUser, handleDeleteUser, handleCreateNewProfileUser
}