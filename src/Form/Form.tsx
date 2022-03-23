import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { FormDetails, FormField, NewField } from "../types";
import AddField from "./AddField";
import Field from "./Field";
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

		updatedFormData.fields.push({
			id: getRandomID(),
			label: newFieldData.label,
			type: newFieldData.type,
			value: "",
		});

		setFormData(updatedFormData);
		setNewFieldData({ label: "", type: "text" });
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

	const setFieldType = (id: number, type: string) => {
		if (!formData) return;

		let updatedFormData = formData.fields.map((field) => {
			if (field.id === id) {
				return { ...field, ...{ type: type, value: "" } };
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
			<div className="px-4 w-full">
				{formData?.fields.map((field) => (
					<Field
						field={field}
						removeField={removeField}
						setFieldValue={setFieldValue}
						setFieldType={setFieldType}
						key={field.id}
					/>
				))}
				<AddField
					addField={addField}
					newFieldData={newFieldData}
					setNewFieldDetail={setNewFieldDetail}
				/>
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
			</div>
		</div>
	);
}

export default Form;
