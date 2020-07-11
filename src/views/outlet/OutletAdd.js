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
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { GoogleComponent } from "react-google-location";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

const API_KEY = "AIzaSyCIDUSBqHPfkEssENT_X9vuWt5nzca8_W4";

export default class OutletAdd extends Component {
  render() {
    const {
      handleChange,
      handleChangeCity,
      addOutletHandler,
      selectData,
      city,
      area,
      handleChangeArea,
      citydata,
      cityLength,
      AreaCitydata,
      AreacCitydataLength,
      onDrop, 
      resetFile,
    } = this.props;

    const cityData = [
      { label: "Select Category", value: "", key: "Category1" }
    ];
    const areaData = [{ label: "Select Area", value: "", key: "Area1" }];

    for (let index = 0; index < cityLength; index++) {
      const { id, city } = citydata[index];
      cityData.push({ label: city, value: id, key: id });
    }
    for (let index = 0; index < AreacCitydataLength; index++) {
      const { id, area } = AreaCitydata[index];
      areaData.push({ label: area, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-shop" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="menu.outlet" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="Outlet.user" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="text"
                      name="name"
                      value={this.props.name}
                      onChange={handleChange}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="Outlet.password" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="password"
                      name="password"
                      value={this.props.password}
                      onChange={handleChange}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="Outlet.name" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="text"
                      name="outletname"
                      value={this.props.outletname}
                      onChange={handleChange}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="Outlet.address" />
                  </Label>
                  <Colxx sm="8">
                    <div>
                      <GoogleComponent
                        apiKey={API_KEY}
                        language={"en"}
                        value={this.props.removeAddress}
                        name="address"
                        country={"country:in|country:us"}
                        coordinates={true}
                        onChange={e => {
                          this.props.googleApis(e);
                        }}
                      />
                    </div>
                  </Colxx>
                </FormGroup>

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
                      value={city}
                      onChange={handleChangeCity}
                      options={cityData}
                    />
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
                      value={area}
                      onChange={handleChangeArea}
                      options={areaData}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="category.image" />
                  </Label>
                  <Label
                    sm="4"
                    style={{
                      border: "1px solid #ccc",
                      display: "inlineBlock",
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginLeft: "15px",
                      color: "hsl(0,0%,50%)"
                    }}>
                   Upload Outlet Image
                  <Input
                    type="file"
                    onChange={onDrop}
                    style={{ display: "none" }}
                  />
                </Label>
                <Colxx sm="3">
                  {this.props.file && (
                    <div style={{ textAlign: "center" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{ height: "63px", width: "180px" }}
                          src={this.props.file}
                        />
                        &nbsp;&nbsp;
                        <i
                          style={{ outlineColor: "primary" }}
                          size=""
                          className="simple-icon-trash"
                          onClick={resetFile}
                        />
                      </span>
                    </div>
                  )}
                </Colxx>
              </FormGroup>


















                <Button
                  color="primary"
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={addOutletHandler}
                >
                  <IntlMessages id="product.save" />
                  &nbsp;
                  <Save />
                </Button>
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  color="danger"
                  onClick={this.props.cancel}
                >
                  <Close />
                  <IntlMessages id="product.cancel" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
