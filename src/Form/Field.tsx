import React from "react";
import { FormField } from "../types";

function Field(props: {
	field: FormField;
	setFieldValue: Function;
	setFieldType: Function;
	removeField: Function;
}) {
	return (
		<div key={props.field.id} className="pb-4">
			{/* <label
				htmlFor={props.field.label}
				className="pb-2 font-semibold text-sm"
			>
				{props.field.label}
			</label> */}
			<div className="flex gap-2">
				<input
					type="text"
					id={props.field.label}
					value={props.field.label}
					onChange={(e) =>
						props.setFieldValue(props.field.id, e.target.value)
					}
					className="border-2 border-gray-200 rounded-lg p-2 w-full"
				/>
				<select
					value={props.field.type}
					className="border-2 border-gray-200 rounded-lg p-2 w-52"
					onChange={(e) =>
						props.setFieldType(props.field.id, e.target.value)
					}
				>
					<option value="text">Text</option>
					<option value="number">Number</option>
					<option value="email">Email</option>
					<option value="password">Password</option>
					<option value="date">Date</option>
					<option value="time">Time</option>
				</select>
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
