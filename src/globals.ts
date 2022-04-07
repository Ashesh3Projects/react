import { hasToken } from "./api";

export const NAV_BAR = [
	{ page: "Home", url: "/" },
	{ page: "About", url: "/about" },
	...(hasToken()
		? [
				{ page: "Forms", url: "/forms" },
				{ page: "Logout", url: "/logout" },
		  ]
		: [{ page: "Login", url: "/login" }]),
];
