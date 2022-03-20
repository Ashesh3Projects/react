import React, { Fragment } from "react";

function Footer(props: { openForm: Function; closeListCB: Function }) {
	return (
		<Fragment>
			<input
				type="button"
				value="Add Form"
				onClick={() => {
					props.openForm(-1);
				}}
				className="cursor-pointer flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
			/>
			<div className="pb-4"></div>
			<input
				type="button"
				value="Back"
				onClick={() => {
					props.closeListCB();
				}}
				className="cursor-pointer flex bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
			/>
		</Fragment>
	);
}

export default Footer;
