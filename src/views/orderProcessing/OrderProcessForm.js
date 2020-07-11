/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";

export default class OrderProcessForm extends Component {
  render() {
    const { data, deliveryBoy, deliveryBoyLength,orderStatusType,status, ordStatus,is_delivery_boy } = this.props;
    const deliveryBoyData = [];
    for (let index = 0; index < deliveryBoyLength; index++) {
      const { value, label, key } = deliveryBoy[index];
      deliveryBoyData.push({ label: label, value: value, key: key })
    }
    console.log("kkkkkkkkkkkkkkkkk",orderStatusType)


    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="order.Order Processing" />
          </CardTitle>
          <FormGroup row>
            <Label sm="5">
              <IntlMessages id="order.orderid" />
            </Label>
            <Colxx sm="7">
              <Input
                type="text"
                disabled={true}
                value={this.props.orderId}
               />
            </Colxx>
          </FormGroup>
          <FormGroup row>
            <Label sm="5">
              <IntlMessages id="order.order-processing-status" />
            </Label>
            <Colxx sm="7">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                onChange={this.props.handleChange}
                options={orderStatusType} />
            </Colxx>
          </FormGroup>
          {is_delivery_boy == 1 ?
          <FormGroup row>
            <Label sm="5">
              <IntlMessages id="order.delivery-boy" />
            </Label>
            <Colxx sm="7">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                onChange={this.props.handleChangeDelivery}
                options={deliveryBoyData} />
            </Colxx>
          </FormGroup>
          :""}
          {/* <div style={{justifyContent:"center"}}> */}
           <Button className="float-right mg-10" color="primary" onClick={this.props.cancel}>
            <IntlMessages id="product.cancel" />
          </Button>&nbsp;
          <Button className="float-right mg-10" color="primary" onClick={this.props.handleChangeOrderStatus}>
            <IntlMessages id="product.save" />
          </Button>
          {/* </div> */}
        </CardBody>
      </Card>
    );
  }
}
