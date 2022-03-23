import { Link, navigate, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import { FormDetails, FormField, QuizAttempt } from "../../types";
import {
	getAllForms,
	getFormData,
	getRandomID,
	updateFormData,
	useEffectOnlyOnce,
} from "../utils";
import QuizField from "./QuizField";
import QuizFooter from "./QuizFooterNav";
import QuizProgress from "./QuizProgressBar";

function Quiz(props: { formID: number }) {
	const [formData, setFormData] = useState<FormDetails>();

	const [currentQuestion, setCurrentQuestion] = useState<FormField>();

	const [{ qIndex }, setQIndex]: [{ qIndex: number }, Function] =
		useQueryParams();

	const [quizProgress, setQuizProgress] = useState<FormField[]>();

	useEffectOnlyOnce(() => {
		if (!qIndex) setQIndex({ qIndex: 0 });
		let newFormData = getFormData(props.formID);
		newFormData.fields = newFormData.fields.map((field) => ({
			...field,
			value: "",
		}));
		setFormData(newFormData);
		setQuizProgress(newFormData.fields);
	});

	useEffect(() => {
		if (qIndex) {
			setCurrentQuestion(formData?.fields[Number(qIndex)]);
		}
	}, [formData, qIndex]);

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

	const submitQuiz = () => {
		let all_forms = getAllForms();
		let form = all_forms.find((frm) => frm.id === props.formID);
		if (form) {
			let attempts = form?.attempts || [];
			let newAttempt: QuizAttempt = {
				id: getRandomID(),
				answers: quizProgress || [],
				date: new Date(),
			};
			attempts.push(newAttempt);
			form.attempts = attempts;
		}
		updateFormData(form);
		navigate(`/quiz/${props.formID}/results`);
	};

	return (
		<>
			<div className="p-6 mx-auto bg-white shadow-lg rounded-xl min-w-[500px] items-center">
				<NavBar />
				<h1 className="pb-2 w-full text-center text-xl items-center font-semibold">
					{formData?.title} Quiz
				</h1>
				<QuizProgress
					qIndex={Number(qIndex)}
					totalFields={formData?.fields.length || 1}
				/>
				<div className="py-2"></div>
				{currentQuestion && (
					<div className="w-full items-center center">
						<h2 className="px-3 font-semibold pb-6">
							Question {Number(qIndex) + 1} of{" "}
							{formData?.fields.length}
						</h2>
						<QuizField
							fieldLength={formData?.fields.length || 1}
							formID={props.formID}
							qIndex={Number(qIndex)}
							field={currentQuestion}
							setFieldValue={setFieldValue}
							key={currentQuestion.id}
							submitQuiz={submitQuiz}
						/>
						<div className="py-4"></div>
						<QuizFooter
							currentQuestion={currentQuestion}
							formData={formData}
							qIndex={qIndex}
							setFieldValue={setFieldValue}
							submitQuiz={submitQuiz}
							formID={props.formID}
						/>
					</div>
				)}
				{!currentQuestion && (
					<>
						<div className=" flex justify-center w-full items-center center py-6">
							No Questions
						</div>
						<Link href={`/forms`} className="w-full">
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
