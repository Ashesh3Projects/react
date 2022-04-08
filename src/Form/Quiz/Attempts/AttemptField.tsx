import React from "react";
import { Rating } from "react-simple-star-rating";
import { Answer, FormField } from "../../../types";
import QuizInputField from "../Fields/QuizInputField";
import QuizOptionField from "../Fields/QuizOptionField";

function AttemptField(props: { field?: FormField; answer: Answer }) {
	return (
		<div
			key={props.field?.id}
			className="pb-2"
			tabIndex={0}
			aria-label={`Attempt Field: ${props.field?.label} of type ${props.field?.kind}`}
		>
			<label
				htmlFor={props.field?.label}
				className="pb-2 font-semibold text-sm"
			>
				{props.field?.label}
			</label>
			<div className="flex gap-2">
				{((field?: FormField) => {
					if (!field) return null;
					switch (field.kind) {
						case "TEXT":
							return (
								<QuizInputField
									field={field}
									progressValue={props.answer.value || ""}
									keyUpAction={() => {}}
									setFieldValue={() => {}}
									disabled={true}
								/>
							);
						case "DROPDOWN":
						case "RADIO":
							return (
								<QuizOptionField
									field={field}
									keyUpAction={() => {}}
									setFieldValue={() => {}}
									disabled={true}
									selectedOptions={
										field.options?.map((o) =>
											o.id === props.answer.form_field
												? o.id
												: -1
										) || []
									}
									setFieldValueOption={() => {}}
									selectedValue={props.answer.value || ""}
								/>
							);
						case "GENERIC":
							return (
								<div
									aria-label={`Rated ${
										Number(props.answer.value) / 20
									} out of 5`}
									tabIndex={0}
								>
									<Rating
										ratingValue={
											Number(props.answer.value) || 0
										}
										readonly={true}
									/>
								</div>
							);
					}
				})(props.field)}
			</div>
		</div>
	);
}

export default AttemptField;
