import React from "react";
import * as api from "./api";
import NavBar from "./NavBar";
import { LoginResponse } from "./types";

function Login() {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const submitBtnRef = React.useRef<HTMLButtonElement>(null);

	const setLoginButtonState = (
		removeClass: string,
		addClass: string,
		textContent: string,
		disabled: boolean
	) => {
		submitBtnRef.current!.classList.remove(removeClass);
		submitBtnRef.current!.classList.add(addClass);
		submitBtnRef.current!.textContent = textContent;
		submitBtnRef.current!.disabled = disabled;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitBtnRef.current) {
			setLoginButtonState(
				"bg-blue-600",
				"bg-orange-600",
				"Logging in...",
				true
			);
		}
		api.auth
			.login(username, password)
			.then((res: LoginResponse) => {
				if (submitBtnRef.current) {
					setLoginButtonState(
						"bg-orange-600",
						"bg-green-500",
						"Logged in!",
						true
					);
					localStorage.setItem("token", res.token);
				}
				setTimeout(() => {
					window.location.href = "/";
				}, 1500);
			})
			.catch(() => {
				if (submitBtnRef.current) {
					setLoginButtonState(
						"bg-orange-600",
						"bg-red-500",
						"Login failed!",
						false
					);
				}
				setTimeout(() => {
					if (submitBtnRef.current) {
						setLoginButtonState(
							"bg-red-500",
							"bg-blue-600",
							"Login",
							false
						);
					}
				}, 1500);
			});
	};

	return (
		<>
			<figure className="p-6 mx-auto bg-white shadow-lg rounded-xl">
				<NavBar />
				<h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
					Login
				</h2>

				<form onSubmit={handleSubmit}>
					<label
						htmlFor="username"
						className="block text-xs font-semibold text-gray-600 uppercase"
					>
						Username
					</label>
					<input
						id="username"
						type="text"
						name="username"
						onChange={(event) => setUsername(event.target.value)}
						className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-2 rounded-lg border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
						required
					/>
					<div className="py-2"></div>
					<label
						htmlFor="password"
						className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						name="password"
						className="block w-full py-3 px-1 mt-2 mb-4 border-2 rounded-lg text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
						required
					/>

					<button
						ref={submitBtnRef}
						type="submit"
						className="w-full py-3 mt-10 bg-blue-600 rounded-lg font-medium text-white uppercase focus:outline-none hover:bg-blue-700 hover:shadow-none"
					>
						Login
					</button>

					<div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
						<a
							href="https://tsapi.coronasafe.live/accounts/password/reset/"
							className="flex-2 underline"
						>
							Forgot password?
						</a>

						<p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
							or
						</p>

						<a
							href="https://tsapi.coronasafe.live/accounts/signup/"
							className="flex-2 underline"
						>
							Create an Account
						</a>
					</div>
				</form>
			</figure>
		</>
	);
}

export default Login;
