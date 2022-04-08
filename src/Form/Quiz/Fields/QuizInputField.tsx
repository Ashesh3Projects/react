import React from "react";
import { FormField } from "../../../types";

export default function QuizInputField(props: {
	field: FormField;
	setFieldValue: Function;
	progressValue: string;
	keyUpAction: Function;
	disabled?: boolean;
}) {
	return (
		<>
			<input
				required={true}
				aria-label={"Quiz Input Field, Question: " + props.field.label}
				disabled={props.disabled || false}
				type={props.field.kind}
				id={props.field.label}
				value={props.progressValue}
				autoComplete="off"
				onChange={(e) =>
					props.setFieldValue(props.field.id, e.target.value)
				}
				onKeyUp={(e) => {
					props.keyUpAction(e);
				}}
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
			/>
		</>
	);
}
