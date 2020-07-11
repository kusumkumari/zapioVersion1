/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AddonAdd from "./AddonAdd";
import AddonEdit from "./AddonEdit";
import AddonList from "./AddonList";
import { listActiveAddonGroupAPI, addAddonAPI, listAddonAPI, getAddOnsAPI, editAddonGroupAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class AddonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addon: "",
      shareholders: [{ name: "", price: "" }],
      isEdit: false,
      id: null,
      associated_addons: '',
      data: [],
      dataLength: null,
      modal:false,
      detailing_data:[],
      Rtid:null,
      isFormOpen:"",
      identifier:"",
      loading: false,
      status:true,
    };
  }

  listAddon = (status) => {
    listAddonAPI({status:status},(apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ price: "", name: "" }]),
    });
  };

  handleChange = e => {
    this.setState({ addon: e });
  };

  handleText =e =>{
    this.setState({identifier:e.target.value})
  }
  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };

  handlePriceNameChange = idx => evt => {
    const newPrice = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, price: evt.target.value };
    });
    this.setState({ shareholders: newPrice });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };
  componentDidMount() {
    listActiveAddonGroupAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          addondata: apiResponse.response.data,
          addonLength: apiResponse.response.data.length,
        });
      }
    });
    this.listAddon(this.state.status);
  }

  handleChangelistStatus =() =>{
    this.setState({status:!this.state.status})
    this.listAddon(!this.state.status);

  }

  addAddonHandler = () => {
    const { shareholders, id, addon,identifier } = this.state;
    let addonArray = []
    let addongrp=""
    for (let i = 0; i < shareholders.length; i++) {
      addonArray.push({ 'addon_name': shareholders[i].name, 'price': shareholders[i].price })
    }
    if(addon==""){
      addongrp=""
    }
    else{
      if(addon[0]){
        addongrp=addon[0].value
      }
      else{
      addongrp=addon.value
      }
    }
    addAddonAPI(addongrp, addonArray, identifier ? identifier:"", ({ response }) => {
      console.log("kkkkkkkkkkkkkkk",response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "Addon Group Success")
        this.setState({addon:[],shareholders:[{name:"", price:""}], isEdit:false, isFormOpen:false, identifier:""})
        this.listAddon(this.state.status);
      }
      else {
        if (response.data.error.id) {
          Notification(0, response.data.error.id, "Addon Group Error")
        }
        if (response.data.error.addon_name) {
          Notification(0, response.data.error.addon_name, "Addon Name Error")
        }
        if (response.data.error.price) {
          Notification(0, response.data.error.price, "Addon Price Error")
        }
        if (response.data.error.identifier) {
          Notification(0, response.data.error.identifier, "Addon Identifier Error")
        }
        if (response.data.error.addon_detail) {
          Notification(0, response.data.error.addon_detail, "Addon Detail Error")
        }
      }
    });
  };


  toggle = (id) => {
  
    getAddOnsAPI(id, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          Rtid:id,
          detailing_data: apiResponse.response.data.data,
        }));
      }
    })
  };
  retrieveAddonsHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen:false })
    editAddonGroupAPI(id.toString(), ({ response }) => {
      console.log("gggggggggggg",response)
      if (response.data.success == true) {
        this.setState({
          addon: response.data.data[0].addon_gr_name_details,
          shareholders: response.data.data[0].associated_addons_details,
          id: response.data.data[0].id,
          identifier: response.data.data[0].identifier,
        })
      }
    });
  };
  cancel=()=>{
    this.setState({isFormOpen:false, isEdit:false, addon:[],shareholders:[{name:"", price:""}], identifier:"" })
  }
  openForm=()=>{
    this.setState({isFormOpen:true, isEdit:false, addon:[],shareholders:[], identifier:""})
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="simple-icon-plus text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="menu.addon-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <AddonEdit {...this.state}
                  handleAddShareholder={this.handleAddShareholder}
                  handleChange={this.handleChange}
                  handleShareholderNameChange={this.handleShareholderNameChange}
                  handlePriceNameChange={this.handlePriceNameChange}
                  handleRemoveShareholder={this.handleRemoveShareholder}
                  addAddonHandler={this.addAddonHandler}
                  handleText={this.handleText}
                  cancel={this.cancel}
                 />
                  : ""}
                  {this.state.isFormOpen ?
                  <AddonAdd {...this.state}
                    handleAddShareholder={this.handleAddShareholder}
                    handleChange={this.handleChange}
                    handleText={this.handleText}
                    handleShareholderNameChange={this.handleShareholderNameChange}
                    handlePriceNameChange={this.handlePriceNameChange}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    addAddonHandler={this.addAddonHandler}
                    cancel={this.cancel}
                  />
                  :""
                }
              </Colxx>
            </Row>
          </Colxx>
         
        </Row>
        <Row>
        <Colxx lg="12" xl="12" className="mb-4">
            <AddonList {...this.state}
              listAddon={this.listAddon}
              toggle={this.toggle}
              retrieveAddonsHandler={this.retrieveAddonsHandler} 
              openForm={this.openForm}
              handleChangelistStatus={this.handleChangelistStatus}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>

      </Fragment>
    );
  }
}
export default injectIntl(AddonCard);