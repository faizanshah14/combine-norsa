import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../components/Dashboard.css";

const addRegister = () => {
  const [inputnfcData, setInputNfcData] = useState({
    // id: "",
    // checked: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);

  const onChnageHandler = (e) => {
    setInputNfcData({ ...inputnfcData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newuser = {
      // id: inputnfcData.id,
      number: inputnfcData.number,
      // status: inputnfcData.status,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { newuser })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    history.push("/admin/register");
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 form-wrapper mt-5">
          <form onSubmit={onSubmitHandler}>
            <h3 className="text-center m-5">Usuarionan</h3>
            <div className="form-row">
              {/* <div className="form-group col-md-12">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Fiste Name"
                  name="firstName"
                  value={inputnfcData.firstName}
                  onChange={onChnageHandler}
                  pattern="[a-zA-Z. ]+"
                  required
                />
              </div> */}
              {/* <div className="form-group col-md-12">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={inputnfcData.lastName}
                  onChange={onChnageHandler}
                  pattern="[a-zA-Z. ]+"
                  required
                />
              </div> */}
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={inputnfcData.email}
                onChange={onChnageHandler}
                pattern="[a-zA-Z0-9_.-]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{1,}"
                required
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={inputnfcData.password}
                onChange={onChnageHandler}
                // pattern="(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,15}"
                required
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
              <Link to="/admin/register">
                <Button className="btn-fill" variant="danger">
                  Back
                </Button>
              </Link>
            </div>
          </form>
          <div>
            {/* {inputnfcData.cardid} , {inputnfcData.number}, {inputnfcData.status}
            <br />
            submited data=
            {submitdata?.map((data) => {
              return (
                <div>
                  id:
                  {data.cardid}
                  number:
                  {data.number}
                  status:
                  {data.status}
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default addRegister;
