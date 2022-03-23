import { navigate } from "raviger";
import React from "react";
import { FormField } from "../../types";

function QuizField(props: {
	formID: number;
	qIndex: number;
	field: FormField;
	fieldLength: number;
	submitQuiz: Function;
	setFieldValue: Function;
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
					autoFocus={true}
					type={props.field.type}
					id={props.field.label}
					value={props.field.value}
					autoComplete="off"
					onChange={(e) =>
						props.setFieldValue(props.field.id, e.target.value)
					}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (Number(props.qIndex) < props.fieldLength - 1)
								navigate(
									`/quiz/${props.formID}?qIndex=${
										Number(props.qIndex) + 1
									}`
								);
							else props.submitQuiz();
						}
					}}
					className="border-2 border-gray-200 rounded-lg p-2 w-full"
				/>
			</div>
		</div>
	);
}

export default QuizField;
