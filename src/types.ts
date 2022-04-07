export type QuizAttempt = {
	id: number;
	date: Date;
	answers: FormField[];
};

export type NewField = {
	label: string;
	type: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC";
};

export type LoginResponse = {
	token: string;
};

export type FormFieldOption = {
	id: number;
	label: string;
	selected: boolean;
};

export type FormField = {
	id: number;
	label: string;
	kind: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC";
	options?: FormFieldOption[];
	value?: string;
	meta?: {
		description: string;
	};
};

export type FormItem = {
	id: number;
	title: string;
	description: string;
	is_public: boolean;
	created_by: number;
	created_date: string;
	modified_date: string;
};

export type FormsListResult = {
	count: number;
	next: string;
	previous: string;
	results: FormItem[];
};

export type FormsFieldListResult = {
	count: number;
	next: string;
	previous: string;
	results: FormField[];
};

export type Answer = {
	form_field: number;
	value: string;
};

export type FormSubmission = {
	id: number;
	answers: Answer[];
	form: FormItem;
	created_date: string;
};

export type SubmissionListResult = {
	count: number;
	next: string;
	previous: string;
	results: FormSubmission[];
};
