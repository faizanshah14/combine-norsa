import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { getToken } from "../services/auth";
import address from "../services/address";

const NfcCard = () => {
  const [nfcData, setNfcData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    console.log(token, "tokennn");
    axios
      .get(`${address}/api/nfcCard/getAllNfcCards`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const users = res.data;
        console.log(users, "userrrr");
        setNfcData(users);
      })
      .catch((error) => {
        console.error("error message", error.message);
      });
  }, []);

  useEffect(() => {
    if (nfcData.length) setFilteredData(nfcData);
  }, [nfcData]);

  const onChangeHandler = (e) => {
    let result = [];
    const value = e.target.value;
    if (value.length >= 1) {
      result = nfcData.filter((character) => {
        return character.number.toLowerCase().startsWith(value.toLowerCase());
      });
      setFilteredData(result);
    } else {
      setFilteredData(nfcData);
    }
  };

  const toggleStatus = (index) => {
    let tempTable = [...nfcData];
    tempTable[index].Status = !tempTable[index].Status;
    setNfcData(tempTable);
  };

  const onDelete = (index) => {
    const token = getToken();
    axios
      .delete(
        `${address}/api/nfcCard/deleteNfcCard/${index}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const persons = res.data;
        console.log(persons, "deleted data");
        // filtering for deleted item
        const filterdNfcData = nfcData.filter((item) => item.id !== index);
        setNfcData(filterdNfcData);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">NFC Card</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Button
                  className="btn-fill pull-right ml-3 mr-3 mb-4"
                  type="submit"
                  style={{
                    backgroundColor: "#3AAB7B",
                    border: "1px solid #3AAB7B",
                  }}
                  onClick={() => history.push("/admin/addnfccard/:id")}
                >
                  ADD
                </Button>
                <Button
                  className="btn-fill mr-3 mb-4 "
                  type="submit"
                  variant="info"
                  onClick={() => {
                    setNfcData(
                      nfcData.map((item) => {
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
                    setNfcData(
                      nfcData.map((item) => {
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
                      <th className="border-0 ">Nomber</th>
                      <th className="border-0 ">Status</th>
                      <th className="border-0 ">Actions</th>
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
                                let temp = [...nfcData];
                                temp[index].Checked = !temp[index].Checked;
                                setNfcData(temp);
                              }}
                              style={{ width: "16px" }}
                            ></Form.Control>
                          </td>
                          <td> {index + 1} </td>
                          <td> {item.number} </td>
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
                          <td>
                            <i
                              className="fa fa-edit mr-3"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push(`/admin/addnfccard/${item.id}`)
                              }
                            />
                            <i
                              className="fa fa-trash red"
                              style={{ color: "red" }}
                              onClick={() => {
                                onDelete(item.id);
                              }}
                            />
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

export default NfcCard;
