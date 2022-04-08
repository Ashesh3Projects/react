import React from "react";
import Header from "./Header";
import Nav from "./NavBar";

function Home() {
	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
			<Nav />
			<Header title="Welcome to Milestone 8 of #react-typescript with #tailwindcss" />
		</div>
	);
}

export default Home;
