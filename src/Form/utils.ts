import { FormDetails } from "../types";

export function getAllForms() {
	return localStorage.getItem("forms")
		? JSON.parse(localStorage.getItem("forms") || "[]")
		: [];
}

export function saveFormsLocalStorage(forms: FormDetails[]) {
	localStorage.setItem("forms", JSON.stringify(forms));
}

export function deleteForm(formid: number) {
	let forms = getAllForms().filter((form: FormDetails) => form.id !== formid);
	saveFormsLocalStorage(forms);
	return forms;
}

export function getFormsLocalStorage() {
	const forms = localStorage.getItem("forms");
	if (forms) {
		return JSON.parse(forms);
	}
	return [];
}

export function getFormData(formState?: number) {
	if (formState && formState !== -1)
		return getFormsLocalStorage().filter(
			(form: FormDetails) => form.id === formState
		)[0];
	else
		return {
			id: -1,
			title: "Untitled Form",
			fields: [],
		};
}
