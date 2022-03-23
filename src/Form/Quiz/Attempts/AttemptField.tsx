import React from "react";
import { FormField } from "../../../types";

function AttemptField(props: { field: FormField }) {
	return (
		<div key={props.field.id} className="pb-2">
			<label
				htmlFor={props.field.label}
				className="pb-2 font-semibold text-sm"
			>
				{props.field.label}
			</label>
			<div className="flex gap-2">
				<input
					type={props.field.type}
					id={props.field.label}
					value={props.field.value}
					disabled={true}
					className="border-2 border-gray-200 rounded-lg p-2 w-full"
				/>
			</div>
		</div>
	);
}

export default AttemptField;
