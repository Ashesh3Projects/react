export interface QuizAttempt {
	id: number;
	date: Date;
	answers: FormField[];
}
export interface FormField {
	id: number;
	label: string;
	type: string;
	value?: string;
}

export interface FormDetails {
	id: number;
	title: string;
	fields: FormField[];
	attempts?: QuizAttempt[];
}
