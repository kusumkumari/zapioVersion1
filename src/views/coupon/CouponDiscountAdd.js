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
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody
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

export default class CouponAdd extends Component {
  render() {
    const {
      handleChange,
      categorydata,
      categoryLength,
      productdata,
      productLength,
      customerdata,
      customerLength
    } = this.props;
    console.log("ooooooooooo", customerdata, customerLength);
    const CatOptions = [{ label: "Select Category", value: "", key: "cat" }];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      CatOptions.push({ label: category_name, value: id, key: id });
    }
    const ProOptions = [];
    for (let index = 0; index < productLength; index++) {
      const { id, product_name } = productdata[index];
      ProOptions.push({ label: product_name, value: id, key: id });
    }
    const CustOptions = [];
    for (let index = 0; index < customerLength; index++) {
      const { id, email } = customerdata[index];
      CustOptions.push({ label: email, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-trophy"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="coupon.add-coupon" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.type" />
                </Label>
                <Colxx sm="4">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.couponType}
                    onChange={this.props.handleChangeCouponType}
                    options={this.props.CouponTypeData}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="coupon.code" />
                </Label>
                <Colxx sm="4">
                  <Input
                    type="text"
                    name="couponCode"
                    value={this.props.couponCode}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.frequency" />
                </Label>
                <Colxx sm="4">
                  <Input
                    type="text"
                    name="frequency"
                    value={this.props.frequency}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.valid.from" />
                </Label>
                <Colxx sm="4">
                  <DatePicker
                    selected={this.props.startDate}
                    onChange={this.props.handleChangeStart}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="coupon.valid.to" />
                </Label>
                <Colxx sm="4">
                  <DatePicker
                    selected={this.props.endDate}
                    onChange={this.props.handleChangeEnd}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.category" />
                </Label>
                <Colxx sm="4">
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.category}
                    options={CatOptions}
                    name="category"
                    onChange={this.props.handleChangeCategory}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="coupon.product" />
                </Label>
                <Colxx sm="4">
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.product}
                    options={ProOptions}
                    name="product"
                    onChange={this.props.handleChangeProduct}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.user" />
                </Label>
                <Colxx sm="4">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.user}
                    options={CustOptions}
                    onChange={this.props.handleChangeUser}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="coupon.is.automated" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="isAutomated"
                    value={this.props.isAutomated}
                    checked={this.props.isAutomated}
                    onClick={this.props.handleAutomated}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="coupon.is.minimal.shopping" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="minprice"
                    value={this.props.isMinShopping}
                    checked={this.props.isMinShopping}
                    onClick={this.props.manageVisibility}
                  />
                </Colxx>

                <Label sm="2" style={{ display: this.props.flatVisibilty }}>
                  <IntlMessages id="coupon.flat" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.flatVisibilty }}>
                  <Input
                    type="number"
                    min={0}
                    name="flatPrice"
                    value={this.props.flatPrice}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>

                <Label sm="2" style={{ display: this.props.discountVisibilty }}>
                  <IntlMessages id="coupon.discount" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.discountVisibilty }}>
                  <Input
                    type="number"
                    value={this.props.percentPrice}
                    max={100}
                    min={0}
                    name="percentPrice"
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="2" style={{ display: this.props.minVisibilty }}>
                  <IntlMessages id="coupon.min" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.minVisibilty }}>
                  <Input
                    type="number"
                    min={0}
                    value={this.props.minPrice}
                    name="minPrice"
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>

                <Label sm="2" style={{ display: this.props.maxVisibilty }}>
                  <IntlMessages id="coupon.max" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.maxVisibilty }}>
                  <Input
                    type="number"
                    min={0}
                    value={this.props.maxPrice}
                    name="maxPrice"
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <Button
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={this.props.AddCouponHandler}
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
