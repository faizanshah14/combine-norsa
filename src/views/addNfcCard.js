import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getToken } from "../services/auth";
import address from "../services/address";
import _uniqueId from "lodash/uniqueId";
import "../components/Dashboard.css";

const addNfcCard = () => {
  const [inputnfcData, setInputNfcData] = useState({
    id: "",
    number: "",
    status: 0,
  });
  const [uniqueID] = React.useState(_uniqueId("prefix-"));
  const [updateData, setUpdateData] = useState([]);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    setInputNfcData({ ...inputnfcData, ["id"]: uniqueID });
  }, []);

  // useEffect(() => {
  //   const token = getToken();
  //   console.log(token, "add form token");
  //   axios
  //     .get(`${address}/api/nfcCard/getNfcCardById/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer" + token,
  //       },
  //     })
  //     .then((res) => {
  //       const users = res.data;
  //       setUpdateData(users);
  //       console.log(users, "form get data");
  //     })
  //     .catch((error) => {
  //       console.error("There is an error!", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const filteredData = updateData?.find((arr) => arr.id === parseInt(id));
  //   setInputNfcData({ ...filteredData });
  //   // eslint-disable-next-line
  // }, [id, updateData]);

  // const onChangeHandler = (e) => {
  //   setInputNfcData({ ...inputnfcData, [e.target.name]: e.target.value });
  // };

  const onChangeHandler = (e) => {
    if (e.target.name == "status") {
      setInputNfcData({
        ...inputnfcData,
        [e.target.name]: !inputnfcData.status,
      });
      return;
    }

    setInputNfcData({ ...inputnfcData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const token = getToken();
    console.log(token, "submit handler token");

    const newuser = {
      id: inputnfcData?.id,
      number: inputnfcData?.number,
      status: inputnfcData?.status ? 1 : 0,
    };
    const myJSON = JSON.stringify(newuser);
    console.log(newuser, "new userrrr");
    axios
      .post(
        `${address}/api/nfcCard/createNfcCard`,
          myJSON,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    // history.push("/admin/nfccard");
  };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   console.log(token, "submit handler token")

  //   const newuser = {
  //     id: inputnfcData.id,
  //     number: inputnfcData.number,
  //     status: inputnfcData.status,
  //   };

  //   const edituser = {
  //     id: inputnfcData.id,
  //     number: inputnfcData.number,
  //     status: inputnfcData.status,
  //   };

  //   if (inputnfcData?.id) {
  //     axios
  //       .post(
  //         `https://norsabackend.herokuapp.com/api/nfcCard/upsertNfcCard`,
  //         {
  //           edituser,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer" + token,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.data);
  //       });
  //   } else {
  //     axios
  //       .post(
  //         `https://norsabackend.herokuapp.com/api/nfcCard/createNfcCard`,
  //         {
  //           newuser,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer" + token,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.data);
  //       });
  //   }

  // history.push("/admin/nfccard");
  // };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 form-wrapper mt-5">
          <form onSubmit={onSubmitHandler}>
            <h3 className="text-center m-5">NFC Card</h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label for="number">Nomber</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="Nomber"
                  name="number"
                  value={inputnfcData.number}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  // pattern="[a-zA-Z0-9_.- ]+"
                  required
                />
              </div>
            </div>
            <div className="form-group radio-div ml-1">
              <label for="status" className="mr-5 mt-2 mb-3">
                Status
              </label>
              <Form.Check
                inline
                label="Active"
                name="group1"
                type="Radio"
                className="mr-5"
                name="status"
                checked={inputnfcData.status}
                onClick={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
            <div className="mt-5 text-center">
              <Button
                className="btn-fill mr-3"
                style={{
                  backgroundColor: "#3AAB7B",
                  border: "1px solid #3AAB7B",
                }}
                type="submit"
              >
                Save
              </Button>
              <Link to="/admin/nfccard">
                <Button className="btn-fill" variant="danger">
                  Back
                </Button>
              </Link>
            </div>
          </form>
          {/* <div>status = {inputnfcData.status}</div> */}
        </div>
      </div>
    </div>
  );
};

export default addNfcCard;
