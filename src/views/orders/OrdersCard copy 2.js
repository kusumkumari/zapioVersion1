/* eslint-disable */
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
import {
  listOrdersAPI,
  getOrderAPI,
  API_BASE_URL,
  orderAllStatusAPI,
  companyId1,
  listReportOutletAPI,
  listOrdersReterieveAPI
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
import { Done } from "@material-ui/icons";

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
      start_date: moment().format("YYYY-MM-DD H:mm:ss"),
      end_date: moment().format("YYYY-MM-DD H:mm:ss"),
      outlet: [],
      outletLength: "",
      outlets: [],
      selectedOutlet: [],
      orderStatus: "",
      paymentMode: [],
      orderSource: "",
    };
  }

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
    const OutletOptions = [{ label: "Select Outlets", value: "", key: "outlet" }];

    let outletArray = []
    for (let i = 0; i < outletLength; i++) {
      outletArray.push(outlet[i].id);
      const { id, Outletname } = outlet[i];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    this.setState({ outlets: outletArray, selectedOutlet: OutletOptions })
    this.listOrders(this.state.start_date, this.state.end_date, outletArray);

    // this.setState({ selectedOutlet: [...this.state.outlet.id] })
  }
  handleChangeOutlet = e => {
    console.log("outlet", e)
    this.setState({ outlet: e });
  };
  // handleChangeOrdStatus = e => {
  //   this.setState({ orderStatus: e });
  // };
  // handleChangePaymentMode = e => {
  //   this.setState({ paymentMode: e });
  // };
  // handleChangeOrdSource = e => {
  //   this.setState({ orderSource: e });
  // };
  componentDidMount() {
    this.listOrders(
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

  listOrders = (startDate, endDate, outlet) => {
    this.setState({ loading: true });
    listOrdersAPI(
      {
        start_date: startDate,
        end_date: endDate,
        outlet_id: outlet,
      },
      apiResponse => {
        console.log("eeeeeeeeeeeeeeee", apiResponse);
        if (apiResponse.response.data.status == true) {
          this.setState(
            {
              data: apiResponse.response.data.orderdata,
              dataLength: apiResponse.response.data.orderdata.length,
              totalSale: apiResponse.response.data.total_sale,
              noOrders: apiResponse.response.data.no_orders,
              pendingOrders: apiResponse.response.data.pending_orders,
              cashSale: apiResponse.response.data.cash_sale,
              discount: apiResponse.response.data.discount,
              cancelled: apiResponse.response.data.cancelled,


            },
            () => this.setState({ loading: false })
          );
        }
        else {
          const err = apiResponse.response.data.error
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`)
          })
        }
      }
    );
  };

  cancel = () => {
    this.setState({ modal: false, isView: false });
  };

  toggle = id => {
    getOrderAPI({ id: id.toString() }, apiResponse => {
      console.log("getttttt", apiResponse);
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
      console.log("jjjjjjjjjjjjjkkkkkkkkk", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          orderStatus: apiResponse.response.data.data,
          orderStatusLength: apiResponse.response.data.data.length,
        })
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })

      }
    });
    // listOrdersReterieveAPI({ id: id.toString() }, apiResponse => {
    //   console.log("yyyyyyyyyyyyyyyyyyyyyyy", apiResponse);
    //   if (apiResponse.response.data.status == true) {
    //     this.setState(
    //       {
    //         orderSource: apiResponse.response.data.orderdata,
    //         orderStatus: apiResponse.response.data.orderdata.length,
    //         paymentMode: apiResponse.response.data.total_sale,
    //         invoiceNo: apiResponse.response.data.no_orders,

    //       },
    //     );
    //   }
    //   else {
    //     const err = apiResponse.response.data.error
    //     Object.keys(err).forEach(v => {
    //       if (err[v]) Notification(0, err[v], `${v} error!`)
    //     })
    //   }
    // });
  }

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
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <i
                  className="iconsminds-clock text-primary"
                  style={{ fontSize: "x-large", fontWeight: "bold" }}
                />
                <IntlMessages id="pos.from" />  &nbsp;&nbsp;&nbsp;
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
                  <i
                  className="iconsminds-clock text-primary "
                  style={{ fontSize: "x-large" }}
                />
                <IntlMessages id="pos.to" />

                <DatePicker
                  timeFormat="H:mm:ss"
                  className="col-3"
                  showTimeSelect
                  timeIntervals={15}
                  selected={moment(this.state.end_date, "YYYY-MM-DD H:mm:ss")}
                  onChange={this.handleChangeEnd}
                  className="mx-3"
                  dateFormat="MM/DD/YYYY h:mm:ss: A"
                />
                <Select
                  className="react-select react-ts col-3"
                  classNamePrefix="react-select"
                  isMulti={true}
                  value={this.state.selectedOutlet}
                  options={OutletOptions}
                  name="outlet"
                  onChange={this.handleChangeOutlet}
                />
                <Button
                  color="success"
                  className="px-3 py-2 col-2-1 font-weight-bold d-flex align-items-center"

                  onClick={() => this.selectAll()}
                >
                  <Done className="mr-1" />
                  Select All Outlets
                </Button>
                {this.state.dataLength > 0 ?
                  <a
                    // onClick={this.downloadCsv}
                    href={API_BASE_URL + "/ordermgnt/Order/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}
                    className="float-right"
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    color="primary"
                  >

                    <i
                      className="iconsminds-downward text-primary"
                      style={{ fontSize: "xx-large" }}
                    />
                  </a>
                  : <i
                    className="iconsminds-downward text-dark mx-3"
                    style={{ fontSize: "xx-large" }}
                  />
                }


              </CardBody>

            </Card>
          </Colxx>

        </Row>
        <Row className="mb-5">
          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <ScheduleRounded
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "10px" }}>
                  Pending Orders
                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.pendingOrders ? this.state.pendingOrders : 0}

                </h4>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <MonetizationOn
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "10px" }}>
                  Cash Sale
                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.cashSale ? this.state.cashSale : 0}
                </h4>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <CheckRounded
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "5px" }}>
                  Total Sale
                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.totalSale ? this.state.totalSale.toFixed(2) : 0}
                </h4>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-5">

          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <BarChart
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "5px" }}>
                  No. Of Orders

                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.noOrders ? this.state.noOrders : 0}

                </h4>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <LocalOffer
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "10px" }}>
                  Discount
                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.discount ? this.state.discount.toFixed(2) : 0}
                </h4>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="4" md="4">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center justify-content-center px-1 py-3">
                <NotInterested
                  style={{
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center", marginLeft: "10px" }}>
                  Cancelled
                </h4>
                <div style={{
                  width: "1px",
                  backgroundColor: "#922c88",
                  marginLeft: "10px",
                  marginRight: "10px",
                  height: "37px"
                }}></div>
                <h4 style={{ fontWeight: "bold", fontSize: "1.2rem", marginLeft: "10px" }}>
                  {this.state.cancelled ? this.state.cancelled : 0}
                </h4>
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
