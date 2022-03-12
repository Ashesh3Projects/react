import React, { useState } from "react";
import Header from "./Header";
import Container from "./Container";
import Form from "./Form";

const formFields = [
	{ id: 1, label: "First Name", type: "text" },
	{ id: 2, label: "Last Name", type: "text" },
	{ id: 3, label: "Email", type: "email" },
	{ id: 4, label: "Date of Birth", type: "date" },
];

function App() {
	const [state, setState] = useState("HOME");

	const openForm = () => setState("FORM");
	const closeForm = () => setState("HOME");

	return (
		<Container>
			<div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
				{state === "HOME" ? (
					<Header
						title="Welcome to Milestone 1 of #react-typescript with #tailwindcss"
						btnClickCB={openForm}
					/>
				) : (
					<Form
						formFields={formFields}
						action="#"
						method="POST"
						btnClickCB={closeForm}
					/>
				)}
			</div>
		</Container>
	);
}

export default App;
