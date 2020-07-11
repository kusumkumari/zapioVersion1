/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import FeatureProductAdd from "./FeatureProductAdd";
import FeatureProductEdit from "./FeatureProductEdit";
import FeatureProductList from "./FeatureProductList";
import { listActiveProductAPI, listActiveOutletAPI, listFeatureProductAPI, addFeatureProductAPI, retrieveFeatureProductAPI, changeFeatureProductStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class FeatureProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      data: [],
      dataLength: null,
      isEdit: false,
      featureProduct: [],
      outlet: [],
      outletData: [],
      outletDataLength: "",
      isFormOpen: false,
    };
  }
  handleChangeFeature = selectedOption => {
    this.setState({ featureProduct: selectedOption });
  };
  handleChangeOutlet = selectedOption => {
    this.setState({ outlet: selectedOption });
  };
  addFeatureProductHandler = () => {
    const { featureProduct, outlet } = this.state;
    let featureProductArray = []
    for (let i = 0; i < featureProduct.length; i++) {
      featureProductArray.push(featureProduct[i].value)
    }
    let outlets = ""
    if (outlet != "") {
      outlets = outlet.value.toString()
    }
    else {
      outlets = ""
    }
    addFeatureProductAPI({ feature_product: featureProductArray, outlet: outlets }, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Feature Product Success");
        this.setState({ featureProduct: "", outlet: "", isFormOpen:false })
        this.listFeatureProduct();
      }
      else {
        if (response.data.error.outlet) {
          Notification(0, response.data.error.outlet, "Outlet Error")
        }
        if (response.data.error.info) {
          Notification(0, response.data.error.info, "Feature Product Error")
        }
        if (response.data.error.outlet_check) {
          Notification(0, response.data.error.outlet_check, "Duplicate Outlet Error")
        }

      }
    });
  };

  retrieveFeatureProductHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen: false })
    retrieveFeatureProductAPI(id.toString(), ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          featureProduct: response.data.data[0].feature_detail,
          outlet: response.data.data[0].outlet_detail,
          id: response.data.data[0].id,
        })
      }
    });
  };

  listFeatureProduct = () => {
    listFeatureProductAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    })
  }

  componentDidMount() {
    listActiveOutletAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          outletData: apiResponse.response.data,
          outletDataLength: apiResponse.response.data.length,
        });
      }
    });
    listActiveProductAPI({}, (apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          productdata: apiResponse.response.data.data,
          productLength: apiResponse.response.data.data.length,
        });
      }
    });
    this.listFeatureProduct();
  }
  editFeatureProductHandler = () => {
    const { id, featureProduct, outlet } = this.state;
    let featureProductArray = []
    let outlets = ""
    for (let i = 0; i < featureProduct.length; i++) {
      featureProductArray.push(featureProduct[i].value)
    }
    if (outlet) {
      if(outlet[0])
      outlets = outlet[0].value.toString()
      else
      outlets = outlet.value.toString()
    }
    else {
      outlets = ""
    }
    addFeatureProductAPI({ id: id.toString(), feature_product: featureProductArray, outlet: outlets }, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Feature Product Success");
        this.setState({ featureProduct: "", outlet: "", id:"", isEdit:false })
        this.listFeatureProduct();
      }
      else {
        if (response.data.error.outlet) {
          Notification(0, response.data.error.outlet, "Outlet Error")
        }
        if (response.data.error.info) {
          Notification(0, response.data.error.info, "Feature Product Error")
        }
        if (response.data.error.outlet_check) {
          Notification(0, response.data.error.outlet_check, "Duplicate Outlet Error")
        }
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeFeatureProductStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Feature Product status changed")
        this.listFeatureProduct();
      }
      else {
        Notification(0, "Something went wrong", "Feature Product status changed Error")
      }
    })
  }
  cancel = () => {
    this.setState({ isFormOpen: false, isEdit: false, featureProduct: "", outlet: "" })
  }
  openForm = () => {
    this.setState({ isFormOpen: true, isEdit: false, featureProduct: "", outlet: "" })
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="simple-icon-note text-primary" style={{ fontSize: "x-large" }} />&nbsp;
            <Breadcrumb heading="menu.feature-product-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <FeatureProductEdit {...this.state}
                    handleChangeFeature={this.handleChangeFeature}
                    handleChangeOutlet={this.handleChangeOutlet}
                    editFeatureProductHandler={this.editFeatureProductHandler}
                    cancel={this.cancel}
                  />
                  : ""
                }
                {this.state.isFormOpen ?
                  <FeatureProductAdd {...this.state}
                    handleChangeFeature={this.handleChangeFeature}
                    handleChangeOutlet={this.handleChangeOutlet}
                    addFeatureProductHandler={this.addFeatureProductHandler}
                    cancel={this.cancel}
                  />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>

        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-4">
            <FeatureProductList {...this.state}
              retrieveFeatureProductHandler={this.retrieveFeatureProductHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FeatureProduct);