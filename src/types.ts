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
}
