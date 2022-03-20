import React, { Fragment } from "react";
import { FormField } from "../types";

function Field(props: {
	field: FormField;
	setFieldValue: Function;
	removeField: Function;
}) {
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
					onChange={(e) =>
						props.setFieldValue(props.field.id, e.target.value)
					}
					className="border-2 border-gray-200 rounded-lg p-2 w-full"
				/>
				<input
					type="button"
					className="cursor-pointer font-bold bg-purple-500 hover:bg-purple-700 text-white rounded-lg px-3"
					onClick={() => props.removeField(props.field.id)}
					value="Remove"
				/>
			</div>
		</div>
	);
}

export default Field;
