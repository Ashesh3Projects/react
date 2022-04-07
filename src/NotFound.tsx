import { Link } from "raviger";
import React, { Fragment } from "react";

function NotFound() {
	return (
		<Fragment>
			<div className="flex items-center justify-center w-screen h-screen">
				<div className="px-40 py-20 bg-white rounded-md shadow-xl">
					<div className="flex flex-col items-center">
						<h1 className="font-bold text-blue-600 text-9xl">
							404
						</h1>

						<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
							<span className="text-red-500">Oops!</span> Page not
							found
						</h6>

						<p className="mb-8 text-center text-gray-500 md:text-lg">
							The page you’re looking for doesn’t exist.
						</p>

						<Link
							href="/"
							className="cursor-pointer w-full flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg justify-center"
						>
							Go home
						</Link>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default NotFound;
