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
  Modal, ModalBody, ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Avatar from '@material-ui/core/Avatar';
import { Save, Close } from '@material-ui/icons';
import Dropzone from "react-dropzone";
import { RemoveCircle, FastRewind, FastForward } from "@material-ui/icons";
import "../../assets/css/custom.css"
export default class ProductAdd extends Component {

  render() {
    const { categorydata,
      tagData,
      tagDataLength,
      categoryLength,
      SubCatdata,
      SubCatdataLength,
      addOndata,
      addOndataLength,
      variantdata,
      variantdataLength,
      fooddata,
      fooddataLength,
      taxdata,
      taxdataLength,
      onChangeHandler, shiftRight, shiftLeft, deleteImage } = this.props;
    const tagOptions = [];
    const subCatOptions = [];
    const CatOptions = [];
    const addOnptions = [];
    const variantOptions = [];
    const foodTypeOption = [];
    const aggregater = [];
    const taxOptions = [];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      CatOptions.push({ label: category_name, value: id, key: id })
    }

    for (let index = 0; index < tagDataLength; index++) {
      const { id, tag_name } = tagData[index];
      tagOptions.push({ value: id, label: tag_name, key: id })
    }

    for (let index = 0; index < SubCatdataLength; index++) {
      const { id, subcategory_name } = SubCatdata[index];
      subCatOptions.push({ label: subcategory_name, value: id, key: id })
    }

    for (let index = 0; index < addOndataLength; index++) {
      const { id, addon_gr_name } = addOndata[index];
      addOnptions.push({ label: addon_gr_name, value: id, key: id })
    }

    for (let index = 0; index < variantdataLength; index++) {
      const { id, variant } = variantdata[index];
      variantOptions.push({ label: variant, value: id, key: id })
    }

    for (let index = 0; index < fooddataLength; index++) {
      const { id, food_type } = fooddata[index];
      foodTypeOption.push({ label: food_type, value: id, key: id })
    }

    for (let index = 0; index < taxdataLength; index++) {
      const { id, tax_name } = taxdata[index];
      taxOptions.push({ label: tax_name, value: id, key: id })
    }

    aggregater.push({ label: "Zomato", value: "zomato" }, { label: "Swiggy", value: "swiggy" })
    const ImagePreview = (props) => {
      const imageStyle = { height: "100px", width: "auto" };
      const containerStyle = {
        margin: "3px",
        border: "1px solid",
        padding: "12px",
        position: "relative",
      };
      const arrowContainerStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
      };
      const deleteIconStyle = {
        position: "absolute",
        top: 0,
        right: 0,
        color: "tomato",
        cursor: "pointer",
      };
      const arrowStyle = {
        color: "#121212",
        marginLeft: "5px",
        marginRight: "5px",
        cursor: "pointer",
      };
      const { image, index, shiftLeft, shiftRight, deleteImage } = props;

      const url = URL.createObjectURL(image);

