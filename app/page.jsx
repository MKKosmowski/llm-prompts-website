import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Odkrywaj i dziel się
				<br className="max-mid:hidden" />
				<span className="orange_gradient text-center">
					Prompty napędzane przez AI
				</span>
			</h1>
			<p className="desc text-center">
				Promptopia to open-source'owe narzędzie do generowania promptów AI,
				które pozwala odkrywać, tworzyć i udostępniać kreatywne prompty w
				nowoczesnym świecie.
			</p>

			<Feed />
		</section>
	);
};

export default Home;
