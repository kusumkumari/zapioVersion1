/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import TimingsList from "./TimingsList";
import TimingsForm from "./TimingsForm";

import { Notification } from "../Utils/Notification";
import {listBrandOutletAPI, brandOutletStatusAPI, addTimingAPI, getTimingAPI } from "../ApiIntegration";
import moment from "moment";

class Timings extends Component {
  constructor(props) {
    super(props);
    this.state = {    
      data: [],
      dataLength: null,
      detailing_data:[],
      openingTime: moment().format('h:mm A'),
      closingTime: moment().format('h:mm A'),
      isSetTiming:false,
      id:"",
    };
  }
 
  handleOpeningTime=(e)=>{
    const {
      hour,
      minute,
      meridiem,
        } = e;
    let time=hour + ":"+ minute + " "+ meridiem;
    this.setState({
      openingTime: time,
    });
  }
  handleClosingTime=(e)=>{
    const {
      hour,
      minute,
      meridiem,
        } = e;
    let time=hour + ":"+ minute + " "+ meridiem;

    this.setState({
      closingTime: time,
    });
  }
  addTiming = () => {
    const { openingTime, closingTime, id } = this.state;
    addTimingAPI({id:id.toString(),opening_time:openingTime,closing_time:closingTime}, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Timing creation success")
        this.setState({ openingTime: moment().format('h:mm A'), closingTime: moment().format('h:mm A'), isSetTiming:false })
        this.listOutlet();
      }
      else {
        if (response.data.error.time) {
          Notification(0, response.data.error.time, "Time Error")
        }
      }
    });
  };
  componentDidMount() {   
    this.listOutlet();
  }
  listOutlet = () => {
    listBrandOutletAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data,
          dataLength: apiResponse.response.data.length,
        });
      }
    })
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let is_open = !e.original.is_open
    brandOutletStatusAPI({ id: id, is_open: is_open }, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Outlet Is Open Status Changed")
        this.listOutlet();
      }
      else {
        Notification(0, "Something went wrong", "Outlet Is Open Status Changed Error")
      }
    })
  }
  handleOrderProcess =(id)=>{
    getTimingAPI({id:id.toString()}, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          openingTime: response.data.data[0].opening_time ? response.data.data[0].opening_time : moment().format('h:mm A'),
          closingTime: response.data.data[0].closing_time ? response.data.data[0].closing_time : moment().format('h:mm A'),
          id:id,
          isSetTiming:true,
        })
      }
    });
  }
  cancel =()=>{
    this.setState({isSetTiming:false,})
  }
 
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="iconsminds-clock text-primary" style={{fontSize:"x-large"}}  />
            <Breadcrumb heading="timing.timing-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {this.state.isSetTiming ?
            <Colxx lg="12" xl="6">
              <TimingsForm {...this.state} 
                handleOpeningTime={this.handleOpeningTime}
                handleClosingTime={this.handleClosingTime}
                addTiming={this.addTiming}
                cancel={this.cancel}
               />
            </Colxx>
            : ""} 
        </Row>
        <br />
        <Row>
          <Colxx lg="12" xl="12">
          <TimingsList title="dashboards.top-viewed-posts" {...this.state} 
           handleChangeStatus={this.handleChangeStatus}
           handleOrderProcess={this.handleOrderProcess}
            />
          </Colxx>
        </Row>
        <Row>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Timings);