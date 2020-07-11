/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import RecentOrders from './RecentOrders';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import BestSellers from './BestSellers';
import OutletsRevenue from './OutletsRevenue';
import SalesComparision from './SalesComparision';
import '../../../assets/css/custom.css';
import { ThemeColors } from '../../../helpers/ThemeColors';
import { listOutletDashboardAPI, OutletOnOffAPI, getOutletOnOffAPI} from '../../apiServices/DashboardApis';
import Switch from "rc-switch";
import { Notification } from "../../Utils/Notification";

const colors = ThemeColors()

class OutletDashboard extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
      days: '',
      orderCardData: [],
      revenuData: [],
      orderDetails: [],
      bestSeller: [],
      bestSellerLength:null,
      is_open:false,
    };
  }

  componentDidMount() {
    this.listOutletDashboard();
    this.getOutletOnOff(); 
    // create the interval once component is mounted
    var today = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;

    this.update = setInterval(() => {
      this.setState({ time: new Date(), days: date });
    }, 1 * 1000); // every 1 seconds
  }

  componentWillUnmount() { // delete the interval just before component is removed
    clearInterval(this.update);
  }
  listOutletDashboard(){
  listOutletDashboardAPI((apiResponse) => {
    if (apiResponse.status == "success") {
      this.setState({
        orderCardData: apiResponse.response.data.data[0],
        bestSeller: apiResponse.response.data.data[0].best_seller,
        bestSellerLength: apiResponse.response.data.data[0].best_seller.length,
        revenuData: apiResponse.response.data.data[0].outlet_revenue,
        orderDetails: apiResponse.response.data.data[0].order_details,
        week1Report: apiResponse.response.data.data[0].week_1_report,
        week2Report: apiResponse.response.data.data[0].week_2_report,
        newCustomerReport: apiResponse.response.data.data[0].new_customer_report,
        loyalCustomerReport:apiResponse.response.data.data[0].loyal_customer_report,
      });
    }
  });
}
getOutletOnOff(){
  getOutletOnOffAPI((apiResponse) => {
    if (apiResponse.status == "success") {
      this.setState({
        is_open: apiResponse.response.data.is_open,
      });
    }
  });
}
  handleChangeStatus=(e)=>{
    OutletOnOffAPI({is_open:!this.state.is_open},(apiResponse) => {
      if (apiResponse.status == "success") {
        if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Outlet Open Status changed");
        this.getOutletOnOff();
        }
        else{
          Notification(0, apiResponse.response.data.error.active_status, "Outlet Open Status error");
        }
      }
    });
  }
  render() {
    const { time, days, is_open, orderCardData, bestSeller,bestSellerLength, week1Report, week2Report, newCustomerReport, loyalCustomerReport } = this.state;
    const { messages } = this.props.intl;
    const produtcs = []
    for (let i = 0; i < bestSellerLength; i++) {
      const { id, product_name, food_type, product_desc, product_image } = bestSeller[i];
      produtcs.push({ id: id, title: product_name, category: food_type, description: product_desc, img: product_image })
    }
    const lineChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'First',
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
          label: 'Second',
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
    }
    const CustomerData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'New Customer',
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
          label: 'Loyal Customer',
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
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.default" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xss="1" className="mb-5">
            <Switch
              className="float-right"
              checked={is_open}
              onChange={(e)=>this.handleChangeStatus(e)}
               />
          </Colxx>
        </Row>
        <Row>

          <Colxx xss="12" className="mb-5">
            <div className="progress-banner clockdate-wrapper" >
              <h3>Hello {localStorage.getItem("companyName")}</h3>
              <div id="clock">{time.toLocaleTimeString()}</div>
              <div id="date">{days}</div>
            </div>

          </Colxx>

        </Row>
        <Row>
          <Colxx xl="3" lg="12" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-arrow-refresh"
              title={` ${messages['dashboards.total-orders']}`}
              detail={""}
              percent={(12 * 100) / 12}
              progressText={orderCardData.total_order ? orderCardData.total_order : "0"}
            />
          </Colxx>
          <Colxx xl="3" lg="12" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-venn-diagram"
              title={` ${messages['dashboards.total-revenue']}`}
              detail={""}
              percent={(12 * 100) / 12}
              progressText={orderCardData.total_revenue ? orderCardData.total_revenue : "0"}
            />
          </Colxx>
          <Colxx xl="3" lg="12" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-basket-coins"
              title={` ${messages['dashboards.completed-orders']}`}
              detail={""}
              percent={(12 * 100) / 12}
              progressText={orderCardData.completed_orders ? orderCardData.completed_orders : "0"}
            />
          </Colxx>
          <Colxx xl="3" lg="12" className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-clock"
              title={` ${messages['dashboards.pending-orders']}`}
              detail={""}
              percent={(12 * 100) / 12}
              progressText={orderCardData.pending_orders ? orderCardData.pending_orders : "0"}
            />
          </Colxx>
        </Row>

        <Row>
          <Colxx lg="6" xl="6" className="mb-4">
            <SalesComparision id="dashboards.sales-comparision" lineChartData={lineChartData} />
          </Colxx>
          <Colxx lg="6" xl="6" className="mb-4">
            <SalesComparision id="dashboards.new-vs-loyal-customer" lineChartData={CustomerData} />
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
            <RecentOrders {...this.state} />
          </Colxx>

        </Row>

      </Fragment>

    );
  }
}
export default injectIntl(OutletDashboard);
