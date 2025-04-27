import { Formik, Form, Field, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import React from 'react';

type SearchBarProps = {
onSubmit: (topic:string) => void
}

type FormValues = {
  topic: string;
};
  
  
export default function SearchBar({ onSubmit }:SearchBarProps) {
  const handleSubmit = (values:FormValues, actions: any) => {
    if (!values.topic.trim()) {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(values.topic);
    actions.resetForm();
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        initialValues={{
          topic: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field
              type="text"
              name="topic"
              placeholder="Search images and photos"
            />
          </div>
          <button className="searchBtn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
}
