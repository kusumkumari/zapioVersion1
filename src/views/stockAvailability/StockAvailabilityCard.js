/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, FormGroup, Label} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import StockAvailabilityCategoryList from "./StockAvailabilityCategoryList";
import StockAvailabilityProductList from "./StockAvailabilityProductList";
import "../../assets/css/custom.css"
import { Notification } from "../Utils/Notification";
import { listBrandOutletAPI, listBrandCategoriesAPI,listBrandProductsAPI,  brandCategoryAvailibiltyAPI, brandProductAvailibiltyAPI } from "../ApiIntegration";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import IntlMessages from "../../helpers/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class StockAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: "",
      outletData:[],
      outletDataLength:"",
      outlet:"",
      proData:[],
      proDataLength:"",
    };
  }

  componentDidMount() {
    this.listOutlet();
  }

  listOutlet = () => {
    listBrandOutletAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          outletData: apiResponse.response.data,
          outletDataLength: apiResponse.response.data.length,

        });
      }
    })
  }
  handleChange=(e)=>{
    this.setState({outlet:e.value})
    this.listCategories(e.value);
    this.listProducts(e.value);
  }

  listCategories = (e) => {
    listBrandCategoriesAPI({outlet:e},(apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,

        });
      }
    })
  }

  listProducts = (e) => {
    listBrandProductsAPI({outlet:e},(apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          proData: apiResponse.response.data.data,
          proDataLength: apiResponse.response.data.data.length,

        });
      }
    })
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let is_available = !e.original.is_available
    brandCategoryAvailibiltyAPI({ id: id, is_available: is_available, outlet:this.state.outlet }, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Category Availibility changed")
        this.listCategories(this.state.outlet);
        this.listProducts(this.state.outlet);
      }
      else {
        Notification(0, "Something went wrong", "Category Availibility changed Error")
      }
    })
  }
  handleChangeProductStatus = (e) => {
    let id = (e.original.id).toString()
    let is_available = !e.original.is_available
    brandProductAvailibiltyAPI({ id: id, is_available: is_available, outlet:this.state.outlet }, (apiResponse) => {

      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Product Availibility changed")
        this.listProducts(this.state.outlet);
      }
      else {
        Notification(0, "Something went wrong", "Product Availibility changed Error")
      }
    })
  }
  render() {
    const {outletData, outletDataLength} = this.state;
    const OutletOptions = [];
    for (let index = 0; index < outletDataLength; index++) {
      const { id, Outletname } = outletData[index];
      OutletOptions.push({ label: Outletname, value: id, key: id })
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="iconsminds-check text-primary" style={{fontSize:"x-large"}} />
            <Breadcrumb heading="stock.availability-availability-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
          <FormGroup row>
            <Label sm="3" style={{marginTop:"-17px"}}>
            <CardHeader
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
                <i className="iconsminds-shop-4" style={{fontSize:"large"}} />
              </Avatar>
            }
            title={
              <h3>
                <IntlMessages id={"stock.outlets"} style={{ fontWeight: "600" }} />{" "}
              </h3>
            }
          />
            
            </Label>
            <Colxx sm="3">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="CatId"
                placeholder="Please Select Outlet"
                // value={this.props.catArray}
                onChange={this.handleChange}
                options={OutletOptions} />
            </Colxx>
          </FormGroup>
           
        <Row>
          <Colxx lg="12" xl="6">

            <StockAvailabilityCategoryList {...this.state} handleChangeStatus={this.handleChangeStatus} />

          </Colxx>
          <Colxx lg="12" xl="6">

            <StockAvailabilityProductList {...this.state} handleChangeProductStatus={this.handleChangeProductStatus} />

          </Colxx>

        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(StockAvailability);