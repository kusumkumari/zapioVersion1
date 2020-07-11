/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import GoogleAnalyticsAdd from "./GoogleAnalyticsAdd";
import { Notification } from "../Utils/Notification";
import { listgoogleAnyltcsAPI,addGoogleAnyltcsAPI, changeGoogleAnyltcsStatusAPI } from "../ApiIntegration";


class GoogleAnalyticsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleSnippet:"",
      uid:"",
      id:"",
      status:"",
      isDisable:true,
      buttonDisable:false,
    };
  }

  googleAnyltcsList = () => {
    listgoogleAnyltcsAPI((response) => {
      if (response.response.data.success == true) {
        this.setState({
          googleSnippet: response.response.data.analytics_snippets,
          uid : response.response.data.u_id,
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
    this.googleAnyltcsList();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
 
  AddGoogleAnyltcs = () => {
    const { googleSnippet, uid, id } = this.state;
    addGoogleAnyltcsAPI({analytics_snippets:googleSnippet,u_id:uid,id:id}, (response) => {
      if (response.response.data.status == true) {
        Notification(1, response.response.data.message, "Google Analytics success");
        this.setState({isDisable:true})
       this.googleAnyltcsList();
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
    changeGoogleAnyltcsStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Google Analytics status changed")
        this.googleAnyltcsList();
      }
      else {
        Notification(0, "Something went wrong", "Google Analytics status changed Error")
      }
    })
  }
  makeEnable =()=>{
    if(this.state.buttonDisable){
      this.googleAnyltcsList();
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
          <i className="iconsminds-statistic text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="google.analytics-settings" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <GoogleAnalyticsAdd {...this.state} handleChange={this.handleChange}
                  AddGoogleDetail={this.AddGoogleAnyltcs} 
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
export default injectIntl(GoogleAnalyticsCard);
