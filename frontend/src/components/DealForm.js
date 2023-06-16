import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormComponent = ({ handleClose, submitText, closeText, onSubmit }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      onSubmit(e);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required placeholder="Enter your name" />
        <Form.Control.Feedback type="invalid">
          Please enter your name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control required as="textarea" placeholder="Enter Description" />
        <Form.Control.Feedback type="invalid">
          Please enter a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control required placeholder="Enter Amount" />
        <Form.Control.Feedback type="invalid">
          Please enter the amount.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCurrency">
        <Form.Label>Currency</Form.Label>
        <Form.Control required placeholder="Enter Currency" />
        <Form.Control.Feedback type="invalid">
          Please enter the currency.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="flex gap-4 justify-end">
        <Button variant="secondary" onClick={handleClose}>
          {closeText}
        </Button>
        <Button type="submit">{submitText}</Button>
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
