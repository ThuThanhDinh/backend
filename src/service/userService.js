import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';
import { name } from 'ejs';
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
import { createJWT } from '../middleware/JWTAction';
import hospital from '../models/hospital';

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true
    }

    return false;
}

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);

    return hashPassword;
}

const createNewUser = async (userData) => {
    try {
        let isEmailExist = await checkEmailExist(userData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }

        let hashPass = hashUserPassword(userData.password);
        await db.User.create({
            email: userData.email,
            name: userData.name,
            password: hashPass,
            groupId: 2
        })

        return {
            EM: 'Registered successfully',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const SendBloodRequest = async (requestData) => {
    console.log("check", requestData)
    try {

        await db.Blood_Request.create({
            hospitalName: requestData.hospitalName,
            doctorID: requestData.doctorID,
            mobile: requestData.mobile,
            typeOfBlood: requestData.typeOfBlood,
            quanlity: requestData.bags
        })

        return {
            EM: 'Send blood request successfully',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const BookDonation = async (requestData) => {
    console.log("check", requestData)
    try {

        await db.Book_Donation.create({
            userId: requestData.userId,
            fullname: requestData.fullname,
            mobile: requestData.phoneNo,
            email: requestData.email,
            city: requestData.city,
            hospitalId: requestData.selectedHospitalId,
            date: requestData.date,
            typeOfBlood: requestData.bloodType,
            gender: requestData.gender,
            message: requestData.message,
        })

        return {
            EM: 'Send blood request successfully',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const LoginUser = async (userData) => {
    try {
        // Check if the email exists
        let user = await db.User.findOne({
            where: { email: userData.email }
        });

        if (!user) {
            return {
                EM: 'The email does not exist',
                EC: 1
            }
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(userData.password, user.password);
        //console.log("check email", user.email)
        if (isPasswordValid) {
            let payload = {
                email: user.email,

                //expiresIn: process.env.JWT_EXPIRES_IN
            }
            let token = createJWT(payload)
            return {
                EM: 'Login successfully',
                EC: 0,
                DT: {
                    access_token: token,
                    id: user.id,
                    hospitalId: user.hospitalId
                }
            }
        } else {
            return {
                EM: 'Wrong password',
                EC: 1
            }
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Something went wrong in the service',
            EC: -2
        }
    }
}

const getAllRequest = async (userData) => {
    try {

        let data = await db.Blood_Request.findAll()
        return {
            EM: '',
            EC: 0,
            DT: data
        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something went wrong in the service',
            EC: -2,
            DT: []
        }
    }
}

const getAllBloodBank = async (userData) => {
    try {

        let data = await db.Blood_Bank.findAll()
        //console.log(data);
        return {
            EM: '',
            EC: 0,
            DT: data

        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something went wrong in the service',
            EC: -2,
            DT: []
        }
    }
}


const getAllDonationScheduleByHospitalId = async (hospitalId) => {
    try {

        let data = await db.Book_Donation.findAll({
            where: { hospitalId: hospitalId }
        }
        )
        //console.log(data);
        return {
            EM: '',
            EC: 0,
            DT: data

        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something went wrong in the service',
            EC: -2,
            DT: []
        }
    }
}


const getAllDonorByHospitalId = async (hospitalId) => {
    try {

        let data = await db.Donor_Infor.findAll({
            where: { hospitalId: hospitalId }
        }
        )
        //console.log(data);
        return {
            EM: '',
            EC: 0,
            DT: data

        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something went wrong in the service',
            EC: -2,
            DT: []
        }
    }
}

const createDonorInfor = async (requestData) => {
    //console.log("check", requestData)
    try {

        await db.Donor_Infor.create({
            fullname: requestData.fullname,
            mobile: requestData.mobile,
            email: requestData.email,
            city: requestData.city,
            hospitalId: requestData.hospitalId,
            date: requestData.date,
            typeOfBlood: requestData.typeOfBlood,
            gender: requestData.gender,
        })

        // Xóa dữ liệu tương ứng từ bảng Book_Donation
        await db.Book_Donation.destroy({
            where: { id: requestData.id }
        });

        return {
            EM: 'confirm successfully',
            EC: 0
        }




    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const createRequestBloodFromAdmin = async (requestData) => {
    //console.log("check", requestData)
    try {

        await db.Admin_Request_Blood.create({
            fullname: requestData.fullname,
            mobile: requestData.mobile,
            email: requestData.email,
            city: requestData.city,
            date: requestData.date,
            typeOfBlood: requestData.typeOfBlood,
            gender: requestData.gender,
            messageFromAdmin: requestData.message
        })


        return {
            EM: 'Send successfully',
            EC: 0
        }




    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const deleteRequest = async (id) => {
    //console.log("check id xoa", id)
    try {


        // Kiểm tra xem yêu cầu với id này có tồn tại không
        const request = await db.Blood_Request.findOne({ where: { id: id } });

        if (!request) {
            return {
                EM: 'Request not found',
                EC: 1
            };
        }

        // Xóa dữ liệu tương ứng từ bảng Blood_Request
        const result = await db.Blood_Request.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return {
                EM: 'Failed to delete request',
                EC: 1
            };
        }

        return {
            EM: 'Delete successfully',
            EC: 0
        };



    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service',
            EC: -2
        }
    }

}

const getUserList = async () => {

    // let users = [];
    // users = await db.User.findAll();
    // console.log("cheeck users", users)
    // return users;


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

    // console.log("cheeck users", users)

    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"], },
        raw: true,
        nest: true
    })


    // let roles = await db.Group.findOne({
    //     where: { id: 1 },
    //     include: {
    //         model: db.Role
    //     },
    //     raw: true,
    //     nest: true
    // })


    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true

    })

    console.log(">>> check new user:", newUser)
    console.log(">>> check new roles:", roles)
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

const updateUserInfor = async (email, username, id) => {
    await db.User.Update(
        {
            email: email, username: username
        }, {
        where: {
            id: id
        }
    }
    );
}

const createNewProfileUser = async (fullName, dateOfBirth, gender, idCardVisaNo, bloodGroup, mobile, city) => {

    try {
        await db.Profile_User.create({
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            bloodGroup: bloodGroup,
            mobile: mobile,
            city: city
        })
    } catch (error) {
        console.log("check error", error)
    }
}


const getAllDonorInfor = async (userData) => {
    try {

        let data = await db.Donor_Infor.findAll()
        return {
            EM: '',
            EC: 0,
            DT: data
        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something went wrong in the service',
            EC: -2,
            DT: []
        }
    }
}


module.exports = {
    hashUserPassword, createNewUser, getUserList, deleteUser, getUserById,
    updateUserInfor, createNewProfileUser, LoginUser, SendBloodRequest, getAllRequest,
    getAllBloodBank, BookDonation, getAllDonationScheduleByHospitalId, createDonorInfor,
    getAllDonorInfor, getAllDonorByHospitalId, deleteRequest, createRequestBloodFromAdmin
}