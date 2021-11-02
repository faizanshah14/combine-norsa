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

function MerchantTypeForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: "",
    Title: "",
    monthsAndInterest: [{ Months: "4", Interest: "5" }],
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
    if(ClientID == null) return 
    getMerchantTypeData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data)
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });

  }, [ClientID]);
  const { id, Title, monthsAndInterest } = formData;
  const validateInput = (name, value) => {
    if (name === "Title") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "Months" || name === "Interest") {
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

    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };
  const handleMonthsAndInterest = (e, index) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    if (e.target.name === "Months") {
      let temp = [...monthsAndInterest];
      temp[index] = {
        Interest: temp[index].Interest,
        [e.target.name]: [e.target.value],
      };
      setFormData({ ...formData, monthsAndInterest: temp });
    } else {
      let temp = [...monthsAndInterest];
      temp[index] = {
        Months: temp[index].Months,
        [e.target.name]: [e.target.value],
      };
      setFormData({ ...formData, monthsAndInterest: temp });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    history.push("/admin/MerchantTypeList");
    alert("i am submitted");
  };
  const handleRow = () => {
    setFormData({
      ...formData,
      monthsAndInterest: [...monthsAndInterest, { Months: "", Interest: "" }],
    });
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
                  {monthsAndInterest.map((item, index) => {
                    return (
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Months</label>
                            <Form.Control
                              required
                              placeholder="Month"
                              type="text"
                              value={item.Months}
                              name="Months"
                              key={index}
                              onChange={(e) =>
                                handleMonthsAndInterest(e, index)
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
                                handleMonthsAndInterest(e, index)
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
