import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { signUp } from "../../api/user-service";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // handle change
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
    setError({ ...error, isError: false });
  };

  //reset function
  const resetData = () => {
    setData({ username: "", password: "", confirmpassword: "" });
    setError({ ...error, isError: false });
  };

  //submit form
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);
    //data validate
    if (error.isError)
      toast.error("Form data is invalid. Please enter valid data and submit");
    else {
      //call server api to post the data
      signUp(data)
        .then((response) => {
          console.log(response);
          console.log("Success Log");
          toast.success("User is registered successfully!!");
          setData({
            username: "",
            password: "",
            confirmpassword: "",
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("Error log");
          setError({ errors: err, isError: true });
          console.log(error);
        });
    }
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={{ offset: 3, size: 6 }}>
          <Card color="secondary" inverse>
            <CardHeader className="text-center">
              <h3>
                <b>Fill this form to register!!</b>
              </h3>
            </CardHeader>
            <CardBody>
              {/* Creating form */}
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="username">Enter Username</Label>
                  <Input
                    id="username"
                    placeholder="User Name"
                    type="email"
                    onChange={(e) => handleChange(e, "username")}
                    value={data.username}
                    invalid={
                      error.isError &&
                      (error.errors.response?.data?.username ||
                        error.errors.response?.data?.message)
                    }
                  />
                  <FormFeedback>
                    {error.errors.response?.data?.username}
                  </FormFeedback>
                  <FormFeedback>
                    {error.errors.response?.data?.message}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    invalid={
                      error.isError && error.errors.response?.data?.password
                    }
                  />
                  <FormFeedback>
                    {error.errors.response?.data?.password}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmpassword">Confirm Password</Label>
                  <Input
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => handleChange(e, "confirmpassword")}
                    value={data.confirmpassword}
                    invalid={
                      error.isError && error.errors.response?.data?.password
                    }
                  />
                  <FormFeedback>
                    {error.errors.response?.data?.password}
                  </FormFeedback>
                </FormGroup>
                <Container className="text-center">
                  <Button outline color="info">
                    Register
                  </Button>
                  <Button
                    outline
                    color="warning"
                    type="reset"
                    className="ms-2"
                    onClick={resetData}
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
