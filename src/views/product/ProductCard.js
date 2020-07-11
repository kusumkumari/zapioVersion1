/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Button, CardTitle, CardBody, Card } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductList from "./ProductList";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import AddVariants from "./AddVariants";
import AddAddOn from "./AddAddOn";
import AddAddOnsGroup from "./AddAddonsGroup";
import AddTag from "./AddTag";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import { Notification } from "../Utils/Notification";
import {
  listCatWiseSubcategoryAPI,
  listActiveTagAPI,
  listActiveAddonGroupAPI,
  listActiveVariantAPI,
  listProductAPI,
  changeProductStatusAPI,
  listActiveFoodTypeAPI,
  addProductAPI,
  listActiveCategoriesAPI,
  getProductAPI,
  listActiveTaxAPI
} from "../ApiIntegration";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catModalOpen: false,
      SubCatModalOpen: false,
      VarntModalOpen: false,
      AddOnModalOpen: false,
      AddOnGrpModalOpen: false,
      TagModalOpen: false,
      shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }],
      addOnGroups: [],
      images: [],
      priceVisibilty: "",
      variantsVisibilty: "none",
      catArray: "",
      subcatArray: "",
      product_name: "",
      price: "",
      priority: "",
      hasVariant: false,
      foodTypeArray: "",
      tagArray: [],
      product_code: "",
      product_discrp: "",
      data: [],
      dataLength: null,
      modal: false,
      isEdit: false,
      detailing_data: [],
      tagData: [],
      tagDataLength: "",
      id: "",
      discount: "",
      isFormOpen: "",
      kot_discrp: "",
      recomend: false,
      tax: [],
      status: true,
      aggregater: [],
    };
  }
  catToggleModal = () => {
    this.setState({
      catModalOpen: !this.state.catModalOpen
    });
  };
  subCatToggleModal = () => {
    this.setState({
      SubCatModalOpen: !this.state.SubCatModalOpen
    });
  };
  varntToggleModal = () => {
    this.setState({
      VarntModalOpen: !this.state.VarntModalOpen
    });
  };
  addOnToggleModal = () => {
    this.setState({
      AddOnModalOpen: !this.state.AddOnModalOpen
    });
  };
  addOnTagModal = () => {
    this.setState({
      TagModalOpen: !this.state.TagModalOpen
    });
  };
  addOnsGrpToggleModal = () => {
    this.setState({
      AddOnGrpModalOpen: !this.state.AddOnGrpModalOpen
    });
  };

  manageVisibility = () => {
    let checkbox = document.getElementById("hasvariant");
    let price = "";
    let variant = "";
    if (checkbox.checked != true) {
      price = "";
      variant = "none";
      this.setState({
        hasVariant: false,
        shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }]
      });
    } else {
      price = "none";
      variant = "";
      this.setState({ hasVariant: true, price: "", discount: "" });
      let e = [];
      this.handleChangeAddOns(e);
    }
    this.setState({ priceVisibilty: price, variantsVisibilty: variant });
  };
  manageRecomend = () => {
    let checkbox = document.getElementById("recomend");
    if (checkbox.checked != true) {
      this.setState({
        recomend: false,
      });
    } else {
      this.setState({ recomend: true });
    }
  };


  listSubcat(catId) {
    listCatWiseSubcategoryAPI(catId, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          SubCatdata: apiResponse.response.data.data,
          SubCatdataLength: apiResponse.response.data.data.length
        });
      }
    });
  }

  handleChange = e => {
    this.setState({
      catArray: e,
      subcatArray: "",
      SubCatdata: [],
      SubCatdataLength: ""
    });
    this.listSubcat(e.value);
  };
  handleChangeSubCat = e => {
    this.setState({ subcatArray: e });
  };
  handleChangeAddOns = e => {
    this.setState({ addOnGroups: e });
  };
  handleChangeTagType = e => {
    this.setState({ tagArray: e });
  };
  handleChangeFoodType = e => {
    this.setState({ foodTypeArray: e });
  };
  handleChangeTax = e => {
    this.setState({ tax: e });
  };
  handleChangeAggregater = e => {
    this.setState({ aggregater: e });
  }
  handleChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    listActiveCategoriesAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          categorydata: apiResponse.response.data.data,
          categoryLength: apiResponse.response.data.data.length
        });
      }
    });
    listActiveAddonGroupAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          addOndata: apiResponse.response.data,
          addOndataLength: apiResponse.response.data.length
        });
      }
    });
    listActiveVariantAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          variantdata: apiResponse.response.data.data,
          variantdataLength: apiResponse.response.data.data.length
        });
      }
    });
    listActiveFoodTypeAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          fooddata: apiResponse.response.data,
          fooddataLength: apiResponse.response.data.length
        });
      }
    });
    listActiveTagAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          tagData: apiResponse.response.data.data,
          tagDataLength: apiResponse.response.data.data.length
        });
      }
    });
    listActiveTaxAPI(apiResponse => {
      console.log("hhhhhhhhhhhhhhh", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          taxdata: apiResponse.response.data.data,
          taxdataLength: apiResponse.response.data.data.length
        });
      }
    });
    this.listProduct(this.state.status);
  }
  listProduct = (status) => {
    listProductAPI({ status: status }, apiResponse => {
      console.log(apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
          variantsVisibilty: "none",
          priceVisibilty: ""
        });
      }
    });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt };
    });
    this.setState({ shareholders: newShareholders });
  };

  handlePriceNameChange = idx => evt => {
    const newPrice = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, price: evt.target.value };
    });
    this.setState({ shareholders: newPrice });
  };
  handleDiscountChange = idx => evt => {
    const newDis = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, dis: evt.target.value };
    });
    this.setState({ shareholders: newDis });
  };
  handleAddonGroupChange = idx => evt => {
    const newAddon = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, addonGroup: evt };
    });
    this.setState({ shareholders: newAddon });
  };
  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([
        { price: "", name: "", dis: "", addonGroup: "" }
      ])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  onChangeHandler = (selectedImages) => {
    console.log("ssssssssssssssssssssss", selectedImages)
    if (selectedImages.length > 5) {
      Notification(
        0,
        "",
        "You cann't upload images more then 5 !!"
      );
    }
    else {
      this.setState({ file: [], images: selectedImages });
    }
  };

  deleteImage = (deleteIndex) =>
    this.setState({ images: this.state.images.filter((imageItem, index) => index !== deleteIndex) });

  shiftLeft = (index) => {
    const { images } = this.state;
    if (index === 0) return;
    let temp = images[index];
    images[index] = images[index - 1];
    images[index - 1] = temp;
    this.setState([...images]);
  };

  shiftRight = (index) => {
    const { images } = this.state;
    if (index === images.length - 1) return;
    let temp = images[index];
    images[index] = images[index + 1];
    images[index + 1] = temp;
    this.setState([...images]);
  };




  editProductHandler = id => {
    const {
      addOnGroups,
      shareholders,
      tagArray,
      price,
      discount,
      product_name,
      priority,
      images,
      product_code,
      product_discrp,
      hasVariant,
      catArray,
      subcatArray,
      foodTypeArray,
      kot_discrp,
      tax,
      recomend,
      aggregater,

    } = this.state;
    let addOnGroupArray = [];
    let tags = [];
    let taxArray = [];
    let aggregatorArray = [];
    for (let i = 0; i < aggregater.length; i++) {
      aggregatorArray.push(aggregater[i].value);
    }
    for (let i = 0; i < tagArray.length; i++) {
      tags.push(tagArray[i].value);
    }
    for (let i = 0; i < addOnGroups.length; i++) {
      addOnGroupArray.push(addOnGroups[i].value);
    }
    for (let i = 0; i < tax.length; i++) {
      taxArray.push(tax[i].value);
    }
    let variantsArray = [];
    for (let i = 0; i < shareholders.length; i++) {
      var addonsArray = [];
      var addongrp = shareholders[i].addonGroup;
      for (let j = 0; j < shareholders[i].addonGroup.length; j++) {
        addonsArray.push(addongrp[j].value);
      }
      variantsArray.push({
        name: shareholders[i].name.label,
        price: shareholders[i].price,
        discount_price: shareholders[i].dis,
        addon_group: addonsArray
      });
    }
    let catValue = "";
    let subcat = "";
    let food_type = "";
    if (catArray) {
      if (catArray[0]) catValue = catArray[0].value;
      else catValue = catArray.value;
    } else {
      catValue = "";
    }
    if (subcatArray) {
      if (subcatArray[0]) subcat = subcatArray[0].value;
      else subcat = subcatArray.value;
    } else {
      subcat = "";
    }
    if (foodTypeArray) {
      if (foodTypeArray[0]) food_type = foodTypeArray[0].value;
      else food_type = foodTypeArray.value;
    } else {
      food_type = "";
    }
    addProductAPI(
      id,
      catValue,
      subcat,
      tags,
      addOnGroupArray,
      variantsArray,
      price,
      discount,
      product_name,
      priority,
      images,
      food_type,
      product_code,
      product_discrp,
      kot_discrp,
      hasVariant,
      taxArray,
      recomend,
      aggregatorArray,
      apiResponse => {
        console.log("ooooooooooooo", apiResponse)
        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Product completion success"
            );
            this.setState({
              catArray: [],
              subcatArray: [],
              addOnGroups: [],
              shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }],
              price: "",
              discount: "",
              product_name: "",
              priority: "",
              images: [],
              file: "",
              tagArray: [],
              product_code: "",
              product_discrp: "",
              hasVariant: false,
              variantsVisibilty: "none",
              priceVisibilty: "",
              catArray: [],
              subcatArray: [],
              foodTypeArray: [],
              isEdit: false,
              kot_discrp: "",
              tax: [],
              recomend: false,
              aggregater: [],
            });
            this.listProduct(this.state.status);
          }
        } else {
          if (apiResponse.response.data.error.product_name) {
            Notification(
              0,
              apiResponse.response.data.error.product_name,
              "Product Name Error"
            );
          }
          if (apiResponse.response.data.error.priority) {
            Notification(
              0,
              apiResponse.response.data.error.priority,
              "Priority Error"
            );
          }
          if (apiResponse.response.data.error.product_category) {
            Notification(
              0,
              apiResponse.response.data.error.product_category,
              "Product Category Error"
            );
          }
          if (apiResponse.response.data.error.price) {
            Notification(
              0,
              apiResponse.response.data.error.price,
              "Price Error"
            );
          }
          if (apiResponse.response.data.error.price) {
            Notification(
              0,
              apiResponse.response.data.error.price,
              "Price Error"
            );
          }
          if (apiResponse.response.data.error.image_size) {
            Notification(
              0,
              apiResponse.response.data.error.image_size,
              "Image Size Error"
            );
          }
          if (apiResponse.response.data.error.priority_check) {
            Notification(
              0,
              apiResponse.response.data.error.priority_check,
              "Priority Error"
            );
          }
          if (apiResponse.response.data.error.food_type) {
            Notification(
              0,
              apiResponse.response.data.error.food_type,
              "Food Type Error"
            );
          }
          if (apiResponse.response.data.error.duplicate_variant) {
            Notification(
              0,
              apiResponse.response.data.error.duplicate_variant,
              "Variant Duplication Error"
            );
          }
          if (apiResponse.response.data.error.unique_code_check) {
            Notification(
              0,
              apiResponse.response.data.error.unique_code_check,
              "Product Code Error"
            );
          }
          if (apiResponse.response.data.error.unique_check) {
            Notification(
              0,
              apiResponse.response.data.error.unique_check,
              "Product Duplication Error"
            );
          }
          if (apiResponse.response.data.error.product_code) {
            Notification(
              0,
              apiResponse.response.data.error.product_code,
              "Product Code Error"
            );
          }
          if (apiResponse.response.data.error.product_desc) {
            Notification(
              0,
              apiResponse.response.data.error.product_desc,
              "Product Description Error"
            );
          }
          if (apiResponse.response.data.error.tax_association) {
            Notification(
              0,
              apiResponse.response.data.error.tax_association,
              "Product Tax Error"
            );
          }

          if (apiResponse.response.data.error.variant_detail) {
            Notification(
              0,
              apiResponse.response.data.error.variant_detail,
              "Variant Detail Error"
            );
          }
          if (apiResponse.response.data.error.varinat_price) {
            Notification(
              0,
              apiResponse.response.data.error.varinat_price,
              "Variant Price Error"
            );
          }
        }
      }
    );
  };
  AddProductHandler = e => {
    const {
      addOnGroups,
      shareholders,
      price,
      discount,
      tagArray,
      product_name,
      priority,
      images,
      product_code,
      product_discrp,
      hasVariant,
      catArray,
      subcatArray,
      foodTypeArray,
      kot_discrp,
      tax,
      recomend,
      aggregater,
    } = this.state;
    let addOnGroupArray = [];
    let tags = [];
    let taxArray = [];
    let aggregatorArray = [];
    for (let i = 0; i < aggregater.length; i++) {
      aggregatorArray.push(aggregater[i].value);
    }


    for (let i = 0; i < tagArray.length; i++) {
      tags.push(tagArray[i].value);
    }
    for (let i = 0; i < addOnGroups.length; i++) {
      addOnGroupArray.push(addOnGroups[i].value);
    }
    for (let i = 0; i < tax.length; i++) {
      taxArray.push(tax[i].value);
    }
    let variantsArray = [];
    for (let i = 0; i < shareholders.length; i++) {
      var addonsArray = [];
      var addongrp = shareholders[i].addonGroup;
      for (let j = 0; j < shareholders[i].addonGroup.length; j++) {
        addonsArray.push(addongrp[j].value);
      }
      variantsArray.push({
        name: shareholders[i].name.label,
        price: shareholders[i].price,
        discount_price: shareholders[i].dis,
        addon_group: addonsArray
      });
    }
    let subcat = "";
    let food_type = "";
    let catValue = "";
    if (catArray) {
      catValue = catArray.value;
    } else {
      catValue = "";
    }
    if (subcatArray) {
      subcat = subcatArray.value;
    } else {
      subcat = "";
    }
    if (foodTypeArray) {
      food_type = foodTypeArray.value;
    } else {
      food_type = "";
    }
    let id = "";
    addProductAPI(
      id,
      catValue,
      subcat,
      tags,
      addOnGroupArray,
      variantsArray,
      price,
      discount,
      product_name,
      priority,
      images,
      food_type,
      product_code,
      product_discrp,
      kot_discrp,
      hasVariant,
      taxArray,
      recomend,
      aggregatorArray,
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Product completion success"
            );
            this.setState({
              id: "",
              catArray: [],
              subcatArray: [],
              addOnGroups: [],
              shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }],
              price: "",
              discount: "",
              product_name: "",
              priority: "",
              images: [],
              file: "",
              tagArray: [],
              product_code: "",
              product_discrp: "",
              hasVariant: false,
              catArray: [],
              subcatArray: [],
              foodTypeArray: [],
              kot_discrp: "",
              tax: [],
              recomend: false,
              aggregater: [],
            });
            this.listProduct(this.state.status);
          }
        } else {
          if (apiResponse.response.data.error.product_name) {
            Notification(
              0,
              apiResponse.response.data.error.product_name,
              "Product Name Error"
            );
          }
          if (apiResponse.response.data.error.priority) {
            Notification(
              0,
              apiResponse.response.data.error.priority,
              "Priority Error"
            );
          }
          if (apiResponse.response.data.error.product_category) {
            Notification(
              0,
              apiResponse.response.data.error.product_category,
              "Product Category Error"
            );
          }
          if (apiResponse.response.data.error.price) {
            Notification(
              0,
              apiResponse.response.data.error.price,
              "Price Error"
            );
          }
          if (apiResponse.response.data.error.image_size) {
            Notification(
              0,
              apiResponse.response.data.error.image_size,
              "Image Size Error"
            );
          }
          if (apiResponse.response.data.error.info) {
            Notification(
              0,
              apiResponse.response.data.error.info,
              "Form Incompletion Error"
            );
          }
          if (apiResponse.response.data.error.priority_check) {
            Notification(
              0,
              apiResponse.response.data.error.priority_check,
              "Priority Error"
            );
          }
          if (apiResponse.response.data.error.food_type) {
            Notification(
              0,
              apiResponse.response.data.error.food_type,
              "Food Type Error"
            );
          }
          if (apiResponse.response.data.error.duplicate_variant) {
            Notification(
              0,
              apiResponse.response.data.error.duplicate_variant,
              "Variant Duplication Error"
            );
          }
          if (apiResponse.response.data.error.unique_code_check) {
            Notification(
              0,
              apiResponse.response.data.error.unique_code_check,
              "Product Code Error"
            );
          }
          if (apiResponse.response.data.error.unique_check) {
            Notification(
              0,
              apiResponse.response.data.error.unique_check,
              "Product Duplication Error"
            );
          }
          if (apiResponse.response.data.error.product_code) {
            Notification(
              0,
              apiResponse.response.data.error.product_code,
              "Product Code Error"
            );
          }
          if (apiResponse.response.data.error.product_desc) {
            Notification(
              0,
              apiResponse.response.data.error.product_desc,
              "Product Description Error"
            );
          }
          if (apiResponse.response.data.error.tax_association) {
            Notification(
              0,
              apiResponse.response.data.error.tax_association,
              "Product Tax Error"
            );
          }

          if (apiResponse.response.data.error.variant_detail) {
            Notification(
              0,
              apiResponse.response.data.error.variant_detail,
              "Variant Detail Error"
            );
          }
          if (apiResponse.response.data.error.varinat_price) {
            Notification(
              0,
              apiResponse.response.data.error.varinat_price,
              "Variant Price Error"
            );
          }
        }
      }
    );
  };

  toggle = id => {
    getProductAPI(id, apiResponse => {
      console.log(apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data[0]
        }));
      }
    });
  };
  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeProductStatusAPI(id, status, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Product status changed"
        );
        this.listProduct(this.state.status);
      } else {
        Notification(0, "Something went wrong", "Product status changed Error");
      }
    });
  };

  getProductHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false });
    getProductAPI(id, apiResponse => {
      console.log("rrrrrrrrrrrrrr", apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState({
          id: id,
          catArray: apiResponse.response.data.data[0].cat_detail,
          subcatArray: apiResponse.response.data.data[0].subcat_detail,
          addOnGroups: apiResponse.response.data.data[0].addon_details,
          outlets: apiResponse.response.data.data[0].outlet_details,
          shareholders: apiResponse.response.data.data[0].variant_deatils
            ? apiResponse.response.data.data[0].variant_deatils
            : [{ name: "", price: "", dis: "", addonGroup: "" }],
          price: apiResponse.response.data.data[0].price,
          discount: apiResponse.response.data.data[0].discount_price,
          product_name: apiResponse.response.data.data[0].product_name,
          priority: apiResponse.response.data.data[0].priority,
          file: apiResponse.response.data.data[0].product_image,
          foodTypeArray: apiResponse.response.data.data[0].foodtype_detail,
          tagArray: apiResponse.response.data.data[0].tags,
          product_code: apiResponse.response.data.data[0].product_code,
          product_discrp: apiResponse.response.data.data[0].product_desc,
          kot_discrp: apiResponse.response.data.data[0].kot_desc,
          hasVariant: apiResponse.response.data.data[0].has_variant,
          tax: apiResponse.response.data.data[0].tax_association,
          recomend: apiResponse.response.data.data[0].is_recommended,
          aggregater: apiResponse.response.data.data[0].platform_detail,

        });
        let price = "";
        let variant = "";
        if (apiResponse.response.data.data[0].has_variant != true) {
          price = "";
          variant = "none";
        } else {
          price = "none";
          variant = "";
        }
        this.setState({ priceVisibilty: price, variantsVisibilty: variant });
        this.listSubcat(apiResponse.response.data.data[0].cat_detail[0].value);
      }
    });
  };
  handleChangelistStatus = () => {
    this.setState({ status: !this.state.status })
    this.listProduct(!this.state.status);

  }

  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      id: "",
      priceVisibilty: "",
      variantsVisibilty: "none",
      catArray: [],
      subcatArray: [],
      addOnGroups: [],
      shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }],
      price: "",
      discount: "",
      product_name: "",
      priority: "",
      images: [],
      file: "",
      tagArray: [],
      product_code: "",
      product_discrp: "",
      hasVariant: false,
      catArray: [],
      subcatArray: [],
      tax: [],
      foodTypeArray: []
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      id: "",
      priceVisibilty: "",
      variantsVisibilty: "none",
      catArray: [],
      subcatArray: [],
      addOnGroups: [],
      shareholders: [{ name: "", price: "", dis: "", addonGroup: "" }],
      price: "",
      discount: "",
      product_name: "",
      priority: "",
      images: [],
      file: "",
      tagArray: [],
      product_code: "",
      product_discrp: "",
      hasVariant: false,
      catArray: [],
      subcatArray: [],
      tax: [],
      foodTypeArray: []
    });
  };
  render() {
    console.log("kkkkkkkkkkkkkkk", this.state.images)
    const {
      catModalOpen,
      SubCatModalOpen,
      VarntModalOpen,
      AddOnModalOpen,
      AddOnGrpModalOpen,
      TagModalOpen
    } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-list text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb heading="product.management" match={this.props.match} />
            <Separator className="mb-2" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="9">
            <Row>
              <Colxx md="12" className="mb-2" id="form">
                {this.state.isEdit ? (
                  <ProductEdit
                    {...this.state}
                    handleShareholderNameChange={
                      this.handleShareholderNameChange
                    }
                    handlePriceNameChange={this.handlePriceNameChange}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    handleAddShareholder={this.handleAddShareholder}
                    manageVisibility={this.manageVisibility}
                    manageRecomend={this.manageRecomend}
                    handleChangeTax={this.handleChangeTax}
                    handleChange={this.handleChange}
                    editProductHandler={this.editProductHandler}
                    handleChangeSubCat={this.handleChangeSubCat}
                    handleChangeAddOns={this.handleChangeAddOns}
                    handleChangeOutlet={this.handleChangeOutlet}
                    handleChangeFoodType={this.handleChangeFoodType}
                    handleChangeAggregater={this.handleChangeAggregater}
                    handleChangeTagType={this.handleChangeTagType}
                    handleChangeText={this.handleChangeText}
                    handleDiscountChange={this.handleDiscountChange}
                    handleAddonGroupChange={this.handleAddonGroupChange}
                    cancel={this.cancel}
                    onChangeHandler={this.onChangeHandler}
                    shiftRight={this.shiftRight}
                    shiftLeft={this.shiftLeft}
                    deleteImage={this.deleteImage}
                  />
                ) : (
                    ""
                  )}
                {this.state.isFormOpen ? (
                  <ProductAdd
                    {...this.state}
                    handleShareholderNameChange={
                      this.handleShareholderNameChange
                    }
                    handlePriceNameChange={this.handlePriceNameChange}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    handleAddShareholder={this.handleAddShareholder}
                    manageVisibility={this.manageVisibility}
                    manageRecomend={this.manageRecomend}
                    handleChangeTax={this.handleChangeTax}
                    handleChange={this.handleChange}
                    handleChangeAggregater={this.handleChangeAggregater}
                    AddProductHandler={this.AddProductHandler}
                    handleChangeSubCat={this.handleChangeSubCat}
                    handleChangeAddOns={this.handleChangeAddOns}
                    handleChangeOutlet={this.handleChangeOutlet}
                    handleChangeFoodType={this.handleChangeFoodType}
                    handleChangeTagType={this.handleChangeTagType}
                    handleChangeText={this.handleChangeText}
                    handleDiscountChange={this.handleDiscountChange}
                    handleAddonGroupChange={this.handleAddonGroupChange}
                    cancel={this.cancel}
                    onChangeHandler={this.onChangeHandler}
                    shiftRight={this.shiftRight}
                    shiftLeft={this.shiftLeft}
                    deleteImage={this.deleteImage}
                  />
                ) : (
                    ""
                  )}
              </Colxx>
            </Row>
          </Colxx>

        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-2">
            <ProductList
              title="dashboards.top-viewed-posts"
              {...this.state}
              catToggleModal={this.catToggleModal}
              subCatToggleModal={this.subCatToggleModal}
              varntToggleModal={this.varntToggleModal}
              addOnsGrpToggleModal={this.addOnsGrpToggleModal}
              addOnToggleModal={this.addOnToggleModal}
              addOnTagModal={this.addOnTagModal}
              toggle={this.toggle}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              getProductHandler={this.getProductHandler}
              handleChangelistStatus={this.handleChangelistStatus}
            />
          </Colxx>
        </Row>

        <AddCategory
          toggleModal={this.catToggleModal}
          modalOpen={catModalOpen}
        />
        <AddSubCategory
          toggleModal={this.subCatToggleModal}
          modalOpen={SubCatModalOpen}
        />
        <AddVariants
          toggleModal={this.varntToggleModal}
          modalOpen={VarntModalOpen}
        />
        <AddAddOn
          toggleModal={this.addOnToggleModal}
          modalOpen={AddOnModalOpen}
        />
        <AddAddOnsGroup
          toggleModal={this.addOnsGrpToggleModal}
          modalOpen={AddOnGrpModalOpen}
        />
        <AddTag toggleModal={this.addOnTagModal} modalOpen={TagModalOpen} />
      </Fragment>
    );
  }
}
export default injectIntl(Product);
