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
							<div className="relative inline-block w-full text-gray-700">
								<select
									required={true}
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
									<option key="-1" value="-">
										-
									</option>

									{field.options?.map((option, index) => {
										return (
											<option
												key={index}
												value={option.label}
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
										>
											<input
												required={true}
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
												id={String(option.id)}
												onChange={(_) => {
													props.setFieldValue(
														field.id,
														option.label
													);
												}}
											/>
											<label
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
