import React, { Suspense } from "react";
import { useRoutes } from "raviger";
import { hasToken } from "./api";
const About = React.lazy(() => import("./About"));
const Container = React.lazy(() => import("./Container"));
const Form = React.lazy(() => import("./Form/Form"));
const FormList = React.lazy(() => import("./Form/List"));
const Attempt = React.lazy(() => import("./Form/Quiz/Attempts/Attempt"));
const AttemptList = React.lazy(
	() => import("./Form/Quiz/Attempts/AttemptsList")
);
const Quiz = React.lazy(() => import("./Form/Quiz/Quiz"));
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const NotFound = React.lazy(() => import("./NotFound"));

const publicRoutes = {
	"/": () => <Home />,
	"/login": () => <Login />,
	"/logout": () => {
		localStorage.removeItem("token");
		window.location.href = "/";
		return <Home />;
	},
	"/about": () => <About />,
};

const authRoutes = {
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
	const routes = hasToken()
		? { ...publicRoutes, ...authRoutes }
		: publicRoutes;
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Container>{useRoutes(routes) || <NotFound></NotFound>}</Container>
		</Suspense>
	);
}
