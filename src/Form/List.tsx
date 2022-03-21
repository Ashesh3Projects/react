import React, { useCallback, useEffect, useState } from "react";
import FormListItem from "./ListItem";
import { FormDetails } from "../types";
import { deleteForm, getFormsLocalStorage } from "./utils";
import Footer from "./ListFooter";
import { navigate, useQueryParams } from "raviger";
import Search from "./Search";

function FormList() {
	const [{ search }, setQuery] = useQueryParams();

	const filterForms = (term?: string): FormDetails[] => {
		let allForms = getFormsLocalStorage();
		if (!term) return allForms;
		return allForms.filter((form) => {
			return form.title.toLowerCase().includes(term?.toLowerCase() || "");
		});
	};
	const [formsList, setFormsList] = useState(filterForms(search));

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center">
			<div className="w-full items-center center text-center">
				<Search search={search} setQuery={setQuery} />
				<h1 className="pb-2 w-full text-center text-xl items-center font-semibold border-b-[1px] border-gray-600 border-dashed">
					Form List
				</h1>
				<div className="py-2"></div>
				{formsList.map((form: FormDetails) => (
					<FormListItem
						form={form}
						key={form.id}
						deleteForm={() => {
							setFormsList(deleteForm(form.id));
						}}
					/>
				))}
				<div className="pb-4"></div>
				{formsList.length === 0 && (
					<h2 className="p-3 font-semibold pb-6">No forms</h2>
				)}
				<Footer />
			</div>
		</div>
	);
}

export default FormList;
