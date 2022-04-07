import React from "react";
import { NewField } from "../types";

function AddField(props: {
	newFieldData: NewField;
	setNewFieldDetail: Function;
	addField: Function;
}) {
	return (
		<div className="flex gap-2 border-2 border-gray-200 rounded-lg p-2 my-2">
			<input
				type="text"
				value={props.newFieldData.label}
				onChange={(e) =>
					props.setNewFieldDetail("label", e.target.value)
				}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						props.addField();
					}
				}}
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
			/>
			<select
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
				onChange={(e) =>
					props.setNewFieldDetail("type", e.target.value)
				}
			>
				<option value="TEXT">Text</option>
				<option value="DROPDOWN">Dropdown</option>
				<option value="RADIO">Radio</option>
			</select>
			<input
				type="button"
				value="Add Question"
				onClick={() => {
					props.addField();
				}}
				className="cursor-pointer w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
			/>
		</div>
	);
}

export default AddField;
