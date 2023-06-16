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

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address.
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
        <Form.Control.Feedback type="invalid">
          Please enter a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          pattern="[0-9]*"
          type="tel"
          placeholder="Phone Number"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid phone number.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBirth">
        <Form.Label>Date OF Birth</Form.Label>
        <Form.Control required type="date" placeholder="Birth" />
        <Form.Control.Feedback type="invalid">
          Please enter your birth date.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicGender">
        <Form.Label>Gender</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="0">Male</option>
          <option value="1">Female</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="flex gap-4 justify-end">
        <Button variant="secondary" onClick={handleClose}>
          {closeText}
        </Button>
        <Button className="bg-blue-600" variant="primary" type="submit">
          {submitText}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
