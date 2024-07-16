import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { userLogin } from "../../api/user-service";
import { toast } from "react-toastify";
import { doLogin, doLogout } from "../../api/auth/LoginUtil";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // handle change
  const handleChange = (event, property) => {
    setLoginData({ ...loginData, [property]: event.target.value });
  };

  //reset function
  const resetData = () => {
    setLoginData({ username: "", password: "" });
  };

  //submit form
  const submitForm = (event) => {
    event.preventDefault();
    console.log(loginData);
    //data validate
    if (loginData.username.trim() == "" || loginData.password.trim() == "") {
      toast.error("Username and Password is mandatory!!");
      return;
    }
    //call server api to post the data
    userLogin(loginData)
      .then((jwtAuthToken) => {
        doLogin(jwtAuthToken, ()=>{
          console.log("Success Log");
          // redirect to home page
          navigate("/");
        })
        toast.success("Login successful !!");
        setLoginData({
          username: "",
          password: ""
        });
      })
      .catch((err) => {
        doLogout(()=> {
          console.log(err);
        })
        console.log("Error log");

        if(err.response.status == 400 || err.response.status == 401)
          toast.error("Invalid Username or Password. Please enter valid credentials !!!");
        else
          toast.error("Something went wrong in the server !!!");
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={{ offset: 3, size: 6 }}>
          <Card color="secondary" inverse>
            <CardHeader className="text-center">
              <h3>
                <b>Login here!!</b>
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
                    type="text"
                    onChange={(e) => handleChange(e, "username")}
                    value={loginData.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={loginData.password}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button outline color="info">
                    Login
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

export default Login;
