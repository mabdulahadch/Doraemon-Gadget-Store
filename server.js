import express from "express";
import connectDB from "./db/connection.js"; // Importing the database connection
import characterRoutes from "./routes/Character.routes.js";
import gadgetRoutes from "./routes/Gaget.routes.js";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
const PORT = 5050;



dotenv.config();
connectDB();


app.use("/character", characterRoutes);
app.use("/gadget", gadgetRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

