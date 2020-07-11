/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import NotificationList from "./NotificationList";
import { listNotificationAPI, notificationSeenAPI, getOrderAPI } from "../ApiIntegration";


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal:false,
      id:"",
      detailing_data:[],

    };
  }

  componentWillMount() {
    if(this.props.match.params.id){
      this.notificationSeen(this.props.match.params.id);
    }
   
    this.listNotification();
   
  }
  listNotification = () => {
    listNotificationAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        console.log("yyyyyyyyyyyyyyyyyyyy",apiResponse)
        this.setState({
          data: apiResponse.response.data.orderdata,
          dataLength: apiResponse.response.data.orderdata.length,
        });
      }
    })
  }
  notificationSeen=(id)=>{
    notificationSeenAPI({id:id},(apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.orderdata,
          dataLength: apiResponse.response.data.orderdata.length,
        });
      }
    })
  }
  toggle = (id) => {
    getOrderAPI({id:id.toString()},(apiResponse) => {
      console.log("ggggggggggggggggggg",apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState({
          modal:true,
          id:id,
          detailing_data:apiResponse.response.data.data[0]
        });
      }
    })
  };
  cancel=()=>{
    this.setState({modal:false})
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="notification.notification-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <NotificationList title="dashboards.top-viewed-posts" {...this.state}
            cancel={this.cancel}
              toggle={this.toggle}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Notification);