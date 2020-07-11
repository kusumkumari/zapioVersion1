/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import PaymentAdd from "./PaymentAdd";
import { Notification } from "../Utils/Notification";
import { listPaymentAPI,addPaymentAPI, changePaymentStatusAPI } from "../ApiIntegration";


class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyId:"",
      keySecret:"",
      symbol:"",
      id:"",
      status:"",
      isDisable:true,

    };
  }

  paymentList = () => {
    listPaymentAPI((response) => {
      if (response.status == "success") {
        this.setState({
          keyId: response.response.data.keyid,
          keySecret : response.response.data.keySecret,
          symbol : response.response.data.symbol,
          id: response.response.data.id,
          status : response.response.data.active_status,
        });
      }
    });
  }

  componentDidMount() {
    this.paymentList();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
 
  AddPaymentDetail = () => {
    const { keyId,keySecret,symbol,id } = this.state;
    addPaymentAPI({keyid:keyId,keySecret:keySecret,symbol:symbol,id:id}, ({ response }) => {
      if (response.data.status == true) {
        Notification(1, response.data.message, "Payment success");
        this.setState({isDisable:true})
       this.paymentList();
      }
      else {
        const err = response.data.error
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`)
          })
      
      }

    });
  };

  handleChangeStatus = (e) => {
    let id = this.state.id.toString()
    let status = (!e).toString()
    changePaymentStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Payment status changed")
        this.paymentList();
      }
      else {
        Notification(0, "Something went wrong", "Payment status changed Error")
      }
    })
  }
  makeEnable =()=>{
    this.setState({isDisable:false})
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <div id="form"></div>
          <i className="iconsminds-wallet text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="payment.settings" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <PaymentAdd {...this.state} handleChange={this.handleChange}
                  AddPaymentDetail={this.AddPaymentDetail} 
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
export default injectIntl(PaymentCard);