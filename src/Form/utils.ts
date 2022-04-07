import { EffectCallback, useEffect } from "react";
import { FormItem } from "../types";
import * as api from "../api";

export function saveFormsLocalStorage(forms: FormItem[]): void {
	localStorage.setItem("forms", JSON.stringify(forms));
}

export async function getAllForms(): Promise<FormItem[]> {
	const forms = await api.forms.list();
	if (forms) {
		return forms.results.sort(
			(first: FormItem, second: FormItem) => first["id"] - second["id"]
		);
	}
	return [];
}

export function getQuizAttempts(formID?: number): FormItem[] {
	let allQuizAttempts = localStorage.getItem("quizAttempts");
	if (!allQuizAttempts) return [];
	let attempts = JSON.parse(allQuizAttempts);
	if (!formID) return attempts;
	return attempts.filter((attempt: FormItem) => attempt.id === formID);
}

export function getFormattedDate(date?: string): string {
	if (!date || date === "") return "";
	let dateObj = new Date(date);
	return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
}

export function useEffectOnlyOnce(func: EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}
