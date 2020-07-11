/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, CardBody, Card, CardTitle, Button, Label } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import RecentOrders from "./RecentOrders";
import RadialProgressCard from "../../../components/cards/RadialProgressCard";
import ProfileStatuses from "../../../containers/dashboards/ProfileStatuses";
import BestSellers from "./BestSellers";
import OutletsRevenue from "./OutletsRevenue";
import SalesComparision from "./SalesComparision";
import "../../../assets/css/custom.css";
import { ThemeColors } from "../../../helpers/ThemeColors";
import {
  listDashboardCardsAPI,
  brandOutletOnOff
} from "../../apiServices/DashboardApis";
import { getOrderAPI, manageOrderProcessingAPI } from "../../ApiIntegration";
import { Receipt } from "@material-ui/icons";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { centerContent } from "../../../constants/defaultValues";
import {
  BarChart,
  TrendingUp,
  CheckRounded,
  ScheduleRounded,
  Alarm,
  CalendarToday
} from "@material-ui/icons";
import { Notification } from "../../Utils/Notification";

// https://gogo-react.coloredstrategies.com/app/dashboards/analytics
const colors = ThemeColors();

class DefaultDashboard extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
      days: "",
      orderCardData: [],
      revenuData: [],
      orderDetails: [],
      bestSeller: [],
      detailing_data: [],
      isView: false,
      modal: false,
      isOpen: false,
      id: ""
    };
  }
  listDashboard() {
    listDashboardCardsAPI(apiResponse => {
      console.log("hhhhhh", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          orderCardData: apiResponse.response.data.data[0],
          bestSeller: apiResponse.response.data.data[0].best_seller,
          revenuData: apiResponse.response.data.data[0].outlet_revenue,
          orderDetails: apiResponse.response.data.data[0].order_details,
          week1Report: apiResponse.response.data.data[0].week_1_report,
          week2Report: apiResponse.response.data.data[0].week_2_report,
          isOpen: apiResponse.response.data.is_open,
          newCustomerReport:
            apiResponse.response.data.data[0].new_customer_report,
          loyalCustomerReport:
            apiResponse.response.data.data[0].loyal_customer_report
        });
      }
    });
  }
  componentDidMount() {
    this.listDashboard();
    // create the interval once component is mounted
    var today = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;

    this.update = setInterval(() => {
      this.setState({ time: new Date(), days: date });
    }, 1 * 1000); // every 1 seconds
  }

  componentWillUnmount() {
    // delete the interval just before component is removed
    clearInterval(this.update);
  }
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

  cancel = () => {
    this.setState({ isView: false, modal: false });
  };
  handleChangeStatus = e => {
    brandOutletOnOff({ is_open: e.toString() }, apiResponse => {
      console.log("ttttttttttt", apiResponse);
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "");
        this.setState({
          isOpen: e
        });
      }
    });
  };
  poslogin=()=>{

    // window.open('http://www.smkproduction.eu5.org', '_blank');

  }

  render() {
    const {
      time,
      days,
      orderCardData,
      bestSeller,
      week1Report,
      week2Report,
      newCustomerReport,
      loyalCustomerReport
    } = this.state;
    const { messages } = this.props.intl;
    const produtcs = [];
    if (bestSeller) {
      for (let i = 0; i < bestSeller.length; i++) {
        const {
          id,
          product_name,
          food_type,
          product_desc,
          product_image
        } = bestSeller[i];
        produtcs.push({
          id: id,
          title: product_name,
          category: food_type,
          description: product_desc,
          img: product_image
        });
      }
    }
    const lineChartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "First",
          data: week1Report,
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          // pointHitRadius:stepWeek1,
          fill: false
        },
        {
          label: "Second",
          data: week2Report,
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          // pointHitRadius:stepWeek2,
          fill: false
        }
      ]
    };
    const CustomerData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "New Customer",
          data: newCustomerReport,
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          // pointHitRadius:stepWeek1,
          fill: false
        },
        {
          label: "Loyal Customer",
          data: loyalCustomerReport,
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          // pointHitRadius:stepWeek2,
          fill: false
        }
      ]
    };
    const totalOrdersData = [
      {
        title: "Today",
        totalOrd: orderCardData.today_order_count
          ? orderCardData.today_order_count
          : "0",
        totalRevn: orderCardData.today_revenue
          ? orderCardData.today_revenue.toFixed(2)
          : "0",
        colorClass: "text-info"
      },
      {
        title: "Month to yesterday",
        totalOrd: orderCardData.month_to_yesterday
          ? orderCardData.month_to_yesterday
          : "0",
        totalRevn: orderCardData.month_to_yesterday_revenue
          ? orderCardData.month_to_yesterday_revenue.toFixed(2)
          : "0",
        colorClass: "text-primary"
      },
      {
        title: "Last week same day total",
        totalOrd: orderCardData.last_week_day
          ? orderCardData.last_week_day
          : "0",
        totalRevn: orderCardData.last_week_day_revenue
          ? orderCardData.last_week_day_revenue.toFixed(2)
          : "0",
        colorClass: "text-danger"
      }
    ];

    const totalCustomerData = [
      {
        title: "New Customers",
        segment: "0",
        thisMonth: "0",
        lastMonth: "0",
        change: "0",
        colorClass: "text-danger"
      },
      {
        title: "Loyal Customers",
        segment: "0",
        thisMonth: "0",
        lastMonth: "0",
        change: "0",
        colorClass: "text-primary"
      }
    ];
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="menu.default"
              style={{ float: "right" }}
              match={this.props.match}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="4" md="6">
            <Card className="rounded-sm">
              <CardBody className={`${centerContent} px-1 py-3`}>
                <Alarm />
                <p
                  style={{ fontSize: "15px" }}
                  className="pl-2 m-0 font-weight-bold text-primary"
                >
                  {time.toLocaleTimeString()}
                </p>
                <CalendarToday
                  fontSize="large"
                  style={{
                    borderLeft: "1px solid #000",
                    marginLeft: "20px",
                    paddingLeft: "15px"
                  }}
                />
                <p
                  style={{ fontSize: "15px" }}
                  className="pl-2 m-0 font-weight-bold"
                >
                  {days}
                </p>
              </CardBody>
            </Card>
          </Colxx>
          {/* <Colxx xxs="12" lg="3" md="6">
            <Card className="rounded-sm" style={{ paddingTop: "10px" }}>
              <CardBody className={`${centerContent} px-1 py-3`}>
                <Alarm />
                <p
                  style={{ fontSize: "15px" }}
                  className="pl-2 m-0 font-weight-bold text-primary"
                >
                  Is Open
                </p>
                <p
                  style={{ fontSize: "15px" }}
                  className="pl-2 m-0 font-weight-bold"
                >
                  &nbsp;&nbsp;
                  <Switch
                    id={name}
                    name={name}
                    className={this.props.className}
                    checked={this.state.isOpen ? this.state.isOpen : false}
                    onChange={e => this.handleChangeStatus(e)}
                  />
                </p>
              </CardBody>
            </Card>
          </Colxx>
           */}
          <Colxx xxs="12" lg="6" md="12">
            &nbsp;
          </Colxx>

          {/* <Colxx xxs="12" lg="5" md="6">
            <div className="search-sm d-inline-block ">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search for customer #"
                className="mt-2"
                // onKeyPress={e => this.handleKeyPress(e)}
              />
            </div>
          </Colxx> */}
          <Colxx xxs="12" lg="2" md="5">
            <a href="https://instapos-7b16b.firebaseapp.com/" target="_blank">
              <Button
                className="px-3 py-2 font-weight-bold d-flex align-items-center"
                style={{ marginTop: "13px" }}
                // onClick={()=>this.poslogin()}
              >
                <Receipt className="mr-1" />
                Go To Billing
               </Button>
            </a>
          </Colxx>
        </Row>
        <Separator className="my-3" />
        <Row>
          <Colxx xl="5" lg="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="d-flex align-items-center justify-content-center flex-column">
                  <BarChart
                    style={{
                      width: "45px",
                      height: "45px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}
                    className="text-primary rounded p-2 mb-3"
                  />
                  <h2>Important Stats</h2>
                </CardTitle>
                <div
                  className="flexbox"
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      lineHeight: "1rem",
                      width: "30%",
                      padding: "3px",
                      marginBottom: "10px"
                    }}
                  ></div>

                  <div
                    style={{
                      width: "25%",
                      lineHeight: "1rem",
                      padding: "3px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    Total Orders
                  </div>
                  <div
                    style={{
                      width: "29%",
                      lineHeight: "1rem",
                      padding: "3px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    Total Revenue
                  </div>
                </div>

                {totalOrdersData.map((s, index) => {
                  return (
                    <div
                      key={index}
                      className="flexbox"
                      style={{
                        justifyContent: "space-between",
                        marginBottom: "10px"
                      }}
                    >
                      <div
                        style={{
                          lineHeight: "1rem",
                          borderBottom: "1px solid",
                          fontSize: "large",
                          padding: "3px",
                          width: "30%"
                        }}
                        className={s.colorClass}
                      >
                        {s.title}
                      </div>

                      <div
                        style={{
                          width: "25%",
                          lineHeight: "2rem",
                          padding: "3px",
                          fontSize: "large",
                          textAlign: "center"
                        }}
                        className={s.colorClass}
                      >
                        {s.totalOrd}
                      </div>
                      <div
                        style={{
                          width: "29%",
                          lineHeight: "2rem",
                          fontSize: "large",
                          textAlign: "center"
                        }}
                        className={s.colorClass}
                      >
                        {s.totalRevn}
                      </div>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xl="5" lg="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="d-flex align-items-center justify-content-center flex-column">
                  <TrendingUp
                    style={{
                      width: "45px",
                      height: "45px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}
                    className="text-primary rounded p-2 mb-3"
                  />
                  <h2>MTD Customers vs LMTD</h2>
                </CardTitle>
                <div
                  className="flexbox"
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      lineHeight: "1rem",
                      padding: "3px",
                      marginBottom: "10px"
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "60%",
                      padding: "3px"
                    }}
                  >
                    <div
                      style={{
                        lineHeight: "1rem",
                        padding: "3px",
                        fontWeight: "bold"
                      }}
                    >
                      This Month
                    </div>
                    <div
                      style={{
                        lineHeight: "1rem",
                        padding: "3px",
                        fontWeight: "bold"
                      }}
                    >
                      Last month
                    </div>
                    <div
                      style={{
                        lineHeight: "1rem",
                        padding: "3px",
                        fontWeight: "bold"
                      }}
                    >
                      % Change
                    </div>
                  </div>
                </div>
                {totalCustomerData.map((s, index) => {
                  return (
                    <div
                      key={index}
                      className="flexbox"
                      style={{
                        justifyContent: "space-between",
                        marginBottom: "10px"
                      }}
                    >
                      <div
                        style={{
                          lineHeight: "1rem",
                          borderBottom: "1px solid",
                          padding: "3px",
                          fontSize: "large"
                        }}
                        className={s.colorClass}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "60%",
                          padding: "3px",
                          marginBottom: "10px"
                        }}
                      >
                        <div
                          style={{
                            lineHeight: "1rem",
                            fontSize: "large"
                          }}
                          className={s.colorClass}
                        >
                          {s.thisMonth}
                        </div>
                        <div
                          style={{
                            lineHeight: "1rem",
                            fontSize: "large"
                          }}
                          className={s.colorClass}
                        >
                          {s.lastMonth}
                        </div>
                        <div
                          style={{
                            lineHeight: "1rem",
                            fontSize: "large"
                          }}
                          className={s.colorClass}
                        >
                          {s.change}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <br />
                <br />
                <br />
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xl="2" lg="12" className="mb-4">
            <Card>
              <CardBody className={`${centerContent} flex-column`}>
                <CheckRounded
                  style={{
                    width: "45px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center" }}>
                  {messages["dashboards.completed-orders"]}
                </h4>
                <Separator className="w-20 mb-1" />
                <h4 style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                  {orderCardData.completed_orders
                    ? orderCardData.completed_orders
                    : "0"}
                </h4>
                <br /> <br />
                <ScheduleRounded
                  style={{
                    width: "45px",
                    height: "30px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                  className="text-primary rounded mb-2"
                />
                <h4 style={{ textAlign: "center" }}>
                  {messages["dashboards.pending-orders"]}
                </h4>
                <Separator className="w-20 mb-1" />
                <h4 style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                  {orderCardData.pending_orders
                    ? orderCardData.pending_orders
                    : "0"}
                </h4>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx lg="6" xl="6" className="mb-4">
            <SalesComparision
              id="dashboards.sales-comparision"
              icon="iconsminds-line-chart-1 text-primary"
              lineChartData={lineChartData}
            />
          </Colxx>
          <Colxx lg="6" xl="6" className="mb-4">
            <SalesComparision
              id="dashboards.new-vs-loyal-customer"
              icon="iconsminds-line-chart-3 text-primary"
              lineChartData={CustomerData}
            />
          </Colxx>
        </Row>

        <Row>
          <Colxx xl="6" lg="12" className="mb-4">
            <BestSellers produtcs={produtcs} />
          </Colxx>
          <Colxx xl="6" lg="12" className="mb-4">
            <OutletsRevenue {...this.state} />
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12" md="12" className="mb-4">
            <RecentOrders
              {...this.state}
              cancel={this.cancel}
              handleOrderProcess={this.handleOrderProcess}
              toggle={this.toggle}
              manageOrderProcessing={this.manageOrderProcessing}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DefaultDashboard);
