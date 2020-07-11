/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import VariantAdd from "./VariantAdd";
import VariantEdit from "./VariantEdit";
import VariantList from "./VariantList";
import {
  addVariantAPI,
  listVariantAPI,
  getVariantAPI,
  changeVariantStatusAPI
} from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class VariantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      isEdit: false,
      description: "",
      errVariant: "",
      data: [],
      dataLength: "",
      isFormOpen: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.listVariant();
  }

  listVariant = () => {
    listVariantAPI(apiResponse => {
      console.log(apiResponse)
      console.log(apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data,
          dataLength: apiResponse.response.data.length
        });
      }
    });
  };
  addVariantHandler = () => {
    const { name } = this.state;
    addVariantAPI({ variant: name }, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Variant success");
        this.setState({ name: "", isFormOpen: false });
        this.listVariant();
      } else {
        if (response.data.error.variant) {
          Notification(0, response.data.error.variant, "Variant Error");
        }
        if (response.data.error.unique_check) {
          Notification(
            0,
            response.data.error.unique_check,
            "Variant Duplication Error"
          );
        }
      }
    });
  };
  retrieveVariantHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false });
    getVariantAPI(id.toString(), ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          name: response.data.data[0].variant,
          id: response.data.data[0].id
        });
      }
    });
  };

  editVariantHandler = () => {
    const { name, id } = this.state;
    addVariantAPI({ id: id.toString(), variant: name }, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Variant success");
        this.setState({ name: "", isEdit: false });
        this.listVariant();
      } else {
        if (response.data.error.variant) {
          Notification(0, response.data.error.variant, "Variant Error");
        }
        if (response.data.error.unique_check) {
          Notification(
            0,
            response.data.error.unique_check,
            "Variant Duplication Error"
          );
        }
      }
    });
  };

  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeVariantStatusAPI(id, status, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Variant status changed"
        );
        this.listVariant();
      } else {
        Notification(
          0,
          "Something went wrong",
          "Category status changed Error"
        );
      }
    });
  };
  cancel = () => {
    this.setState({ isFormOpen: false, isEdit: false, name: "" });
  };
  openForm = () => {
    this.setState({ isFormOpen: true, isEdit: false, name: "" });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-paper-plane text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="menu.variant-management"
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
                  <VariantEdit
                    {...this.state}
                    handleChange={this.handleChange}
                    cancel={this.cancel}
                    editVariantHandler={this.editVariantHandler}
                  />
                ) : (
                    ""
                  )}
                {this.state.isFormOpen ? (
                  <VariantAdd
                    {...this.state}
                    handleChange={this.handleChange}
                    cancel={this.cancel}
                    addVariantHandler={this.addVariantHandler}
                  />
                ) : (
                    ""
                  )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-4">
            <VariantList
              {...this.state}
              listVariant={this.listVariant}
              retrieveVariantHandler={this.retrieveVariantHandler}
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
export default injectIntl(VariantCard);
