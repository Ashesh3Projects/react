import { Link, navigate } from "raviger";
import React, { useReducer } from "react";
import { FormField, FormItem, NewField } from "../types";
import AddField from "./AddField";
import Field from "./Fields/Field";
import { useEffectOnlyOnce } from "./utils";
import * as api from "../api";

type SetFormDataAction = {
	type: "setFormData";
	form: FormItem;
};
type SetFieldDataAction = {
	type: "setFieldData";
	fields: FormField[];
};
type AddFieldAction = {
	type: "addField";
	newFieldData: FormField;
};

type RemoveFieldAction = {
	type: "removeField";
	field_id: number;
};

type SetFieldValueAction = {
	type: "setFieldValue";
	fieldId: number;
	fieldValue: string;
};

type ClearAllFieldsAction = {
	type: "clearAllFields";
};

type SetTitleAction = {
	type: "setTitle";
	title: string;
};

type SetNewFieldDetailAction = {
	type: "setNewFieldDetail";
	changeType: "label" | "type";
	changeValue: string;
};

type AddNewOptionAction = {
	type: "addNewOption";
	fieldId: number;
	optionID: number;
	optionLabel: string;
};

type RemoveOptionAction = {
	type: "removeOption";
	fieldId: number;
	optionId: number;
};

type SetOptionLabelAction = {
	type: "setOptionLabel";
	fieldId: number;
	optionId: number;
	label: string;
};

type FormAction = SetFormDataAction | SetTitleAction;

type NewFieldAction = SetNewFieldDetailAction;

type FieldAction =
	| SetFieldDataAction
	| AddFieldAction
	| RemoveFieldAction
	| SetFieldValueAction
	| ClearAllFieldsAction
	| AddNewOptionAction
	| RemoveOptionAction
	| SetOptionLabelAction;

