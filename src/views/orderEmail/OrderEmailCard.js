/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import OrderEmailAdd from "./OrderEmailAdd";
import { Notification } from "../Utils/Notification";
import { orderEmailListAPI,AddOrderEmailDetailAPI, changeOrderEmailStatusAPI, listActiveCouponAPI} from "../ApiIntegration";

class OrderEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      content:"",
      subContent:"",
      discountContent:"",
      file: null,
      fileData: '',
      coupon:"",
      id:"",
      status:"",
      isDisable:true,
      buttonDisable:false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0],
    });
  }
 
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  orderEmailList = () => {
    orderEmailListAPI((response) => {
      if (response.response.data.success == true) {
        this.setState({
          title: response.response.data.data[0].title,
          content : response.response.data.data[0].content,
          subContent : response.response.data.data[0].subcontent,
          discountContent : response.response.data.data[0].dis_content,
          fileData:response.response.data.data[0].image,
          coupon:response.response.data.data[0].coupon,
          id: response.response.data.data[0].id,
          status : response.response.data.data[0].active_status,
          buttonDisable:false,
        });
      }
      else{
        const err = response.response.data.error
        this.setState({buttonDisable:true})
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  }

  listActiveCoupon=()=>{
    listActiveCouponAPI((response) => {
      if (response.response.data.success == true) {
        this.setState({
          couponData: response.response.data.data,
          couponDataLength : response.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    this.orderEmailList();
    this.listActiveCoupon();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeCoupon=(e)=>{
    this.setState({coupon:e})
  }
 
  AddOrderEmailDetail = () => {
    const { title, content,subContent,discountContent,coupon,fileData,id } = this.state;
    let couponArray=""
    if(coupon){
      if(coupon[0]){
          couponArray=coupon[0].value
      }
      else{
        couponArray=coupon.value
      }
    }
    else{
      couponArray=""
    }
    AddOrderEmailDetailAPI(title,content,subContent,discountContent,couponArray,fileData,id, (response) => {
      if (response.response.data.status == true) {
        Notification(1, response.response.data.message, "Order Email Setting success");
        this.setState({isDisable:true})
       this.orderEmailList();
      }
      else {
        const err = response.response.data.error
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`)
          })
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = this.state.id.toString()
    let status = (!e).toString()
    changeOrderEmailStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Order Email status changed")
        this.orderEmailList();
      }
      else {
        Notification(0, "Something went wrong", "Order Email status changed Error")
      }
    })
  }
  makeEnable =()=>{
    if(this.state.buttonDisable){
      this.orderEmailList();
    }
    else{
    this.setState({isDisable:false})
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <div id="form"></div>
          <i className="iconsminds-mail-settings text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="order-email-settings" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <OrderEmailAdd {...this.state} handleChange={this.handleChange}
                 onDrop={this.onDrop}
                 resetFile={this.resetFile}
                 handleChangeCoupon={this.handleChangeCoupon}
                 AddOrderEmailDetail={this.AddOrderEmailDetail} 
                  handleChangeStatus={this.handleChangeStatus}     
                  makeEnable={this.makeEnable}            
                  />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(OrderEmail);
