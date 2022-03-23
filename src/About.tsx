import React from "react";
import logo from "./logo.svg";
import NavBar from "./NavBar";

function About() {
	return (
		<>
			<figure className="p-6 mx-auto bg-white shadow-lg rounded-xl">
				<NavBar />
				<div className="border-2 border-slate-700 rounded-lg">
					<img
						className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto animate-spin "
						src={logo}
						alt=""
						width="384"
						height="512"
						style={{ animation: "spin 2s linear infinite" }}
					/>
					<div className="pt-6 p-8 text-center md:text-left space-y-4">
						<blockquote>
							<p className="text-lg font-medium">
								"This app is called Quizzie, and it allows you
								to create and manage quizzes, as well as take
								them and see your results.
								<br /> This is a great tool for students or
								anyone who wants to learn more about a certain
								topic."
							</p>
						</blockquote>
						<figcaption className="font-medium">
							<div className="text-sky-600 ">Ashesh Kumar</div>
							<div className="text-slate-700 ">
								Student, GDC Fellowship
							</div>
						</figcaption>
					</div>
				</div>
			</figure>
		</>
	);
}

export default About;
