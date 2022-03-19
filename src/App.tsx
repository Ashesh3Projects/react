import React, { useState } from "react";
import Header from "./Header";
import Container from "./Container";
import FormList from "./FormList";

function App() {
	const [state, setState] = useState("HOME");

	const openFormList = () => setState("FORMLIST");
	const closeFormList = () => setState("HOME");

	return (
		<Container>
			<div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
				{state === "HOME" ? (
					<Header
						title="Welcome to Milestone 3 of #react-typescript with #tailwindcss"
						btnClickCB={openFormList}
					/>
				) : (
					<FormList closeListCB={closeFormList} />
				)}
			</div>
		</Container>
	);
}

export default App;
