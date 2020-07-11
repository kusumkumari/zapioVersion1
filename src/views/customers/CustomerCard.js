/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, Input } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import CustomerList from "./CustomerList";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Notification } from "../Utils/Notification";
import {
  listCustomerAPI,
  changecustomerStatusAPI,
  getCustomerAPI,
  uploadExcelFormatAPI
} from "../ApiIntegration";
import $ from "jquery";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      detailing_data: [],
      page: 1,
      pages: 2,
      loading: false
    };
  }
  onPageChange = e => {
    this.setState({ page: e + 1 });
    this.listCustomer(e + 1);
  };
  componentDidMount() {
    this.listCustomer(this.state.page);
  }
  UploadExcel = () => {
    $(".file-upload").click();
  };
  handleChangeImage = e => {
    let file = e.target.files[0];
    console.log(file);
    uploadExcelFormatAPI(file, response => {
      console.log("image upateeeeeeee", response);
      if (response.response.data.success == true) {
        Notification(1, response.response.data.message, "Excel Upload Success");
        this.listCustomer(e + 1);
      } else {
        const err = response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };
  listCustomer = page => {
    this.setState({ loading: true });
    listCustomerAPI(page, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState(
          {
            data: apiResponse.response.data.data,
            pages: apiResponse.response.data.page_count,
            page: this.state.page,
            dataLength: apiResponse.response.data.data.length
          },
          () => this.setState({ loading: false })
        );
      }
    });
  };

  getCustomerDetailHandler = id => {
    getCustomerAPI({ id: id.toString() }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data[0]
        }));
      }
    });
  };
  modalCancel = () => {
    this.setState({
      modal: false
    });
  };
  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changecustomerStatusAPI({ id: id, active_status: status }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Customer status changed"
        );
        this.listCustomer(e + 1);
      } else {
        Notification(
          0,
          "Something went wrong",
          "Customer status changed Error"
        );
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-people text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="customer.management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="mb-2">
          <Colxx lg="12" xl="12">
            <Card>
              <CardHeader
                style={{ marginLeft: "21px" }}
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "black" }}
                  >
                    <SearchIcon />
                  </Avatar>
                }
                title={<h3>Refine Your Result</h3>}
              />
              <FormGroup row>
                <Label sm="2"></Label>
                <Colxx sm="5">
                  <Input
                    name="searchValue"
                    type="text"
                    placeholder="Please Type Anything ......"
                  // value={this.props.catArray}
                  // onChange={this.handlesearch}
                  />
                </Colxx>
                <Colxx sm="2">
                  <Button onClick={this.seraching}>Search</Button>
                </Colxx>
              </FormGroup>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx lg="12" xl="12">
            <CustomerList
              title="dashboards.top-viewed-posts"
              {...this.state}
              getCustomerDetailHandler={this.getCustomerDetailHandler}
              modalCancel={this.modalCancel}
              handleChangeStatus={this.handleChangeStatus}
              UploadExcel={this.UploadExcel}
              handleChangeImage={this.handleChangeImage}
              onPageChange={this.onPageChange}
            />
          </Colxx>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}
export default injectIntl(Customer);
