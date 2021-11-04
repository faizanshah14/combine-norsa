import { getToken } from "./auth";
import address from "./address";
import axios from "axios";


export default function addNfc(nfcData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/nfcCard/createNfcCard", nfcData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
export function getNfcList() {
  const token = getToken()
  if (!token) return "Authentication Fail Sign In agian"
  return axios.get(address + '/api/nfcCard/getAllNfcCards', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
}
