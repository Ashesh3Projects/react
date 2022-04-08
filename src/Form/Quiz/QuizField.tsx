import { navigate } from "raviger";
import React from "react";
import { FormField } from "../../types";
import QuizOptionField from "./Fields/QuizOptionField";
import QuizInputField from "./Fields/QuizInputField";
import { Rating } from "react-simple-star-rating";

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
		<div
			id="QuizContent"
			key={props.field.id}
			className="pb-2"
			tabIndex={0}
			aria-label="Quiz Field"
		>
			<div className="pb-2">
				<label
					htmlFor={props.field.label}
					className="pb-2 font-semibold text-sm"
					tabIndex={0}
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
						case "GENERIC":
							return (
								<div
									className="flex flex-row w-full"
									tabIndex={0}
									aria-label={`Rating Input: Current value ${
										(Number(
											props.quizProgress?.find(
												(f) => f.id === field.id
											)?.value
										) || 0) / 20
									} out of 5`}
								>
									<Rating
										aria-label="Rating Input"
										className="w-full"
										allowHalfIcon={true}
										onClick={(rate) => {
											props.setFieldValue(field.id, rate);
										}}
										ratingValue={
											Number(
												props.quizProgress?.find(
													(f) => f.id === field.id
												)?.value
											) || 0
										}
									/>
								</div>
							);
					}
				})(props.field)}
			</div>
		</div>
	);
}

export default QuizField;
