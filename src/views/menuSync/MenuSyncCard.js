/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, Spinner } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import MenuSyncAdd from "./MenuSyncAdd";
import MenuSyncCategoryList from "./MenuSyncCategoryList";
import MenuSyncProductList from "./MenuSyncProductList";
import {
  listMenuCategoryAPI,
  listMenuProductsAPI,
  attachMenuCategoryAPI,
  attachMenuProductAPI,
  listSunchedOutlts,
  initiateMenuSyncAPI
} from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import "../../assets/css/custom.css";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import { Autorenew, AttachFile } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class MenuSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: [],
      prodData: [],
      outlets: "",
      outletData: [],
      outletDataLength: "",
      dataLength: null,
      isFormOpen: false,
      loading: false,
      productLoad: false
    };
  }

  componentDidMount() {
    this.listOutlet();
  }

  handleChangeOutlets = e => {
    this.setState({
      outlets: e
    });
    this.listMenuCategories(e.value);
    this.listMenuProducts(e.value);
  };

  listOutlet = () => {
    listSunchedOutlts(apiResponse => {
      console.log("tttttttttttt", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          outletData: apiResponse.response.data.data,
          outletDataLength: apiResponse.response.data.data.length
        });
      }
    });
  };

  listMenuCategories = outletId => {
    listMenuCategoryAPI({ outlet_id: outletId }, response => {
      console.log("listCat", response);
      if (response.response.data.status == true) {
        this.setState({
          data: response.response.data.data,
          dataLength: response.response.data.data.length
        });
      } else {
        const err = response.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };

  listMenuProducts = outletId => {
    listMenuProductsAPI({ outlet_id: outletId }, response => {
      console.log("listpro", response);
      if (response.response.data.status == true) {
        this.setState({
          prodData: response.response.data.data,
          prodLength: response.response.data.data.length
        });
      } else {
        const err = response.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };

  getAttachedCategories = () => {
    attachMenuCategoryAPI({ outlet_id: this.state.outlets.value }, response => {
      console.log("attach cat", response);
      if (response.response.data.status == true) {
        Notification(1, response.response.data.message);
        this.listMenuCategories(this.state.outlets.value);
      } else {
        const err = response.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };
  getAttachedProducts = () => {
    this.setState({ productLoad: true });
    attachMenuProductAPI({ outlet_id: this.state.outlets.value }, response => {
      if (response.response.data.status == true) {
        this.setState({ productLoad: false });
        Notification(1, response.response.data.message);
        this.listMenuProducts(this.state.outlets.value);
      } else {
        this.setState({ productLoad: false });
        const err = response.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };
  initiateMenuSync = () => {
    this.setState({ loading: true });
    initiateMenuSyncAPI({ outlet_id: this.state.outlets.value }, response => {
      console.log("attach Menu", response);
      if (response.response.data.status == true) {
        this.setState({ loading: false });
        Notification(1, response.response.data.message);
        this.listMenuProducts(this.state.outlets.value);
        this.listMenuCategories(this.state.outlets.value);
      } else {
        this.setState({ loading: false });
        const err = response.response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };

  cancel = () => {
    this.setState({
      isFormOpen: false,
      userType: "",
      username: "",
      password: "",
      name: "",
      id: ""
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      userType: "",
      username: "",
      password: "",
      name: "",
      id: ""
    });
  };
  render() {
    const { outletData, outletDataLength } = this.state;
    const OutletOptions = [];
    for (let index = 0; index < outletDataLength; index++) {
      const { id, outlet_name } = outletData[index];
      OutletOptions.push({ label: outlet_name, value: id, key: id });
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-shuffle-1 text-primary"
              style={{ fontSize: "x-large" }}
            />
            <Breadcrumb
              heading="menu-sync.management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isFormOpen ? (
                  <MenuSyncAdd
                    {...this.state}
                    handleChangeOutlets={this.handleChangeOutlets}
                    syncOutlets={this.syncOutlets}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row className="mb-2">
          <Colxx lg="12" xl="12">
            <Card>
              <CardHeader
                style={{ marginLeft: "21px" }}
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "black" }}
                  >
                    <SearchIcon />
                  </Avatar>
                }
                title={<h3>Refine Your Result</h3>}
              />
              <FormGroup row>
                <Label sm="2">
                  <i
                    className="iconsminds-shop text-primary"
                    style={{
                      fontSize: "x-large",
                      fontWeight: "bold",
                      paddingLeft: "30px"
                    }}
                  />
                  Select Outlet
                </Label>
                <Colxx sm="2">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="CatId"
                    placeholder="Please Select Outlet"
                    // value={this.props.catArray}
                    onChange={this.handleChangeOutlets}
                    options={OutletOptions}
                  />
                </Colxx>
                {userType() !== "is_cashier" && (
                  <Colxx sm="8">
                    <Button
                      color="primary"
                      disabled={this.state.outlets ? false : true}
                      onClick={() => this.getAttachedCategories()}
                    >
                      <AttachFile className="mr-1" />
                      Attach Categories
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      color="warning"
                      disabled={this.state.outlets ? false : true}
                      onClick={() => this.getAttachedProducts()}
                    >
                      <AttachFile className="mr-1" />
                      Attach Products
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      disabled={this.state.outlets ? false : true}
                      onClick={() => this.initiateMenuSync()}
                    >
                      <Autorenew className="mr-1" />
                      Initate Synching
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      color="success"
                      disabled={this.state.outlets ? false : true}
                      onClick={() => this.openForm()}
                    >
                      <Autorenew className="mr-1" />
                      Enable Items
                    </Button>
                  </Colxx>
                )}
              </FormGroup>
            </Card>
          </Colxx>
        </Row>

        <Row>
          {this.state.loading ? (
            <Spinner
              color="primary"
              style={{ margin: "6rem auto" }}
              className="mb-1"
            />
          ) : (
            <>
              <Colxx lg="6" xl="6" className="mb-5">
                <MenuSyncCategoryList
                  {...this.state}
                  // getAttachedOutlets={this.getAttachedOutlets}
                  // openForm={this.openForm}
                  title="dashboards.top-viewed-posts"
                />
              </Colxx>
              <Colxx lg="6" xl="6" className="mb-5">
                <MenuSyncProductList
                  {...this.state}
                  // getAttachedOutlets={this.getAttachedOutlets}
                  // openForm={this.openForm}
                  title="dashboards.top-viewed-posts"
                />
              </Colxx>
            </>
          )}
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(MenuSync);
