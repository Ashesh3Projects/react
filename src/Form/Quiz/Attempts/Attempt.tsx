import { Link, navigate } from "raviger";
import React, { useState } from "react";
import { FormDetails, QuizAttempt } from "../../../types";
import { getFormattedDate, getFormData, useEffectOnlyOnce } from "../../utils";
import AttemptField from "./AttemptField";

function Attempt(props: { formID: number; attemptID: number }) {
	const [attemptData, setAttemptData] = useState<QuizAttempt>();
	const [formDetails, setFormDetails] = useState<FormDetails>();

	useEffectOnlyOnce(() => {
		let newFormData = getFormData(props.formID);
		setFormDetails(newFormData);
		if (!newFormData.attempts) return navigate(`/forms/${props.formID}`);
		let attempt = newFormData.attempts.find(
			(atmpt) => atmpt.id === props.attemptID
		);
		if (!attempt) return navigate(`/forms/${newFormData.id}`);
		setAttemptData(attempt);
	});

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center">
			<h1 className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-gray-200 rounded-lg">
				{formDetails?.title} Attempt
			</h1>
			<div className="flex flex-row justify-between w-100 items-center p-6">
				<span className="text-sm text-gray-500">
					ID: {props.attemptID}
				</span>
				<span>
					{getFormattedDate(new Date(attemptData?.date || ""))}
				</span>
			</div>
			<div className="pb-4"></div>
			<form
				className="px-4 w-full"
				action="{props.action}"
				method="{props.method}"
			>
				{attemptData?.answers.map((field) => (
					<AttemptField field={field} key={field.id} />
				))}

				<div className="p-3"></div>

				<div className="p-2"></div>
				<Link
					href={`/quiz/${props.formID}/results`}
					className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				>
					Close
				</Link>
			</form>
		</div>
	);
}

export default Attempt;
