/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, CardBody } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import PaymentReportList from "./PaymentReportList";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Notification } from "../Utils/Notification";
import {
  listPaymentReportAPI,
  API_BASE_URL,
  companyId1
} from "../ApiIntegration";
import IntlMessages from "../../helpers/IntlMessages";
import moment from "moment";
import DatePicker from "react-datepicker";
import TimeInput from 'material-ui-time-picker'
import '../../assets/css/date.css';



class PaymentReport extends Component {
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
      start_date: moment(),
      end_date: moment(),
      startTime: moment().format('H:mm:ss'),
      endTime: moment().format('H:mm:ss'),
    };
  }

  handleChangeStart = date => {
    this.setState({
      start_date: moment(date)
    });
    this.listPaymentReport(moment(date), this.state.end_date, this.state.startTime,this.state.endTime);
  };

  handleChangeEnd = date => {
    this.setState({
      end_date: moment(date)
    });
    this.listPaymentReport(this.state.start_date, moment(date),this.state.startTime,this.state.endTime);
  };
  handleStartTime = (e) => {
    this.setState({
      startTime: moment(e).format('H:mm:ss'),
    });
    this.listPaymentReport(this.state.start_date,this.state.end_date, moment(e).format('H:mm:ss'),this.state.endTime);

  }
  handleEndTime = (e) => {

    this.setState({
      endTime:  moment(e).format('H:mm:ss'),
    });
    this.listPaymentReport(this.state.start_date,this.state.end_date,this.state.startTime, moment(e).format('H:mm:ss'));

  }
  componentDidMount() {
    this.listPaymentReport(
      this.state.start_date,
      this.state.end_date,
      this.state.startTime,this.state.endTime
    );
  }

  listPaymentReport = (startDate, endDate, startTime, endTime) => {
    this.setState({ loading: true });
    listPaymentReportAPI(
      {
        start_date: startDate,
        end_date: endDate,
        start_time:startTime,
        end_time:endTime
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
        }
      }
    );
  };

  cancel = () => {
    this.setState({ modal: false, isView: false });
  };

  



  render() {
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
                  // showTimeSelect
                  // timeIntervals={15}
                  selected={this.state.start_date}
                  onChange={this.handleChangeStart}
                  style={{width:"50%"}}
                />
            
                  <i
                  className="iconsminds-clock text-primary "
                  style={{ fontSize: "x-large" }}
                />
                <IntlMessages id="pos.to" />

                <DatePicker
                  selected={this.state.end_date}
                  onChange={this.handleChangeEnd}
                  className="mx-3"
                  style={{width:"50%"}}
                />
                
                <TimeInput time={this.state.startTime}
                onChange={(time) => this.handleStartTime(time)}
                mode='24h' /> 
           
                <TimeInput time={this.state.endTime}
                onChange={(time) => this.handleEndTime(time)}
                mode='24h' /> 
             
                {this.state.dataLength > 0 ?
                  <a
                    // onClick={this.downloadCsv}
                    target="_blank"
                    href={API_BASE_URL + "/ordermgnt/payment/report/csv/?start_date=" + this.state.start_date.format('YYYY-MM-DD') + "&end_date=" + this.state.end_date.format('YYYY-MM-DD') + "&cid=" + companyId1 + "&start_time="+ this.state.startTime+ "&end_time="+ this.state.endTime + "&token="+localStorage.getItem("token") }

                    // href={API_BASE_URL + "/ordermgnt/payment/report/csv/"}
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
