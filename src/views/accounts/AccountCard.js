/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AccountAdd from "./AccountAdd";
import { Notification } from "../Utils/Notification";
import { listCompanyAPI, addProfileAPI } from "../ApiIntegration";


class AccountCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: "",
      username: "",
      company_email_id: "",
      company_contact_no: "",
      address: "",
      website: "",
      owner_name: "",
      owner_email: "",
      owner_phone: "",
      support_person: "",
      support_person_email_id: "",
      support_person_mobileno: "",
      support_person_landlineno: "",
      contact_person: "",
      contact_person_email_id: "",
      contact_person_mobileno: "",
      contact_person_landlineno: ""

    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.onDropBanner = this.onDropBanner.bind(this);
    this.resetBannerFile = this.resetBannerFile.bind(this);
  }

  companydata = () => {
    listCompanyAPI((response) => {
      console.log("fffffffffffff", response)
      if (response.status == "success") {
        this.setState({
          address: response.response.data.data[0].address,
          billing_address: response.response.data.data[0].billing_address,
          billing_city: response.response.data.data[0].billing_city,
          billing_country: response.response.data.data[0].billing_country,
          billing_currency: response.response.data.data[0].billing_currency,
          billing_state: response.response.data.data[0].billing_state,
          company_contact_no: response.response.data.data[0].company_contact_no,
          company_email_id: response.response.data.data[0].company_email_id,
          company_gstNo: response.response.data.data[0].company_gstNo,
          company_logo: response.response.data.data[0].company_logo,
          company_name: response.response.data.data[0].company_name,
          company_registrationNo: response.response.data.data[0].company_registrationNo,
          company_tinnNo: response.response.data.data[0].company_tinnNo,
          company_vatNo: response.response.data.data[0].company_vatNo,
          contact_person: response.response.data.data[0].contact_person,
          contact_person_email_id: response.response.data.data[0].contact_person_email_id,
          contact_person_landlineno: response.response.data.data[0].contact_person_landlineno,
          contact_person_mobileno: response.response.data.data[0].contact_person_mobileno,
          owner_email: response.response.data.data[0].owner_email,
          owner_name: response.response.data.data[0].owner_name,
          owner_phone: response.response.data.data[0].owner_phone,
          support_person: response.response.data.data[0].support_person,
          support_person_email_id: response.response.data.data[0].support_person_email_id,
          support_person_landlineno: response.response.data.data[0].support_person_landlineno,
          support_person_mobileno: response.response.data.data[0].support_person_mobileno,
          username: response.response.data.data[0].username,
          website: response.response.data.data[0].website,
          file: response.response.data.data[0].company_logo,
          bannerFile: response.response.data.data[0].company_landing_imge,
        });
      }
    });
  }

  componentDidMount() {
    this.companydata();
  }
  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0],
    });
  }
  onDropBanner(event) {
    this.setState({
      bannerFile: URL.createObjectURL(event.target.files[0]),
      bannerFileData: event.target.files[0],
    });
  }
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  resetBannerFile(event) {
    event.preventDefault();
    this.setState({ bannerFile: null });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange1 = selectedOption => {
    this.setState({ outletValues: selectedOption })
  }

  AddProfileDetail = () => {
    const { fileData, address, website, support_person,
      support_person_email_id, support_person_mobileno,
      owner_name, owner_email, owner_phone, bannerFileData } = this.state;
    addProfileAPI(fileData, address, website, support_person,
      support_person_email_id, support_person_mobileno,
      owner_name, owner_email, owner_phone, bannerFileData, ({ response }) => {
        console.log("adddddddddddddd", response)
        if (response.data.success == true) {
          Notification(1, response.data.message, "Profile success");
          localStorage.setItem("logo", response.data.data[0].company_logo);
          this.companydata();
          window.location.href = "/settings"
        }
        else {
          if (response.data.error.owner_name) {
            Notification(0, response.data.error.owner_name, "Owner Name Error")
          }
          if (response.data.error.owner_email) {
            Notification(0, response.data.error.owner_email, "Owner Email Error")
          }
          if (response.data.error.owner_phone) {
            Notification(0, response.data.error.owner_phone, "Owner Phone Error")
          }
          if (response.data.error.support_person_email_id) {
            Notification(0, response.data.error.support_person_email_id, "Support Person Email Error")
          }
          if (response.data.error.support_person_mobileno) {
            Notification(0, response.data.error.support_person_mobileno, "Support Person Mobile No Error")
          }
          if (response.data.error.support_person) {
            Notification(0, response.data.error.support_person, "Support Person Name Error")
          }
          if (response.data.error.address) {
            Notification(0, response.data.error.address, "Company Address Error")
          }
          if (response.data.error.image_size) {
            Notification(0, response.data.error.image_size, "Settings Image Error")
          }
          if (response.data.error.website) {
            Notification(0, response.data.error.website, "Website Error")
          }
          if (response.data.errors) {
            Notification(0, response.data.errors, "Error")
          }
        }
      });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-gear text-primary" style={{ fontSize: "x-large" }} />&nbsp;
            <Breadcrumb heading="account.managements" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <AccountAdd {...this.state} handleChange={this.handleChange}
                  handleChange1={this.handleChange1}
                  addCategoryHandler={this.addCategoryHandler}
                  onDrop={this.onDrop}
                  AddProfileDetail={this.AddProfileDetail}
                  resetFile={this.resetFile}
                  onDropBanner={this.onDropBanner}
                  resetBannerFile={this.resetBannerFile}
                />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(AccountCard);