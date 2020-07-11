/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Button, CardTitle, CardBody, Card } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AreaManagerAdd from "./AreaManagerAdd";
import AreaManagerList from "./AreaManagerList";
import {
  addManagerAPI,
  listManagersAPI,
  getManagerAPI,
  changeManagerStatusAPI,
  listActiveUserTypeAPI,
  listActiveOutletAPI
} from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import AreaManagerEdit from "./AreaManagerEdit";

class AreaManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [],
      username: "",
      name: "",
      password: "",
      id: "",
      outlet: [],
      data: [],
      userData: [],
      userDataLength: "",
      isEdit: false,
      dataLength: null,
      isFormOpen: false
    };
  }
  listUserType = () => {
    listActiveUserTypeAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          userData: apiResponse.response.data.data,
          userDataLength: apiResponse.response.data.data.length
        });
      }
    });
  };
  listManagers = () => {
    listManagersAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  };
  listOutlet = () => {
    listActiveOutletAPI(apiResponse => {
      console.log("uuuuuuuuuuuuuuu", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          Outletdata: apiResponse.response.data,
          OutletdataLength: apiResponse.response.data.length
        });
      }
    });
  };
  componentDidMount() {
    this.listUserType();
    this.listManagers();
    this.listOutlet();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeUser = e => {
    this.setState({
      userType: e
    });
  };
  handleChangeOutlet = e => {
    this.setState({
      outlet: e
    });
  };
  retrieveManagerHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false });
    getManagerAPI({ id: id.toString() }, response => {
      if (response.response.data.success == true) {
        this.setState({
          userType: response.response.data.data[0].user_type_details,
          username: response.response.data.data[0].username,
          name: response.response.data.data[0].manager_name,
          password: response.response.data.data[0].password,
          id: response.response.data.data[0].id,
          outlet: response.response.data.data[0].outlet
        });
      }
    });
  };

  AddManagerType = () => {
    const { userType, username, name, password, outlet } = this.state;
    let userTypeArray = "";
    if (userType != "") {
      userTypeArray = userType.value.toString();
    } else {
      userTypeArray = "";
    }
    let outletArray = [];
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    addManagerAPI(
      {
        user_type: userTypeArray,
        username: username,
        password: password,
        manager_name: name,
        outlet: outletArray
      },
      response => {
        console.log("2222222222", response);
        if (response.response.data.success == true) {
          this.setState({
            userType: "",
            isFormOpen: false,
            username: "",
            password: "",
            outlet: [],
            manager_name: ""
          });
          Notification(1, response.response.data.message, "Managers success");
          this.listManagers();
        } else {
          const err = response.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  EditManagerType = () => {
    const { userType, username, name, password, id, outlet } = this.state;
    let userTypeArray = "";
    if (userType) {
      if (userType[0]) {
        userTypeArray = userType[0].value.toString();
      } else {
        userTypeArray = userType.value.toString();
      }
    } else {
      userTypeArray = "";
    }
    let outletArray = [];
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    addManagerAPI(
      {
        user_type: userTypeArray,
        username: username,
        password: password,
        manager_name: name,
        id: id.toString(),
        outlet: outletArray
      },
      response => {
        console.log("33333333", response);

        if (response.response.data.success == true) {
          this.setState({
            userType: "",
            isEdit: false,
            username: "",
            password: "",
            outlet: [],
            manager_name: ""
          });
          Notification(1, response.response.data.message, "Managers success");
          this.listManagers();
        } else {
          const err = response.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeManagerStatusAPI(
      { id: id.toString(), active_status: status },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          Notification(
            1,
            apiResponse.response.data.message,
            "Manager status changed"
          );
          this.listManagers();
        } else {
          Notification(
            0,
            "Something went wrong",
            "Manager status changed Error"
          );
        }
      }
    );
  };
  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      userType: "",
      username: "",
      password: "",
      name: "",
      id: "",
      outlet: []
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      userType: "",
      username: "",
      password: "",
      name: "",
      id: "",
      outlet: []
    });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-administrator text-primary"
              style={{ fontSize: "x-large" }}
            />
            <Breadcrumb
              heading="manager.managers-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ? (
                  <AreaManagerEdit
                    {...this.state}
                    handleChange={this.handleChange}
                    handleChangeUser={this.handleChangeUser}
                    EditManagerType={this.EditManagerType}
                    handleChangeOutlet={this.handleChangeOutlet}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
                {this.state.isFormOpen ? (
                  <AreaManagerAdd
                    {...this.state}
                    handleChange={this.handleChange}
                    handleChangeUser={this.handleChangeUser}
                    AddManagerType={this.AddManagerType}
                    handleChangeOutlet={this.handleChangeOutlet}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-5">
            <AreaManagerList
              {...this.state}
              retrieveManagerHandler={this.retrieveManagerHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(AreaManager);
