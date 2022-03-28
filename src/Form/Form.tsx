import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { FormDetails, FormField, NewField } from "../types";
import AddField from "./AddField";
import Field from "./Fields/Field";
import { getFormData, getRandomID, updateFormData } from "./utils";

function Form(props: { formID: number }) {
	const [formData, setFormData] = useState<FormDetails>();
	const [newFieldData, setNewFieldData] = useState<NewField>({
		label: "",
		type: "text",
	});

	useEffect(() => {
		let newFormData = getFormData(props.formID);
		if (props.formID === -1) navigate(`/forms/${newFormData.id}`);
		setFormData(newFormData);
	}, [props.formID]);

	useEffect(() => {
		setTimeout(() => {
			if (formData) updateFormData(formData);
		}, 1000);
	}, [formData, props.formID]);

	const addField = () => {
		if (newFieldData.label === "" || !formData) return;

		let updatedFormData: FormDetails = { ...formData };

		if (
			newFieldData.type === "text" ||
			newFieldData.type === "number" ||
			newFieldData.type === "email" ||
			newFieldData.type === "password" ||
			newFieldData.type === "date" ||
			newFieldData.type === "time"
		)
			updatedFormData.fields.push({
				id: getRandomID(),
				label: newFieldData.label,
				type: newFieldData.type,
				kind: "input",
				value: "",
			});
		else if (newFieldData.type === "textarea")
			updatedFormData.fields.push({
				id: getRandomID(),
				label: newFieldData.label,
				kind: "textarea",
				type: "textarea",
				value: "",
			});
		else if (
			newFieldData.type === "checkbox" ||
			newFieldData.type === "radio" ||
			newFieldData.type === "select" ||
			newFieldData.type === "multi-select"
		)
			updatedFormData.fields.push({
				id: getRandomID(),
				label: newFieldData.label,
				type: newFieldData.type,
				kind: "options",
				value: "",
				options: [],
			});
		else if (newFieldData.type === "rating")
			updatedFormData.fields.push({
				id: getRandomID(),
				label: newFieldData.label,
				kind: "rating",
				type: "rating",
				value: "",
			});

		setFormData(updatedFormData);
		setNewFieldData({ ...newFieldData, label: "" });
	};

	const removeField = (id: number) => {
		if (!formData) return;

		let updatedFormData = { ...formData };
		updatedFormData.fields = updatedFormData.fields.filter(
			(field: FormField) => field.id !== id
		);
		setFormData(updatedFormData);
	};

	const setFieldValue = (id: number, value: string) => {
		if (!formData) return;

		let updatedFormData = formData.fields.map((field) => {
			if (field.id === id) {
				return { ...field, ...{ label: value, value: "" } };
			}
			return field;
		});
		setFormData({ ...formData, fields: updatedFormData });
	};

	const clearAllFields = () => {
		if (!formData) return;
		setFormData({ ...formData, fields: [] });
	};

	const setTitle = (value: string) => {
		if (!formData) return;

		formData.title = value;
	};

	const setNewFieldDetail = (type: string, value: string) => {
		if (type === "type") {
			setNewFieldData({ ...newFieldData, type: value });
		} else {
			setNewFieldData({ ...newFieldData, label: value });
		}
	};

	const addNewOption = (field_id: number) => {
		if (!formData) return;
		let updatedFormData: FormDetails = { ...formData };
		updatedFormData.fields = updatedFormData.fields.map((field) => {
			if (field.id === field_id && field.kind === "options") {
				return {
					...field,
					...{
						options: [
							...field.options,
							{ id: getRandomID(), label: "", selected: false },
						],
					},
				};
			}
			return field;
		});
		setFormData(updatedFormData);
	};

	const removeOption = (field_id: number, option_id: number) => {
		if (!formData) return;
		let updatedFormData: FormDetails = { ...formData };
		updatedFormData.fields = updatedFormData.fields.map((field) => {
			if (field.id === field_id && field.kind === "options") {
				return {
					...field,
					...{
						options: field.options.filter(
							(option) => option.id !== option_id
						),
					},
				};
			}
			return field;
		});
		setFormData(updatedFormData);
	};

	const setOptionLabel = (
		field_id: number,
		option_id: number,
		value: string
	) => {
		if (!formData) return;
		let updatedFormData: FormDetails = { ...formData };
		updatedFormData.fields = updatedFormData.fields.map((field) => {
			if (field.id === field_id && field.kind === "options") {
				return {
					...field,
					...{
						options: field.options.map((option) => {
							if (option.id === option_id) {
								return { ...option, ...{ label: value } };
							}
							return option;
						}),
					},
				};
			}
			return field;
		});
		setFormData(updatedFormData);
	};

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl items-center">
			<input
				type="text"
				defaultValue={formData?.title}
				className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-2 border-gray-200 rounded-lg"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<div className="pb-4"></div>
			<div className="px-4 w-full">
				{formData?.fields.map((field) => (
					<Field
						field={field}
						removeField={removeField}
						setFieldValue={setFieldValue}
						key={field.id}
						addNewOption={addNewOption}
						removeOption={removeOption}
						setOptionValue={setOptionLabel}
					/>
				))}
				<AddField
					addField={addField}
					newFieldData={newFieldData}
					setNewFieldDetail={setNewFieldDetail}
				/>
				<div className="p-2"></div>
				<input
					type="button"
					onClick={(e) => {
						updateFormData(formData);
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
					onClick={clearAllFields}
					className="cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<Link
					href="/forms"
					onClick={() => {
						updateFormData(formData);
					}}
					className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				>
					Close
				</Link>
			</div>
		</div>
	);
}

export default Form;
