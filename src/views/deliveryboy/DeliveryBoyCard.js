/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import DeliveryBoyAdd from "./DeliveryBoyAdd";
import DeliveryBoyEdit from "./DeliveryBoyEdit";
import DeliveryBoyList from "./DeliveryBoyList";
import {
  changeDeliveryBoyStatusAPI,
  addOutletDeliveryBoyAPI,
  addBrandDeliveryBoyAPI,
  retriveDeliveryBoyAPI,
  listDeliveryBoyAPI,
  listActiveOutletAPI,
  userType
} from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class DeliveryBoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      mobile: "",
      isEdit: false,
      address: "",
      data: [],
      dataLength: null,
      file: null,
      fileData: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null, fileData: null });
  }
  handleChangeOutlet = e => {
    this.setState({ outlet: e });
  };

  addDeliveryBoyHandler = () => {
    const { id, name, email, mobile, address, fileData } = this.state;
    addOutletDeliveryBoyAPI(
      id,
      name,
      email,
      mobile,
      address,
      fileData,
      ({ response }) => {
        console.log("aaaaaaaaaaa", response);
        if (response.data.success == true) {
          Notification(1, response.data.message, "Delivery Boy Success");
          this.setState({
            name: "",
            email: "",
            mobile: "",
            address: "",
            id: ""
          });
          this.listDeliveryBoy();
        } else {
          console.log(response.data.error);
          if (response.data.error.name) {
            Notification(0, response.data.error.name, "Name Error");
          }
          if (response.data.error.email) {
            Notification(0, response.data.error.email, "Email Error");
          }
          if (response.data.error.mobile) {
            Notification(0, response.data.error.mobile, "Mobile Error");
          }
          if (response.data.error.address) {
            Notification(0, response.data.error.address, "Address Error");
          }
          if (response.data.error.image_size) {
            Notification(0, response.data.error.image_size, "Image Size Error");
          }
          if (response.data.error.unique_check) {
            Notification(
              0,
              response.data.error.unique_check,
              "Delivery Boy Duplication Error"
            );
          }
        }
      }
    );
  };

  editDeliveryBoyHandler = () => {
    const { id, name, email, mobile, address, fileData } = this.state;
    addOutletDeliveryBoyAPI(
      id,
      name,
      email,
      mobile,
      address,
      fileData,
      ({ response }) => {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeee", response);
        if (response.data.success == true) {
          Notification(1, response.data.message, "Delivery Boy Success");
          this.setState({
            name: "",
            email: "",
            mobile: "",
            address: "",
            file: "",
            id: "",
            isEdit: false
          });
          this.listDeliveryBoy();
        } else {
          console.log(response.data.error);
          if (response.data.error.name) {
            Notification(0, response.data.error.name, "Name Error");
          }
          if (response.data.error.email) {
            Notification(0, response.data.error.email, "Email Error");
          }
          if (response.data.error.mobile) {
            Notification(0, response.data.error.mobile, "Mobile Error");
          }
          if (response.data.error.address) {
            Notification(0, response.data.error.address, "Address Error");
          }
          if (response.data.error.image_size) {
            Notification(0, response.data.error.image_size, "Image Size Error");
          }

          if (response.data.error.unique_check) {
            Notification(
              0,
              response.data.error.unique_check,
              "Delivery Boy Duplication Error"
            );
          }
        }
      }
    );
  };

  addBrandDeliveryBoyHandler = () => {
    const { id, name, email, mobile, address, fileData, outlet } = this.state;
    let outletArray = [];
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    addBrandDeliveryBoyAPI(
      id,
      name,
      email,
      mobile,
      address,
      fileData,
      outletArray,
      ({ response }) => {
        console.log("bbbbbbbbbbbbbbbb", response);
        if (response.data.success == true) {
          Notification(1, response.data.message, "Delivery Boy Success");
          this.setState({
            name: "",
            email: "",
            mobile: "",
            address: "",
            outlet: [],
            id: "",
            modal: false
          });
          this.listDeliveryBoy();
        } else {
          console.log(response.data.error);
          const err = response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };
  editBrandDeliveryBoyHandler = () => {
    const { id, name, email, mobile, address, fileData, outlet } = this.state;
    let outletArray = [];
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    addBrandDeliveryBoyAPI(
      id,
      name,
      email,
      mobile,
      address,
      fileData,
      outletArray,
      ({ response }) => {
        console.log("edit brand", response);
        if (response.data.success == true) {
          Notification(1, response.data.message, "Delivery Boy Success");
          this.setState({
            name: "",
            email: "",
            mobile: "",
            address: "",
            file: "",
            id: "",
            outlet: [],
            isEdit: false,
            isFormOpen: false,
            modal: false
          });
          this.listDeliveryBoy();
        } else {
          console.log(response.data.error);
          const err = response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  cancel = () => {
    this.setState({
      name: "",
      email: "",
      mobile: "",
      address: "",
      file: "",
      id: "",
      outlet: [],
      isEdit: false,
      isFormOpen: false,
      modal: false
    });
  };
  retrieveDeliveryBoyHandler = id => {
    this.setState({ isEdit: true });
    retriveDeliveryBoyAPI(id.toString(), ({ response }) => {
      console.log("iiiiiiiiiiiiii", response);

      if (response.data.success == true) {
        this.setState({
          name: response.data.data[0].name,
          email: response.data.data[0].email,
          mobile: response.data.data[0].mobile,
          address: response.data.data[0].address,
          outlet: response.data.data[0].outlet,
          file: response.data.data[0].profile_pic,
          id: response.data.data[0].id,
          modal: false
        });
      }
    });
  };
  toggle = id => {
    retriveDeliveryBoyAPI(id.toString(), apiResponse => {
      console.log("tttt", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data[0]
        }));
      }
    });
  };
  listDeliveryBoy = () => {
    listDeliveryBoyAPI(apiResponse => {
      console.log("kkkkkkkkkkkkkkk", apiResponse);
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
  componentWillMount() {
    this.listDeliveryBoy();
    this.listOutlet();
  }

  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeDeliveryBoyStatusAPI(id, status, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Delivery Boy status changed"
        );
        this.listDeliveryBoy();
      } else {
        Notification(
          0,
          "Something went wrong",
          "Delivery Boy status changed Error"
        );
      }
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      modal: false,
      name: "",
      email: "",
      mobile: "",
      address: "",
      outlet: [],
      file: "",
      id: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-tractor text-primary"
              style={{ fontSize: "xx-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="menu.delivery-boy-management"
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
                  <DeliveryBoyEdit
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    editDeliveryBoyHandler={this.editDeliveryBoyHandler}
                    editBrandDeliveryBoyHandler={
                      this.editBrandDeliveryBoyHandler
                    }
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                    handleChangeOutlet={this.handleChangeOutlet}
                  />
                ) : (
                  <DeliveryBoyAdd
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    addDeliveryBoyHandler={this.addDeliveryBoyHandler}
                    addBrandDeliveryBoyHandler={this.addBrandDeliveryBoyHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                    handleChangeOutlet={this.handleChangeOutlet}
                  />
                )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <DeliveryBoyList
              {...this.state}
              retrieveDeliveryBoyHandler={this.retrieveDeliveryBoyHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              toggle={this.toggle}
              cancel={this.cancel}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DeliveryBoy);
