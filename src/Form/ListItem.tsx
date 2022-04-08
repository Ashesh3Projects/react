import { Link } from "raviger";
import React from "react";
import { FormItem } from "../types";

function FormListItem(props: { form: FormItem; deleteForm: Function }) {
	return (
		<li
			className="flex flex-row py-2 px-2 items-center justify-center gap-2 border-2 rounded-lg"
			key={props.form.id}
		>
			<div
				className="pb-2 w-full text-center text-xl items-center flex justify-center"
				tabIndex={0}
			>
				{props.form.title}
			</div>
			<Link
				title="Take Quiz"
				aria-label="Take Quiz"
				href={`/quiz/${props.form.id}`}
				className="flex justify-center items-center cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
			>
				&#10148;
			</Link>
			<Link
				title="Quiz Results"
				aria-label="Quiz Results"
				href={`/quiz/${props.form.id}/results`}
				className="cursor-pointer bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
			>
				&#x2633;
			</Link>
			<Link
				title="Edit Quiz"
				aria-label="Edit Quiz"
				href={`/forms/${props.form.id}`}
				className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
			>
				&#9881;
			</Link>

			<input
				title="Delete Quiz"
				aria-label="Delete Quiz"
				type="button"
				value="&#10006;"
				onClick={() => {
					props.deleteForm(props.form.id);
				}}
				className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
			/>
		</li>
	);
}

export default FormListItem;
