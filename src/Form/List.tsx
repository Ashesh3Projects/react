import React, { useState } from "react";
import Form from "./Form";
import FormListItem from "./ListItem";
import { FormDetails } from "../types";
import { deleteForm, getFormData, getFormsLocalStorage } from "./utils";
import Footer from "./ListFooter";

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

	const [formListState, setFormListState] = useState(getFormsLocalStorage());

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
								<FormListItem
									form={form}
									key={form.id}
									openForm={openForm}
									deleteForm={() => {
										setFormListState(deleteForm(form.id));
										setState("FORMLIST");
									}}
								/>
							))}
							<div className="pb-4"></div>
							{formListState.length === 0 && (
								<h2 className="p-3 font-semibold pb-6">
									No forms
								</h2>
							)}
							<Footer
								closeListCB={props.closeListCB}
								openForm={openForm}
							/>
						</div>
					);
				} else {
					return (
						<Form
							formData={getFormData(formState)}
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
