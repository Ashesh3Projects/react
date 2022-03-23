import React, { useEffect, useState } from "react";
import { FormDetails, QuizAttempt } from "../../../types";
import NavBar from "../../../NavBar";
import { getAllForms, getFormData, updateFormData } from "../../utils";
import AttemptItem from "./AttemptItem";
import AttemptFooter from "./AttemptFooter";
import { navigate } from "raviger";

function AttemptList(props: { formID: number }) {
	const [formData, setFormData] = useState<FormDetails>();

	useEffect(() => {
		let newFormData = getFormData(props.formID);
		setFormData(newFormData);
	}, [props.formID]);

	const deleteAttempt = (id: number) => {
		let all_forms = getAllForms();
		let form = all_forms.find((frm) => frm.id === props.formID);
		if (form) {
			let attempts = form?.attempts || [];
			form.attempts = attempts.filter((attempt) => attempt.id !== id);
		}
		updateFormData(form);
		setFormData(form);
		navigate(`/quiz/${props.formID}/results`);
	};

	return (
		<div className="px-6 py-4 mx-auto bg-white shadow-lg rounded-xl min-w-[600px] items-center">
			<NavBar />
			<div className="w-full items-center center text-center">
				<h1 className="pb-2 w-full text-center text-xl items-center border-b-[1px] border-gray-600 border-dashed">
					Attempts for <strong>{formData?.title}</strong>
				</h1>
				<div className="py-2"></div>
				{(formData?.attempts || []).map((attempt: QuizAttempt) => (
					<AttemptItem
						key={attempt.id}
						formID={props.formID}
						attemptID={attempt.id}
						attemptDate={attempt.date}
						deleteForm={deleteAttempt}
					/>
				))}
				<div className="pb-4"></div>
				{(formData?.attempts || []).length === 0 && (
					<h2 className="p-3 font-semibold pb-6">No Attempts</h2>
				)}
				<AttemptFooter />
			</div>
		</div>
	);
}

export default AttemptList;
