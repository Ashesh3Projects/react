import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import AttemptItem from "./AttemptItem";
import AttemptFooter from "./AttemptFooter";
import { FormItem, FormSubmission } from "../../../types";
import * as api from "../../../api";
import { navigate } from "raviger";

function AttemptList(props: { formID: number }) {
	const [attemptsData, setAttemptsData] = useState<FormSubmission[]>();
	const [formData, setFormData] = useState<FormItem>();

	useEffect(() => {
		(async () => {
			return api.forms.submissions.list(props.formID);
		})().then((submissionsDetail) => {
			setAttemptsData(submissionsDetail.results);
			api.forms
				.get(props.formID)
				.then((formDetail) => {
					setFormData(formDetail);
				})
				.catch((err) => {
					if (err === 403) navigate(`/login`);
				});
		});
	}, [props.formID]);

	return (
		<div className="px-6 py-4 mx-auto bg-white shadow-lg rounded-xl min-w-[600px] items-center">
			<NavBar />
			<div className="w-full items-center center text-center">
				<h1 className="pb-2 w-full text-center text-xl items-center border-b-[1px] border-gray-600 border-dashed">
					Attempts for <strong>{formData?.title}</strong>
				</h1>
				<div className="py-2"></div>
				{(attemptsData || []).map((attempt: FormSubmission) => (
					<AttemptItem
						key={attempt.id}
						formID={props.formID}
						attemptID={attempt.id}
						attemptDate={attempt.created_date}
					/>
				))}
				{(attemptsData || []).length === 0 && (
					<h2 className="p-2 font-semibold">No Attempts</h2>
				)}
				<div className="pb-2"></div>
				<AttemptFooter />
			</div>
		</div>
	);
}

export default AttemptList;
