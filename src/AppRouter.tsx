import { useRoutes } from "raviger";
import About from "./About";
import Container from "./Container";
import Form from "./Form/Form";
import FormList from "./Form/List";
import Attempt from "./Form/Quiz/Attempts/Attempt";
import AttemptList from "./Form/Quiz/Attempts/AttemptsList";
import Quiz from "./Form/Quiz/Quiz";
import Home from "./Home";

const routes = {
	"/": () => <Home />,
	"/about": () => <About />,
	"/forms": () => <FormList />,
	"/forms/:id": ({ id }: { id: string }) => <Form formID={Number(id)} />,
	"/quiz/:id": ({ id }: { id: string }) => <Quiz formID={Number(id)} />,
	"/quiz/:id/results": ({ id }: { id: string }) => (
		<AttemptList formID={Number(id)} />
	),
	"/quiz/:id/results/:resultID": ({
		id,
		resultID,
	}: {
		id: string;
		resultID: string;
	}) => <Attempt formID={Number(id)} attemptID={Number(resultID)} />,
};

export default function AppRouter() {
	return <Container>{useRoutes(routes)}</Container>;
}
