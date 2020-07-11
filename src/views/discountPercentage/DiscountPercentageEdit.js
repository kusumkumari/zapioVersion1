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
import { Edit, Close } from "@material-ui/icons";

export default class DiscountPercentageEdit extends Component {
  render() {
    const {
      categorydata,
      categoryLength,
      productdata,
      productLength,
      outletdata,
      outletLength,
      userData,
      userDataLength
    } = this.props;
    const RoleOptions =  [{ label: "Select User Role", value: "", key: "role" }];
    for (let index = 0; index < userDataLength; index++) {
      const { id, user_type } = userData[index];
      RoleOptions.push({ label: user_type, value: id, key: id });
    }
    const CatOptions = [{ label: "Select Category", value: "", key: "cat" }];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      CatOptions.push({ label: category_name, value: id, key: id });
    }
    const ProOptions = [];
    for (let index = 0; index < productLength; index++) {
      const { id, product } = productdata[index];
      ProOptions.push({ label: product, value: id, key: id });
    }
    const OutletOptions = [];
    for (let index = 0; index < outletLength; index++) {
      const { id, Outletname } = outletdata[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-pricing"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="discount.edit-discount-percentage" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="discount.discount-type" />
                </Label>
                <Colxx sm="4">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.discountType}
                    onChange={this.props.handleChangediscountType}
                    options={this.props.CouponTypeData}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="discount.name" />
                </Label>
                <Colxx sm="4">
                  <Input
                    type="text"
                    name="discountName"
                    value={this.props.discountName}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="discount.is-reason-required" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="isReason"
                    value={this.props.isReason}
                    checked={this.props.isReason}
                    onClick={this.props.handleReason}
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
                <Label sm="2">
                  <IntlMessages id="discount.valid.from" />
                </Label>
                <Colxx sm="4">
                  <DatePicker
                    selected={this.props.startDate}
                    onChange={this.props.handleChangeStart}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="discount.valid.to" />
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
                  <IntlMessages id="discount.all.category" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="allCategory"
                    value={this.props.allCategory}
                    checked={this.props.allCategory}
                    onClick={this.props.handleAllCat}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="discount.all.product" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="allProduct"
                    value={this.props.allProduct}
                    checked={this.props.allProduct}
                    onClick={this.props.handleAllPro}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2" style={{ display: this.props.catVisibilty }}>
                  <IntlMessages id="coupon.category" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.catVisibilty }}>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.category}
                    options={CatOptions}
                    name="category"
                    onChange={this.props.handleChangeCategory}
                  />
                </Colxx>
                <Label sm="2" style={{ display: this.props.proVisibilty }}>
                  <IntlMessages id="coupon.product" />
                </Label>
                <Colxx sm="4" style={{ display: this.props.proVisibilty }}>
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
                  <IntlMessages id="discount.role" />
                </Label>
                <Colxx sm="4">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.role}
                    options={RoleOptions}
                    onChange={this.props.handleChangeRole}
                  />
                </Colxx>
                <Label sm="2">
                  <IntlMessages id="coupon.outlets" />
                </Label>
                <Colxx sm="4">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.outlet}
                    options={OutletOptions}
                    onChange={this.props.handleChangeOutlet}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="discount.is.minimal.shopping" />
                </Label>
                <Colxx sm="2">
                  <CustomInput
                    type="checkbox"
                    id="minprice"
                    value={this.props.isMinShopping}
                    checked={this.props.isMinShopping}
                    onClick={this.props.manageVisibility}
                  />
                </Colxx>
                <Label sm="2" style={{ display: this.props.minVisibilty }}>
                  <IntlMessages id="coupon.min" />
                </Label>
                <Colxx sm="2" style={{ display: this.props.minVisibilty }}>
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
                <Colxx sm="2" style={{ display: this.props.maxVisibilty }}>
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
                onClick={this.props.EditDiscountHandler}
              >
                <IntlMessages id="product.edit" />
                &nbsp;
                <Edit />
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
