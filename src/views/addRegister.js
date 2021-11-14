import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import _uniqueId from "lodash/uniqueId";
import addRegisterr from "services/register";
import "../components/Dashboard.css";

const addRegister = () => {
  const [inputregisterData, setInputRegisterData] = useState({
    id: "",
    email: "",
    password: "",
  });

  const [uniqueID] = React.useState(_uniqueId("prefix-"));

  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    setInputRegisterData({ ...inputregisterData, ["id"]: uniqueID });
  }, []);

  const onChnageHandler = (e) => {
    setInputRegisterData({
      ...inputregisterData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    addRegisterr(inputregisterData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    history.push("/admin/register");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="12" md="8">
          <Card className="form-wrapper mt-4">
            <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
              <Card.Title as="h3" className="text-center m-3 heading">
                Usuarionan
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Row>
                  <Col sm="12" md="12">
                    <Form.Group>
                      <label>Email</label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={inputregisterData.email}
                        onChange={onChnageHandler}
                        pattern="[a-zA-Z0-9_.-]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{1,}"
                        required
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please provide a value.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md="12">
                    <Form.Group>
                      <label>Password</label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputregisterData.password}
                        onChange={onChnageHandler}
                        // pattern="(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,15}"
                        required
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please provide a value.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="text-center mt-3">
                  <Col md="12">
                    <div className="button-wrapper">
                      <Button
                        className="btn-fill res-size "
                        type="submit"
                        style={{
                          backgroundColor: "#3AAB7B",
                          border: "none",
                        }}
                      >
                        Save
                      </Button>
                      <Link to="/admin/register">
                        <Button
                          className="btn-fill res-size"
                          variant="danger"
                          style={{
                            border: "none",
                          }}
                        >
                          Back
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>

                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default addRegister;
