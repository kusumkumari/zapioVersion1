/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import CategoryAvailabilityList from "./CategoryAvailabilityList";
import "../../assets/css/custom.css"
import { Notification } from "../Utils/Notification";
import { listOutletCategoryAPI, categoryAvailibiltyAPI } from "../ApiIntegration";

class CategoryAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: "",
    };
  }

  componentWillMount() {
    this.listOutletCategory();
  }

  listOutletCategory = () => {
    listOutletCategoryAPI((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,

        });
      }
    })
  }


  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let is_available = !e.original.is_available
    categoryAvailibiltyAPI({ id: id, is_available: is_available }, (apiResponse) => {
      console.log("ssssssssss",apiResponse)
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Category Availibility changed")
        this.listOutletCategory();
      }
      else {
        Notification(0, "Something went wrong", "Category Availibility changed Error")
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="availability.cat-availability-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">

            <CategoryAvailabilityList {...this.state} handleChangeStatus={this.handleChangeStatus} />

          </Colxx>

        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(CategoryAvailability);