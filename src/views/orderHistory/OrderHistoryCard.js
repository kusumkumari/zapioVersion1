/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import OrderHistoryList from "./OrderHistoryList";
import {listOrderHistoryAPI, getOrderAPI } from "../ApiIntegration";
import HistoryIcon from '@material-ui/icons/History';

// https://www.freecodecamp.org/news/how-to-build-a-react-js-chat-app-in-10-minutes-c9233794642b/
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {    
      data: [],
      dataLength: null,
      modal: false,
      detailing_data:[],
      customerData:[],
    };
  }
  componentDidMount() {   
    this.listOrderHistory();
  }
  listOrderHistory = () => {
    const {id} =this.props.match.params;
    listOrderHistoryAPI({id:id.toString()},(apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          customerData: apiResponse.response.data.data[0],
          data: apiResponse.response.data.data[0].order_history,
          dataLength: apiResponse.response.data.data[0].order_history.length,
        });
      }
    })
  }

  toggle = id => {
    getOrderAPI({ id: id.toString() }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          modal: true,
          detailing_data: apiResponse.response.data.data[0]
        })
      }
    })
  }
  cancel=()=>{
    this.setState({modal:false})
  }
  
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <HistoryIcon className="text-primary" style={{fontSize:"xx-large", marginTop: "-9px"}} /> 
          <Breadcrumb heading="order.history" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
          <OrderHistoryList title="dashboards.top-viewed-posts" {...this.state} 
            toggle={this.toggle} 
            cancel={this.cancel}
            />
          </Colxx>
        </Row>
        <Row>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(OrderHistory);