import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../components/Dashboard.css";

const addDevice = () => {
  const [inputdeviceData, setInputDeviceData] = useState({
    id: "",
    nameNumber: "",
    batteryStatus: "",
    status: "active",
  });

  const [updateData, setUpdateData] = useState([]);

  const history = useHistory();

  const { id } = useParams();
  console.log(id, "id");

  const onChangeHandler = (e) => {
    setInputDeviceData({ ...inputdeviceData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "add form token");
    axios
      .get("https://norsabackend.herokuapp.com/api/api/device/getAllDevices", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      })
      .then((res) => {
        const users = res.data;
        setUpdateData(users);
        console.log(users, "form get data");
      })
      .catch((error) => {
        console.error("There is an error!", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = updateData?.find((arr) => arr.id === parseInt(id));
    setInputDeviceData({ ...filteredData });
    // eslint-disable-next-line
  }, [id, updateData]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newuser = {
      id: inputdeviceData.id,
      nameNumber: inputdeviceData.nameNumber,
      batteryStatus: inputdeviceData.batteryStatus,
      status: inputdeviceData.status,
    };

    const edituser = {
      id: inputdeviceData.id,
      nameNumber: inputdeviceData.nameNumber,
      batteryStatus: inputdeviceData.batteryStatus,
      status: inputdeviceData.status,
    };

    if (inputdeviceData?.id) {
      axios
        .post(
          `https://norsabackend.herokuapp.com/api/device/upsertDevice`,
          {
            edituser,
          },
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
    } else {
      axios
        .post(
          `https://norsabackend.herokuapp.com/api/device/createDevice`,
          {
            newuser,
          },
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
    }
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
                <label for="namenumber">Device Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="namenumber"
                  placeholder="Number"
                  name="nameNumber"
                  value={inputdeviceData.nameNumber}
                  onChange={(e) => onChnageHandler(e)}
                  pattern="[a-zA-Z0-9_.- ]+"
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
                  pattern="[a-zA-Z0-9_.- ]+"
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
                  className="mr-5"
                  label="Active"
                  type="Radio"
                  checked={inputdeviceData.status === "active"}
                  name="status"
                  value={inputdeviceData.status}
                  onChange={onChangeHandler}
                />
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
