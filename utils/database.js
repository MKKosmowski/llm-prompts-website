import mongoose from "mongoose";

let isConected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConected) {
		console.log("MongoDB is already conected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);

		isConected = true;
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
