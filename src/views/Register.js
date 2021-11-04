import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getToken } from "services/auth";
import address from "services/address";

import {
  Button,
  Form,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Register = () => {
  const [registerData, setRegisterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    console.log(token, "tokennn");
    axios
      .get(`${address}/...`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const users = res.data;
        console.log(users, "userrrr");
        setRegisterData(users);
      })
      .catch((error) => {
        console.error("error message", error.message);
      });

      
  }, []);

  useEffect(() => {
    if (registerData.length) setFilteredData(registerData);
  }, [registerData]);

  const onChangeHandler = (e) => {
    let result = [];
    const value = e.target.value;
    if (value.length >= 1) {
      result = registerData.filter((character) => {
        return character.name.toLowerCase().startsWith(value.toLowerCase());
      });
      setFilteredData(result);
    } else {
      setFilteredData(registerData);
    }
  };

  const toggleStatus = (index) => {
    let tempTable = [...registerData];
    tempTable[index].Status = !tempTable[index].Status;
    setRegisterData(tempTable);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">Usuarionan</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Button
                  className="btn-fill pull-right ml-3 mr-3 mb-4"
                  type="submit"
                  style={{
                    backgroundColor: "#3AAB7B",
                    border: "1px solid #3AAB7B",
                  }}
                  onClick={() => history.push("/admin/addregister")}
                >
                  ADD
                </Button>
                <Button
                  className="btn-fill mr-3 mb-4 "
                  type="submit"
                  variant="info"
                  onClick={() => {
                    setRegisterData(
                      registerData.map((item) => {
                        if (item.Checked === true) {
                          item.Status = true;
                          item.Checked = false;
                        }
                        return item;
                      })
                    );
                  }}
                >
                  Active
                </Button>
                <Button
                  className="btn-fill mb-4"
                  type="submit"
                  variant="danger"
                  onClick={() => {
                    setRegisterData(
                      registerData.map((item) => {
                        if (item.Checked === true) {
                          item.Status = false;
                          item.Checked = false;
                        }
                        return item;
                      })
                    );
                  }}
                >
                  Block
                </Button>
                <br />
                <Col md="4">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      onChange={onChangeHandler}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0 "> st </th>
                      <th className="border-0 ">Serial No</th>
                      <th className="border-0 ">Email</th>
                      <th className="border-0 ">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <Form.Control
                              placeholder="Fax"
                              type="checkbox"
                              checked={item.Checked}
                              onChange={() => {
                                let temp = [...registerData];
                                temp[index].Checked = !temp[index].Checked;
                                setRegisterData(temp);
                              }}
                              style={{ width: "16px" }}
                            ></Form.Control>
                          </td>
                          <td> {index + 1} </td>
                          <td> {item.email} </td>
                          <td>
                            {item.Status ? (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-toggle-on"
                                  style={{
                                    color: "green",
                                    textAlign: "center",
                                  }}
                                />
                              </Button>
                            ) : (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-ban"
                                  style={{ color: "red", textAlign: "center" }}
                                />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
