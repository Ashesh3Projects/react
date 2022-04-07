import { Link, navigate } from "raviger";
import React, { useState } from "react";
import { FormField, FormSubmission } from "../../../types";
import { getFormattedDate, useEffectOnlyOnce } from "../../utils";
import AttemptField from "./AttemptField";
import * as api from "../../../api";

function Attempt(props: { formID: number; attemptID: number }) {
	const [attemptData, setAttemptData] = useState<FormSubmission>();
	const [formFields, setFormFields] = useState<FormField[]>();

	useEffectOnlyOnce(() => {
		(async () => {
			return api.forms.submissions.get(props.formID, props.attemptID);
		})().then((attemptDetails) => {
			if (!attemptDetails) return navigate(`/forms/${props.formID}`);
			api.forms.fields.get(props.formID).then((fetchedFieldData) => {
				fetchedFieldData.results.sort((a, b) => a.id - b.id);
				setFormFields(fetchedFieldData.results);
				setAttemptData(attemptDetails);
			});
		});
	});

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center">
			<h1 className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-gray-200 rounded-lg">
				{attemptData?.form.title} Attempt
			</h1>
			<style>
				input:checked + div {"{"}
				border-color: rgb(63 131 248)
				{"}"}
				input:checked + div svg {"{"}
				display: block;
				{"}"}
				svg.star-svg{"{"}
				display: inline;
				{"}"}
			</style>
			<div className="flex flex-row justify-between w-100 items-center p-6">
				<span className="text-sm text-gray-500">
					ID: {props.attemptID}
				</span>
				<span>{getFormattedDate(attemptData?.created_date || "")}</span>
			</div>
			<div className="pb-4"></div>
			<form
				className="px-4 w-full"
				action="{props.action}"
				method="{props.method}"
			>
				{attemptData?.answers.map((answer) => (
					<AttemptField
						field={
							formFields?.filter(
								(field) => field.id === answer.form_field
							)[0]
						}
						answer={answer}
						key={answer.form_field}
					/>
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
