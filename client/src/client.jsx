import axios from "axios";
import configData from "./config";

const url = configData.REACT_APP_API_URL;

export const authClient = axios.create({
  baseURL: `${url}/auth`,
});

export const articleClient = axios.create({
  baseURL: `${url}/articles`,
});
