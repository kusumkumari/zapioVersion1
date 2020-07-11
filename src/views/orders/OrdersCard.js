/* eslint-disable */
// https://ej2.syncfusion.com/react/documentation/multi-select/checkbox/?_ga=2.186780904.1927746330.1588680483-557052404.1585814557
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, CardBody } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import OrdersList from "./OrdersList";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import { Notification } from "../Utils/Notification";
import "../../assets/css/sass/style/style.css";
import {
  listOrdersAPI,
  getOrderAPI,
  API_BASE_URL,
  companyId1,
  isLoggedIn,
  listReportOutletAPI,
  orderAllStatusAPI,
  listOrdersReterieveAPI,
  listOrderEditAPI
} from "../ApiIntegration";
import IntlMessages from "../../helpers/IntlMessages";
import moment from "moment";
import DatePicker from "react-datepicker";

import {
  BarChart,
  CheckRounded,
  ScheduleRounded,
  MonetizationOn,
  NotInterested,
  LocalOffer
} from "@material-ui/icons";
import '../../assets/css/date.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      isView: false,
      orderId: "",
      id: "",
      detailing_data: [],
      loading: false,
      start_date: moment().format("YYYY-MM-DD 04:00:00"),
      end_date: moment().format("YYYY-MM-DD H:mm:ss"),
      outlet: [],
      outletLength: "",
      outlets: [],
      selectedOutlet: [],
      orderStatus: "",
      paymentMode: [],
      orderSource: "",
      gmv: "",
      transactionID: "",
      checked: true,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeOrdStatus = e => {
    this.setState({ orderStatus: e });
  };
  handleChangePaymentMode = e => {
    this.setState({ paymentMode: e });
  };
  handleChangeOrdSource = e => {
    this.setState({ orderSource: e });
  };
  handleChangeStart = date => {
    this.setState({
      start_date: moment(date).format("YYYY-MM-DD H:mm:ss")
    });
    this.listOrders(moment(date).format("YYYY-MM-DD H:mm:ss"), this.state.end_date, this.state.outlets);
  };

  handleChangeEnd = date => {
    this.setState({
      end_date: moment(date).format("YYYY-MM-DD H:mm:ss")
    });
    this.listOrders(this.state.start_date, moment(date).format("YYYY-MM-DD H:mm:ss"), this.state.outlets);
  };

  handleChangeOutlet = (e) => {
    let outletArray = []
    for (let i = 0; i < e.length; i++) {
      outletArray.push(e[i].value);
    }
    this.setState({ outlets: outletArray, selectedOutlet: e })
    this.listOrders(this.state.start_date, this.state.end_date, outletArray);
  }
  selectAll = () => {
    const { outlet, outletLength } = this.state;
    const OutletOptions = [];

    let outletArray = []
    for (let i = 0; i < outletLength; i++) {
      outletArray.push(outlet[i].id);
      const { id, Outletname } = outlet[i];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    this.setState({ outlets: outletArray, selectedOutlet: OutletOptions, checked: false })
    this.listOrders(this.state.start_date, this.state.end_date, outletArray);
    // this.setState({ selectedOutlet: [...this.state.outlet.id] })
  }
  unSelectAll = () => {
    let outletArray = []
    this.setState({ outlets: [], selectedOutlet: [], checked: true, data: [], dataLength: "" })
    this.listOrders(this.state.start_date, this.state.end_date, outletArray);
    // this.setState({ selectedOutlet: [...this.state.outlet.id] })
  }
  componentDidMount() {
    this.listOrders(
      this.state.start_date,
      this.state.end_date,
      this.state.outlets,
    );
    listReportOutletAPI(apiResponse => {
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

  listOrders = (startDate, endDate, outlet) => {
    this.setState({ loading: true });
    listOrdersAPI(
      {
        start_date: startDate,
        end_date: endDate,
        outlet_id: outlet,
      },
      apiResponse => {
        console.log("aaaaaaaaaaa", apiResponse)
        if (apiResponse.response.data.status == true) {
          this.setState(
            {
              data: apiResponse.response.data.orderdata,
              dataLength: apiResponse.response.data.orderdata.length,
              totalSale: apiResponse.response.data.gmv ? apiResponse.response.data.gmv : 0,
              grossSale: apiResponse.response.data.grosssale ? apiResponse.response.data.grosssale : 0,
              pendingOrders: apiResponse.response.data.pending_orders ? apiResponse.response.data.pending_orders : 0,
              netSale: apiResponse.response.data.netsale ? apiResponse.response.data.netsale : 0,
              discount: apiResponse.response.data.totaldis ? apiResponse.response.data.totaldis : 0,
              cancelled: apiResponse.response.data.cancelled ? apiResponse.response.data.cancelled : 0,
              totalOrder: apiResponse.response.data.totalorder ? apiResponse.response.data.totalorder : 0,
              totalTax: apiResponse.response.data.totaltax ? apiResponse.response.data.totaltax : 0,

            },
            () => this.setState({ loading: false })
          );
        }
        else {
          this.setState({ loading: false })
          const err = apiResponse.response.data.error
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`)
          })
        }
      }
    );
  }

  cancel = () => {
    this.setState({ modal: false, isView: false });
  };

  toggle = id => {
    getOrderAPI({ id: id.toString() }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          isView: true,
          modal: false,
          id: id,
          detailing_data: apiResponse.response.data.data[0]
        });
      }
    });
  };
  manageOrderProcessing = e => {
    const { id } = e.original;
    this.setState({ modal: true })

    orderAllStatusAPI(apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          orderStatusData: apiResponse.response.data.data,
          orderStatusDataLength: apiResponse.response.data.data.length,
        })
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })

      }
    });
    listOrdersReterieveAPI({ id: id.toString() }, apiResponse => {
      console.log("yyyyyyyyyyyyyyyyyyyyyyy", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState(
          {
            orderSource: apiResponse.response.data.data[0].order_source,
            orderStatus: apiResponse.response.data.data[0].order_status,
            paymentMode: apiResponse.response.data.data[0].payment_mode,
            invoiceNo: apiResponse.response.data.data[0].invoice_id,
            id: apiResponse.response.data.data[0].id,
            transactionID: apiResponse.response.data.data[0].transaction_id,

          },
        );
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  }

  editOrder = () => {
    const { orderStatus, orderSource, paymentMode, id, transactionID } = this.state;
    let paymentArray = []
    for (let i = 0; i < paymentMode.length; i++) {
      paymentArray.push(paymentMode[i].value);
    }
    let ordStatus = ""
    if (orderStatus[0]) {
      ordStatus = orderStatus[0].value
    }
    else {
      ordStatus = orderStatus.value
    }
    let ordSource = ""
    if (orderSource[0]) {
      ordSource = orderSource[0].value
    }
    else {
      ordSource = orderSource.value
    }
    listOrderEditAPI({ order_id: id.toString(), order_status: ordStatus, payment_mode: paymentArray, order_source: ordSource, transaction: transactionID }, apiResponse => {
      console.log("qqqqqqqqqqqqqqqqqq", apiResponse)
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "OrderEdit Successfully");
        this.setState({ orderStatus: "", orderSource: "", paymentMode: "", id: "", transaction_id: "", modal: false })

        this.listOrders(this.state.start_date, this.state.end_date, this.state.outlets);
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  }

  render() {
    const {
      outlet, outletLength
    } = this.state;
    const OutletOptions = [];
    for (let index = 0; index < outletLength; index++) {
      const { id, Outletname } = outlet[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    console.log("wwwwwwwwwwwww", this.state)
    return (
      <Fragment>
        <Row >
          <Colxx xxs="12">
            <i
              className="iconsminds-receipt-4 text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="order.order-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="mb-5">
          <Colxx lg="12" xl="12">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center justify-content-center px-2 py-3">
                <IntlMessages id="pos.from" />
                <DatePicker
                  timeFormat="H:mm:ss"
                  showTimeSelect
                  timeIntervals={15}
                  selected={moment(this.state.start_date, "YYYY-MM-DD H:mm:ss")}
                  onChange={this.handleChangeStart}
                  dateFormat="MM/DD/YYYY h:mm:ss: A"
                  popperModifiers={{
                    preventOverflow: {
                      enabled: true,
                    },
                  }}
                />
                  &nbsp;&nbsp;&nbsp;&nbsp;

                <IntlMessages id="pos.to" />

                <DatePicker
                  timeFormat="H:mm:ss"
                  className="col-6"
                  showTimeSelect
                  timeIntervals={15}
                  selected={moment(this.state.end_date, "YYYY-MM-DD H:mm:ss")}
                  onChange={this.handleChangeEnd}
                  className="mx-3"
                  dateFormat="MM/DD/YYYY h:mm:ss: A"
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
                    // href={API_BASE_URL + "/ordermgnt/log/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}

                    href={API_BASE_URL + "/ordermgnt/Order/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}
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
        <Row className="mb-3">
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <ScheduleRounded className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Subtotal
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.totalSale ? `₹${this.state.totalSale.toFixed(2)}` : `₹0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <MonetizationOn className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Gross Sale
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.grossSale ? `₹${this.state.grossSale.toFixed(2)}` : `₹0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <CheckRounded className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Net Sale
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.netSale ? `₹${this.state.netSale.toFixed(2)}` : `₹0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <BarChart className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Total Taxes
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.totalTax ? `₹${this.state.totalTax.toFixed(2)}` : `₹0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-5">
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <LocalOffer className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Discount
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.discount ? `₹${this.state.discount.toFixed(2)}` : `₹0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <NotInterested className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Settled Orders
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.totalOrder ? `${this.state.totalOrder}` : `0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <LocalOffer className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Cancelled Orders
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.cancelled ? `${this.state.cancelled}` : `0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="3" md="3">
            <Card className="rounded-md">
              <CardBody className="d-flex align-items-center px-1 py-3 pl-4">
                <NotInterested className="text-primary rounded mr-3 orders-card-icon"
                />
                <div className="d-flex align-items-left justify-content-center flex-column">

                  <h4 className="orders-card-title">
                    Pending Orders
                </h4>
                  <h4 className="orders-value text-primary">
                    {this.state.pendingOrders ? `${this.state.pendingOrders}` : `0`}

                  </h4>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>


        <Row>
          <Colxx lg="12" xl="12">
            <OrdersList
              title="dashboards.top-viewed-posts"
              {...this.state}
              onFilter={this.onFilter}
              cancel={this.cancel}
              toggle={this.toggle}
              onPageChange={this.onPageChange}
              editOrder={this.editOrder}
              handleChange={this.handleChange}
              handleChangeOrdSource={this.handleChangeOrdSource}
              handleChangePaymentMode={this.handleChangePaymentMode}
              handleChangeOrdStatus={this.handleChangeOrdStatus}
              manageOrderProcessing={this.manageOrderProcessing}
            />
          </Colxx>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}
export default injectIntl(Orders);
