import { EffectCallback, useEffect } from "react";
import { FormDetails } from "../types";

export function saveFormsLocalStorage(forms: FormDetails[]): void {
	localStorage.setItem("forms", JSON.stringify(forms));
}

export function deleteForm(formid: number): FormDetails[] {
	let forms = getAllForms().filter((form: FormDetails) => form.id !== formid);
	saveFormsLocalStorage(forms);
	return forms;
}

export function getAllForms(): FormDetails[] {
	const forms = localStorage.getItem("forms");
	if (forms) {
		return JSON.parse(forms).sort(
			(first: FormDetails, second: FormDetails) =>
				first["id"] - second["id"]
		);
	}
	return [];
}

export function getFormData(formID: number): FormDetails {
	if (formID !== -1)
		return getAllForms().filter(
			(form: FormDetails) => form.id === formID
		)[0];
	else return createForm();
}

export function updateFormData(formData?: FormDetails): void {
	if (!formData) return;
	let allForms = getAllForms().filter(
		(form: FormDetails) => form.id !== formData.id
	);
	saveFormsLocalStorage([...allForms, formData]);
}
export function getRandomID(): number {
	return Number(new Date()) + Math.floor(Math.random() * 100000);
}
export function createForm(): FormDetails {
	let allForms = getAllForms();
	let formDetails: FormDetails = {
		id: getRandomID(),
		title: "Untitled Form",
		fields: [
			{
				id: getRandomID(),
				label: "Name",
				kind: "input",
				type: "text",
				value: "",
			},
			{
				id: getRandomID(),
				label: "Phone",
				kind: "input",
				type: "number",
				value: "",
			},
			{
				id: getRandomID(),
				label: "Gender",
				kind: "options",
				type: "radio",
				value: "",
				options: [
					{
						id: getRandomID(),
						label: "Male",
						selected: false,
					},
					{
						id: getRandomID(),
						label: "Female",
						selected: false,
					},
					{
						id: getRandomID(),
						label: "Other",
						selected: false,
					},
				],
			},
			{
				id: getRandomID(),
				label: "Rate our Form",
				kind: "rating",
				type: "rating",
			},
		],
	};
	saveFormsLocalStorage([...allForms, formDetails]);
	return formDetails;
}

export function getQuizAttempts(formID?: number): FormDetails[] {
	let allQuizAttempts = localStorage.getItem("quizAttempts");
	if (!allQuizAttempts) return [];
	let attempts = JSON.parse(allQuizAttempts);
	if (!formID) return attempts;
	return attempts.filter((attempt: FormDetails) => attempt.id === formID);
}

export function saveQuizAttempt(formID: number, formData: FormDetails): void {
	let allQuizAttempts = getQuizAttempts();
	allQuizAttempts.push(formData);
	localStorage.setItem("quizAttempts", JSON.stringify(allQuizAttempts));
}

export function getFormattedDate(date: Date) {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

export function useEffectOnlyOnce(func: EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}
