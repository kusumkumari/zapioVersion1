/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import OutletChangepassword from "./OutletChangePassword";
import { Notification } from "../Utils/Notification";
import { userType,changepasswordAPI } from "../ApiIntegration";

class OutletChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword:"",
      newpassword:"",
      confirmpassword:""
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changepasswordHandler = () => {
    const user_type= userType();
     const {oldpassword, newpassword, confirmpassword } = this.state
     changepasswordAPI({ password:oldpassword,new_pwd:newpassword,
      c_pwd:confirmpassword,user_type: user_type }, ({ response }) => 
      {
        console.log("YYYYYYYYYYYYYYYYYYY",response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "Change Password Success")
        window.location.href="/";
      }
      else {
        if (response.data.error.password) {
          Notification(0, response.data.error.password, "Change Passwrod Error")
        }
        if (response.data.error.new_pwd) {
          Notification(0, response.data.error.new_pwd, "New Password Error")
        }
        if (response.data.error.c_pwd) {
          Notification(0, response.data.error.c_pwd, "Confirm Password Error")
        }
      }
      });
  
  };
  render() {
    return (
      <Fragment>
        <Row>
        <Colxx lg="12" xl="3">
            <Row>
            </Row>
          </Colxx>
          <Colxx xxs="6">
          <div id="form"></div>
            <Breadcrumb heading="account.changepassword" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="3">
            <Row>
            </Row>
          </Colxx>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                  <OutletChangepassword {...this.state}
                    handleChange={this.handleChange}
                    changepasswordHandler={this.changepasswordHandler}
                  />
              </Colxx>
            </Row>
          </Colxx>
        </Row>

      </Fragment>
    );
  }
}
export default injectIntl(OutletChangePass);