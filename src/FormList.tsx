import React, { useState } from "react";
import Form from "./Form";
import { FormDetails } from "./types";

function FormList(props: { closeListCB: () => void }) {
	const [formState, setFormState] = useState(-1);

	const [state, setState] = useState("FORMLIST");

	const openFormList = () => {
		setFormListState(getFormsLocalStorage());
		setState("FORMLIST");
	};

	const openForm = (formid: number) => {
		setFormState(formid);
		setState("FORM");
	};

	const getAllForms = () => {
		return localStorage.getItem("forms")
			? JSON.parse(localStorage.getItem("forms") || "[]")
			: [];
	};

	const deleteForm = (formid: number) => {
		let forms = getAllForms().filter(
			(form: FormDetails) => form.id !== formid
		);
		saveFormsLocalStorage(forms);
		setState("FORMLIST");
	};

	const getFormsLocalStorage = () => {
		const forms = localStorage.getItem("forms");
		if (forms) {
			return JSON.parse(forms);
		}
		return [];
	};

	const [formListState, setFormListState] = useState(getFormsLocalStorage());

	const saveFormsLocalStorage = (forms: FormDetails[]) => {
		localStorage.setItem("forms", JSON.stringify(forms));
		setFormListState(forms);
	};

	return (
		<div className="flex flex-col gap-2 center min-w-[500px] items-center">
			{(() => {
				if (state === "FORMLIST") {
					return (
						<div className="w-full items-center center text-center">
							<h1 className="pb-2 w-full text-center text-xl items-center font-semibold border-b-[1px] border-gray-600 border-dashed">
								Form List
							</h1>
							<div className="py-2"></div>
							{formListState.map((form: FormDetails) => (
								<div
									className="flex flex-row py-3 px-2 items-center justify-center gap-2"
									key={form.id}
								>
									<h2 className="pb-2 w-full text-center text-xl items-center ">
										{form.title}
									</h2>
									<input
										type="button"
										value="Open"
										onClick={() => {
											openForm(form.id);
										}}
										className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									/>
									<input
										type="button"
										value="Delete"
										onClick={() => {
											deleteForm(form.id);
										}}
										className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
									/>
								</div>
							))}
							{formListState.length === 0 ? (
								<div className="pb-4">
									<h2 className="p-3 font-semibold pb-6">
										No forms
									</h2>
								</div>
							) : (
								<div className="pb-4"></div>
							)}
							<input
								type="button"
								value="Add Form"
								onClick={() => {
									openForm(-1);
								}}
								className="cursor-pointer flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
							/>
							<div className="pb-4"></div>
							<input
								type="button"
								value="Back"
								onClick={() => {
									props.closeListCB();
								}}
								className="cursor-pointer flex bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
							/>
						</div>
					);
				} else {
					return (
						<Form
							formData={
								formState && formState !== -1
									? getFormsLocalStorage().filter(
											(form: FormDetails) =>
												form.id === formState
									  )[0]
									: {
											id: -1,
											title: "Untitled Form",
											fields: [],
									  }
							}
							action="#"
							method="POST"
							closebBtnClickCB={openFormList}
						/>
					);
				}
			})()}
		</div>
	);
}

export default FormList;
