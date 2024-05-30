import userService from '../service/userService';

const testApi = (req, res) => {
    return res.status(200).json({
        message: "OK",
        data: 'test api'
    })
}


const handleCreateNewUser = async (req, res) => {

    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.createNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }

    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    userService.createNewUser(email, password, username)
    //userService.getUserList()

    // return res.redirect("/user");
}

const handleLogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.LoginUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}

const handleSendBoodRequest = async (req, res) => {
    console.log(req.body)
    try {
        if (!req.body.hospitalName || !req.body.doctorID || !req.body.mobile || !req.body.typeOfBlood || !req.body.bags) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.SendBloodRequest(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }


}

const handleBookDonation = async (req, res) => {
    console.log(req.body)
    try {

        if (!req.body.userId || !req.body.fullname || !req.body.phoneNo || !req.body.email || !req.body.city || !req.body.selectedHospitalId ||
            !req.body.date || !req.body.bloodType || !req.body.gender || !req.body.message

        ) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.BookDonation(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }


}


const handleAllRequest = async (req, res) => {
    try {

        let data = await userService.getAllRequest(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}

const handleAllBloodBank = async (req, res) => {
    try {

        let data = await userService.getAllBloodBank(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        console.log('Error in API controller:', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}

const handleAllDonationScheduleByHospitalId = async (req, res) => {
    try {
        // const qqe = req.query;
        // console.log("check qqe", qqe)
        const hospitalId = req.query.hospitalId;
        //console.log("check hosss", hospitalId)
        if (!hospitalId) {
            return res.status(400).json({
                EC: 1,
                EM: 'Hospital ID is required',
                DT: [],
            });
        }
        let data = await userService.getAllDonationScheduleByHospitalId(hospitalId)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        console.log('Error in API controller:', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}

const handleAllDonorByHospitalId = async (req, res) => {
    try {

        const hospitalId = req.query.hospitalId;
        //console.log("check hosss", hospitalId)
        if (!hospitalId) {
            return res.status(400).json({
                EC: 1,
                EM: 'Hospital ID is required',
                DT: [],
            });
        }
        let data = await userService.getAllDonorByHospitalId(hospitalId)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        console.log('Error in API controller:', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}


const handleCreateDonorInfor = async (req, res) => {
    //console.log(req.body)
    try {

        if (!req.body.fullname || !req.body.mobile || !req.body.email || !req.body.city || !req.body.hospitalId ||
            !req.body.date || !req.body.typeOfBlood || !req.body.gender

        ) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.createDonorInfor(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })



    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }


}

const handleDeleteRequest = async (req, res) => {
    //console.log("check req.body.id", req.body.id)
    try {


        let data = await userService.deleteRequest(req.body.id)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })



    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }


}

const handleAllDonorInfor = async (req, res) => {
    try {

        let data = await userService.getAllDonorInfor(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }
}

const handleRequestBloodFromAdmin = async (req, res) => {
    //console.log(req.body)
    try {

        if (!req.body.fullname || !req.body.mobile || !req.body.email || !req.body.city ||
            !req.body.date || !req.body.typeOfBlood || !req.body.gender || !req.body.message

        ) {
            return res.status(200).json({
                EM: 'Missing required paramater',
                EC: '1',
                DT: "",
            })
        }

        let data = await userService.createRequestBloodFromAdmin(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })



    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: "",
        })
    }


}

module.exports = {
    testApi, handleCreateNewUser, handleLogin, handleSendBoodRequest, handleAllRequest, handleAllBloodBank,
    handleBookDonation, handleAllDonationScheduleByHospitalId, handleCreateDonorInfor, handleAllDonorInfor,
    handleAllDonorByHospitalId, handleDeleteRequest, handleRequestBloodFromAdmin

}
