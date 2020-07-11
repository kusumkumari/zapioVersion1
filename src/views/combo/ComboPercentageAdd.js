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
  Modal, ModalBody, ModalHeader
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class ComboPercentageAdd extends Component {
  render() {
    const { productdata, productLength } = this.props;
    const ProOptions = [];
    for (let index = 0; index < productLength; index++) {
      const { id, product_name } = productdata[index];
      ProOptions.push({ label: product_name, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="simple-icon-share-alt" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="combo.add-combo" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="combo.product" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.product}
                    onChange={this.props.handleChangeProduct}
                    options={ProOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="combo.discount-product" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.freeProduct}
                    onChange={this.props.handleChangeFreeProduct}
                    options={ProOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="combo.discount-percentage" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="number"
                    min={0}
                    name="discountPercentage"
                    value={this.props.discountPercentage}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="coupon.valid.from" />
                </Label>
                <Colxx sm="8">
                  <DatePicker
                    selected={moment(this.props.startDate)}
                    onChange={this.props.handleChangeStart}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="coupon.valid.to" />
                </Label>
                <Colxx sm="8">
                  <DatePicker
                    selected={moment(this.props.endDate)}
                    onChange={this.props.handleChangeEnd}
                  />
                </Colxx>
              </FormGroup>

              <Button
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={this.props.AddPercentComboHandler}
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
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