      return (
        <div style={containerStyle}>
          <RemoveCircle
            style={deleteIconStyle}
            onClick={(e) => deleteImage(index)}
          />
          <img style={imageStyle} alt="Uploaded Files" src={url} />
          <div style={arrowContainerStyle} align="center">
            <FastRewind style={arrowStyle} onClick={(e) => shiftLeft(index)} />
            <FastForward style={arrowStyle} onClick={(e) => shiftRight(index)} />
          </div>
        </div>
      );
    };
    return (
      <Modal
        isOpen={this.props.isFormOpen}
      >
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>

          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}
          >
            <i className="simple-icon-list" style={{ fontSize: "xx-large" }} />
          </Avatar>&nbsp;
          <IntlMessages id='product.add-product' />

        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-name" />
                </Label>
                <Colxx sm="8">
                  <Input type="text" name="product_name" value={this.props.product_name} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-priority" />
                </Label>
                <Colxx sm="8">
                  <Input type="number" name="priority" value={this.props.priority} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-code" />
                </Label>
                <Colxx sm="8">
                  <Input type="text" name="product_code" value={this.props.product_code} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.category" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="CatId"
                    value={this.props.catArray}
                    onChange={this.props.handleChange}
                    options={CatOptions} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.subcategory" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.subcatArray}
                    onChange={this.props.handleChangeSubCat}
                    options={subCatOptions} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.foodType" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.foodTypeArray}
                    onChange={this.props.handleChangeFoodType}
                    options={foodTypeOption} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-tag" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    isMulti={true}
                    classNamePrefix="react-select"
                    value={this.props.tagArray}
                    onChange={this.props.handleChangeTagType}
                    options={tagOptions} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-description" />
                </Label>
                <Colxx sm="8">
                  <Input type="textarea" name="product_discrp" value={this.props.product_discrp} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.kot-description" />
                </Label>
                <Colxx sm="8">
                  <Input type="textarea" name="kot_discrp" value={this.props.kot_discrp} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product-image" />
                </Label>
                <Colxx sm="8">
                  <Dropzone accept="image/*" onDrop={acceptedFiles => onChangeHandler(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <>
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          <p>Click to upload images or drag them here</p>

                        </div>

                      </>
                    )}

                  </Dropzone>
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <div style={{ display: "flex" }}>
                  {this.props.images && this.props.images.map((el, index) => (
                    <ImagePreview
                      image={el}
                      index={index}
                      key={index}
                      deleteImage={deleteImage}
                      shiftLeft={shiftLeft}
                      shiftRight={shiftRight}
                    />

                  ))}
                </div>
              </FormGroup>


              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.has-associate-variants" />
                </Label>
                <Colxx sm="8">
                  <CustomInput
                    type="checkbox"
                    id="hasvariant"
                    value={this.props.hasVariant}
                    defaultChecked={this.props.hasVariant}
                    onClick={this.props.manageVisibility}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product-recomeneded" />
                </Label>
                <Colxx sm="8">
                  <CustomInput
                    type="checkbox"
                    id="recomend"
                    value={this.props.recomend}
                    defaultChecked={this.props.recomend}
                    onClick={this.props.manageRecomend}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-aggregater" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    isMulti={true}
                    classNamePrefix="react-select"
                    value={this.props.aggregater}
                    onChange={this.props.handleChangeAggregater}
                    options={aggregater} />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.product-tax" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    isMulti={true}
                    classNamePrefix="react-select"
                    value={this.props.tax}
                    onChange={this.props.handleChangeTax}
                    options={taxOptions} />
                </Colxx>
              </FormGroup>
              <FormGroup row style={{ display: this.props.priceVisibilty }}>
                <Label sm="4">
                  <IntlMessages id="product.price" />
                </Label>
                <Colxx sm="8">
                  <Input type="number" name="price" value={this.props.price} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row style={{ display: this.props.priceVisibilty }}>
                <Label sm="4">
                  <IntlMessages id="product.discount-price" />
                </Label>
                <Colxx sm="8">
                  <Input type="number" name="discount" value={this.props.discount} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>
              <FormGroup row style={{ display: this.props.priceVisibilty }}>
                <Label sm="4">
                  <IntlMessages id="product.addon" />
                </Label>
                <Colxx sm="8">
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    options={addOnptions}
                    value={this.props.addOnGroups}
                    onChange={this.props.handleChangeAddOns}
                  />
                </Colxx>
              </FormGroup>

              <div style={{ display: this.props.variantsVisibilty }}>
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="product.Associate" />
                  </Label>
                  <Colxx sm="4">
                    <Button color="primary" size="xs" style={{ borderRadius: "500px" }} className="Plus-Button text-primary" onClick={this.props.handleAddShareholder}>
                      <IntlMessages id="product.plus" />
                    </Button>
                  </Colxx>
                </FormGroup>
                {this.props.shareholders.map((shareholder, idx) => (
                  <FormGroup row key={idx}>
                    <Colxx sm="6">
                      <Select
                        placeholder="Select Variant"
                        className="react-select react-1"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={shareholder.name}
                        onChange={this.props.handleShareholderNameChange(idx)}
                        options={variantOptions} />
                    </Colxx>

                    <Colxx sm="6">
                      <Select
                        placeholder="Select AddOns Group"
                        className="react-select react-1"
                        classNamePrefix="react-select"
                        isMulti={true}
                        options={addOnptions}
                        value={shareholder.addonGroup}
                        onChange={this.props.handleAddonGroupChange(idx)}
                      />
                    </Colxx>
                    <br />
                    <Colxx sm="6">
                      <Input
                        type="number"
                        placeholder="Price"
                        style={{ margin: 0, padding: "0.68rem" }}
                        value={shareholder.price}
                        onChange={this.props.handlePriceNameChange(idx)}
                      />
                    </Colxx>
                    <Colxx sm="6">
                      <Input
                        type="number"
                        placeholder="Discount"
                        style={{ margin: 0, padding: "0.68rem" }}
                        value={shareholder.dis}
                        onChange={this.props.handleDiscountChange(idx)}
                      />
                    </Colxx>
                    <Colxx sm="12" style={{ textAlign: "center", marginTop: "21px" }}>
                      <Button color="primary" size="xs" style={{ borderRadius: "500px" }} className="Plus-Button text-primary" onClick={this.props.handleRemoveShareholder(idx)}>
                        <IntlMessages id="product.sub" />
                      </Button>
                    </Colxx>
                  </FormGroup>
                ))}
              </div>
              <Button color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }} onClick={this.props.AddProductHandler}>
                <IntlMessages id="product.save" />&nbsp;
                <Save />
              </Button>
              <Button className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }} color="danger" onClick={this.props.cancel}  >
                <Close /><IntlMessages id="product.cancel" />
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal >

    );
  }
}
