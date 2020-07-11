/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import CustomerHistoryList from "./CustomerHistoryList";
import { listCustomerDataAPI } from "../ApiIntegration";


class CustomerHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      detailing_data: [],
      modalData: [],
      customerDetail: [],
    };
  }

  componentWillMount() {
    this.listCustomerData();
  }
  listCustomerData = () => {
    listCustomerDataAPI({ mobile: this.props.match.params.mobile }, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.orderdata,
          customerDetail: apiResponse.response.data.orderdata[0],
          dataLength: apiResponse.response.data.orderdata.length,
        });
      }
    })
  }

  toggle = (value) => {
    console.log("toggleeeeeeeee", value)
    this.setState(prevState => ({
      modal: !prevState.modal,
      detailing_data: value.original,
      modalData: value,
    }));

  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="customer.customer-history-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <CustomerHistoryList title="dashboards.top-viewed-posts" {...this.state}
              toggle={this.toggle}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(CustomerHistory);