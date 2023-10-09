import mongoose from 'mongoose';

// const url = "mongodb://127.0.0.1:27017/issueTrackerdb";

export const connectToDB = async()=>{
	try{
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
      		useUnifiedTopology: true
		});
		console.log("Mongodb connected using mongoose successfully!")
	}
	catch(err){
		console.log("Error while connecting to db");
		console.log(err);
	}
}
