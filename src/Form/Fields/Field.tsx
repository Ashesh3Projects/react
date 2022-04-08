import React from "react";
import { FormField } from "../../types";
import OptionField from "./OptionField";
import TextField from "./TextField";

function Field(props: {
	field: FormField;
	setFieldValue: Function;
	removeField: Function;
	addNewOption: Function;
	setOptionValue: Function;
	removeOption: Function;
}) {
	return (
		<li
			key={props.field.id}
			className="pb-3"
			aria-label={`Form Input: Label "${props.field.label}" of type "${props.field.kind}"`}
			tabIndex={0}
		>
			<div className="flex gap-1">
				{((field: FormField) => {
					switch (field.kind) {
						case "TEXT":
							return (
								<TextField
									field={field}
									setFieldValue={props.setFieldValue}
									removeField={props.removeField}
								/>
							);
						case "DROPDOWN":
						case "RADIO":
							return (
								<OptionField
									field={field}
									setFieldValue={props.setFieldValue}
									removeField={props.removeField}
									addNewOption={props.addNewOption}
									setOptionValue={props.setOptionValue}
									removeOption={props.removeOption}
								/>
							);
					}
				})(props.field)}
			</div>
		</li>
	);
}

export default Field;
