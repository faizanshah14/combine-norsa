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
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";

function IssuanceHistory() {
  const [tableData, setTableData] = React.useState([{
    Code: "", FirstName: "", LastName: "", WorkNo: "", ContactNo: "", WorksAt: "", Email: "",
    FaxNumber: "", Fax: "", Status: "", MaxBorrowAmount: "", Dealer_id: "",
  }])
  const history = useHistory();
  const [status, setStatus] = React.useState(false)

  useEffect(() => {
    setTableData([{
      Code: "1", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },
    {
      Code: "2", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },
    {
      Code: "3", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },
    {
      Code: "4", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },
    {
      Code: "5", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },
    {
      Code: "6", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
      FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    },])

  }, [])

  const toggleStatus = (index) => {
    let tempTable = [...tableData]
    tempTable[index].Status = !tempTable[index].Status
    setTableData(tempTable)
  }
  const deleteRow = (itemToDelete) => {
    setTableData(tableData.filter((item, index) => index !== itemToDelete))
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">Kliente</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Button
                  className="btn-fill ml-3 mr-3"
                  type="submit"
                  style={{
                    backgroundColor: "#3AAB7B",
                    border: "1px solid #3AAB7B",
                  }}
                  onClick={() => history.push("/admin/ClientForm")}
                >
                  ADD
                </Button>
                <Button
                  className="btn-fill mr-3"
                  type="submit"
                  variant="info"
                >
                  Active
                </Button>
                <Button
                  className="btn-fill"
                  type="submit"
                  variant="danger"
                >
                  Block
                </Button>
                <Table className="table-hover mt-3">
                  <thead>
                    <tr>
                      <th className="border-0"> st </th>
                      <th className="border-0">Code</th>
                      <th className="border-0">First Nomber</th>
                      <th className="border-0">Last Nomber</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Tell Celluar</th>
                      <th className="border-0">Ta taraha na</th>
                      <th className="border-0">Fax</th>
                      <th className="border-0">Kredito Maksimo</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Issuance History</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            <Form.Control
                              placeholder="Fax"
                              type="checkbox"
                              style={{width:"16px"}}
                            ></Form.Control>
                          </td>
                          <td> {item.Code} </td>
                          <td> {item.FirstName} </td>
                          <td> {item.LastName} </td>
                          <td> {item.Email} </td>
                          <td> {item.WorkNo} </td>
                          <td> {item.WorksAt} </td>
                          <td> {item.Fax} </td>
                          <td> {item.MaxBorrowAmount} </td>
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
                                  style={{ color: "red", textAlign: "center" }}
                                />
                              </Button>
                            )}
                          </td>
                          <td align="center">
                            <Button
                              onClick={() => history.push("/admin/ClientForm")}
                            >
                              <i
                                className="nc-icon nc-notes"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </td>
                          <td align="center">
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push("/admin/ClientForm/" + index)
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

export default IssuanceHistory;
