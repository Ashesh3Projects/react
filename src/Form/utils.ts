import { FormDetails } from "../types";

export function getAllForms(): FormDetails[] {
	return localStorage.getItem("forms")
		? JSON.parse(localStorage.getItem("forms") || "[]")
		: [];
}

export function saveFormsLocalStorage(forms: FormDetails[]): void {
	localStorage.setItem("forms", JSON.stringify(forms));
}

export function deleteForm(formid: number): FormDetails[] {
	let forms = getAllForms().filter((form: FormDetails) => form.id !== formid);
	saveFormsLocalStorage(forms);
	return forms;
}

export function getFormsLocalStorage(): FormDetails[] {
	const forms = localStorage.getItem("forms");
	if (forms) {
		return JSON.parse(forms);
	}
	return [];
}

export function getFormData(formID: number): FormDetails {
	if (formID !== -1)
		return getFormsLocalStorage().filter(
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
	let formDetails = {
		id: getRandomID(),
		title: "Untitled Form",
		fields: [],
	};
	saveFormsLocalStorage([...allForms, formDetails]);
	return formDetails;
}
