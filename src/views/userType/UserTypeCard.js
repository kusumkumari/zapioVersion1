/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Button, CardTitle, CardBody, Card } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import UserTypeAdd from "./UserTypeAdd";
import UserTypeList from "./UserTypeList";
import { addUserTypeAPI, listUserTypeAPI, getUserTypeAPI, changeUserTypeStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css"
import UserTypeEdit from "./UserTypeEdit";

class UserType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      id: "",
      data: [],
      isEdit: false,
      dataLength: null,
      isFormOpen: false,
    };

  }
  listUserType = () => {
    listUserTypeAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    this.listUserType();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  retrieveUserTypeHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen: false })
    getUserTypeAPI({ id: id.toString() }, (response) => {
      if (response.response.data.success == true) {
        this.setState({
          userType: response.response.data.data[0].user_type,
          id: response.response.data.data[0].id
        })
      }
    });
  };

  AddUserType = () => {
    const { userType } = this.state;
    addUserTypeAPI({ user_type: userType }, (response) => {
      if (response.response.data.success == true) {
        this.setState({ userType: "", isFormOpen: false })
        Notification(1, response.response.data.message, "User Type success");
        this.listUserType();
      }
      else {
        if (response.response.data.error.user_type) {
          Notification(0, response.response.data.error.user_type, "User Type Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "User Type Unique Error")
        }
      }
    });
  };

  EditUserType = () => {
    const { userType, id } = this.state;
    addUserTypeAPI({ user_type: userType, id: id.toString() }, (response) => {
      if (response.response.data.success == true) {
        this.setState({ userType: "", isEdit: false })
        Notification(1, response.response.data.message, "User Type success");
        this.listUserType();
      }
      else {
        if (response.response.data.error.user_type) {
          Notification(0, response.response.data.error.user_type, "User Type Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "User Type Unique Error")
        }
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeUserTypeStatusAPI({ id: id.toString(), active_status: status }, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "User Type status changed")
        this.listUserType();
      }
      else {
        Notification(0, "Something went wrong", "User Type status changed Error")
      }
    })
  }
  cancel = () => {
    this.setState({ isFormOpen: false, isEdit: false, userType: "", id: "" })
  }
  openForm = () => {
    this.setState({ isFormOpen: true, isEdit: false, userType: "", id: "" })
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i className="iconsminds-user text-primary" style={{ fontSize: "x-large" }} />
            <Breadcrumb heading="usertype.usertype-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <UserTypeEdit {...this.state} handleChange={this.handleChange}
                    EditUserType={this.EditUserType}
                    cancel={this.cancel}
                  />
                  : ""}
                {this.state.isFormOpen ?
                  <UserTypeAdd {...this.state} handleChange={this.handleChange}
                    AddUserType={this.AddUserType}
                    cancel={this.cancel}
                  />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-5">
            <UserTypeList {...this.state}
              retrieveUserTypeHandler={this.retrieveUserTypeHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(UserType);