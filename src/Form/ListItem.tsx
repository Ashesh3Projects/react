import { Link } from "raviger";
import React from "react";
import { FormDetails } from "../types";

function FormListItem(props: { form: FormDetails; deleteForm: Function }) {
	return (
		<div
			className="flex flex-row py-3 px-2 items-center justify-center gap-2"
			key={props.form.id}
		>
			<h2 className="pb-2 w-full text-center text-xl items-center ">
				{props.form.title}
			</h2>
			<Link
				href={`/forms/${props.form.id}`}
				className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
			>
				Open
			</Link>
			<input
				type="button"
				value="Delete"
				onClick={() => {
					props.deleteForm(props.form.id);
				}}
				className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
			/>
		</div>
	);
}

export default FormListItem;
