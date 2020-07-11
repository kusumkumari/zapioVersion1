/* eslint-disable */
import { Notification } from "../Utils/Notification";
//export const API_BASE_URL = "https://zapio-admin.com/api";
// export const API_BASE_URL = "http://192.168.0.106:8080/api";
export const API_BASE_URL = "http://192.168.0.104:1234/api";
export const handlerError = (error, callback) => {
  if (error.message == "Network Error") {
    // location.href = "/server";
    Notification(
      0,
      "There is a problem while connecting to server",
      "Network Error"
    );
  }
  if (error.response == undefined) {
    console.log(error);
  } else if (error.response.status == 500) {
    window.location.href = "/server";
  } else if (error.response.status == 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("usertype");
    localStorage.removeItem("companyName");
    localStorage.removeItem("logo");
    localStorage.removeItem("__theme_color");
    window.location.href = "/";
  } else {
    callback &&
      callback({
        status: "error",
        response: error
      });
  }
};
