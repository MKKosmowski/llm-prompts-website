"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const [profileUsername, setProfileUsername] = useState("");

	const profileId = searchParams.get("id") ?? session?.user.id;

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${profileId}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		const fetchProfileUsername = async () => {
			if (session?.user.id == profileId) {
				setProfileUsername("My");
				return;
			}

			const response = await fetch(`/api/users/${profileId}`);
			const data = await response.json();

			setProfileUsername(data.username);
		};

		if (session?.user.id) {
			fetchPosts();
			fetchProfileUsername();
		}
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you shure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);

				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name={profileUsername == "My" ? "My" : ` ${profileUsername}'s`}
			desc={
				profileUsername == "My"
					? "Welcome to your personalized profile page"
					: `Welcome to ${profileUsername}'s profile page`
			}
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
