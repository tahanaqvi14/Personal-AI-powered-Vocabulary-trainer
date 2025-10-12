import mongoose from 'mongoose';
import debug from 'debug';

const dbgr = debug("development:mongoose");


mongoose.connect('mongodb+srv://taha:taha@cluster0.k61u9.mongodb.net/Vocab?retryWrites=true&w=majority&appName=Cluster0')
    .then(function () {
        dbgr("Connected to MongoDB successfully");
        console.log("Connected to MongoDB successfully");
        // console.log("Connected to MongoDB successfully");
    })
    
    .catch(function (err) {
        dbgr("MongoDB connection error:", err);
        console.log("Connected to MongoDB unsuccessfully");
        // console.error("MongoDB connection error:", err); 
    });

export default mongoose.connection;
