/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ComboAdd from "./ComboAdd";
import ComboEdit from "./ComboEdit";
import ComboList from "./ComboList";
import "../../assets/css/custom.css"
import { Notification } from "../Utils/Notification";
import moment from "moment";
import { listActiveProductAPI, AddQtyComboAPI, listQtyComboAPI, getQtyComboAPI,changeQtyComboStatusAPI } from "../ApiIntegration";


class ComboCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().toString(),
      endDate: moment().toString(),
      product: [],
      freeProduct: [],
      discountPercentage: "",
      itemQty:"",
      freeItems:"",
      data: [],
      dataLength: "",
      isEdit: false,
      modal: false,
      detailing_data: [],
      productdata: [],
      productLength: "",
      isFormOpen:false,
    };
  }
  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };
  handleChangeProduct = e => {
    this.setState({ product: e })
  }
  handleChangeFreeProduct = e => {
    this.setState({ freeProduct: e })
  }
  handleChangeText = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  listQtyCombo = () => {
    listQtyComboAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    listActiveProductAPI({}, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          productdata: apiResponse.response.data.data,
          productLength: apiResponse.response.data.data.length,
        });
      }
    });
    this.listQtyCombo();

  }
  AddQtyComboHandler = () => {
    const { product, freeProduct, itemQty, freeItems, startDate, endDate } = this.state;
    let productId = ""
    let freeProductId = ""
    if (product == "")
      productId = ""
    else
      productId = product.value

    if (freeProduct == "")
      freeProductId = ""
    else
      freeProductId = freeProduct.value
    let payload = {
      product: productId, free_product: freeProductId, product_quantity: itemQty,
      free_pro_quantity: freeItems, valid_frm: startDate, valid_till: endDate
    }
    AddQtyComboAPI(payload, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo Created success")
        this.setState({
          product: [], freeProduct: [], itemQty: "", freeItems: "", startDate: moment().toString(),
          endDate: moment().toString(), isFormOpen:false,
        });
        this.listQtyCombo();

      }
      else {
        if (apiResponse.response.data.error.free_pro_quantity) {
          Notification(0, apiResponse.response.data.error.free_pro_quantity, "Free Product Qty. Error")
        }
        if (apiResponse.response.data.error.free_product) {
          Notification(0, apiResponse.response.data.error.free_product, "Free Product Error")
        }
        if (apiResponse.response.data.error.product) {
          Notification(0, apiResponse.response.data.error.product, "Product Error")
        }
        if (apiResponse.response.data.error.product_quantity) {
          Notification(0, apiResponse.response.data.error.product_quantity, "Product Qty. Error")
        }
        if (apiResponse.response.data.error.valid_till) {
          Notification(0, apiResponse.response.data.error.valid_till, "Valid Till Error")
        }
        if (apiResponse.response.data.error.from) {
          Notification(0, apiResponse.response.data.error.from, "Valid From Error")
        }
        if (apiResponse.response.data.error.from_till) {
          Notification(0, apiResponse.response.data.error.from_till, "Valid Till Error")
        }
        if (apiResponse.response.data.error.unique_check) {
          Notification(0, apiResponse.response.data.error.unique_check, "Duplication Error")
        }
        if (apiResponse.response.data.error.valid_free_pro_quantity) {
          Notification(0, apiResponse.response.data.error.valid_free_pro_quantity, "Free Items Error")
        }
        if (apiResponse.response.data.error.valid_product_quantity) {
          Notification(0, apiResponse.response.data.error.valid_product_quantity, "Item Qty. Error")
        }

      }
    });
  }
  EditQtyComboHandler = () => {
    const { id, product, freeProduct, itemQty, freeItems, startDate, endDate } = this.state;
    let productId = ""
    let freeProductId = ""
    if (product == "")
      productId = ""
    else
      if (product[0]) {
        productId = product[0].value
      }
      else {
        productId = product.value
      }

    if (freeProduct == "")
      freeProductId = ""
    else
      if (freeProduct[0]) {
        freeProductId = freeProduct[0].value
      }
      else {
        freeProductId = freeProduct.value
      }
    let payload = {
      id: id.toString(), product: productId, free_product: freeProductId, product_quantity: itemQty,
      free_pro_quantity: freeItems, valid_frm: startDate, valid_till: endDate
    }

    AddQtyComboAPI(payload, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo Updated success")

        this.setState({
          product: [], freeProduct: [], itemQty: "", freeItems: "", startDate: moment().toString(),
          endDate: moment().toString(), isEdit:false,
        });
        this.listQtyCombo();

      }
      else {
        if (apiResponse.response.data.error.free_pro_quantity) {
          Notification(0, apiResponse.response.data.error.free_pro_quantity, "Free Product Qty. Error")
        }
        if (apiResponse.response.data.error.free_product) {
          Notification(0, apiResponse.response.data.error.free_product, "Free Product Error")
        }
        if (apiResponse.response.data.error.product) {
          Notification(0, apiResponse.response.data.error.product, "Product Error")
        }
        if (apiResponse.response.data.error.product_quantity) {
          Notification(0, apiResponse.response.data.error.product_quantity, "Product Qty. Error")
        }
        if (apiResponse.response.data.error.valid_till) {
          Notification(0, apiResponse.response.data.error.valid_till, "Valid Till Error")
        }
        if (apiResponse.response.data.error.from) {
          Notification(0, apiResponse.response.data.error.from, "Valid From Error")
        }
        if (apiResponse.response.data.error.from_till) {
          Notification(0, apiResponse.response.data.error.from_till, "Valid Till Error")
        }
        if (apiResponse.response.data.error.unique_check) {
          Notification(0, apiResponse.response.data.error.unique_check, "Duplication Error")
        }
        if (apiResponse.response.data.error.valid_free_pro_quantity) {
          Notification(0, apiResponse.response.data.error.valid_free_pro_quantity, "Free Items Error")
        }
        if (apiResponse.response.data.error.valid_product_quantity) {
          Notification(0, apiResponse.response.data.error.valid_product_quantity, "Item Qty. Error")
        }
      }
    });
  }
  cancel=()=>{
    this.setState({isFormOpen:false, isEdit:false,product: [], freeProduct: [], itemQty: "", freeItems: "", startDate: moment().toString(),
    endDate: moment().toString()});
  }
  retrieveComboHandler = (id) => {
    getQtyComboAPI(id, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          combo_name:apiResponse.response.data.data[0].combo_name,
          product: apiResponse.response.data.data[0].product_detail,
          freeProduct: apiResponse.response.data.data[0].free_product_detail,
          itemQty: apiResponse.response.data.data[0].product_quantity,
          freeItems: apiResponse.response.data.data[0].free_pro_quantity,
          startDate: apiResponse.response.data.data[0].valid_frm,
          endDate: apiResponse.response.data.data[0].valid_till,
          id: apiResponse.response.data.data[0].id,
          isEdit: true,
          isFormOpen:false,
        });
      }
    });
  }
  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeQtyComboStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo status changed")
        this.listQtyCombo();
      }
      else {
        Notification(0, "Something went wrong", "Combo status changed Error")
      }
    })
  }
  openForm=()=>{
    this.setState({isFormOpen:true, isEdit:false, id:"", product:"", freeProduct:"", itemQty:"", freeItems:"", startDate:"", endDate:""})
  }

  render() {

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="simple-icon-tag text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="qty.based.combo" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <ComboEdit {...this.state}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    handleChangeProduct={this.handleChangeProduct}
                    handleChangeFreeProduct={this.handleChangeFreeProduct}
                    handleChangeText={this.handleChangeText}
                    EditQtyComboHandler={this.EditQtyComboHandler}
                    cancel={this.cancel}
                  />
                  : ""}
                  {this.state.isFormOpen ? 
                  <ComboAdd {...this.state}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    handleChangeProduct={this.handleChangeProduct}
                    handleChangeFreeProduct={this.handleChangeFreeProduct}
                    handleChangeText={this.handleChangeText}
                    AddQtyComboHandler={this.AddQtyComboHandler}
                    cancel={this.cancel}
                  />
                  :""
                }
              </Colxx>
            </Row>
          </Colxx>

        </Row>
        <Row>
          <Colxx md="12" className="mb-4">
            <ComboList {...this.state}
              retrieveComboHandler={this.retrieveComboHandler}
              handleChangeStatus={this.handleChangeStatus} 
              openForm={this.openForm}
   
            />
          </Colxx>
        </Row>


      </Fragment>
    );
  }
}
export default injectIntl(ComboCard);