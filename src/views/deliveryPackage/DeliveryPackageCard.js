/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import DeliveryPackageAdd from "./DeliveryPackageAdd";
import { Notification } from "../Utils/Notification";
import { listDeliveryAPI,addDeliveryAPI, changeDeliveryStatusAPI } from "../ApiIntegration";


class DeliveryPackageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryCharge:"",
      packageCharge:"",
      symbol:"",
      id:"",
      Cgst:"",
      Sgst:"",
      status:"",
      isDisable:true,
      buttonDisable:false,
    };
  }

  deliveryList = () => {
    listDeliveryAPI((response) => {
      if (response.response.data.success == true) {
        this.setState({
          deliveryCharge: response.response.data.delivery_charge,
          packageCharge : response.response.data.package_charge,
          symbol : response.response.data.symbol,
          Cgst : response.response.data.CGST,
          Sgst : response.response.data.SGST,
          id: response.response.data.id,
          status : response.response.data.active_status,
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

  componentDidMount() {
    this.deliveryList();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
 
  AddDeliveryDetail = () => {
    const { deliveryCharge,packageCharge,symbol,id, Cgst, Sgst } = this.state;
    addDeliveryAPI({delivery_charge:deliveryCharge,package_charge:packageCharge,symbol:symbol,id:id,tax_percent:Sgst,CGST:Cgst}, ({ response }) => {
      if (response.data.status == true) {
        Notification(1, response.data.message, "Delivery & Packages success");
        this.setState({isDisable:true})
       this.deliveryList();
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
    changeDeliveryStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Delivery & Packages status changed")
        this.deliveryList();
      }
      else {
        Notification(0, "Something went wrong", "Delivery & Packages status changed Error")
      }
    })
  }
  makeEnable =()=>{
    if(this.state.buttonDisable){
      this.deliveryList();
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
          <i className="iconsminds-box-with-folders text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="delivery.settings" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <DeliveryPackageAdd {...this.state} handleChange={this.handleChange}
                  AddDeliveryDetail={this.AddDeliveryDetail} 
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
export default injectIntl(DeliveryPackageCard);