function Form(props: { formID: number }) {
	const [newFieldData, newFieldDispacher] = useReducer(newFieldReducer, {
		label: "",
		type: "TEXT",
	});

	function formDataReducer(
		formDetails: FormItem,
		action: FormAction
	): FormItem {
		if (formDetails.id === 0 && action.type !== "setFormData")
			return formDetails;
		switch (action.type) {
			case "setFormData":
				return action.form;

			case "setTitle":
				formDetails.title = action.title;
				return formDetails;
		}
	}

	function fieldDataReducer(
		fieldDetails: FormField[],
		action: FieldAction
	): FormField[] {
		switch (action.type) {
			case "setFieldData":
				return action.fields;

			case "addField":
				if (action.newFieldData.label === "" || !formData)
					return fieldDetails;

				newFieldDispacher({
					type: "setNewFieldDetail",
					changeType: "label",
					changeValue: "",
				});
				return [...fieldDetails, action.newFieldData];

			case "removeField":
				return fieldDetails.filter(
					(field: FormField) => field.id !== action.field_id
				);

			case "setFieldValue":
				return fieldDetails.map((field): FormField => {
					if (field.id === action.fieldId) {
						return {
							...field,
							...{ label: action.fieldValue, value: "" },
						};
					}
					return field;
				});

			case "clearAllFields":
				return [];

			case "addNewOption":
				return fieldDetails.map((field) => {
					if (
						field.id === action.fieldId &&
						(field.kind === "DROPDOWN" || field.kind === "RADIO")
					) {
						return {
							...field,
							...{
								options: [
									...(field.options || []),
									{
										id: action.optionID,
										label: action.optionLabel,
										value: "",
										selected: false,
									},
								],
							},
						};
					}
					return field;
				});

			case "removeOption":
				return fieldDetails.map((field) => {
					if (
						field.id === action.fieldId &&
						(field.kind === "DROPDOWN" || field.kind === "RADIO")
					) {
						return {
							...field,
							...{
								options: (field.options || []).filter(
									(option) => option.id !== action.optionId
								),
							},
						};
					}
					return field;
				});

			case "setOptionLabel":
				return fieldDetails.map((field) => {
					if (
						field.id === action.fieldId &&
						(field.kind === "DROPDOWN" || field.kind === "RADIO")
					) {
						return {
							...field,
							...{
								options: (field.options || []).map((option) => {
									if (option.id === action.optionId) {
										return {
											...option,
											...{ label: action.label },
										};
									}
									return option;
								}),
							},
						};
					}
					return field;
				});
		}
	}

	function newFieldReducer(
		newFieldDetail: NewField,
		action: NewFieldAction
	): NewField {
		switch (action.type) {
			case "setNewFieldDetail":
				if (
					action.changeType === "type" &&
					(action.changeValue === "TEXT" ||
						action.changeValue === "DROPDOWN" ||
						action.changeValue === "RADIO" ||
						action.changeValue === "GENERIC")
				)
					return { ...newFieldDetail, type: action.changeValue };
				else return { ...newFieldDetail, label: action.changeValue };
		}
	}

	const [formData, formDataDispacher] = useReducer(formDataReducer, {
		id: 0,
		title: "",
		description: "",
		is_public: false,
		created_by: 0,
		created_date: "",
		modified_date: "",
	});

	const [fieldData, fieldDataDispacher] = useReducer(fieldDataReducer, []);

	useEffectOnlyOnce(() => {
		(async () => {
			if (props.formID === -1) {
				return api.forms.create({
					title: "Untitled Form",
					description: "",
					is_public: true,
				});
			}
			return api.forms.get(props.formID);
		})().then((newFormData) => {
			if (props.formID === -1) navigate(`/forms/${newFormData.id}`);
			formDataDispacher({ type: "setFormData", form: newFormData });
			api.forms.fields.get(newFormData.id).then((fetchedFieldData) => {
				fetchedFieldData.results.sort((a, b) => a.id - b.id);
				fieldDataDispacher({
					type: "setFieldData",
					fields: fetchedFieldData.results,
				});
			});
		});
	});

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl items-center">
			<input
				type="text"
				defaultValue={formData?.title}
				className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-2 border-gray-200 rounded-lg"
				onChange={(e) => {
					api.forms.update(formData.id, { title: e.target.value });
					formDataDispacher({
						type: "setTitle",
						title: e.target.value,
					});
				}}
			/>
			<div className="pb-4"></div>
			<div className="px-4 w-full">
				{fieldData?.map((field) => (
					<Field
						field={field}
						removeField={(field_id: number) => {
							api.forms.fields.delete(formData.id, field_id);
							fieldDataDispacher({
								type: "removeField",
								field_id,
							});
						}}
						setFieldValue={(
							field_id: number,
							fieldValue: string
						) => {
							api.forms.fields.update(formData.id, field_id, {
								label: fieldValue,
							});
							fieldDataDispacher({
								type: "setFieldValue",
								fieldId: field_id,
								fieldValue: fieldValue,
							});
						}}
						key={field.id}
						addNewOption={(fieldId: number) => {
							let new_option = {
								id: Number(new Date()),
								label: "",
								selected: false,
							};
							let field_options =
								fieldData[fieldId]?.options || [];
							api.forms.fields.update(formData.id, fieldId, {
								options: [...field_options, new_option],
							});
							fieldDataDispacher({
								type: "addNewOption",
								fieldId: fieldId,
								optionID: new_option.id,
								optionLabel: new_option.label,
							});
						}}
						removeOption={(field_id: number, option_id: number) => {
							api.forms.fields.update(formData.id, field_id, {
								options: field.options?.filter(
									(option) => option.id !== option_id
								),
							});
							fieldDataDispacher({
								type: "removeOption",
								fieldId: field_id,
								optionId: option_id,
							});
						}}
						setOptionValue={(
							fieldId: number,
							optionId: number,
							label: string
						) => {
							api.forms.fields.update(formData.id, fieldId, {
								options: field.options?.map((option) =>
									option.id === optionId
										? { ...option, label: label }
										: option
								),
							});
							fieldDataDispacher({
								type: "setOptionLabel",
								fieldId,
								optionId,
								label,
							});
						}}
					/>
				))}
				<AddField
					addField={() => {
						api.forms.fields
							.create(
								formData.id,
								newFieldData.label,
								newFieldData.type
							)
							.then((response) => {
								fieldDataDispacher({
									type: "addField",
									newFieldData: response,
								});
							});
					}}
					newFieldData={newFieldData}
					setNewFieldDetail={(
						changeType: "label" | "type",
						changeValue: string
					) => {
						newFieldDispacher({
							type: "setNewFieldDetail",
							changeType: changeType,
							changeValue: changeValue,
						});
					}}
				/>
				<div className="p-2"></div>
				<input
					type="button"
					onClick={(e) => {
						(e.target as HTMLInputElement).value = "Saved!";
						setTimeout(() => {
							(e.target as HTMLInputElement).value = "Save";
						}, 1000);
					}}
					value="Save"
					className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<input
					type="button"
					value="Clear"
					onClick={(e) => {
						fieldDataDispacher({ type: "clearAllFields" });
						(e.target as HTMLInputElement).value = "Cleared!";
						setTimeout(() => {
							(e.target as HTMLInputElement).value = "Clear";
						}, 1000);
					}}
					className="cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<Link
					href="/forms"
					className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				>
					Close
				</Link>
			</div>
		</div>
	);
}

export default Form;
