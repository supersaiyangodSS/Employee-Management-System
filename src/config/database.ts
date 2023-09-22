import dotenv from 'dotenv';
dotenv.config();
import { connect } from "mongoose";

const mongoUri : string = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const connectDB = async () => {
    try {
        await connect(mongoUri);
        console.log('connected to mongodb');
    }
    catch (err) {
        console.log('connection mongodb failed', err);        
    }
}

export default connectDB;
