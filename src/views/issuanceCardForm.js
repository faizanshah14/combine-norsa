import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { useEffect } from "react";

function IssuanceCardForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    DateTime: "",
    Amount: "",
    PaybackPeriod: "",
    TypeOfPayment: "",
    DateDeposit: null,
    Client_id: "",
    NfcCard_id: "",
    Merchants_id: "",
    id: "",
    status: "",
  });
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setClientID(null);
    }
  }, []);

  useEffect(() => {
    if (ClientID != null) {
      // get client data
      const response = null;
      //setFormData(response)
    }
  }, [ClientID]);
  const {
    DateTime,
    Amount,
    PaybackPeriod,
    TypeOfPayment,
    DateDeposit,
    Client_id,
    NfcCard_id,
    Merchants_id,
    id,
    status,
  } = formData;

  const validateInput = (name, value) => {
    if (name === "Code") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }
    if (name === "FirstName" || name === "LastName" || name === "WorksAt") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "WorkNo" || name === "FaxNumber" || name === "ContactNo") {
      let pattern = new RegExp("^[0-9 ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }
    return true;
  };

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };
  const validateEmail = (email) => {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    }
    return "not a valid email";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateEmail(Email);
    if (valid != true) {
      alert(valid);
      return;
    }
    history.push("/admin/ClientList");
    alert("i am submitted");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h4" className="text-center m-3">
                  Card Issuance
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="date"
                          value={DateTime}
                          name="DateTime"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Montante</label>
                        <Form.Control
                          required
                          placeholder="Frank"
                          type="text"
                          value={Amount}
                          name="Amount"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleLastName">Clinet Code</label>
                        <Form.Control
                          required
                          placeholder="Semper"
                          type="text"
                          value={ClientID}
                          name="ClientID"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>NFC Card ID</label>
                        <Form.Control
                          required
                          placeholder="13"
                          type="text"
                          value={NfcCard_id}
                          name="NfcCard_id"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Number Of Months</label>
                        <Form.Control
                          required
                          placeholder="042"
                          type="text"
                          value={PaybackPeriod}
                          name="PaybackPeriod"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Merchant Details</label>
                        <Form.Control
                          required
                          placeholder="Ta taraha na"
                          type="text"
                          value={Merchants_id}
                          name="Merchants_id"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="text-center mt-2">
                    <Col md="12">
                      <Button
                        className="btn-fill mr-3"
                        type="submit"
                        style={{
                          backgroundColor: "#3AAB7B",
                          border: "2px solid #3AAB7B",
                        }}
                      >
                        Save
                      </Button>
                      {/* <Link to="/admin/????">
                          <Button className="btn-fill" variant="danger">
                            Back
                          </Button>
                        </Link> */}
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default IssuanceCardForm;
