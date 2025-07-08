import mongoose from "mongoose";

let isConected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConected) {
		console.log("MongoDB is already conected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: process.env.MONGODB_DB || "test", // default database
			family: 4, // force IPv4 to avoid IPv6 DNS hangups
		});

		isConected = true;
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
