/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import OutletAdd from "./OutletAdd";
import OutletList from "./OutletList";

import { addOutletAPI } from "../ApiIntegration";
import { GoogleComponent } from 'react-google-location';
import { NotificationManager } from "../../components/common/react-notifications";
import { Notification } from "../Utils/Notification";
import { listCityWiseAreaAPI, listoutletAPI, listCityAPI, changeOutletStatusAPI,companyId1 } from "../ApiIntegration";

class OutletCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      name: "",
      password: "",
      outletname: "",
      address: "",
      longitude: "",
      latitude: "",
      city: [],
      area: [],
      place: null,
      errCity: '',
      errArea: '',
      selectedOption: [],
      cityOption: [],
      data: [],
      dataLength: null,
      removeAddress:'',
      isEdit:false,
      isFormOpen:false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }


  handleChangeCity = selectedOption => {
    this.setState({ city:selectedOption });
    listCityWiseAreaAPI(selectedOption.value, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          AreaCitydata: apiResponse.response.data.data,
          AreacCitydataLength: apiResponse.response.data.data.length,
          cityId: selectedOption.value,
        });
      }
    })
  };
  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    });
  }
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  handleChangeArea = selectedOption => {
    this.setState({ area:selectedOption });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  googleApis = (e) => {
    this.setState({
      longitude: e.coordinates.lng,
      address: e.place,
      latitude: e.coordinates.lat,
      removeAddress: e,
    })
  }

  listOutlet = () => {
    listoutletAPI((apiResponse) => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    })
  }
  componentWillMount() {
    listCityAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          citydata: apiResponse.response.data.data,
          cityLength: apiResponse.response.data.data.length,
        });
      }
    });
    this.listOutlet();
  }


  addOutletHandler = () => {
    const { name, password, outletname, address, longitude, latitude, city, area,fileData } = this.state;
    let cityId=""
    let areaId=""
    if(city==""){
      cityId=""
    }
    else{
      cityId=city.value
    }
    if(area==""){
      areaId=""
    }
    else{
      areaId=area.value
    }
    addOutletAPI(name, password, outletname, address, longitude, latitude, cityId, areaId,fileData,companyId1, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, "Outlet is registered successfully under your brand!!", "Outlet success")
        window.location.href="/outlet/";

      }
      else {
        console.log(response.data.error)
        if (response.data.error.username) {
          Notification(0, response.data.error.username, "Username Error")
        }
        if (response.data.error.password) {
          Notification(0, response.data.error.password, "Password Error")
        }
        if (response.data.error.Outletname) {
          Notification(0, response.data.error.Outletname, "Outlet Name Error")
        }
        if (response.data.error.address) {
          Notification(0, response.data.error.address, "Address Error")
        }
        if (response.data.error.area) {
          Notification(0, response.data.error.area, "Area Error")
        }
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "Duplicate Error")
        }
        if (response.data.error.city) {
          Notification(0, response.data.error.city, "City Error")
        }
        
      }
    });
  };


  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeOutletStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Outlet status changed")
        this.listOutlet();
      }
      else {
        Notification(0, "Something went wrong", "Category status changed Error")
      }
    })
  }

  cancel=()=>{
    this.setState({isFormOpen:false, isEdit:false, name:"", password:"", outletname:"", address:"", longitude:"", latitude:"", city:"", area:"" })
  }
  openForm=()=>{
    this.setState({isFormOpen:true})
  }

  render() {

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="iconsminds-shop text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="menu.outlet-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isFormOpen ?
                <OutletAdd {...this.state} handleChange={this.handleChange}
                  handleChangeCity={this.handleChangeCity}
                  handleChangeArea={this.handleChangeArea}
                  googleApis={this.googleApis}
                  cancel={this.cancel}
                  onDrop={this.onDrop}
                  resetFile={this.resetFile}
                  addOutletHandler={this.addOutletHandler} />
                  : ""}
              </Colxx>
            </Row>
          </Colxx>
          {/* <Colxx lg="12" xl="6" className="mb-4">
            <OutletList {...this.state}
              title="dashboards.top-viewed-posts" />
          </Colxx> */}
        </Row>
        <Row>
          <Colxx xxs="12">
          <OutletList {...this.state}
          handleChangeStatus={this.handleChangeStatus}
          openForm={this.openForm}
          title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(OutletCard);