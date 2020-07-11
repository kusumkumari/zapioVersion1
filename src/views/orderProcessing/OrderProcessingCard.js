/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import OrderProcessingList from "./OrderProcessingList";
import OrderProcessForm from "./OrderProcessForm";

import { Notification } from "../Utils/Notification";
import { listOrderProcessingAPI, retriveOrderProcessingAPI, changeOrderProcessingStatusAPI } from "../ApiIntegration";


class OrderProcessing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      detailing_data: [],
      selectedPageSize: 10,
      currentPage: 1,
      selectedOrderOption: { column: "title", label: "Product Name" },
      search: "",
      modalOpen: false,
      isLoading: false,
      totalPage: null,
      isOrderProcess: false,
      orderId:"",
      is_delivery_boy:0,
    };
  }

  handleChange=(e)=>{
    this.setState({ordStatus:e, is_delivery_boy:e.is_delivery_boy})
  }
  handleChangeDelivery=(e)=>{
    this.setState({delBoy:e})
  }
  componentWillMount() {
    this.listOrderProcessing();
  }
  listOrderProcessing = () => {
    listOrderProcessingAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.orderdata,
          deliveryBoy: apiResponse.response.data.deliverydata,
          deliveryBoyLength: apiResponse.response.data.deliverydata.length,
          dataLength: apiResponse.response.data.orderdata.length,
          totalPage: parseInt(apiResponse.response.data.orderdata.length / 10),
        });
      }
    })
  }
  handleChangeOrderStatus = () => {
    const { ordStatus,delBoy, id,is_delivery_boy} =this.state;
    let delboy=""
    let status=""
    if(delBoy && delBoy.value){
      if(is_delivery_boy==1){
      delboy=delBoy.value.toString()
      }
      else{
        delboy=""
      }
    }
    else{
      delboy=""
    }
    if(ordStatus && ordStatus.value){
      if(is_delivery_boy!=1){
        this.setState({delBoy:""})
      }
      status=ordStatus.value.toString()
    }
    else{
      status=""
    }
    let payload={order_id:id.toString(),order_status:status,deliveryboy_id:delboy,is_deliveryboy:is_delivery_boy}
    changeOrderProcessingStatusAPI(payload,(apiResponse)=>{
      if (apiResponse.status == "success") {
        if(apiResponse.response.data.success==true){
        Notification(1, apiResponse.response.data.message, "Order Process success");

        this.setState({
         isOrderProcess:false, ordStatus:"",delBoy:"", id:"",is_delivery_boy:0,
        });
        this.listOrderProcessing();
        }
        else{
          if (apiResponse.response.data.error.order_status) {
            Notification(0, apiResponse.response.data.error.order_status, "Order Process Error");
          }
          if (apiResponse.response.data.error.deliver_boy) {
            Notification(0, apiResponse.response.data.error.deliver_boy, "Order Process Error");
          }
          
        }
      }
     
    });
  }
  cancel=()=>{
    this.setState({isOrderProcess:false})
  }
  handleOrderProcess = (id,value, status,statusType) => {
    const orderStatusData = [];
    for (let index = 0; index < statusType.length; index++) {
      const { value, label, key,is_delivery_boy } =  statusType[index];
      orderStatusData.push({ label: label, value: value, key: key, is_delivery_boy:is_delivery_boy })
    }
    this.setState({ id:id, isOrderProcess: true, status:status, orderId:value, orderStatusType:orderStatusData })
  }

  toggle = (id) => {
    retriveOrderProcessingAPI(id,(apiResponse)=>{
      console.log("88888888888",apiResponse)
    if (apiResponse.response.data.success == true) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      detailing_data:apiResponse.response.data.data[0]
    }));
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="order.order-processing-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {this.state.isOrderProcess ?
            <Colxx lg="12" xl="6">
              <OrderProcessForm {...this.state} 
              handleChangeOrderStatus={this.handleChangeOrderStatus}
              handleChange={this.handleChange}
              handleChangeDelivery={this.handleChangeDelivery}
              cancel={this.cancel}
               />
            </Colxx>
            : ""}
        </Row>
        <br />
        <Row>
          <Colxx lg="12" xl="12">
            <OrderProcessingList
              {...this.state}
              handleOrderProcess={this.handleOrderProcess}
              toggle={this.toggle}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>

        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(OrderProcessing);