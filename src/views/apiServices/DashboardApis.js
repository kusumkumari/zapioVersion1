/* eslint-disable */
import axios from "axios";
import { API_BASE_URL, handlerError } from "./Constant";

export const listDashboardCardsAPI = callback => {
  let url = `${API_BASE_URL}/dashboard/brand/home/`;
  axios
    .get(url, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    })
    .then(response => {
      callback &&
        callback({
          status: "success",
          response: response
        });
    })
    .catch(error => {
      handlerError(error, callback);
    });
};

// For Outlet Dashboard

export const listOutletDashboardAPI = callback => {
  let url = `${API_BASE_URL}/dashboard/outlet/home/`;
  axios
    .get(url, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    })
    .then(response => {
      callback &&
        callback({
          status: "success",
          response: response
        });
    })
    .catch(error => {
      handlerError(error, callback);
    });
};

//For Outlet On Off

export const OutletOnOffAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/outlet/onoff/`;
  axios
    .post(url, payload, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    })
    .then(response => {
      callback &&
        callback({
          status: "success",
          response: response
        });
    })
    .catch(error => {
      handlerError(error, callback);
    });
};

export const getOutletOnOffAPI = callback => {
  let url = `${API_BASE_URL}/outlet/is_open/`;
  axios
    .get(url, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    })
    .then(response => {
      callback &&
        callback({
          status: "success",
          response: response
        });
    })
    .catch(error => {
      handlerError(error, callback);
    });
};

export const brandOutletOnOff = (payload, callback) => {
  let url = `${API_BASE_URL}/brand_outlet/IsOpen/`;
  axios
    .post(url, payload, {
      headers: { Authorization: "Token " + localStorage.getItem("token") }
    })
    .then(response => {
      callback &&
        callback({
          status: "success",
          response: response
        });
    })
    .catch(error => {
      handlerError(error, callback);
    });
};
