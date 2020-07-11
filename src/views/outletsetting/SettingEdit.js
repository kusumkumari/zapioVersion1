/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CustomInput,
  FormGroup,
  Label,
  Button,
  Form,
  Input
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

export default class SettingEdit extends Component {

  render() {
    const { data } = this.props;
    return (
      <Card>
        <CardBody>

          <CardTitle>
            <IntlMessages id="account.outlet-detail" color="primary" />
          </CardTitle>
          <Form className="dashboard-quick-post">

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.profile-pic" />
              </Label>
              <Colxx sm="4">
                {data.profile_pic ?
                  <img style={{ height: "63px" }} src={data.profile_pic} /> 
                  :
                  <img style={{ height: "63px" }} src={require("../../assets/no-image.png")} /> 
                }
                  
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.Outlet" />
              </Label>
              <Colxx sm="4">
              <Input type="text" value={data.Outletname} disabled={true} name="company_name"  />

                  
              </Colxx>
            </FormGroup>

           
            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.username" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.username} disabled={true} name="company_name"  />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.email" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.email} disabled={true} name="company_email_id" />
              </Colxx>
             

            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.mobileno-with-isd" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.mobile_with_isd} disabled={true} name="address" />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.address" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.address} disabled={true} name="company_contact_no" />
              </Colxx>
              
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.city" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.city} disabled={true} name="contact_person" />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.area" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.area} disabled={true} name="contact_person_email_id" />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.opening-time" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.opening_time} disabled={true} name="contact_person_mobileno"  />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.closing-time" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={data.closing_time} disabled={true} name="contact_person_landlineno" />
              </Colxx>
            </FormGroup>         
          </Form>
        </CardBody>
      </Card>
    );
  }
}
