/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import CouponHistoryList from "./CouponHistoryList";
import { listCouponHistoryAPI } from "../ApiIntegration";

class CouponHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      detailing_data: [],
      modalData: []
    };
  }

  componentDidMount() {
    this.listCoupon();
  }
  listCoupon = () => {
    listCouponHistoryAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.message,
          dataLength: apiResponse.response.data.message.length
        });
      }
    });
  };

  toggle = value => {
    console.log("jjjjjjjjjjjj", value);
    this.setState(prevState => ({
      modal: !prevState.modal,
      detailing_data: value.original,
      modalData: value
    }));
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-letter-open text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="coupon.coupon-history-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <CouponHistoryList
              title="dashboards.top-viewed-posts"
              {...this.state}
              toggle={this.toggle}
            />
          </Colxx>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}
export default injectIntl(CouponHistory);
