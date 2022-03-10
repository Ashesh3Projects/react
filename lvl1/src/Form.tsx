interface FormFields {
  id: number;
  label: string;
  type: string;
}

function Form(props: {
  action: string;
  method: string;
  formFields: FormFields[];
}) {
  return (
    <form action="{props.action}" method="{props.method}">
      {props.formFields.map((field) => (
        <div key={field.id} className="pb-2">
          <label htmlFor={field.label} className="pb-2 font-semibold text-sm">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.label}
            className="border-2 border-gray-200 rounded-lg p-2 w-full"
          />
        </div>
      ))}
      <div className="p-3"></div>
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      />
    </form>
  );
}

export default Form;
