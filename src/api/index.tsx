import axios from "axios";
import { useCookies } from "react-cookie";
import { LoginInfo, User } from "../types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { SERVER_URI } from "../utils";

export const authApi = axios.create({
  baseURL: `${SERVER_URI}`,
  withCredentials: true,
});

authApi.defaults.headers.common["Accept"] = "application/json";
authApi.defaults.headers.common["Content-Type"] = "application/json";
authApi.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export const loginUserFn = (loginInfo: LoginInfo) => {
  const config = {
    headers: {
      Authorization:
        "Basic " + window.btoa(loginInfo.email + ":" + loginInfo.password),
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  };
  return authApi
    .get("/user", config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const useFetchData = (route: string, user: User): UseQueryResult => {
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  const config = {
    headers: {
      Authorization: "Basic " + window.btoa(user.email + ":" + user.password),
      "X-XSRF-TOKEN": cookies["XSRF-TOKEN"],
    },
    withCredentials: true,
  };
  return useQuery({
    queryKey: ["data", route, user.id],
    enabled: user && user.authStatus === "AUTH",
    queryFn: () => {
      return authApi
        .get(`/${route}?id=${user.id}`, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error));
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postMessageFn = async (info: any) => {
  return authApi
    .post("/contact", info)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const useFetchNotices = (): UseQueryResult => {
  return useQuery({
    queryKey: ["notices"],
    queryFn: () => {
      return authApi
        .get("/notices")
        .then((response) => response.data)
        .catch((error) => Promise.reject(error));
    },
  });
};
