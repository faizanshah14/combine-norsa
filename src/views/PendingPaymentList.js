import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Form,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function PendingPaymentList() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      Client_id: "",
      DateDeposit: "",
      AmounntPaid: "",
      Status: false,
    },
  ]);
  const history = useHistory();
  const [toSearch, setToSearch] = React.useState("");
  const [filterTableData, setFilterTableData] = React.useState([]);
  useEffect(() => {
    setFilterTableData([]);
    setTableData([
      {
        Checked: false,
        Client_id: "1",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
      {
        Checked: false,
        Client_id: "2",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
      {
        Checked: false,
        Client_id: "3",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
      {
        Checked: false,
        Client_id: "4",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
      {
        Checked: false,
        Client_id: "5",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
      {
        Checked: false,
        Client_id: "6",
        DateDeposit: "shaffan",
        AmounntPaid: "2",
        Status: false,
      },
    ]);
  }, []);
  useEffect(() => {
    let tempTable = [];
    tableData.map((item, index) => {
      if (
        item.Client_id.includes(toSearch) ||
        item.DateDeposit.includes(toSearch) ||
        item.AmounntPaid.includes(toSearch)
      ) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);

  const toggleStatus = (index) => {
    let tempTable = [...tableData];
    tempTable[index].Status = !tempTable[index].Status;
    setTableData(tempTable);
  };

  const deleteRow = (itemToDelete) => {
    setTableData(tableData.filter((item, index) => index !== itemToDelete));
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">Pending Payments</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-1">
                <Button
                  className="btn-fill ml-3 mr-3"
                  type="submit"
                  style={{
                    backgroundColor: "#3AAB7B",
                    border: "1px solid #3AAB7B",
                  }}
                  onClick={() => history.push("/admin/MerchantForm")}
                >
                  ADD
                </Button>
                <Button
                  className="btn-fill mr-3"
                  type="submit"
                  variant="info"
                  onClick={() => {
                    setTableData(
                      tableData.map((item) => {
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
                    setTableData(
                      tableData.map((item) => {
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
                      onChange={(e) => setToSearch(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"> st </th>
                      <th className="border-0">kliente Code</th>
                      <th className="border-0">fecha di Deposito</th>
                      <th className="border-0">Montante total pa fetcha</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      if (filterTableData.includes(item)) {
                        return;
                      }
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            <Form.Control
                              placeholder="Fax"
                              type="checkbox"
                              checked={item.Checked}
                              onChange={() => {
                                let temp = [...tableData];
                                temp[index].Checked = !temp[index].Checked;
                                setTableData(temp);
                              }}
                              style={{ width: "16px" }}
                            ></Form.Control>
                          </td>
                          <td> {item.Client_id} </td>
                          <td> {item.DateDeposit} </td>
                          <td> {item.AmounntPaid} </td>
                          <td>
                            {" "}
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
                                  style={{
                                    color: "red",
                                    textAlign: "center",
                                  }}
                                />
                              </Button>
                            )}
                          </td>

                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push("/admin/MerchantForm/?id=" + index)
                              }
                            />
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-trash red"
                              style={{ color: "red" }}
                              onClick={() => {
                                deleteRow(index);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    {/* <td align="center" >
                        <i className="nc-icon nc-notes" onClick={() => alert("clicked issuance History")} />
                      </td>
                      <td align="center">
                        <i className="fa fa-edit" onClick={() => alert("clicked edit")} />
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PendingPaymentList;
