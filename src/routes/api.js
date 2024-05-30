import { removeUnnecessaryItems } from "@babel/preset-env/lib/filter-items";
import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();


/**
 * 
 * 
 *  @param {*} app - express app
 */



const initApiRoutes = (app) => {
    // router.get("/", homeController.handleHelloWorld)
    // router.get("/user", homeController.handleUser)
    router.all('*', checkUserJWT);
    router.post("/users/create-new-user", apiController.handleCreateNewUser)
    router.post("/users/login", apiController.handleLogin)
    router.post("/doctors/send-blood-request", apiController.handleSendBoodRequest)
    router.get("/admin/get-all-request", apiController.handleAllRequest)
    router.get("/get-all-blood-bank", apiController.handleAllBloodBank)
    router.post("/create-book-donation", apiController.handleBookDonation)
    router.get("/get-all-donation-schedule", apiController.handleAllDonationScheduleByHospitalId)
    router.get("/get-all-donor-by-hospitalId", apiController.handleAllDonorByHospitalId)
    router.post("/create-donor-infor", apiController.handleCreateDonorInfor)
    router.get("/admin/get-donor-infor", apiController.handleAllDonorInfor)
    router.delete("/delete-request", apiController.handleDeleteRequest)
    router.post("/request-blood-from-admin", apiController.handleRequestBloodFromAdmin)
    // router.post("/api/users/create-profile-user", homeController.handleCreateNewProfileUser)
    // router.post("/delete-user/:id", homeController.handleDeleteUser)
    // router.post("/update-user/:id", homeController.handleUpdateUser)

    router.get("/testapi", apiController.testApi)

    return app.use("/api/", router);

}
export default initApiRoutes;