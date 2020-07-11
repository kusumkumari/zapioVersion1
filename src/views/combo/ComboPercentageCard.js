/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Button, CardTitle, CardBody, Card } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ComboPercentageAdd from "./ComboPercentageAdd";
import ComboPercentageList from "./ComboPercentageList";
import ComboPercentageEdit from "./ComboPercentageEdit";

import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css"
import { Notification } from "../Utils/Notification";
import moment from "moment";
import { listActiveProductAPI, listPercentAPI, AddPercentComboAPI, getPercentComboAPI, changePercentComboStatusAPI } from "../ApiIntegration";


class ComboPercentageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().toString(),
      endDate: moment().toString(),
      product: [],
      freeProduct: [],
      discountPercentage: "",
      data: [],
      dataLength: "",
      detailing_data: [],
      productdata: [],
      productLength: "",
      isEdit: false,
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
  listPercentCombo = () => {
    listPercentAPI((apiResponse) => {
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
    this.listPercentCombo();

  }
  AddPercentComboHandler = () => {
    const { product, freeProduct, discountPercentage, startDate, endDate } = this.state;
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
      product: productId, discount_product: freeProductId, discount_percent: discountPercentage,
      valid_frm: startDate, valid_till: endDate
    }

    AddPercentComboAPI(payload, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo Created success")
        this.setState({
          product: [], freeProduct: [], discountPercentage: "", startDate: moment().toString(),
          endDate: moment().toString(), isFormOpen:false,
        });
        this.listPercentCombo();

      }
      else {
        if (apiResponse.response.data.error.product) {
          Notification(0, apiResponse.response.data.error.product, "Product Error")
        }
        if (apiResponse.response.data.error.discount_product) {
          Notification(0, apiResponse.response.data.error.discount_product, "Discount Product Error")
        }

        if (apiResponse.response.data.error.discount_percent) {
          Notification(0, apiResponse.response.data.error.discount_percent, "Discount Percent. Error")
        }
        if (apiResponse.response.data.error.percent_value) {
          Notification(0, apiResponse.response.data.error.percent_value, "Discount Percent. values Error")
        }

        if (apiResponse.response.data.error.valid_frm) {
          Notification(0, apiResponse.response.data.error.valid_frm, "Valid From Error")
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

      }
    });
  }

  EditPercentComboHandler = () => {
    const { id, product, freeProduct, discountPercentage, startDate, endDate } = this.state;
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
      id: id.toString(), product: productId, discount_product: freeProductId, discount_percent: discountPercentage,
      valid_frm: startDate, valid_till: endDate
    }

    AddPercentComboAPI(payload, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo Created success")
        this.setState({
          product: [], freeProduct: [], discountPercentage: "", startDate: moment().toString(),
          endDate: moment().toString(), isFormOpen:false,
        });
        this.listPercentCombo();

      }
      else {
        if (apiResponse.response.data.error.product) {
          Notification(0, apiResponse.response.data.error.product, "Product Error")
        }
        if (apiResponse.response.data.error.discount_product) {
          Notification(0, apiResponse.response.data.error.discount_product, "Discount Product Error")
        }

        if (apiResponse.response.data.error.discount_percent) {
          Notification(0, apiResponse.response.data.error.discount_percent, "Discount Percent. Error")
        }
        if (apiResponse.response.data.error.percent_value) {
          Notification(0, apiResponse.response.data.error.percent_value, "Discount Percent. value Error")
        }

        if (apiResponse.response.data.error.valid_frm) {
          Notification(0, apiResponse.response.data.error.valid_frm, "Valid From Error")
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

      }
    });
  }
  cancel=()=>{
    this.setState({isFormOpen:false, isEdit:false, id:"", product:[], freeProduct:[], discountPercentage:"", startDate:moment().toString(), endDate:moment().toString()})
  }
  retrievePercentComboHandler = (id) => {
    getPercentComboAPI(id, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          combo_name: apiResponse.response.data.data[0].pcombo_name,
          product: apiResponse.response.data.data[0].product_detail,
          freeProduct: apiResponse.response.data.data[0].discount_product_detail,
          discountPercentage: apiResponse.response.data.data[0].discount_percent,
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
    changePercentComboStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Combo status changed")
        this.listPercentCombo();
      }
      else {
        Notification(0, "Something went wrong", "Combo status changed Error")
      }
    })
  }
  openForm=()=>{
    this.setState({isFormOpen:true, isEdit:false, id:"", product:[], freeProduct:[], discountPercentage:"", startDate:moment().toString(), endDate:moment().toString()})
  }

  render() {

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="simple-icon-share-alt text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="percentage.based.combo" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <ComboPercentageEdit {...this.state}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    handleChangeProduct={this.handleChangeProduct}
                    handleChangeFreeProduct={this.handleChangeFreeProduct}
                    handleChangeText={this.handleChangeText}
                    cancel={this.cancel}
                    EditPercentComboHandler={this.EditPercentComboHandler}
                  />
                  : ""}
                  {this.state.isFormOpen ?
                  <ComboPercentageAdd {...this.state}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    handleChangeProduct={this.handleChangeProduct}
                    handleChangeFreeProduct={this.handleChangeFreeProduct}
                    handleChangeText={this.handleChangeText}
                    AddPercentComboHandler={this.AddPercentComboHandler}
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
            <ComboPercentageList {...this.state}
              retrievePercentComboHandler={this.retrievePercentComboHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
            />
          </Colxx>
        </Row>

      </Fragment>
    );
  }
}
export default injectIntl(ComboPercentageCard);