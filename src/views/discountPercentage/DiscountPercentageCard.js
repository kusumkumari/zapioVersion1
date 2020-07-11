/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import DiscountPercentageAdd from "./DiscountPercentageAdd";
import DiscountPercentageEdit from "./DiscountPercentageEdit";
import DiscountPercentageList from "./DiscountPercentageList";
import Reasons from "./Reasons";
import ReasonEdit from "./ReasonEdit";
import ReasonList from "./ReasonList";
import { Notification } from "../Utils/Notification";
import moment from "moment";

import {
  getDiscountAPI,
  listActiveCategoriesAPI,
  listCatWiseProductAPI,
  listActiveProductAPI,
  AddDiscountAPI,
  listDiscountPercAPI,
  changeDiscountPercnStatusAPI,
  listActiveOutletAPI,
  listReasonsAPI,
  AddReasonAPI,
  getReasonAPI,
  changeReasonStatusAPI,
  listActiveUserTypeAPI
} from "../ApiIntegration";

class DiscountPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      discountVisibilty: "none",
      flatVisibilty: "none",
      minVisibilty: "none",
      maxVisibilty: "none",
      catVisibilty: "",
      proVisibilty: "",
      category: [],
      role: [],
      catId: "",
      product: [],
      discountType: "",
      discountName: "",
      minPrice: "",
      maxPrice: "",
      flatPrice: "",
      percentPrice: "",
      data: [],
      dataLength: "",
      isMinShopping: false,
      isReason: false,
      allCategory: false,
      allProduct: false,
      isEdit: false,
      modal: false,
      isFormOpen: false,
      detailing_data: [],
      outlet: [],
      reason: "",
      openReasonForm: false,
      openReasonEditForm: false,
      id: ""
    };
  }
  handleChangeCategory = e => {
    let catArray = [];
    for (let i = 0; i < e.length; i++) {
      catArray.push(e[i].value);
    }
    this.setState({ category: e, productdata: [], productLength: "" });
    this.listProduct(catArray);
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
  handleChangeRole = e => {
    this.setState({ role: e });
  };
  handleReason = () => {
    let checkbox = document.getElementById("isReason");
    if (checkbox.checked == true) {
      this.setState({ isReason: true });
    } else {
      this.setState({ isReason: false });
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

  handleAllCat = () => {
    let checkbox = document.getElementById("allCategory");
    if (checkbox.checked == true) {
      this.setState({
        catVisibilty: "none",
        allCategory: true
      });
    } else {
      this.setState({
        catVisibilty: "",
        allCategory: false,
        category: []
      });
    }
    this.listProduct([]);
  };
  handleAllPro = () => {
    let checkbox = document.getElementById("allProduct");
    if (checkbox.checked == true) {
      this.setState({
        proVisibilty: "none",
        allProduct: true
      });
    } else {
      this.setState({
        proVisibilty: "",
        allProduct: false,
        product: []
      });
    }
  };
  listProduct(catArray) {
    listCatWiseProductAPI({ cat_id: catArray }, apiResponse => {
      console.log("cat", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          productdata: apiResponse.response.data.data,
          productLength: apiResponse.response.data.data.length
        });
      }
    });
  }
  handleChangediscountType = e => {
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
      discountType: e
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

    listActiveOutletAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          outletdata: apiResponse.response.data,
          outletLength: apiResponse.response.data.length
        });
      }
    });
    listActiveUserTypeAPI((apiResponse) => {
      console.log("wwwwwwwwwwwwww",apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          userData: apiResponse.response.data.data,
          userDataLength: apiResponse.response.data.data.length,
        });
      }
    });
    this.listDiscount();
    this.listReasons();
  }

  listDiscount = () => {
    listDiscountPercAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  };
  listReasons = () => {
    listReasonsAPI(apiResponse => {
      console.log("lllllllllllllll", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          reasonData: apiResponse.response.data.data,
          reasonLength: apiResponse.response.data.data.length
        });
      }
    });
  };

  AddDiscountHandler = () => {
    const {
      product,
      discountType,
      discountName,
      role,
      allCategory,
      allProduct,
      category,
      minPrice,
      maxPrice,
      flatPrice,
      percentPrice,
      isMinShopping,
      isReason,
      startDate,
      outlet,
      endDate
    } = this.state;
    console.log("role", role);
    let productArray = [];
    let outletArray = [];
    let catArray = [];
    let roleArray = [];
    for (let i = 0; i < role.length; i++) {
      roleArray.push(role[i].value);
    }
    for (let i = 0; i < category.length; i++) {
      catArray.push(category[i].value);
    }
    for (let i = 0; i < product.length; i++) {
      productArray.push(product[i].value);
    }
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    let discount_type = "";
    if (discountType == "") discount_type = "";
    else discount_type = discountType.value;
    let payload = {
      discount_type: discount_type,
      discount_name: discountName ? discountName : "",
      valid_frm: startDate != "" ? startDate.format("YYYY-MM-DD") : "",
      valid_till: endDate != "" ? endDate.format("YYYY-MM-DD") : "",
      category_map: catArray,
      product_map: productArray,
      flat_discount: flatPrice,
      flat_percentage: percentPrice,
      outlet_id: outletArray,
      is_min_shop: isMinShopping,
      is_reason_required: isReason,
      min_shoping: minPrice,
      max_shoping: maxPrice,
      is_all_category: allCategory,
      is_all_product: allProduct,
      user_roll: roleArray,
    };

    AddDiscountAPI(payload, apiResponse => {
      console.log("Addddd", apiResponse);
      if (apiResponse.response.data.success == true) {
        if (apiResponse.response.data.message) {
          Notification(
            1,
            apiResponse.response.data.message,
            "Discount Created success"
          );
          this.setState({
            category: [],
            product: [],
            outlet: [],
            role: [],
            allCategory: false,
            allProduct: false,
            discountName: "",
            discountType: "",
            startDate: "",
            endDate: "",
            flatPrice: "",
            percentPrice: "",
            isMinShopping: false,
            isReason: false,
            minPrice: "",
            maxPrice: "",
            catVisibilty: "",
            proVisibilty: "",
            discountVisibilty: "none",
            flatVisibilty: "none",
            minVisibilty: "none",
            maxVisibilty: "none",
            isFormOpen: false
          });
          this.listDiscount();
        }
      } else {
        const err = apiResponse.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };

  getDiscountHandler = id => {
    getDiscountAPI({ id: id.toString() }, apiResponse => {
      console.log("kkkkkkkkkkk", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          id: apiResponse.response.data.data[0].id,
          discountName: apiResponse.response.data.data[0].discount_name,
          discountType: apiResponse.response.data.data[0].discount_type,
          startDate: apiResponse.response.data.data[0].valid_frm
            ? moment(apiResponse.response.data.data[0].valid_frm)
            : "",
          endDate: apiResponse.response.data.data[0].valid_till
            ? moment(apiResponse.response.data.data[0].valid_till)
            : "",
          category: apiResponse.response.data.data[0].category,
          product: apiResponse.response.data.data[0].product_detail,
          role: apiResponse.response.data.data[0].user_roll,
          flatPrice: apiResponse.response.data.data[0].flat_discount,
          percentPrice: apiResponse.response.data.data[0].flat_percentage,
          outlet: apiResponse.response.data.data[0].outlet_detail,
          isMinShopping: apiResponse.response.data.data[0].is_min_shop,
          isReason: apiResponse.response.data.data[0].is_reason_required,
          minPrice: apiResponse.response.data.data[0].min_shoping,
          maxPrice: apiResponse.response.data.data[0].max_shoping,
          allCategory: apiResponse.response.data.data[0].is_all_category,
          allProduct: apiResponse.response.data.data[0].is_all_product,
          isEdit: true,
          isFormOpen: false
        });
        let minVisibilty = "";
        let maxVisibilty = "";
        let catVisibilty = "";
        let proVisibilty = "";
        let flat = "";
        let discount = "";
        if (apiResponse.response.data.data[0].is_min_shop != true) {
          minVisibilty = "none";
          maxVisibilty = "none";
        } else {
          minVisibilty = "";
          maxVisibilty = "";
        }
        if (
          apiResponse.response.data.data[0].discount_type[0].value == "Flat"
        ) {
          flat = "";
          discount = "none";
        } else {
          flat = "none";
          discount = "";
        }
        if (apiResponse.response.data.data[0].is_all_category != true) {
          catVisibilty = "";
        } else {
          catVisibilty = "none";
        }
        if (apiResponse.response.data.data[0].is_all_product != true) {
          proVisibilty = "";
        } else {
          proVisibilty = "none";
        }
        this.setState({
          minVisibilty: minVisibilty,
          maxVisibilty: maxVisibilty,
          discountVisibilty: discount,
          flatVisibilty: flat,
          catVisibilty: catVisibilty,
          proVisibilty: proVisibilty
        });
      }
    });
  };

  EditDiscountHandler = () => {
    const {
      id,
      product,
      discountType,
      discountName,
      role,
      allCategory,
      allProduct,
      category,
      minPrice,
      maxPrice,
      flatPrice,
      percentPrice,
      isMinShopping,
      isReason,
      startDate,
      outlet,
      endDate
    } = this.state;
    let productArray = [];
    let outletArray = [];
    let catArray = [];
    let roleArray = [];
    for (let i = 0; i < role.length; i++) {
      roleArray.push(role[i].value);
    }
    for (let i = 0; i < category.length; i++) {
      catArray.push(category[i].value);
    }
    for (let i = 0; i < product.length; i++) {
      productArray.push(product[i].value);
    }
    for (let i = 0; i < outlet.length; i++) {
      outletArray.push(outlet[i].value);
    }
    let discount_type = "";
    let roles = "";
    if (discountType) {
      if (discountType[0]) discount_type = discountType[0].value;
      else discount_type = discountType.value;
    } else {
      discount_type = "";
    }

    let payload = {
      id: id.toString(),
      discount_name: discountName,
      discount_type: discount_type,
      valid_frm: startDate ? startDate.format("YYYY-MM-DD") : "",
      valid_till: endDate ? endDate.format("YYYY-MM-DD") : "",
      category_map: catArray,
      product_map: productArray,
      flat_discount: flatPrice,
      flat_percentage: percentPrice,
      outlet_id: outletArray,
      is_min_shop: isMinShopping,
      is_reason_required: isReason,
      min_shoping: minPrice,
      max_shoping: maxPrice,
      is_all_category: allCategory,
      is_all_product: allProduct,
      user_roll: roleArray
    };
    AddDiscountAPI(payload, apiResponse => {
      console.log("edit", apiResponse);
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Discount success");
        this.setState({
          category: [],
          product: [],
          outlet: [],
          role: [],
          discountName: "",
          discountType: "",
          startDate: "",
          endDate: "",
          flatPrice: "",
          percentPrice: "",
          isMinShopping: false,
          allCategory: false,
          allProduct: false,
          isReason: false,
          catVisibilty: "",
          proVisibilty: "",
          discountVisibilty: "none",
          flatVisibilty: "none",
          minVisibilty: "none",
          maxVisibilty: "none",
          minPrice: "",
          maxPrice: "",
          isEdit: false,
          openReasonEditForm: false,
          openReasonForm: false
        });
        this.listDiscount();
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
      role: "",
      outlet: "",
      discountName: "",
      discountType: "",
      startDate: "",
      endDate: "",
      flatPrice: "",
      percentPrice: "",
      isMinShopping: false,
      isReason: false,
      allProduct: false,
      allCategory: false,
      minPrice: "",
      maxPrice: "",
      openReasonForm: false,
      openReasonEditForm: false,
      reason: ""
    });
  };

  toggle = id => {
    getDiscountAPI({ id: id.toString() }, apiResponse => {
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
    changeDiscountPercnStatusAPI(
      { id: id, active_status: status },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          Notification(
            1,
            apiResponse.response.data.message,
            "Discount status changed"
          );
          this.listDiscount();
        } else {
          Notification(
            0,
            "Something went wrong",
            "Discount status changed Error"
          );
        }
      }
    );
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      category: "",
      product: "",
      user: "",
      discountType: "",
      frequency: "",
      startDate: "",
      endDate: "",
      flatPrice: "",
      percentPrice: "",
      isMinShopping: false,
      isReason: false,
      allCategory: false,
      allProduct: false,
      role: "",
      minPrice: "",
      maxPrice: "",
      reason: "",
      openReasonForm: false,
      openReasonEditForm: false
    });
  };
  openReasonForm = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      openReasonForm: true,
      openReasonEditForm: false,
      reason: ""
    });
  };
  AddReasonHandler = () => {
    const { reason } = this.state;
    AddReasonAPI({ reason: reason ? reason : "" }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        if (apiResponse.response.data.message) {
          Notification(
            1,
            apiResponse.response.data.message,
            "Reason Created success"
          );
          this.setState({
            reason: "",
            openReasonForm: false,
            openReasonEditForm: false
          });
          this.listReasons();
        }
      } else {
        const err = apiResponse.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };
  EditReasonHandler = () => {
    const { reason, rsnId } = this.state;
    AddReasonAPI(
      { reason: reason ? reason : "", id: rsnId.toString() },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Reason updated success"
            );
            this.setState({
              reason: "",
              openReasonForm: false,
              openReasonEditForm: false
            });
            this.listReasons();
          }
        } else {
          const err = apiResponse.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };
  getReasonHandler = id => {
    getReasonAPI({ id: id.toString() }, apiResponse => {
      console.log("kkkkkkkkkkk", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          rsnId: apiResponse.response.data.data[0].id,
          reason: apiResponse.response.data.data[0].reason,
          isEdit: false,
          isFormOpen: false,
          openReasonForm: false,
          openReasonEditForm: true
        });
      }
    });
  };
  handleChangeReasonStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeReasonStatusAPI({ id: id, active_status: status }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Reason status changed"
        );
        this.listReasons();
      } else {
        Notification(0, "Something went wrong", "Reason status changed Error");
      }
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
            <div id="form"></div>
            <i
              className="iconsminds-pricing text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="discount.percentage"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx lg="12" xl="12">
                <Row>
                  <Colxx md="12" className="mb-4">
                    {this.state.isEdit && (
                      <DiscountPercentageEdit
                        {...this.state}
                        CouponTypeData={CouponTypeData}
                        handleChangeStart={this.handleChangeStart}
                        handleChangeEnd={this.handleChangeEnd}
                        manageVisibility={this.manageVisibility}
                        handleChangeCategory={this.handleChangeCategory}
                        handleChangediscountType={this.handleChangediscountType}
                        handleChangeText={this.handleChangeText}
                        handleChangeRole={this.handleChangeRole}
                        handleAllCat={this.handleAllCat}
                        handleAllPro={this.handleAllPro}
                        handleReason={this.handleReason}
                        handleChangeOutlet={this.handleChangeOutlet}
                        handleChangeProduct={this.handleChangeProduct}
                        EditDiscountHandler={this.EditDiscountHandler}
                        cancel={this.cancel}
                      />
                    )}
                    {this.state.isFormOpen ? (
                      <DiscountPercentageAdd
                        {...this.state}
                        CouponTypeData={CouponTypeData}
                        handleChangeStart={this.handleChangeStart}
                        handleChangeEnd={this.handleChangeEnd}
                        manageVisibility={this.manageVisibility}
                        handleChangeCategory={this.handleChangeCategory}
                        handleChangediscountType={this.handleChangediscountType}
                        handleChangeText={this.handleChangeText}
                        handleChangeRole={this.handleChangeRole}
                        handleAllCat={this.handleAllCat}
                        handleAllPro={this.handleAllPro}
                        handleReason={this.handleReason}
                        handleChangeOutlet={this.handleChangeOutlet}
                        handleChangeProduct={this.handleChangeProduct}
                        AddDiscountHandler={this.AddDiscountHandler}
                        cancel={this.cancel}
                      />
                    ) : (
                      ""
                    )}
                    {this.state.openReasonForm ? (
                      <Reasons
                        {...this.state}
                        handleChangeText={this.handleChangeText}
                        AddReasonHandler={this.AddReasonHandler}
                        cancel={this.cancel}
                      />
                    ) : (
                      ""
                    )}
                    {this.state.openReasonEditForm ? (
                      <ReasonEdit
                        {...this.state}
                        handleChangeText={this.handleChangeText}
                        EditReasonHandler={this.EditReasonHandler}
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
              <Colxx lg="8" xl="8" className="mb-5">
                <DiscountPercentageList
                  {...this.state}
                  getDiscountHandler={this.getDiscountHandler}
                  handleChangeStatus={this.handleChangeStatus}
                  openForm={this.openForm}
                  toggle={this.toggle}
                  cancel={this.cancel}
                  title="dashboards.top-viewed-posts"
                />
              </Colxx>
              <Colxx lg="4" xl="4" className="mb-5">
                <ReasonList
                  {...this.state}
                  getReasonHandler={this.getReasonHandler}
                  handleChangeReasonStatus={this.handleChangeReasonStatus}
                  openReasonForm={this.openReasonForm}
                  cancel={this.cancel}
                  title="dashboards.top-viewed-posts"
                />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DiscountPercentage);
