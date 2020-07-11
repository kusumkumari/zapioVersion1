/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, Input } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import OrdersList from "./OrdersList";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Notification } from "../Utils/Notification";
import {
  listOrdersAPI,
  getOrderAPI,
  manageOrderProcessingAPI
} from "../ApiIntegration";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      modal: false,
      isView: false,
      orderId: "",
      id: "",
      detailing_data: [],
      page: 1,
      pages: 2,
      searchValue: "",
      loading: false,
      filter_data: "",
      sorting: true,
      start_date:"",
      end_date:"",
    };
  }
  onFilter = e => {
    this.listOrders(this.state.page, "", e, !this.state.sorting, "");
    this.setState({
      filter_data: this.state.filter_data,
      sorting: !this.state.sorting,
      searchValue: ""
    });
  };

  onPageChange = e => {
    this.setState({ page: e + 1 });
    this.listOrders(
      e + 1,
      this.state.searchValue,
      this.state.filter_data,
      !this.state.sorting,
      ""
    );
  };
  handlesearch = e => {
    this.setState({ searchValue: e.target.value });
  };
  seraching = () => {
    this.listOrders(
      this.state.page,
      this.state.searchValue,
      this.state.filter_data,
      !this.state.sorting,
      ""
    );
  };
  handlePayment = e => {
    this.listOrders(this.state.page, "", "", false, e.value);
  };
  componentDidMount() {
    this.listOrders(
      this.state.page,
      this.state.searchValue,
      this.state.filter_data,
      !this.state.sorting,
      ""
    );
  }

  listOrders = (page, value, filter_data, sorting, orderType) => {
    this.setState({ loading: true });
    listOrdersAPI(
      {
        page: page,
        search_data: value ? value : "",
        filter_data: filter_data,
        sorting: sorting.toString(),
        order_type: orderType
      },
      apiResponse => {
        console.log("eeeeeeeeeeeeeeee", apiResponse);
        if (apiResponse.status == "success") {
          this.setState(
            {
              data: apiResponse.response.data.orderdata,
              pages: apiResponse.response.data.page_count,
              page: this.state.page,
              dataLength: apiResponse.response.data.orderdata.length
            },
            () => this.setState({ loading: false })
          );
        }
      }
    );
  };

  cancel = () => {
    this.setState({ modal: false, isView: false });
  };

  toggle = id => {
    getOrderAPI({ id: id.toString() }, apiResponse => {
      console.log("getttttt", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState({
          isView: true,
          modal: false,
          id: id,
          detailing_data: apiResponse.response.data.data[0]
        });
      }
    });
  };

  manageOrderProcessing = e => {
    const { id } = e.original;
    manageOrderProcessingAPI({ order_id: id.toString() }, apiResponse => {
      if (
        apiResponse.status == "success" &&
        apiResponse.response.data.success
      ) {
        this.setState({ modal: false });
        Notification(
          1,
          apiResponse.response.data.message.delivery_time,
          "Order Processing Completed"
        );
        this.listOrders(
          this.state.page,
          this.state.searchValue,
          this.state.filter_data,
          this.state.sorting,
          ""
        );
      } else {
        Notification(
          0,
          apiResponse.response.data.message.delivery_time,
          "Order Processing Error !!"
        );
      }
    });
  };

  render() {
    const PaymentOptions = [
      { label: "Select Payment Method", value: "", key: "payment" },
      { label: "Online", value: "1" },
      { label: "Cash On Delivery", value: "0" }
    ];
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-receipt-4 text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="order.order-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
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
                <Label sm="2"></Label>
                <Colxx sm="5">
                  <Input
                    name="searchValue"
                    type="text"
                    placeholder="Please Type Anything ......"
                    onChange={this.handlesearch}
                  />
                </Colxx>
                <Colxx sm="1">
                  <Button onClick={this.seraching}>Search</Button>
                </Colxx>
                <Colxx sm="3">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.payment}
                    options={PaymentOptions}
                    onChange={this.handlePayment}
                  />
                </Colxx>

                {/* <Colxx sm="7">
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
                  // onClick={() => this.openForm()}
                  >
                    <Autorenew className="mr-1" />
                    Initate Synching
                  </Button>
                </Colxx>
               */}
              </FormGroup>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx lg="12" xl="12">
            <OrdersList
              title="dashboards.top-viewed-posts"
              {...this.state}
              onFilter={this.onFilter}
              cancel={this.cancel}
              toggle={this.toggle}
              onPageChange={this.onPageChange}
              manageOrderProcessing={this.manageOrderProcessing}
            />
          </Colxx>
        </Row>
        <Row></Row>
      </Fragment>
    );
  }
}
export default injectIntl(Orders);
