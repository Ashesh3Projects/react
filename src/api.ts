import {
	LoginResponse,
	FormFieldOption,
	FormsListResult,
	FormItem,
	FormsFieldListResult,
	FormField,
	SubmissionListResult,
	FormSubmission,
	Answer,
} from "./types";

export const BASE_URL: string = "https://tsapi.coronasafe.live/api";

export function hasToken(): boolean {
	return localStorage.getItem("token") != null;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request(
	method: HttpMethod,
	endpoint: string,
	params?: any
): Promise<any> {
	return new Promise(async (resolve, reject) => {
		if (!hasToken()) {
			return Promise.reject("No token");
		}
		let url = BASE_URL + endpoint;
		if (method === "GET" && params) {
			url += "?";
			for (let key in params) {
				if (params[key] !== undefined)
					url += key + "=" + params[key] + "&";
			}
			url = url.substring(0, url.length - 1);
		}
		try {
			let response = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: hasToken()
						? "Token " + localStorage.getItem("token")
						: "",
				},
				...(method === "POST" || method === "PUT" || method === "PATCH"
					? { body: JSON.stringify(params) }
					: {}),
			});

			let response_data =
				method !== "DELETE" ? await response.json() : {};

			if (response.status === 403) {
				localStorage.removeItem("token");
				return reject(403);
			}

			if (!response.ok) return reject(response_data);
			return resolve(response_data);
		} catch (e) {
			return reject(e);
		}
	});
}

export const auth = {
	login: async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		let url = BASE_URL + "/auth-token/";
		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});
			if (!response.ok) return Promise.reject(await response.json());

			let res = await response.json();
			return Promise.resolve(res);
		} catch (e) {
			return Promise.reject(e);
		}
	},
};

const fields = {
	get: async (
		form_id: number,
		limit?: number,
		offset?: number
	): Promise<FormsFieldListResult> => {
		return request("GET", `/forms/${form_id}/fields/`, { limit, offset });
	},
	create: async (
		form_id: number,
		label: string,
		kind: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC"
	): Promise<FormField> => {
		return request("POST", `/forms/${form_id}/fields/`, {
			label,
			kind,
		});
	},
	update: async (
		form_id: number,
		field_id: number,
		data: {
			label?: string;
			kind?: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC";
			options?: FormFieldOption[];
		}
	): Promise<FormField> => {
		return request("PATCH", `/forms/${form_id}/fields/${field_id}/`, data);
	},
	delete: async (form_id: number, field_id: number): Promise<null> => {
		return request("DELETE", `/forms/${form_id}/fields/${field_id}/`);
	},
};

export const submission = {
	list: async (
		form_id: number,
		limit?: number,
		offset?: number
	): Promise<SubmissionListResult> => {
		return request("GET", `/forms/${form_id}/submission/`, {
			limit,
			offset,
		});
	},
	get: async (
		form_id: number,
		submission_id: number
	): Promise<FormSubmission> => {
		return request("GET", `/forms/${form_id}/submission/${submission_id}/`);
	},
	create: async (
		form_id: number,
		data: { answers: Answer[]; form: FormItem }
	): Promise<FormSubmission> => {
		return request("POST", `/forms/${form_id}/submission/`, data);
	},
};

export const forms = {
	fields: fields,
	list: async (limit?: number, offset?: number): Promise<FormsListResult> => {
		return request("GET", "/forms/", { limit, offset });
	},
	create: async (data: {
		title: string;
		description: string;
		is_public: boolean;
	}): Promise<FormItem> => {
		return request("POST", "/forms/", data);
	},
	get: async (id: number): Promise<FormItem> => {
		return request("GET", `/forms/${id}/`);
	},
	update: async (
		id: number,
		data: {
			title?: string;
			description?: string;
			is_public?: boolean;
		}
	): Promise<FormItem> => {
		return request("PATCH", `/forms/${id}/`, data);
	},
	delete: async (id: number): Promise<FormItem> => {
		return forms.update(id, { is_public: false });
	},
	submissions: submission,
};
