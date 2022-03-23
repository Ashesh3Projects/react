//nagivation header with activelink
import React from "react";
import { ActiveLink } from "raviger";
import { NAV_BAR } from "./globals";

export default function NavBar() {
	return (
		<div className="flex px-6 py-2 content-center w-full gap-8 center justify-center">
			{NAV_BAR.map((item) => {
				return (
					<div
						className="nav nav-pills flex flex-col md:flex-row flex-wrap list-none pl-0 mb-4"
						key={item.url}
					>
						<ActiveLink
							href={item.url}
							className="bg-gray-100 text-gray-600 hover:bg-slate-200 hover:text-zinc-700 block font-medium text-xs leading-tight uppercase rounded-md px-6 py-3 my-2 md:mx-2"
							exactActiveClass="text-slate-50 hover:bg-blue-500 hover:text-slate-50 border border-blue-500 bg-blue-500  block font-medium text-xs leading-tight uppercase rounded-md px-6 py-3 my-2 md:mr-2 text-white"
						>
							{item.page}
						</ActiveLink>
					</div>
				);
			})}
		</div>
	);
}
