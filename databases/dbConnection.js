import mongoose from "mongoose";
import chalk from 'chalk';
const dbConnection=()=>{
    mongoose.connect("mongodb://localhost:27017/DaffodilClinic").then(()=>{
        console.log(chalk.hex("#d3aed2").italic("Database connected successfully")); 
    }
    ).catch((err)=>{
        console.log(err);
    });
};
export default dbConnection;