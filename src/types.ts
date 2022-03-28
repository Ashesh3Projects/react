export type QuizAttempt = {
	id: number;
	date: Date;
	answers: FormField[];
};

export type FormInputField = {
	kind: "input";
	id: number;
	label: string;
	type: "text" | "number" | "email" | "password" | "date" | "time";
	value?: string;
};

export type FormTextAreaField = {
	kind: "textarea";
	type: "textarea";
	id: number;
	label: string;
	value?: string;
};

export type Option = {
	id: number;
	label: string;
	selected: boolean;
};

export type OptionsField = {
	kind: "options";
	id: number;
	label: string;
	type: "radio" | "checkbox" | "select" | "multi-select";
	options: Option[];
	value?: string;
};

export type RatingField = {
	kind: "rating";
	type: "rating";
	id: number;
	label: string;
	value?: string;
};

export type FormDetails = {
	id: number;
	title: string;
	fields: FormField[];
	attempts?: QuizAttempt[];
};

export type NewField = {
	label: string;
	type: string;
};

export type FormField =
	| FormInputField
	| FormTextAreaField
	| OptionsField
	| RatingField;
