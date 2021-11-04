import { getToken } from "./auth";
import address from "./address";
import axios from "axios";


export default function addDevicee(deviceData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/device/createDevice", deviceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

