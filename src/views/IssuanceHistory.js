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
    id: "", Client_id: "", Amount: "", PaybackPeriod: "", NfcCard_id: "", Merchants_id: "",
  }])
  const history = useHistory();
  const [status, setStatus] = React.useState(false)

  useEffect(() => {
    // setTableData([{
    //   Code: "1", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Code: "2", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Code: "3", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Code: "4", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Code: "5", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Code: "6", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },])

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
                <Card.Title as="h3">Issuance History</Card.Title>
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

                      <th className="border-0">Fetcha</th>
                      <th className="border-0">Kliente</th>
                      <th className="border-0">Montante </th>
                      <th className="border-0">Periodo di Pago </th>
                      <th className="border-0">Nfc Card </th>
                      <th className="border-0">Negoshi</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      return (
                        <tr key={index}>

                          <td> {item.id} </td>
                          <td> {item.Client_id} </td>
                          <td> {item.Amount} </td>
                          <td> {item.PaybackPeriod} </td>
                          <td> {item.NfcCard_id} </td>
                          <td> {item.Merchants_id} </td>


                          <td>
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
