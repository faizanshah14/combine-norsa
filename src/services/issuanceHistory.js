import { getToken } from "./auth";
import address from "./address";
import axios from "axios";


export default function addIssuanceHistory(formData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/issuancehistory/upsertIssuancehistory", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
export function getIssuanceHistoryList() {
  const token = getToken()
  if (!token) return "Authentication Fail Sign In agian"
  return axios.get(address + '/api/issuancehistory/getAllIssuancehistories', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
}
