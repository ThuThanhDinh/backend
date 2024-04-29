import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";





const app = express();
const PORT = process.env.PORT || 8080;
//config view engine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();
//init web routes
initWebRoutes(app);

console.log("PORT from .env:", process.env.PORT);


app.listen(PORT, () => {
    console.log("listen on the port " + PORT)
})