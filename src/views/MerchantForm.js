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
import { useHistory, Link } from 'react-router-dom';
import getMerchantTypeList from "services/merchantType";

import { useEffect } from "react";
import { getMerchantData } from "services/merchant";
import { updateMerchant } from "services/merchant";
import { addMerchant } from "services/merchant";
import _uniqueId from 'lodash/uniqueId';
import "../components/Dashboard.css";


function MerchantForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState()
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [validated, setValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: "", Code: "", Name: "", MerchantType_id: "", AccountNo: "", BankName: ""
  });
  const [merchantTypes, setMerchantTypes] = React.useState([])
  useEffect(() => {
    const params = queryParams.get("id")
    if (params != null) {
      setClientID(params)
    }
    else {
      setFormData({ ...formData, ["id"]: uniqueID })
    }
    getMerchantTypeList().
      then(function (response) {
        console.log(response.data)
        setMerchantTypes(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  useEffect(() => {
    if (ClientID == null) return
    getMerchantData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data)
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });
  }, [ClientID])
  const { id, Code, Name, MerchantType_id, AccountNo, BankName } = formData

  const validateInput = (name, value) => {
    if (name === "Code") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$")
      if (pattern.test(value)) {
        return true
      }
      return "No special characters"
    }
    if (name === "Name" || name === "BankName") {
      let pattern = new RegExp("^[a-zA-Z ]*$")
      if (pattern.test(value)) {
        return true
      }
      return "only alphabets and spaces"
    }
    if (name === "AccountNo") {
      let pattern = new RegExp("^[0-9 ]*$")
      if (pattern.test(value)) {
        return true
      }
      return "only numbers or spaces"
    }
    return true
  }

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value)
    if (valid != true) {
      alert(valid)
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const handleSubmit = (event) => {
    event.preventDefault()
    if (ClientID) {
      updateMerchant(formData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      addMerchant(formData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.message)
        })
    }
    history.push('/admin/MerchantList')
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h3" className="text-center m-3 heading">
                  Merchant
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Code</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="text"
                          value={Code}
                          name="Code"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Nomber</label>
                        <Form.Control
                          required
                          placeholder="Username"
                          type="text"
                          value={Name}
                          name="Name"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Account Nomber</label>
                        <Form.Control
                          required
                          placeholder="Last Name"
                          type="lastName"
                          value={AccountNo}
                          name="AccountNo"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Banko</label>
                        <Form.Control
                          required
                          placeholder="00-0000-00"
                          type="text"
                          value={BankName}
                          name="BankName"
                          onChange={(e) => handleInputChange(e)}
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
                        <label>Merchant Type</label>

                        <Form.Control
                          as="select"
                          value={MerchantType_id}
                          name="MerchantType_id"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {merchantTypes.map((item) => {
                            return (
                              <option value={item.id}>{item.Title}</option>
                            );
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="text-center">
                    <Col md="12">
                      <div className="button-wrapper">
                        <Button
                          className="btn-fill res-size"
                          type="submit"
                          style={{
                            backgroundColor: "#3AAB7B",
                            border: "2px solid #3AAB7B",
                          }}
                        >
                          Save
                        </Button>
                        <Link to="/admin/MerchantList">
                          <Button
                            className="btn-fill res-size"
                            variant="danger"
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
    </>
  );
}

export default MerchantForm;
