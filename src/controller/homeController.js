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

const handleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    userService.createNewUser(email, password, username)
    //userService.getUserList()

    return res.redirect("/user");
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

module.exports = {
    handleHelloWorld, handleUser, handleCreateNewUser, handleDeleteUser
}