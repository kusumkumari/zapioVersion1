/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AvailabilityList from "./AvailabilityList";
import "../../assets/css/custom.css"
import { Notification } from "../Utils/Notification";
import { listOutletProductAPI, productAvailibiltyAPI } from "../ApiIntegration";

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: "",
    };
  }

  componentWillMount() {
    this.listOutletProduct();
  }

  listOutletProduct = () => {
    listOutletProductAPI((apiResponse) => {
      console.log("ZZZZZZZZZZZZZz",apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,

        });
      }
    })
  }


  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let is_available = !e.original.is_available
    productAvailibiltyAPI({ id: id, is_available: is_available }, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Product Availibility changed")
        this.listOutletProduct();
      }
      else {
        Notification(0, "Something went wrong", "Product Availibility changed Error")
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="availability.availability-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">

            <AvailabilityList {...this.state} handleChangeStatus={this.handleChangeStatus} />

          </Colxx>

        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Availability);