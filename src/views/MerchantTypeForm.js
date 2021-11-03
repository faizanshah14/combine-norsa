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
import "../components/Dashboard.css";
import { getMerchantTypeData } from "services/merchantType";
import { getMerchantTypeDiscountByMerchantType_id } from "services/merchantType";
import { updateMerchantType } from "services/merchantType";
import { updateMerchantTypeDiscount } from "services/merchantType";
import _uniqueId from 'lodash/uniqueId';
import { addMerchantType } from "services/merchantType";
import { getMerchantData } from "services/merchant";
import { addMerchantTypeDiscount } from "services/merchantType";

function MerchantTypeForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [uniqueIDFormData] = React.useState(_uniqueId("prefix-"))
  const [formData, setFormData] = React.useState({
    id: "",
    Title: "",

  });
  const [discountFormData, setDiscountFormData] = React.useState([])
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setClientID(null);
      setFormData({ id: uniqueIDFormData, Title: "" })
    }
  }, []);

  useEffect(() => {
    if (ClientID == null) return
    getMerchantTypeData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data)
        getMerchantTypeDiscountByMerchantType_id(response.data.id)
          .then(function (response) {

            setDiscountFormData(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });

  }, [ClientID]);
  const { id, Title, NumberOfMonthsAndInterest } = formData;
  const validateInput = (name, value) => {
    if (name === "Title") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "NumberOfMonths" || name === "Interest") {
      let pattern = new RegExp("^[0-9]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers";
    }
    return true;
  };

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleNumberOfMonthsAndInterest = (e, index) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    let temp = [...discountFormData]
    if (e.target.name === "NumberOfMonths") {
      temp[index] = {
        id: temp[index].id,
        Interest: temp[index].Interest,
        [e.target.name]: parseInt(e.target.value),
        MerchantType_id: temp[index].MerchantType_id
      }
      setDiscountFormData(temp)
    }
    else {
      temp[index] = {
        id: temp[index].id,
        NumberOfMonths: temp[index].NumberOfMonths,
        [e.target.name]: parseInt(e.target.value),
        MerchantType_id: temp[index].MerchantType_id
      };
      setDiscountFormData(temp)
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ClientID) {
      updateMerchantType(formData)
        .then(function (response) {
          discountFormData.map((item) => {
            updateMerchantTypeDiscount(item)
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          })

        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      addMerchantType(formData)
        .then(function (response) {
          discountFormData.map((item) => {
            addMerchantTypeDiscount(item)
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          })
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.message)
        })
    }

    history.push("/admin/MerchantTypeList");
  };
  const handleRow = () => {
    setDiscountFormData([...discountFormData, { id: uniqueID, NumberOfMonths: 0, Interest: 0, MerchantType_id: formData.id }])
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-5">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h4" className="text-center m-3">
                  Merchant Type
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Title</label>
                        <Form.Control
                          required
                          placeholder="Title"
                          type="text"
                          value={Title}
                          name="Title"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {discountFormData.map((item, index) => {
                    return (
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Number Of Months</label>
                            <Form.Control
                              required
                              placeholder="Month"
                              type="text"
                              value={item.NumberOfMonths}
                              name="NumberOfMonths"
                              key={index}
                              onChange={(e) =>
                                handleNumberOfMonthsAndInterest(e, index)
                              }
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please provide a value.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Interest in %</label>
                            <Form.Control
                              required
                              placeholder="Interest"
                              type="text"
                              value={item.Interest}
                              name="Interest"
                              key={index}
                              onChange={(e) =>
                                handleNumberOfMonthsAndInterest(e, index)
                              }
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please provide a value.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    );
                  })}
                  <Row className="text-center  justify-content-center mt-4">
                    <Col>
                      <Button
                        className="btn-fill mr-3"
                        variant="info"
                        onClick={handleRow}
                      >
                        Add Row
                      </Button>
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
                      <Link to="/admin/MerchantTypeList">
                        <Button className="btn-fill" variant="danger">
                          Back
                        </Button>
                      </Link>
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

export default MerchantTypeForm;
