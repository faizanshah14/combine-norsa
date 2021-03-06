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
import serverAddress from 'services/address'
import { useEffect } from "react";
import { getClientData } from "services/client";
import "../components/Dashboard.css";
import { updateClient } from "services/client";
import getClientList from "services/client";
import { addClient } from "services/client";
import _uniqueId from 'lodash/uniqueId';
import { getActiveClientList } from "services/client";
import { getNextId } from "services/client";
import { getNextDId } from "services/client";
import { getImageByClientId } from "services/client";
import { addClientImage } from "services/client";


function ClientForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [dealers, setDealers] = React.useState([])
  const [typeOfClient, setTypeOfClient] = React.useState()
  const [file, setFile] = React.useState()
  const [fileId, setFileId] = React.useState(null)
  const [formData, setFormData] = React.useState({
    id: "",
    Date: "2021-01-01",
    Code: "",
    address: "",
    FirstName: "",
    LastName: "",
    idCard: "",
    WorkNo: "+5999 ",
    ContactNo: "+5999 ",
    WorksAt: "",
    Email: "",
    FaxNumber: "",
    Status: 2,
    MaxBorrowAmount: "",
    ExpiryDate: "",
    Dealer_id: "",
    SourceOfIncome: "",
    RecievedCreditInPast: false
  });
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } 
    else {
      setFileId(uniqueID);
    }
    getActiveClientList().
      then(function (response) {
        console.log(response.data)
        response.data.unshift({})
        setDealers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
  useEffect(() => {
    if (typeOfClient == 0) {
      getNextId().then(function (response) {
        setFormData({ ...formData, ["id"]: response.data.id, ["Code"]: response.data.id })
      }).catch(function (error) {
        console.log(error)
      })
    }
    else if (typeOfClient == 1) {
      // getNextDId().then(function (response) {
      //   setFormData({ ...formData, ["id"]: response.data.id, ["Code"]: response.data.id })
      // }).catch(function (error) {
      //   console.log(error)
      // })

      setFormData({ ...formData, ["id"]: "D-", ["Code"]: "D-", ["Status"]: 1 })

    }
  }, [typeOfClient])

  useEffect(() => {
    if (ClientID == null) return
    getClientData(ClientID)
      .then(function (response) {
        getImageByClientId(response.data.id).then(
          function (resp) {
            alert("fetched")
            setFileId(resp.data.id)
            setFile(serverAddress + '/static/images/' + resp.data.filePath)
          }
        ).catch(
          function (error) {
            console.log(error)
          }
        )
        setFormData(response.data)
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });
  }, [ClientID]);
  const {
    id,
    Code,
    FirstName,
    LastName,
    idCard,
    WorkNo,
    ContactNo,
    WorksAt,
    Email,
    address,
    FaxNumber,
    Status,
    MaxBorrowAmount,
    Dealer_id,
    SourceOfIncome,
    RecievedCreditInPast,
    Date,
    ExpiryDate
  } = formData;

  const validateInput = (name, value) => {
    if (name === "Code" || name === "WorksAt") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }
    if (name === "FirstName" || name === "LastName") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "WorkNo" || name === "FaxNumber" || name === "ContactNo" || name == "idCard") {
      let pattern = new RegExp("^[0-9 +]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }
    return true;
  };

  const handleFileSubmit = () => {

    const data = new FormData();
    data.append("file", file);
    data.append("id", fileId);
    data.append('Client_id', formData.id);
    return addClientImage(data)
  }
  const handleInputChange = (e) => {

    if (e.target.name == "Status") {
      setFormData({ ...formData, [e.target.name]: !Status });
      return
    }
    if (e.target.name == "RecievedCreditInPast") {
      setFormData({ ...formData, [e.target.name]: !RecievedCreditInPast });
      return
    }
    if (e.target.name == "Code") {
      if (e.target.value.length < 2) return
      setFormData({ ...formData, [e.target.name]: e.target.value, id: e.target.value });
      return
    }
    if (e.target.name == "WorkNo" || e.target.name == "ContactNo") {
      if (e.target.value.length < 6) return
    }
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email) => {
    if (email.length < 1) return true
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
    if (ClientID) {
      updateClient(formData)
        .then(function (response) {
          console.log(response)
          handleFileSubmit()
            .then(function (response) {
              alert("submitted")
            }).catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      if (typeOfClient == 1) {
        getClientData(formData.id)
          .then(function (response) {
            if (response.data) {
              alert("Dealer already Exist")
              return
            }
            else {
              addClient(formData)
                .then(function (response) {
                  console.log(response)
                  handleFileSubmit()
                    .then(function (response) {
                      alert("submitted")
                    }).catch(function (error) {
                      console.log(error)
                    })
                })
                .catch(function (error) {
                  console.log(error)
                })
              history.push("/admin/ClientList");
            }
          })
          .catch(function (error) {

          })
      }
      else {
        addClient(formData)
          .then(function (response) {
            console.log(response)
            handleFileSubmit()
              .then(function (response) {
                alert("submitted")
              }).catch(function (error) {
                console.log(error)
              })
          })
          .catch(function (error) {
            console.log(error)
          })
        history.push("/admin/ClientList");
      }
    }



  };
  const handleFileChange = (event) => {
    if (event.target.files.length !== 0) {
      setFile(event.target.files[0])
    }
  }

  return (
    <>
      {queryParams.get("id") != null ? null : <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h3" className="text-center m-3">
                  Formulario di Registrashon
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Type Of Kliente</label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          value={typeOfClient}
                          name="Dealer_id"
                          onChange={e => {
                            setTypeOfClient(e.target.value)
                          }}
                        >
                          <option></option>
                          <option value={0}> Client</option>
                          <option value={1}> Dealer</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>}
      {(typeOfClient || queryParams.get("id")) && <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                {queryParams.get("id") == null ? null : <Card.Title as="h3" className="text-center m-3">
                  Formulario di Registrashon
                </Card.Title>}
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  { /* <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Date</label>
                      <Form.Control
                        required
                        placeholder="123"
                        type="date"
                        value={Date}
                        name="Date"
                        onChange={(e) => handleInputChange(e)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please provide a value.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row> */}
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Code</label>
                        <Form.Control
                          disabled={typeOfClient == 0 || ClientID ? true : false}
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
                    <Col className="px-1" md="5">
                      <Form.Group>
                        <label>Nomber</label>
                        <Form.Control
                          required
                          placeholder="Frank"
                          type="text"
                          value={FirstName}
                          name="FirstName"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleLastName">Fam</label>
                        <Form.Control
                          required
                          placeholder="Semper"
                          type="text"
                          value={LastName}
                          name="LastName"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>S??dula</label>
                        <Form.Control
                          required
                          placeholder=""
                          type="text"
                          value={idCard}
                          name="idCard"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Fetcha di Vensementu</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="date"
                          value={ExpiryDate}
                          name="ExpiryDate"
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
                        <label>Tel Trabou</label>
                        <Form.Control
                          required
                          placeholder="00-0000-00"
                          type="text"
                          value={WorkNo}
                          name="WorkNo"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label> Celullar</label>
                        <Form.Control
                          required
                          placeholder="042"
                          type="text"
                          value={ContactNo}
                          name="ContactNo"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Ta Emple?? Na</label>
                        <Form.Control
                          required
                          placeholder="Ta taraha na"
                          type="text"
                          value={WorksAt}
                          name="WorksAt"
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
                        <label>Email</label>
                        <Form.Control

                          placeholder="Email"
                          type="text"
                          value={Email}
                          name="Email"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Kredito Maksimo</label>
                        <Form.Control
                          required
                          placeholder="Kredito Maksimo"
                          type="number"
                          value={MaxBorrowAmount}
                          name="MaxBorrowAmount"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Adr??s</label>
                        <Form.Control
                          required
                          placeholder="address"
                          type="text"
                          value={address}
                          name="address"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Si bo no ta emple??, kiko ta bo medio di entrada ?</label>
                        <Form.Control
                          as="textarea"
                          required
                          placeholder=""
                          value={SourceOfIncome}
                          name="SourceOfIncome"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <label>A yega di tuma bon den pasado kaba? &nbsp;</label>
                      <br />
                      <Form.Check
                        inline
                        label="Si"
                        name="group1"
                        type="Radio"
                        className="mr-5"
                        name="RecievedCreditInPast"
                        checked={RecievedCreditInPast}
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="group1"
                        type="Radio"
                        className="mr-5"
                        name="RecievedCreditInPast"
                        checked={!RecievedCreditInPast}
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />

                    </Col>
                  </Row>
                  {typeOfClient == 0 && <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Rebendedo</label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          value={Dealer_id}
                          name="Dealer_id"
                          onChange={e => {
                            console.log(e)
                            console.log("e.target.value", e.target.value);
                            handleInputChange(e)
                          }}
                        >
                          {dealers.map((item, index) => {
                            if (index == 0) {
                              return (
                                <option value={item.id}> Dealers : {item.Code}</option>
                              )
                            }
                            return (
                              <option value={item.id}> {item.Code}</option>
                            )
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>}
                  {!ClientID && <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Porfabor agrega un potr??t di bo S??dula</label>
                        <Form.Control
                          required
                          type="file"
                          name="profilePicture"
                          onChange={(e) => { handleFileChange(e) }}
                        //onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>}
                  {file && <Row>
                    <Col md="12">
                      {/* <img src={URL.createObjectURL(file)} style={{ width: "100%", maxWidth: "150px" }} /> */}
                      <img src={ClientID ? file : URL.createObjectURL(file)} style={{ width: "100%", maxWidth: "150px" }} />
                    </Col>
                  </Row>}

                  {/* <Row>
                    <Col className="pr-1" md="12">
                      <Form.Check
                        inline
                        label="Active"
                        name="group1"
                        type="Radio"
                        className="mr-5"
                        name="Status"
                        checked={Status}
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </Col>
                  </Row> */}
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
                      <Link to="/admin/ClientList">
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
      </Container>}
    </>
  );
}

export default ClientForm;
