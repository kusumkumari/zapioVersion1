/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  Alert
} from "reactstrap";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { addOutletAPI } from "../ApiIntegration";
import { GoogleComponent } from 'react-google-location';
import { NotificationManager } from "../../components/common/react-notifications";
import { Notification } from "../Utils/Notification";

const selectData = [
  { label: "Cake", value: 1, key: 0 },
  { label: "Cupcake", value: 2, key: 1 },
  { label: "Dessert", value: 3, key: 2 }
];

const API_KEY = "AIzaSyCIDUSBqHPfkEssENT_X9vuWt5nzca8_W4"


export default class OutletAdd extends Component {
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
      city: 1,
      area: 1,
      place: null,
      errCity: '',
      errArea: ''
    };
  }
  // componentDidUpdate() {
  //   setTimeout(() => this.setState({
  //     errUsername: '', errPassword: '', errOutlet: '',
  //     errAddress: '', successMsg: ''
  //   }), 20000);
  // }

  handleChange1 = selectedOption => {
    this.setState({ selectedOption });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addOutletHandler = () => {
    const { name, password, outletname, address, longitude, latitude, city, area } = this.state;
    addOutletAPI(name, password, outletname, address, longitude, latitude, city, area, ({ response }) => {
      console.log("ooooooooooooooooooooooooo", response)
      if (response.data.success == true) {
        Notification(1, "Outlet is registered successfully under your brand!!", "Outlet success")
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
      }
    });
  };

  render() {
    console.log(this.state)
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="menu.outlet" />
          </CardTitle>
          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.user" />
              </Label>
              <Colxx sm="8">
                <Input type="text" name="name" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>
            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.password" />
              </Label>
              <Colxx sm="8">
                <Input type="password" name="password" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.name" />
              </Label>
              <Colxx sm="8">
                <Input type="text" name="outletname" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.address" />
              </Label>
              <Colxx sm="8">
                <Input type="text" name="address" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.longitude" />
              </Label>
              <Colxx sm="8">
                <Input type="text" name="longitude" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>
            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.latitude" />
              </Label>
              <Colxx sm="8">
                <Input type="text" name="latitude" onChange={e => this.handleChange(e)} />
              </Colxx>
            </FormGroup>

            {/* <FormGroup row>
              <Label sm="4">
                <IntlMessages id="Outlet.address" />
              </Label>
              <Colxx sm="8">
                  <div >
                  <GoogleComponent
                    apiKey={API_KEY}
                    language={'en'}
                    name="address"
                    country={'country:in|country:us'}
                    coordinates={true}
                    onChange={(e) => { this.setState({ place: e }) }} />
                </div>
              </Colxx>
            </FormGroup> */}



            {/* <Input type="hidden" name="longitude" onChange={e => this.handleChange(e)}  />
                <Input type="hidden" name="latitude" onChange={e => this.handleChange(e)}  />

         */}
            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="outlet.city" />
              </Label>
              <Colxx sm="8">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="city"
                  value={this.state.selectedOption}
                  onChange={this.handleChange1}
                  options={selectData} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="outlet.area" />
              </Label>
              <Colxx sm="8">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="area"
                  value={this.state.selectedOption}
                  onChange={this.handleChange1}
                  options={selectData} />
              </Colxx>
            </FormGroup>

            <Button className="float-right" color="primary" onClick={this.addOutletHandler} >
              <IntlMessages id="product.save" />
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}



