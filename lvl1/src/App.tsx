import React from "react";
import Header from "./Header";
import Container from "./Container";
import Form from "./Form";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
];

function App() {
  return (
    <Container>
      <div className="p-6 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to Milestone 1 of #react-typescript with #tailwindcss" />
        <Form formFields={formFields} action="#" method="POST" />
      </div>
    </Container>
  );
}

export default App;
