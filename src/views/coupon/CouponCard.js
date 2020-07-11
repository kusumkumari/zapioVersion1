/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import CouponAdd from "./CouponAdd";
import CouponEdit from "./CouponEdit";
import CouponList from "./CouponList";

import "../../assets/css/custom.css";
import { Notification } from "../Utils/Notification";
import moment from "moment";
import {
  getCouponAPI,
  listActiveCategoriesAPI,
  listActiveCustomerAPI,
  listActiveProductAPI,
  AddCouponAPI,
  listCouponAPI,
  changeCouponStatusAPI,
  listActiveOutletAPI
} from "../ApiIntegration";

class CouponCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      discountVisibilty: "none",
      flatVisibilty: "none",
      minVisibilty: "none",
      maxVisibilty: "none",
      category: [],
      catId: "",
      product: [],
      couponType: "",
      couponCode: "",
      user: [],
      minPrice: "",
      maxPrice: "",
      flatPrice: "",
      percentPrice: "",
      data: [],
      dataLength: "",
      frequency: "",
      isMinShopping: false,
      isAutomated: false,
      isEdit: false,
      modal: false,
      isFormOpen: false,
      detailing_data: [],
      outlet: [],
      id: ""
    };
  }
  handleChangeCategory = e => {
    this.setState({
      catId: e.value,
      category: e,
      productdata: [],
      productLength: ""
    });
    listActiveProductAPI({ cat_id: e.value }, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          productdata: apiResponse.response.data.data,
          productLength: apiResponse.response.data.data.length
        });
      }
    });
  };
  handleChangeProduct = e => {
    this.setState({ product: e });
  };
  handleChangeUser = e => {
    this.setState({ user: e });
  };
  handleChangeOutlet = e => {
    this.setState({ outlet: e });
  };

  handleAutomated = () => {
    let checkbox = document.getElementById("isAutomated");
    if (checkbox.checked == true) {
      this.setState({ isAutomated: true });
    } else {
      this.setState({ isAutomated: false });
    }
  };
  manageVisibility = () => {
    let checkbox = document.getElementById("minprice");
    if (checkbox.checked == true) {
      this.setState({
        minVisibilty: "",
        maxVisibilty: "",
        isMinShopping: true
      });
    } else {
      this.setState({
        minVisibilty: "none",
        maxVisibilty: "none",
        isMinShopping: false,
        minPrice: "",
        maxPrice: ""
      });
    }
  };
  handleChangeCouponType = e => {
    let chk = e.value;
    let flat = "";
    let discount = "";
    if (chk == "Flat") {
      flat = "";
      discount = "none";
      this.setState({ percentPrice: "" });
    } else {
      flat = "none";
      discount = "";
      this.setState({ flatPrice: "" });
    }
    this.setState({
      discountVisibilty: discount,
      flatVisibilty: flat,
      couponType: e
    });
  };
  handleChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeStart = date => {
    this.setState({
      startDate: moment(date)
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: moment(date)
    });
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
    listActiveProductAPI({}, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          productdata: apiResponse.response.data.data,
          productLength: apiResponse.response.data.data.length
        });
      }
    });
    // listActiveCustomerAPI(apiResponse => {
    //   if (apiResponse.status == "success") {
    //     this.setState({
    //       customerdata: apiResponse.response.data,
    //       customerLength: apiResponse.response.data.length
    //     });
    //   }
    // });
    listActiveOutletAPI(apiResponse => {
      if (apiResponse.status == "success") {
        console.log("eeeeeeeeeeeeeee", apiResponse);
        this.setState({
          outletdata: apiResponse.response.data,
          outletLength: apiResponse.response.data.length
        });
      }
    });
    this.listCoupon();
  }

  listCoupon = () => {
    listCouponAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  };

  AddCouponHandler = () => {
    const {
      catId,
      product,
      couponType,
      couponCode,
      // user,
      minPrice,
      maxPrice,
      flatPrice,
      percentPrice,
      frequency,
      isMinShopping,
      isAutomated,
      startDate,
      outlet,
      endDate
    } = this.state;
    let productArray = [];
    // let userArray = [];
    let outletArray = [];
    for (let i = 0; i < product.length; i++) {
      productArray.push(product[i].value);
    }
    // for (let i = 0; i < user.length; i++) {
    //   userArray.push(user[i].value);
    // }
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    let coupon_type = "";
    if (couponType == "") coupon_type = "";
    else coupon_type = couponType.value;
    let payload = {
      coupon_type: coupon_type,
      coupon_code: couponCode,
      frequency: frequency,
      valid_frm: startDate != "" ? startDate.format("YYYY-MM-DD") : "",
      valid_till: endDate != "" ? endDate.format("YYYY-MM-DD") : "",
      category: catId,
      product_map: productArray,
      flat_discount: flatPrice,
      flat_percentage: percentPrice,
      // user_map: userArray,
      outlet_id: outletArray,
      is_min_shop: isMinShopping,
      is_automated: isAutomated,
      min_shoping: minPrice,
      max_shoping: maxPrice
    };

    AddCouponAPI(payload, apiResponse => {
      if (apiResponse.response.data.success == true) {
        if (apiResponse.response.data.message) {
          Notification(
            1,
            apiResponse.response.data.message,
            "Coupon Created success"
          );
          this.setState({
            category: [],
            product: [],
            // user: [],
            outlet: [],
            couponType: "",
            couponCode: "",
            frequency: "",
            startDate: "",
            endDate: "",
            flatPrice: "",
            percentPrice: "",
            isMinShopping: false,
            isAutomated: false,
            minPrice: "",
            maxPrice: "",
            isFormOpen: false
          });
          this.listCoupon();
        }
      } else {
        const err = apiResponse.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };

  getCouponHandler = id => {
    getCouponAPI(id, apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          id: apiResponse.response.data.data[0].id,
          couponType: apiResponse.response.data.data[0].coupon_type,
          couponCode: apiResponse.response.data.data[0].coupon_code,
          frequency: apiResponse.response.data.data[0].frequency,
          startDate: moment(apiResponse.response.data.data[0].valid_frm),
          endDate: moment(apiResponse.response.data.data[0].valid_till),
          category: apiResponse.response.data.data[0].category,
          product: apiResponse.response.data.data[0].product_detail,
          flatPrice: apiResponse.response.data.data[0].flat_discount,
          percentPrice: apiResponse.response.data.data[0].flat_percentage,
          // user: apiResponse.response.data.data[0].user_detail,
          outlet: apiResponse.response.data.data[0].outlet_detail,
          isMinShopping: apiResponse.response.data.data[0].is_min_shop,
          isAutomated: apiResponse.response.data.data[0].is_automated,
          minPrice: apiResponse.response.data.data[0].min_shoping,
          maxPrice: apiResponse.response.data.data[0].max_shoping,
          isEdit: true,
          isFormOpen: false
        });
        let minVisibilty = "";
        let maxVisibilty = "";
        let flat = "";
        let discount = "";
        if (apiResponse.response.data.data[0].is_min_shop != true) {
          minVisibilty = "none";
          maxVisibilty = "none";
        } else {
          minVisibilty = "";
          maxVisibilty = "";
        }
        if (apiResponse.response.data.data[0].coupon_type[0].value == "Flat") {
          flat = "";
          discount = "none";
        } else {
          flat = "none";
          discount = "";
        }
        this.setState({
          minVisibilty: minVisibilty,
          maxVisibilty: maxVisibilty,
          discountVisibilty: discount,
          flatVisibilty: flat
        });
      }
    });
  };

  EditCouponHandler = () => {
    const {
      id,
      category,
      product,
      couponType,
      couponCode,
      // user,
      minPrice,
      maxPrice,
      flatPrice,
      percentPrice,
      frequency,
      isMinShopping,
      isAutomated,
      startDate,
      outlet,
      endDate
    } = this.state;
    let productArray = [];
    // let userArray = [];
    let outletArray = [];
    for (let i = 0; i < product.length; i++) {
      productArray.push(product[i].value);
    }
    // for (let i = 0; i < user.length; i++) {
    //   userArray.push(user[i].value);
    // }
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    let coupon_type = "";
    let categorys = "";
    if (couponType) {
      if (couponType[0]) coupon_type = couponType[0].value;
      else coupon_type = couponType.value;
    } else {
      coupon_type = "";
    }

    if (category) {
      if (category[0]) categorys = category[0].value;
      else categorys = category.value;
    } else {
      categorys = "";
    }
    let payload = {
      id: id.toString(),
      coupon_type: coupon_type,
      coupon_code: couponCode,
      frequency: frequency,
      valid_frm: startDate ? startDate.format("YYYY-MM-DD") : "",
      valid_till: endDate ? endDate.format("YYYY-MM-DD") : "",
      category: categorys ? categorys : "",
      product_map: productArray,
      flat_discount: flatPrice,
      flat_percentage: percentPrice,
      // user_map: userArray,
      outlet_id: outletArray,
      is_min_shop: isMinShopping,
      is_automated: isAutomated,
      min_shoping: minPrice,
      max_shoping: maxPrice
    };
    AddCouponAPI(payload, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Coupon success");
        this.setState({
          category: [],
          product: [],
          // user: [],
          outlet: [],
          couponType: "",
          couponCode: "",
          frequency: "",
          startDate: "",
          endDate: "",
          flatPrice: "",
          percentPrice: "",
          isMinShopping: false,
          isAutomated: false,
          minPrice: "",
          maxPrice: "",
          isEdit: false
        });
        this.listCoupon();
      } else {
        const err = apiResponse.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };
  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      modal: false,
      category: "",
      product: "",
      // user: "",
      outlet: "",
      couponType: "",
      couponCode: "",
      frequency: "",
      startDate: "",
      endDate: "",
      flatPrice: "",
      percentPrice: "",
      isMinShopping: false,
      isAutomated: false,
      minPrice: "",
      maxPrice: ""
    });
  };

  toggle = id => {
    getCouponAPI(id, apiResponse => {
      console.log("tttt", apiResponse);
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
    changeCouponStatusAPI(id, status, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Coupon status changed"
        );
        this.listCoupon();
      } else {
        Notification(0, "Something went wrong", "Product status changed Error");
      }
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      category: "",
      product: "",
      // user: "",
      couponType: "",
      couponCode: "",
      frequency: "",
      startDate: "",
      endDate: "",
      flatPrice: "",
      percentPrice: "",
      isMinShopping: false,
      isAutomated: false,
      minPrice: "",
      maxPrice: ""
    });
  };

  render() {
    const CouponTypeData = [
      { label: "Flat", value: "Flat", key: 0 },
      { label: "Percentage", value: "Percentage", key: 1 }
    ];

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-trophy text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb heading="coupon.management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ? (
                  <CouponEdit
                    {...this.state}
                    CouponTypeData={CouponTypeData}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    manageVisibility={this.manageVisibility}
                    handleChangeCategory={this.handleChangeCategory}
                    handleChangeCouponType={this.handleChangeCouponType}
                    handleAutomated={this.handleAutomated}
                    handleChangeText={this.handleChangeText}
                    handleChangeUser={this.handleChangeUser}
                    handleChangeOutlet={this.handleChangeOutlet}
                    handleChangeProduct={this.handleChangeProduct}
                    EditCouponHandler={this.EditCouponHandler}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
                {this.state.isFormOpen ? (
                  <CouponAdd
                    {...this.state}
                    CouponTypeData={CouponTypeData}
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    manageVisibility={this.manageVisibility}
                    handleChangeCategory={this.handleChangeCategory}
                    handleChangeCouponType={this.handleChangeCouponType}
                    handleAutomated={this.handleAutomated}
                    handleChangeText={this.handleChangeText}
                    handleChangeUser={this.handleChangeUser}
                    handleChangeOutlet={this.handleChangeOutlet}
                    handleChangeProduct={this.handleChangeProduct}
                    AddCouponHandler={this.AddCouponHandler}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12" className="mb-4">
            <CouponList
              {...this.state}
              getCouponHandler={this.getCouponHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              toggle={this.toggle}
              cancel={this.cancel}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(CouponCard);
