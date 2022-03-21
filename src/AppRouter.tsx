import { useRoutes, Link, useQueryParams } from "raviger";
import Container from "./Container";
import Form from "./Form/Form";
import FormList from "./Form/List";
import Home from "./Home";

const routes = {
	"/": () => <Home />,
	"/forms": () => <FormList />,
	"/forms/:id": ({ id }: { id: string }) => <Form formID={Number(id)} />,
};

export default function AppRouter() {
	return <Container>{useRoutes(routes)}</Container>;
}
