/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, FormGroup, Label, Card, CardBody, Spinner } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import PosOrderHistoryList from "./PosOrderHistoryList";
import "../../assets/css/custom.css";
import { Notification } from "../Utils/Notification";
import {
  listPosOrdersAPI,
  getPosOrdersAPI,
  downloadPosCSVAPI,
  API_BASE_URL
} from "../ApiIntegration";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "../../helpers/IntlMessages";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

class PosOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      data: [],
      dataLength: "",
      detailing_data: [],
      modal: false,
      loader: false,
      file: ""
    };
  }

  handleChangeStart = date => {
    this.setState({
      startDate: moment(date)
    });
    this.listPosOrders(moment(date), this.state.endDate);
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: moment(date)
    });
    this.listPosOrders(this.state.startDate, moment(date));
  };
  componentDidMount() {
    let startdate = "";
    let enddate = "";
    this.listPosOrders(startdate, enddate);
  }

  listPosOrders = (startdate, enddate) => {
    listPosOrdersAPI(
      { start_date: startdate, end_date: enddate },
      apiResponse => {
        if (apiResponse.status == "success") {
          this.setState({
            data: apiResponse.response.data.data,
            dataLength: apiResponse.response.data.data.length
          });
        }
      }
    );
  };

  toggle = values => {
    getPosOrdersAPI({ id: values.toString() }, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data
        }));
      }
    });
  };

  cancel = () => {
    this.setState({ startDate: moment(), endDate: moment(), modal: false });
  };
  // downloadCsv = () => {
  //   this.setState({ loader: true });
  //   downloadPosCSVAPI(apiResponse => {
  //     console.log("DOWNLOAD", apiResponse);

  //     const url = window.URL.createObjectURL(
  //       new Blob([apiResponse.response.data])
  //     );
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "customer_report.xls"); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //     // var fileDownload = require("js-file-download");
  //     // fileDownload(apiResponse.response.data, "customer_report.xls");
  //     this.setState({ loader: false });
  //   });
  // };
  render() {
    const { outletData, outletDataLength } = this.state;
    const OutletOptions = [];
    for (let index = 0; index < outletDataLength; index++) {
      const { id, Outletname } = outletData[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-sand-watch-2 text-primary"
              style={{ fontSize: "x-large", fontWeight: "bold" }}
            />
            <Breadcrumb heading="pos.order-history" match={this.props.match} />
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
                <Label sm="1"></Label>
                <Label sm="2">
                  <i
                    className="iconsminds-clock text-primary"
                    style={{ fontSize: "x-large", fontWeight: "bold" }}
                  />
                  <IntlMessages id="pos.from" />
                </Label>
                <Colxx sm="3">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeStart}
                  />
                </Colxx>
                <Label sm="2">
                  <i
                    className="iconsminds-clock text-primary"
                    style={{ fontSize: "x-large" }}
                  />
                  <IntlMessages id="pos.to" />
                </Label>
                <Colxx sm="3">
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChangeEnd}
                  />
                </Colxx>
                <Colxx sm="1">
                  <a
                    // onClick={this.downloadCsv}
                    href={API_BASE_URL + "/front/pos/csv/"}
                    className="float-right"
                    style={{ marginRight: "10px" }}
                    color="primary"
                  >
                    <i
                      className="iconsminds-downward text-primary"
                      style={{ fontSize: "xx-large" }}
                    />
                  </a>
                </Colxx>
              </FormGroup>
            
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-5">
          <Colxx lg="12" xl="12">
            <PosOrderHistoryList
              {...this.state}
              handleChangeStatus={this.handleChangeStatus}
              toggle={this.toggle}
              cancel={this.cancel}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(PosOrderHistory);
