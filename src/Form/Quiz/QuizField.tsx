import { navigate } from "raviger";
import React from "react";
import { FormField } from "../../types";
import QuizOptionField from "./Fields/QuizOptionField";
import QuizInputField from "./Fields/QuizInputField";

function QuizField(props: {
	formID: number;
	qIndex: number;
	field: FormField;
	fieldLength: number;
	submitQuiz: Function;
	quizProgress?: FormField[];
	setFieldValue: Function;
	setFieldValueOption: Function;
}) {
	const keyUpAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (Number(props.qIndex) < props.fieldLength - 1)
				navigate(
					`/quiz/${props.formID}?qIndex=${Number(props.qIndex) + 1}`
				);
			else props.submitQuiz();
		}
	};
	return (
		<div key={props.field.id} className="pb-2">
			<div className="pb-2">
				<label
					htmlFor={props.field.label}
					className="pb-2 font-semibold text-sm"
				>
					{props.field.label}
				</label>
			</div>
			<div className="flex gap-2">
				{((field: FormField) => {
					switch (field.kind) {
						case "TEXT":
							return (
								<QuizInputField
									field={field}
									progressValue={
										props.quizProgress?.find(
											(f) => f.id === field.id
										)?.value || ""
									}
									setFieldValue={props.setFieldValue}
									keyUpAction={keyUpAction}
								/>
							);
						case "DROPDOWN":
						case "RADIO":
							return (
								<QuizOptionField
									field={field}
									setFieldValue={props.setFieldValue}
									keyUpAction={keyUpAction}
									selectedValue={
										props.quizProgress?.find(
											(f) => f.id === field.id
										)?.value || ""
									}
									selectedOptions={
										props.quizProgress
											?.find(
												(f) =>
													f.id === field.id &&
													(f.kind === "RADIO" ||
														f.kind === "DROPDOWN")
											)
											?.options?.map((o) =>
												o.selected ? o.id : -1
											) || []
									}
									setFieldValueOption={
										props.setFieldValueOption
									}
								/>
							);
					}
				})(props.field)}
			</div>
		</div>
	);
}

export default QuizField;
