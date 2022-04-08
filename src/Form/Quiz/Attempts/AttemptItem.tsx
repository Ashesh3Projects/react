import { Link } from "raviger";
import React from "react";
import { getFormattedDate } from "../../utils";

function AttemptItem(props: {
	formID: number;
	attemptID: number;
	attemptDate: string;
}) {
	return (
		<li
			className="flex flex-row py-3 px-2 items-center justify-center gap-2"
			key={props.attemptID}
			tabIndex={0}
			aria-label="Attempt Item"
		>
			<div className="flex w-full justify-between rounded-lg p-2 border-4 gap-2 px-8">
				<div className="flex flex-col" tabIndex={0}>
					<span className="text-sm text-gray-500">
						ID: {props.attemptID}
					</span>
					<span>{getFormattedDate(props.attemptDate)}</span>
				</div>
				<div className="flex gap-2 text-center">
					<Link
						title="View Attempt"
						aria-label="View Attempt"
						href={`/quiz/${props.formID}/results/${props.attemptID}`}
						className="flex justify-center items-center cursor-pointer bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
					>
						&#9872;
					</Link>
				</div>
			</div>
		</li>
	);
}

export default AttemptItem;
