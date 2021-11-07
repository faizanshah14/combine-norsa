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
import checkUser from "services/auth";
import { login } from "services/auth";
import getClientList from "services/client";
import { deleteClient } from "services/client";
import { updateClient } from "services/client";

function ClientList() {
  const [tableData, setTableData] = React.useState([{
    Checked: false,
    id: "", Code: "", FirstName: "", LastName: "", WorkNo: "", ContactNo: "", WorksAt: "", Email: "",
    FaxNumber: "", Status: "", MaxBorrowAmount: "", Dealer_id: "",
  }])
  const history = useHistory();
  const [toSearch, setToSearch] = React.useState("")
  const [filterTableData, setFilterTableData] = React.useState([])
  const [formData, setFormData] = React.useState({
    email: "anasmisbah@yahoo.com",
    password: "12345678"
  })
  useEffect(() => {
    if (!checkUser()) {
      history.push('/login')
      return;
    }
    setFilterTableData([])
    getClientList().
      then(function (response) {
        console.log(response.data)
        setTableData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })

    // setTableData([{
    //   Checked: false,
    //   Code: "1", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "2", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "3", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "4", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "5", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "6", FirstName: "anas", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },])

  }, [])




  useEffect(() => {

    let tempTable = []
    tableData.map((item, index) => {
      if ((item.LastName.includes(toSearch) ||
        item.FirstName.includes(toSearch) ||
        item.Email.includes(toSearch))) {

      }
      else {
        tempTable.push(item)
      }
    })
    setFilterTableData(tempTable)


  }, [toSearch])

  const toggleStatus = (index) => {
    let tempTable = [...tableData]
    tempTable[index].Status = !tempTable[index].Status
    updateClient(tempTable[index])
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

    setTableData(tempTable)
  }

  const deleteRow = (itemToDelete) => {
    deleteClient(tableData[itemToDelete].id)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    setTableData(tableData.filter((item, index) => index !== itemToDelete))
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">LISTA di Kliente</Card.Title>
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
                  className="btn-fill  mr-3"
                  type="submit"
                  variant="info"
                  onClick={() => {
                    setTableData(
                      tableData.map((item) => {
                        if (item.Checked === true) {
                          item.Status = true;
                          updateClient(item)
                            .then(function (response) {
                              console.log(response)
                            })
                            .catch(function (error) {
                              console.log(error)
                            })
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
                          updateClient(item)
                            .then(function (response) {
                              console.log(response)
                            })
                            .catch(function (error) {
                              console.log(error)
                            })
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
                      <th className="border-0">Code</th>
                      <th className="border-0">Nomber</th>
                      <th className="border-0">Fam</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Celullar</th>
                      <th className="border-0">Ta taraha na</th>
                      <th className="border-0">Fax</th>
                      <th className="border-0">Kredito Maksimo</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Issuance History</th>
                      <th className="border-0">Pending Payment</th>
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
                          <td> {item.Code} </td>
                          <td> {item.FirstName} </td>
                          <td> {item.LastName} </td>
                          <td> {item.Email} </td>
                          <td> {item.WorkNo} </td>
                          <td> {item.WorksAt} </td>
                          <td> {item.FaxNumber} </td>
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
                              onClick={() =>
                                history.push(
                                  "/admin/IssuanceHistory/?id=" + item.id
                                )
                              }
                            >
                              <i
                                className="nc-icon nc-notes"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </td>
                          <td align="center">
                            <Button
                              onClick={() =>
                                history.push(
                                  "/admin/PendingPaymentList/?id=" + item.id
                                )
                              }
                            >
                              <i
                                className="nc-icon nc-notes"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </td>
                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push("/admin/ClientForm/?id=" + item.id)
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

export default ClientList;
