"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
					handleProfileClick={handleProfileClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [searchText, setSearchText] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	const [urlTag, setUrlTag] = useState(searchParams.get("tag") ?? "");

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();

			setPosts(data);
			setFilteredPosts(data);
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		if (urlTag !== "") {
			setSearchText(urlTag.startsWith("#") ? urlTag : `#${urlTag}`);
		}
	}, [urlTag]);

	useEffect(() => {
		setFilteredPosts(
			posts.filter(
				(p) =>
					p.prompt.toLowerCase().includes(searchText.trim().toLowerCase()) ||
					p.creator.username
						.toLowerCase()
						.includes(searchText.trim().toLowerCase()) ||
					p.creator.email
						.toLowerCase()
						.includes(searchText.trim().toLowerCase()) ||
					p.tag
						.toLowerCase()
						.includes(searchText.trim().toLowerCase().replaceAll("#", ""))
			)
		);
	}, [searchText, posts]);

	const handleTagClick = (tag) => {
		setSearchText(`#${tag}`);
	};

	const handleProfileClick = (profileId) => {
		router.push(`/profile?id=${profileId}`);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tage or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={filteredPosts}
				handleTagClick={handleTagClick}
				handleProfileClick={handleProfileClick}
			/>
		</section>
	);
};

export default Feed;
