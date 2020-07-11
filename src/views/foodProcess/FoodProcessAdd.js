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
  ModalHeader,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import Select from "react-select";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { productwiseVarient } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import { Delete, Add, Save, Close } from "@material-ui/icons";
import { centerContent } from "../../constants/defaultValues";
import Avatar from "@material-ui/core/Avatar";

export default class ProductAdd extends Component {
  constructor() {
    super();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.state = { product: "", varients: [] };
  }
  getProductVarient(id) {
    this.setState({ varients: [] });
    this.props.handleChangeVariant("");
    productwiseVarient({ p_id: id }, apiResponse => {
      console.log(apiResponse.response.data);
      if (apiResponse.response.data.errors)
        Notification(0, "This product has no varient", "Varient error!");
      else this.setState({ varients: apiResponse.response.data.data });
    });
  }
  render() {
    const {
      productdata,
      productdataLength,
      variantdata,
      variantdataLength,
      ingData,
      ingDataLength
    } = this.props;
    const productOptions = [];
    const variantOptions = this.state.varients.map(v => ({
      label: v.name,
      value: v.v_id,
      key: v.v_id
    }));
    const ingOptions = [];

    for (let index = 0; index < productdataLength; index++) {
      const { id, product_with_cat } = productdata[index];
      productOptions.push({ label: product_with_cat, value: id, key: id });
    }

    // for (let index = 0; index < variantdataLength; index++) {
    //   const { id, variant } = variantdata[index]
    //   variantOptions.push({ label: variant, value: id, key: id })
    // }

    for (let index = 0; index < ingDataLength; index++) {
      const { id, name } = ingData[index];
      ingOptions.push({ label: name, value: id, key: id });
    }

    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-cookies"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="food.add-food" />
        </ModalHeader>
        <ModalBody>
          <Card className="entry">
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.product" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="CatId"
                    value={this.props.productArray}
                    onChange={e => {
                      this.getProductVarient(e.value);
                      this.props.handleChangeProduct(e);
                    }}
                    options={productOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.variants" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.variantArray}
                    onChange={this.props.handleChangeVariant}
                    options={variantOptions}
                    isDisabled={variantOptions.length == 0}
                  />
                </Colxx>
              </FormGroup>
              <Separator className="my-3" />
              <CardTitle style={{}}>Add a Step *</CardTitle>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.step-no" />
                </Label>
                <Colxx sm="8">
                  <Input
                    disabled
                    type="number"
                    name="stepNo"
                    value={1}
                    // onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.step-name" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    name="stepName"
                    value={this.props.stepName}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.step-time" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="number"
                    name="stepTime"
                    value={this.props.stepTime}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.step-descrip" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    name="stepDiscrp"
                    value={this.props.stepDiscrp}
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.process-image" />
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
                  }}
                >
                  Upload Step Food Prepare Process Image
                  <Input
                    type="file"
                    onChange={this.props.onDrop}
                    style={{ display: "none" }}
                  />
                </Label>
                <Colxx sm="3">
                  {this.props.file && (
                    <div style={{ textAlign: "center" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{
                            height: "63px",
                            width: "80px",
                            objectFit: "cover"
                          }}
                          src={this.props.file}
                        />
                        &nbsp;&nbsp;
                        <i
                          style={{ outlineColor: "primary" }}
                          size=""
                          className="simple-icon-trash"
                          onClick={this.props.resetFile}
                        />
                      </span>
                    </div>
                  )}
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.food-ingredients" />
                </Label>
                <Colxx sm="8">
                  {this.props.ingredientList.map((ingredientList, idx) => (
                    <Row className="entry">
                      <FormGroup row key={idx}>
                        <Colxx sm="4">
                          <Select
                            placeholder="Select Ingredients"
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={ingredientList.ingredients}
                            onChange={this.props.handleIngredientNameChange(
                              idx
                            )}
                            options={ingOptions}
                          />
                        </Colxx>
                        <Colxx sm="3">
                          <Input
                            type="text"
                            placeholder="Unit"
                            style={{ margin: 0, padding: "0.68rem" }}
                            value={ingredientList.unit}
                            onChange={this.props.handleUnitNameChange(idx)}
                          />
                        </Colxx>
                        <Colxx sm="3">
                          <Input
                            type="number"
                            placeholder="Quantity"
                            style={{ margin: 0, padding: "0.68rem" }}
                            value={ingredientList.quantity}
                            onChange={this.props.handleQuantityNameChange(idx)}
                          />
                        </Colxx>

                        <Colxx sm="2" style={{ alignSelf: "center" }}>
                          <Button
                            // disabled={idx == 0}
                            color="primary"
                            size="xs"
                            style={{ borderRadius: "500px" }}
                            className="p-2"
                            onClick={this.props.handleRemoveIngredients(idx)}
                          >
                            <Delete style={{ fontSize: "18px" }} />
                          </Button>
                        </Colxx>
                      </FormGroup>
                    </Row>
                  ))}
                  <Row>
                    <Colxx sm="4">
                      <Button
                        color="primary"
                        size="xs"
                        style={{ borderRadius: "500px" }}
                        className={`${centerContent} py-1 px-2`}
                        onClick={this.props.handleAddIngredients}
                      >
                        <Add fontSize="small" />
                        Ingredient
                      </Button>
                    </Colxx>
                    <Colxx sm="8" />
                  </Row>
                </Colxx>
              </FormGroup>

              <Button
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={this.props.AddFoodProcessHandler}
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
