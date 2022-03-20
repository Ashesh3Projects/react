import React, { useCallback, useEffect, useState } from "react";
import { FormDetails } from "../types";
import Field from "./Field";
import { getAllForms } from "./utils";

function Form(props: {
	action: string;
	method: string;
	formData: FormDetails;
	closebBtnClickCB: () => void;
}) {
	const [state, setFormState] = useState(props.formData.fields);
	const [fieldState, setFieldState] = useState("");

	const addField = () => {
		if (fieldState === "") return;
		setFormState([
			...state,
			{
				id: Number(new Date()),
				label: fieldState,
				type: "text",
				value: "",
			},
		]);
		setFieldState("");
	};

	const removeField = (id: number) => {
		setFormState(state.filter((field) => field.id !== id));
	};

	const setFieldValue = (id: number, value: string) => {
		let updatedFormData = state.map((field) => {
			if (field.id === id) {
				return { ...field, value };
			}
			return field;
		});
		setFormState(updatedFormData);
	};

	const clearAllFields = () => {
		let blankedFormData = state.map((field) => {
			return { ...field, value: "" };
		});
		setFormState(blankedFormData);
	};

	const createForm = useCallback(() => {
		let allForms = getAllForms();
		props.formData.id = Number(new Date());
		localStorage.setItem(
			"forms",
			JSON.stringify([...allForms, props.formData])
		);
	}, [props.formData]);

	const setTitle = (value: string) => {
		props.formData.title = value;
	};

	useEffect(() => {
		if (props.formData.id === -1) {
			createForm();
		}
		setTimeout(() => {
			let allForms = getAllForms().filter(
				(form: FormDetails) => form.id !== props.formData.id
			);
			props.formData.fields = state;
			localStorage.setItem(
				"forms",
				JSON.stringify([...allForms, props.formData])
			);
		}, 1000);
	}, [state, props.formData, createForm]);

	return (
		<React.Fragment>
			<input
				type="text"
				defaultValue={props.formData.title}
				className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-2 border-gray-200 rounded-lg"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<div className="pb-4"></div>
			<form
				className="px-4 w-full "
				action="{props.action}"
				method="{props.method}"
			>
				{state.map((field) => (
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
						value={fieldState}
						onChange={(e) => setFieldState(e.target.value)}
						className="border-2 border-gray-200 rounded-lg p-2 w-full"
					/>
					<input
						type="button"
						value="Add Field"
						onClick={addField}
						className="cursor-pointer w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
					/>
				</div>

				<div className="p-3"></div>
				<input
					type="submit"
					value="Submit"
					className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<input
					type="button"
					value="Close"
					onClick={props.closebBtnClickCB}
					className="cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<input
					type="button"
					value="Clear"
					onClick={clearAllFields}
					className="cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				/>
			</form>
		</React.Fragment>
	);
}

export default Form;
