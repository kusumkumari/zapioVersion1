/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  Form,
  Input
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

export default class Changepassword extends Component {
  render() {
    const { changepasswordHandler,handleChange } = this.props;
    return (
      <Card>
        <CardBody>
            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="account.old" />
              </Label>
              <Colxx sm="7">
                <Input type="password" name="oldpassword"  onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="account.new" />
              </Label>
              <Colxx sm="7">
                <Input type="password" name="newpassword"   onChange={handleChange}/>
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="4">
                <IntlMessages id="account.con" />
              </Label>
              <Colxx sm="7">
                <Input type="password" name="confirmpassword"  onChange={handleChange} />
              </Colxx>
            </FormGroup>
            <Button className="float-right" color="primary" onClick={changepasswordHandler} >
              <IntlMessages id="account.up" />
            </Button>
        </CardBody>
      </Card>
    );
  }
}
