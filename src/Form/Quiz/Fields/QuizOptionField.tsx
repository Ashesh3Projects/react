import React from "react";
import { FormField } from "../../../types";

export default function QuizOptionField(props: {
	field: FormField;
	setFieldValue: Function;
	setFieldValueOption: Function;
	selectedOptions: number[];
	disabled?: boolean;
	selectedValue?: string;
	keyUpAction: Function;
}) {
	return (
		<>
			{((field) => {
				switch (field.kind) {
					case "DROPDOWN":
						return (
							<div
								className="relative inline-block w-full text-gray-700"
								tabIndex={0}
								aria-label={`Quiz Option Field ${
									props.selectedValue
										? `selected value, ${props.selectedValue}`
										: ""
								}`}
							>
								<select
									required={true}
									aria-label={`Dropdown ${field.label} ${
										props.selectedValue
											? `selected value, ${props.selectedValue}`
											: ""
									}`}
									id={field.label}
									disabled={props.disabled || false}
									value={props.selectedValue || undefined}
									className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
									onChange={(e) => {
										props.setFieldValue(
											field.id,
											e.target.value
										);
									}}
								>
									<option
										key="-1"
										value="-"
										aria-label="Empty Choice"
									>
										-
									</option>

									{field.options?.map((option, index) => {
										return (
											<option
												key={index}
												value={option.label}
												aria-label={`Choice ${option.label}`}
											>
												{option.label}
											</option>
										);
									})}
								</select>
							</div>
						);
					case "RADIO":
						return (
							<div className="flex flex-wrap flex-col">
								{field.options?.map((option) => {
									return (
										<div
											className="form-check mr-4 mb-2"
											key={option.id}
											tabIndex={0}
											aria-label={`Option ${
												option.label
											}, ${
												props.selectedValue ===
												option.label
													? "Selected"
													: "Not Selected"
											}`}
										>
											<input
												aria-labelledby={String(
													option.id
												)}
												required={true}
												aria-label="Answer Radio"
												className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
												type="radio"
												disabled={
													props.disabled || false
												}
												checked={
													props.selectedValue ===
													option.label
												}
												name={option.label}
												onChange={(_) => {
													props.setFieldValue(
														field.id,
														option.label
													);
												}}
											/>
											<label
												id={String(option.id)}
												className="form-check-label inline-block text-gray-800"
												htmlFor={String(option.id)}
											>
												{option.label}
											</label>
										</div>
									);
								})}
							</div>
						);
					default:
						return null;
				}
			})(props.field)}
		</>
	);
}
