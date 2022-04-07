import React, { useState } from "react";
import FormListItem from "./ListItem";
import { FormItem } from "../types";
import Footer from "./ListFooter";
import { navigate, useQueryParams } from "raviger";
import Search from "./Search";
import NavBar from "../NavBar";
import { getAllForms, useEffectOnlyOnce } from "./utils";
import * as api from "../api";

function FormList() {
	const [{ search }, setQuery]: [{ search: string }, Function] =
		useQueryParams();

	const [formsList, setFormsList] = useState<FormItem[]>();

	useEffectOnlyOnce(() => {
		(async () => {
			return api.forms.list();
		})()
			.then((allForms) => {
				allForms.results.sort(
					(first: FormItem, second: FormItem) =>
						first["id"] - second["id"]
				);
				if (!search)
					setFormsList(
						allForms.results.filter((form) => form.is_public)
					);
				else
					setFormsList(
						allForms.results.filter((form) => {
							return (
								form.is_public &&
								form.title
									.toLowerCase()
									.includes(search?.toLowerCase() || "")
							);
						})
					);
			})
			.catch((err) => {
				if (err === 403) navigate(`/login`);
			});
	});

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[600px] items-center">
			<NavBar />
			<div className="w-full items-center center text-center">
				<Search search={search} setQuery={setQuery} />
				<h1 className="pb-2 w-full text-center text-xl items-center font-semibold border-b-[1px] border-gray-600 border-dashed">
					Form List
				</h1>
				<div className="py-2"></div>
				<div className="flex flex-col gap-2">
					{formsList?.map((form: FormItem) => (
						<FormListItem
							form={form}
							key={form.id}
							deleteForm={async () => {
								await api.forms.delete(form.id);
								setFormsList(
									formsList.filter((f) => f.id !== form.id)
								);
							}}
						/>
					))}
				</div>
				{formsList?.length === 0 && (
					<h2 className="p-3 font-semibold pb-3">No forms</h2>
				)}
				<div className="pb-4"></div>
				<Footer />
			</div>
		</div>
	);
}

export default FormList;
