import { Link, navigate, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import { FormItem, FormField, Answer } from "../../types";
import QuizField from "./QuizField";
import QuizFooterNav from "./QuizFooterNav";
import QuizProgress from "./QuizProgressBar";
import * as api from "../../api";
import { useEffectOnlyOnce } from "../utils";

function Quiz(props: { formID: number }) {
	const [formData, setFormData] = useState<FormItem>();

	const [currentQuestion, setCurrentQuestion] = useState<FormField>();

	const [{ qIndex }, setQIndex]: [{ qIndex: number }, Function] =
		useQueryParams();

	const [quizProgress, setQuizProgress] = useState<FormField[]>();

	useEffectOnlyOnce(() => {
		if (!qIndex) setQIndex({ qIndex: 0 });
		(async () => {
			return api.forms.get(props.formID);
		})()
			.then((formDetails) => {
				api.forms.fields
					.get(formDetails.id)
					.then((fetchedFieldData) => {
						setFormData(formDetails);
						fetchedFieldData.results.sort((a, b) => a.id - b.id);
						let fields = fetchedFieldData.results.map(
							(field: FormField) => {
								return { ...field, value: "" };
							}
						);
						setQuizProgress(fields);
					});
			})
			.catch((err) => {
				if (err === 403) navigate(`/login`);
			});
	});

	useEffect(() => {
		if (qIndex && quizProgress) {
			setCurrentQuestion(quizProgress[Number(qIndex)]);
		}
	}, [quizProgress, qIndex]);

	const setFieldValue = (fieldID: number, value: string) => {
		if (currentQuestion && currentQuestion.id)
			setCurrentQuestion({ ...currentQuestion, value: value });
		if (quizProgress) {
			let updatedQuizData = quizProgress.map((field) => {
				if (field.id === fieldID) {
					return { ...field, value };
				}
				return field;
			});
			setQuizProgress(updatedQuizData);
		}
	};
	const setFieldValueOption = (
		fieldID: number,
		optionID: number,
		selected: boolean
	) => {
		if (
			currentQuestion &&
			currentQuestion.id &&
			(currentQuestion.kind === "RADIO" ||
				currentQuestion.kind === "DROPDOWN")
		)
			setCurrentQuestion({
				...currentQuestion,
				options: currentQuestion.options?.map((option) => {
					if (option.id === optionID) {
						return { ...option, selected: selected };
					}
					return option;
				}),
			});
		if (quizProgress) {
			let updatedQuizData = quizProgress.map((field) => {
				if (
					field.id === fieldID &&
					(field.kind === "RADIO" || field.kind === "DROPDOWN")
				) {
					return {
						...field,
						options: field.options?.map((option) => {
							if (option.id === optionID) {
								return { ...option, selected: selected };
							}
							return option;
						}),
					};
				}
				return field;
			});
			setQuizProgress(updatedQuizData);
		}
	};

	const submitQuiz = () => {
		if (!formData || !quizProgress) return;

		let answers: Answer[] = [];
		quizProgress.forEach((field) => {
			answers.push({
				form_field: field.id,
				value: field.value || "-",
			});
		});

		api.forms.submissions
			.create(props.formID, {
				answers: answers,
				form: formData,
			})
			.then(() => {
				navigate(`/quiz/${props.formID}/results`);
			});
	};

	return (
		<>
			<style>
				input:checked + div {"{"}
				border-color: rgb(63 131 248)
				{"}"}
				input:checked + div svg {"{"}
				display: block;
				{"}"}
				svg.star-svg{"{"}
				display: inline;
				{"}"}
			</style>
			<div
				className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center"
				tabIndex={-1}
				aria-label="Quiz Section"
			>
				<NavBar />
				<h1
					className="pb-2 w-full text-center text-xl items-center font-semibold"
					tabIndex={0}
				>
					{formData?.title} Quiz
				</h1>
				{quizProgress && (
					<QuizProgress
						qIndex={Number(qIndex)}
						totalFields={quizProgress.length || 1}
					/>
				)}
				<div className="py-2"></div>
				{currentQuestion && quizProgress && (
					<div className="w-full items-center center">
						<h2 className="px-3 font-semibold pb-6" tabIndex={0}>
							Question {Number(qIndex) + 1} of{" "}
							{quizProgress.length}
						</h2>
						<QuizField
							fieldLength={quizProgress.length || 1}
							formID={props.formID}
							qIndex={Number(qIndex)}
							field={currentQuestion}
							quizProgress={quizProgress}
							setFieldValue={setFieldValue}
							key={currentQuestion.id}
							submitQuiz={submitQuiz}
							setFieldValueOption={setFieldValueOption}
						/>
						<div className="pb-4"></div>
						<QuizFooterNav
							currentQuestion={currentQuestion}
							formData={formData}
							fieldData={quizProgress}
							qIndex={qIndex}
							setFieldValue={setFieldValue}
							submitQuiz={submitQuiz}
							formID={props.formID}
						/>
					</div>
				)}
				{!currentQuestion && (
					<>
						<div
							className=" flex justify-center w-full items-center center py-6"
							aria-label="No Questions"
							tabIndex={0}
						>
							No Questions
						</div>
						<Link
							href={`/forms`}
							className="w-full"
							aria-label="Back Button"
							tabIndex={0}
						>
							<button className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg">
								Back
							</button>
						</Link>
					</>
				)}
			</div>
		</>
	);
}

export default Quiz;
