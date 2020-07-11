/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, CardBody } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import PaymentReportList from "./PaymentReportList";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import "../../assets/css/sass/style/style.css";

import { Notification } from "../Utils/Notification";
import {
  listPaymentReportAPI,
  listReportOutletAPI,
  API_BASE_URL,
  companyId1
} from "../ApiIntegration";
import IntlMessages from "../../helpers/IntlMessages";
import moment from "moment";
import DatePicker from "react-datepicker";
import TimeInput from 'material-ui-time-picker'
import '../../assets/css/date.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class PaymentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      orderId: "",
      id: "",
      detailing_data: [],
      loading: false,
      start_date: moment().format("YYYY-MM-DD 04:00:00  "),
      end_date: moment().format("YYYY-MM-DD H:mm:ss"),
      outlet: [],
      outletLength: "",
      outlets: [],
      selectedOutlet: [],
      checked: true,
    };
  }

  handleChangeStart = date => {
    console.log("yyyyyyyyyyyy", moment(date).format("YYYY-MM-DD H:mm:ss"))
    this.setState({
      start_date: moment(date).format("YYYY-MM-DD H:mm:ss")
    });
    this.listPaymentReport(moment(date).format("YYYY-MM-DD H:mm:ss"), this.state.end_date, this.state.outlets);
  };

  handleChangeEnd = date => {
    this.setState({
      end_date: moment(date).format("YYYY-MM-DD H:mm:ss")
    });
    this.listPaymentReport(this.state.start_date, moment(date).format("YYYY-MM-DD H:mm:ss"), this.state.outlets);
  };

  handleChangeOutlet = (e) => {
    let outletArray = []
    for (let i = 0; i < e.length; i++) {
      outletArray.push(e[i].value);
    }
    this.setState({ outlets: outletArray, selectedOutlet: e })
    this.listPaymentReport(this.state.start_date, this.state.end_date, outletArray);
  }
  selectAll = () => {
    const { outlet, outletLength } = this.state;
    const OutletOptions = [{ label: "Select Outlets", value: "", key: "outlet" }];

    let outletArray = []
    for (let i = 0; i < outletLength; i++) {
      outletArray.push(outlet[i].id);
      const { id, Outletname } = outlet[i];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    this.setState({ outlets: outletArray, selectedOutlet: OutletOptions, checked: false })
    this.listPaymentReport(this.state.start_date, this.state.end_date, outletArray);

    // this.setState({ selectedOutlet: [...this.state.outlet.id] })
  }
  unSelectAll = () => {
    let outletArray = []
    this.setState({ outlets: [], selectedOutlet: [], checked: true, data: [], dataLength: "" })
    this.listPaymentReport(this.state.start_date, this.state.end_date, []);
    // this.setState({ selectedOutlet: [...this.state.outlet.id] })
  }
  componentDidMount() {
    this.listPaymentReport(
      this.state.start_date,
      this.state.end_date,
      this.state.outlets,
    );
    listReportOutletAPI(apiResponse => {
      console.log("oooooooooooooooooooo", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState(
          {
            outlet: apiResponse.response.data.data,
            outletLength: apiResponse.response.data.data.length,

          });
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    })
  }

  listPaymentReport = (startDate, endDate, outlet) => {
    this.setState({ loading: true });
    listPaymentReportAPI(
      {
        start_date: startDate,
        end_date: endDate,
        outlet_id: outlet,
      },
      apiResponse => {
        console.log("eeeeeeeeeeeeeeee", apiResponse);
        if (apiResponse.response.data.success == true) {
          this.setState(
            {
              data: apiResponse.response.data.data,
              dataLength: apiResponse.response.data.data.length,

            },
            () => this.setState({ loading: false })
          );
        }
        else {
          const err = apiResponse.response.data.error
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`)
          })
          this.setState({ loading: false })
        }
      }
    );
  };

  render() {
    const {
      outlet, outletLength
    } = this.state;
    const OutletOptions = [{ label: "Select Outlets", value: "", key: "outlet" }];
    for (let index = 0; index < outletLength; index++) {
      const { id, Outletname } = outlet[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-coins text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="menu.payment-report"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="mb-5">
          <Colxx lg="12" xl="12">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">

                <i
                  className="iconsminds-clock text-primary"
                  style={{ fontSize: "x-large", fontWeight: "bold" }}
                />
                <IntlMessages id="pos.from" />&nbsp;&nbsp;
                <DatePicker
                  timeFormat="H:mm:ss"
                  showTimeSelect
                  timeIntervals={15}
                  selected={moment(this.state.start_date, "YYYY-MM-DD H:mm:ss")}
                  onChange={this.handleChangeStart}
                  dateFormat="MM/DD/YYYY h:mm:ss: A"
                  style={{ width: "30%" }}
                />

                <i
                  className="iconsminds-clock text-primary "
                  style={{ fontSize: "x-large" }}
                />
                <IntlMessages id="pos.to" />

                <DatePicker
                  timeFormat="H:mm:ss"
                  showTimeSelect
                  timeIntervals={15}
                  selected={moment(this.state.end_date, "YYYY-MM-DD H:mm:ss")}
                  onChange={this.handleChangeEnd}
                  className="mx-3"
                  dateFormat="MM/DD/YYYY h:mm:ss: A"
                  style={{ width: "30%" }}
                />
                <ReactMultiSelectCheckboxes style={{ width: "300px", marginRight: "30px" }} name="outlet" value={this.state.selectedOutlet} onChange={this.handleChangeOutlet} options={OutletOptions} />
                {this.state.checked ?
                  <img src="https://img.icons8.com/material-outlined/30/000000/checked.png" color="primary" onClick={() => this.selectAll()} style={{ margin: "0 15px" }} />
                  :
                  <img src="https://img.icons8.com/material-outlined/30/000000/cancel.png" onClick={() => this.unSelectAll()} style={{ margin: "0 15px" }} />
                }
                {this.state.dataLength > 0 ?
                  <a
                    // onClick={this.downloadCsv}
                    target="_blank"
                    href={API_BASE_URL + "/ordermgnt/payment/report/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}

                    // href={API_BASE_URL + "/ordermgnt/payment/report/csv/"}
                    className="float-right"
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    color="primary"
                  >
                    <i
                      className="simple-icon-cloud-download bg-primary text-white downloadBtn"
                    />
                  </a>
                  : null
                }

              </CardBody>

            </Card>

          </Colxx>

        </Row>

        <Row>
          <Colxx lg="12" xl="12">
            <PaymentReportList
              title="dashboards.top-viewed-posts"
              {...this.state}
              onFilter={this.onFilter}
              cancel={this.cancel}
              onPageChange={this.onPageChange}
            />
          </Colxx>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}
export default injectIntl(PaymentReport);
