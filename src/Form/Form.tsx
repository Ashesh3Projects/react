import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { FormDetails, FormField } from "../types";
import Field from "./Field";
import { getFormData, getRandomID, updateFormData } from "./utils";

function Form(props: { formID: number }) {
	const [formData, setFormData] = useState<FormDetails>();
	const [newFieldValue, setNewFieldValue] = useState("");

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
		if (newFieldValue === "" || !formData) return;

		let updatedFormData: FormDetails = { ...formData };
		updatedFormData.fields.push({
			id: getRandomID(),
			label: newFieldValue,
			type: "text",
			value: "",
		});

		setFormData(updatedFormData);
		setNewFieldValue("");
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

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center">
			<input
				type="text"
				defaultValue={formData?.title}
				className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-2 border-gray-200 rounded-lg"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<div className="pb-4"></div>
			<form
				className="px-4 w-full"
				action="{props.action}"
				method="{props.method}"
			>
				{formData?.fields.map((field) => (
					<Field
						field={field}
						removeField={removeField}
						setFieldValue={setFieldValue}
						key={field.id}
					/>
				))}
				<div className="flex gap-2 border-2 border-gray-200 rounded-lg p-2 my-2">
					<input
						type="text"
						value={newFieldValue}
						onChange={(e) => setNewFieldValue(e.target.value)}
						className="border-2 border-gray-200 rounded-lg p-2 w-full"
					/>
					<input
						type="button"
						value="Add Question"
						onClick={addField}
						className="cursor-pointer w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					/>
				</div>

				<div className="p-3"></div>
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
				<div className="p-2"></div>
				<input
					type="button"
					value="Clear"
					onClick={clearAllFields}
					className="cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-2"></div>
				<Link
					href="/forms"
					onClick={() => {
						updateFormData(formData);
					}}
					className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				>
					Close
				</Link>
			</form>
		</div>
	);
}

export default Form;
