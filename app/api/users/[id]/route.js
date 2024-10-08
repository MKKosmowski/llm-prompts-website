import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { params }) => {
	try {
		connectToDB();

		const user = await User.findOne({
			_id: params.id,
		});

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all users", { status: 500 });
	}
};
