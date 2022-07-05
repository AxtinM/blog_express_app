import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const authClient = axios.create({
  baseURL: `${url}/auth`,
});

export const articleClient = axios.create({
  baseURL: `${url}/articles`,
});
