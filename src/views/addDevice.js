import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../components/Dashboard.css";

const addDevice = () => {
  const [inputdeviceData, setInputDeviceData] = useState({
    id: "",
    nameNumber: "",
    batteryStatus: "",
    status: "",
    // checked: false,
  });

  const history = useHistory();

  const onChnageHandler = (e) => {
    setInputDeviceData({ ...inputdeviceData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    history.push("/admin/device");
    const newuser = {
      // id: inputdeviceData.id,
      // nameNumber: inputdeviceData.nameNumber,
      // batteryStatus: inputdeviceData.batteryStatus,
      // status: inputdeviceData.status,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { newuser })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 form-wrapper">
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <h3 className="text-center m-5">Device</h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label for="namenumber">Name Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="namenumber"
                  placeholder="Number"
                  name="nameNumber"
                  value={inputdeviceData.nameNumber}
                  onChange={(e) => onChnageHandler(e)}
                  pattern="[a-zA-Z0-9_.-]+"
                  required
                />
              </div>
              <div className="form-group col-md-12">
                <label for="batteryStatus">Battery Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="batteryStatus"
                  placeholder="Battery Status"
                  name="batteryStatus"
                  value={inputdeviceData.batteryStatus}
                  onChange={(e) => onChnageHandler(e)}
                  pattern="[a-zA-Z0-9_.-]+"
                  required
                />
              </div>
            </div>
            <div className="form-group radio-div ml-1">
              <label for="status" className="mr-5 mt-2 mb-3">
                Status
              </label>
              <div>
                <Form.Check
                  inline
                  label="Active"
                  name="group1"
                  type="Radio"
                  className="mr-5"
                />
                <Form.Check inline label="Block" name="group1" type="Radio" />
              </div>
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
              <Link to="/admin/device">
                <Button className="btn-fill" variant="danger">
                  Back
                </Button>
              </Link>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default addDevice;
