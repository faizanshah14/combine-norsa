import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button , Form } from "react-bootstrap";
import "../components/Dashboard.css";

const addNfcCard = () => {
  const [inputnfcData, setInputNfcData] = useState({
    id: "",
    number: "",
    status: "",
    // checked: false,
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
      .post(
        `https://jsonplaceholder.typicode.com/users`,
        {
          number
         },
        // {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    history.push("/admin/nfccard");
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 form-wrapper mt-5">
          <form onSubmit={onSubmitHandler}>
            <h3 className="text-center m-5">NFC Card</h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label for="number">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="Number"
                  name="number"
                  value={inputnfcData.number}
                  onChange={onChnageHandler}
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
              <Link to="/admin/nfccard">
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

export default addNfcCard;
