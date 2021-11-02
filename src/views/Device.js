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

const Device = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        const users = res.data;
        setDeviceData(users);
      })
      .catch((error) => {
        console.error("There is an error!", error);
      });
  }, []);

  useEffect(() => {
    if (deviceData.length) setFilteredData(deviceData);
  }, [deviceData]);

  const onChangeHandler = (e) => {
    let result = [];
    const value = e.target.value;
    if (value.length >= 1) {
      result = deviceData.filter((character) => {
        return character.name.toLowerCase().startsWith(value.toLowerCase());
      });
      setFilteredData(result);
    } else {
      setFilteredData(deviceData);
    }
  };

  const toggleStatus = (index) => {
    let tempTable = [...deviceData];
    tempTable[index].Status = !tempTable[index].Status;
    setDeviceData(tempTable);
  };

  const onDelete = (index) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${index}`)
      .then((res) => {
        const persons = res.data;
        console.log(persons, "deleted data");
        // filtering for deleted item
        const filterddeviceData = deviceData.filter((item) => item.id !== index);
        setDeviceData(filterddeviceData);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">Device</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Button
                  className="btn-fill pull-right ml-3 mr-3"
                  type="submit"
                  style={{
                    backgroundColor: "#3AAB7B",
                    border: "1px solid #3AAB7B",
                  }}
                  onClick={() => history.push("/admin/adddevice")}
                >
                  ADD
                </Button>
                <Button
                  className="btn-fill mr-3"
                  type="submit"
                  variant="info"
                  onClick={() => {
                    setDeviceData(
                      deviceData.map((item) => {
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
                  className="btn-fill"
                  type="submit"
                  variant="danger"
                  onClick={() => {
                    setDeviceData(
                      deviceData.map((item) => {
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
                      className="mt-4"
                      placeholder="Search"
                      onChange={onChangeHandler}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"> St </th>
                      <th className="border-0">Serial No</th>
                      <th className="border-0">Name Number</th>
                      <th className="border-0">Battery Status</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
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
                                let temp = [...deviceData];
                                temp[index].Checked = !temp[index].Checked;
                                setDeviceData(temp);
                              }}
                              style={{ width: "16px" }}
                            ></Form.Control>
                          </td>
                          <td> {index + 1} </td>
                          <td> {item.name} </td>
                          <td> {item.username} </td>
                          <td>
                            {item.Status ? (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-toggle-on"
                                  style={{
                                    color: "green",
                                    textAlign: "left",
                                  }}
                                />
                              </Button>
                            ) : (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-ban"
                                  style={{ color: "red", textAlign: "left" }}
                                />
                              </Button>
                            )}
                          </td>
                          <td>
                            <i
                              className="fa fa-edit mr-3"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push("/admin/adddevice/?id=" + item.id)
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

export default Device;
