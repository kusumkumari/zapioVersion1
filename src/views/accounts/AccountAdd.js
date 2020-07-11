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

export default class AccountAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, handleChange, onDropBanner, resetBannerFile, onDrop, resetFile, company_name, username
      , company_email_id, company_contact_no, password, address, website,
      owner_email, owner_name, owner_phone, support_person, support_person_email_id,
      support_person_landlineno, support_person_mobileno, contact_person, contact_person_email_id,
      contact_person_landlineno, contact_person_mobileno, AddProfileDetail
    } = this.props;
    return (
      <Card>
        <CardBody>

          <CardTitle>
            <IntlMessages id="company.owner.detail" color="primary" />
          </CardTitle>
          <Form className="dashboard-quick-post">

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.logo" />
              </Label>
              <Label sm="2" style={{
                border: "1px solid #ccc",
                display: "inlineBlock",
                cursor: "pointer",
                color: "hsl(0,0%,50%)"
              }}>
                Upload Food Image
                <Input type="file" onChange={onDrop} style={{ display: "none" }} />
              </Label>
              <Colxx sm="2">
                {this.props.file && (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ height: "63px" }} src={this.props.file} /> &nbsp;&nbsp;
                      <i style={{ outlineColor: "primary" }} size="" className="simple-icon-trash" onClick={resetFile} />
                    </span>
                  </div>
                )}
              </Colxx>
              
              <Label sm="2">
                <IntlMessages id="account.banner" />
              </Label>
              <Label sm="2" style={{
                border: "1px solid #ccc",
                display: "inlineBlock",
                cursor: "pointer",
                color: "hsl(0,0%,50%)"
              }}>
                Upload Food Image
                <Input type="file" onChange={onDropBanner} style={{ display: "none" }} />
              </Label>
              <Colxx sm="2">
                {this.props.bannerFile && (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ height: "63px" }} src={this.props.bannerFile} /> &nbsp;&nbsp;
                      <i style={{ outlineColor: "primary" }} size="" className="simple-icon-trash" onClick={resetBannerFile} />
                    </span>
                  </div>
                )}
              </Colxx>

            </FormGroup>

           
            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.brand" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={company_name} disabled={true} name="company_name" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.email" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={company_email_id} disabled={true} name="company_email_id" onChange={handleChange} />
              </Colxx>
             

            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.user" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={username} disabled={true} name="username" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.mobile" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={company_contact_no} disabled={true} name="company_contact_no" onChange={handleChange} />
              </Colxx>
              
            </FormGroup>


            <FormGroup row>
            <Label sm="2">
                <IntlMessages id="account.website" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={website} name="website" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.address" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={address} name="address" onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <CardTitle>
              <IntlMessages id="account.owner.detail" color="primary" />
            </CardTitle>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.owner" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={owner_name} name="owner_name" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.owner.email" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={owner_email} name="owner_email" onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.mobile" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={owner_phone} name="owner_phone" onChange={handleChange} />
              </Colxx>
            </FormGroup>


            <CardTitle>
              <IntlMessages id="support.owner.detail" color="primary" />
            </CardTitle>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.support" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={support_person} name="support_person" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.support.email" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={support_person_email_id} name="support_person_email_id" onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="account.support.mobile" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={support_person_mobileno} name="support_person_mobileno" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="account.support.landline" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={support_person_landlineno} disabled={true} name="support_person_landlineno" onChange={handleChange} />
              </Colxx>
            </FormGroup>



            <CardTitle>
              <IntlMessages id="contact.owner.detail" color="primary" />
            </CardTitle>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="contact.person" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={contact_person} disabled={true} name="contact_person" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="contact.person.email" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={contact_person_email_id} disabled={true} name="contact_person_email_id" onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="contact.person.mobile" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={contact_person_mobileno} disabled={true} name="contact_person_mobileno" onChange={handleChange} />
              </Colxx>
              <Label sm="2">
                <IntlMessages id="contact.person.landline" />
              </Label>
              <Colxx sm="4">
                <Input type="text" value={contact_person_landlineno} disabled={true} name="contact_person_landlineno" onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <Button className="float-right" color="primary" onClick={AddProfileDetail} >
              <IntlMessages id="account.up" />
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
