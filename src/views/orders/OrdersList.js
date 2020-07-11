/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  CardTitle,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { ChevronRightRounded, RemoveRedEye } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { buttonStyleDefault } from "../../constants/defaultValues";
import { userType } from "../ApiIntegration";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import Invoice from "../../views/app/pages/miscellaneous/invoice";

class OrdersList extends Component {
  render() {

    const { data, detailing_data, orderStatusData, orderStatusDataLength } = this.props;
    const PaymentOptions = [{ label: "Cash on Delivery", value: "0" },
    { label: "Dineout", value: "1" },
    { label: "Paytm", value: "2" },
    { label: "Razorpay", value: "3" },
    { label: "PayU", value: "4" },
    { label: "EDC", value: "5" },
    { label: "Mobiquik", value: "6" },
    { label: "Zomato", value: "7" },
    { label: "EDC Amex", value: "8" },
    { label: "EDC Yes Bank", value: "9" },
    { label: "swiggy", value: "10" },
    { label: "Z Prepaid", value: "11" },
    { label: "S Prepaid", value: "12" },
    { label: "Dunzo", value: "13" },
    { label: "Zomato Cash", value: "14" },
    { label: "Zomato", value: "15" },


    ];

    const OrderSourceOptions = [{ label: "POS", value: "POS" },
    { label: "Call Center", value: "Call Center" },
    { label: "Z Market", value: "Z Market" },
    { label: "S Store", value: "S Store" },
    { label: "Swiggy", value: "Swiggy" },
    { label: "Zomato", value: "Zomato" },
    { label: "Dunzo", value: "Dunzo" },
    ];
    const OrderStatusOption = [];
    for (let index = 0; index < orderStatusDataLength; index++) {
      const { id, type } = orderStatusData[index];
      OrderStatusOption.push({ label: type, value: id, key: id });
    }

    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"order.order-list"} />
          </CardTitle>
          <ReactTable
            data={data}
            pages={this.props.pages}
            minRows={2}
            loading={this.props.loading}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={false}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            onPageChange={this.props.onPageChange}
            className="-striped -highlight"
            columns={[
              {
                Header: "Invoice No",
                filterable: true,
                accessor: "order_id",
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Order Status",
                filterable: true,
                accessor: "order_status_name",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              {
                Header: "Order Time",
                filterable: true,
                accessor: "order_time",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Order Source",
                filterable: true,
                accessor: "order_source",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Payment Mode",
                filterable: true,
                accessor: "payment_mode",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value ? (
                      props.value == "Cash on Delivery" ? (
                        <Badge color="info" pill>
                          {props.value}
                        </Badge>
                      ) : (
                          <Badge color="success" pill>
                            {props.value}
                          </Badge>
                        )
                    ) : (
                        "N/A"
                      )}
                  </p>
                )
              },
              {
                Header: "Outlet Name",
                filterable: true,
                accessor: "outlet_name",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "",
                accessor: "id",
                Cell: props => (
                  <Button
                    outline
                    onClick={e => this.props.toggle(props.value)}
                    style={{ borderRadius: "5px" }}
                    className="d-flex flex-row align-items-center px-3 py-2 ml-3"
                  >
                    <RemoveRedEye fontSize="small" className="mr-2" />
                    View
                  </Button>
                )
              },
              {
                Header: "",
                show: userType() == "Admin" ? true : false,
                accessor: "",
                Cell: props => (
                  <p
                    className="simple-icon-pencil text-primary font-weight-bold ft-6s"
                    onClick={e => {
                      this.props.manageOrderProcessing(props);
                    }}
                  ></p>
                )
              }
            ]}
          />
        </CardBody>


        <Modal isOpen={this.props.modal}>
          <ModalHeader className="flexboxes" toggle={this.props.cancel}>
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <i
                className="iconsminds-receipt-4"
                style={{ fontSize: "xx-large" }}
              />
            </Avatar>
          &nbsp;
          <IntlMessages id="order.order-management" />
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="order.invoice-no" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      value={this.props.invoiceNo}
                      readOnly
                    />
                    <br />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="order.transaction-id" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="transactionID"
                      value={this.props.transactionID}
                      onChange={this.props.handleChange}
                    />
                    <br />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="order.order-status" />
                  </Label>
                  <Colxx sm="9">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="orderStatus"
                      value={this.props.orderStatus}
                      onChange={this.props.handleChangeOrdStatus}
                      options={OrderStatusOption}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="order.payment-mode" />
                  </Label>
                  <Colxx sm="9">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="paymentMode"
                      value={this.props.paymentMode}
                      onChange={this.props.handleChangePaymentMode}
                      options={PaymentOptions}
                      isMulti={true}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="order.order-source" />
                  </Label>
                  <Colxx sm="9">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="orderSource"
                      value={this.props.orderSource}
                      onChange={this.props.handleChangeOrdSource}
                      options={OrderSourceOptions}
                    />
                  </Colxx>
                </FormGroup>
                <Button
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={this.props.editOrder}
                >
                  <IntlMessages id="product.save" />
                  &nbsp;
                  <Save />
                </Button>
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  color="danger"
                  onClick={this.props.cancel}
                >
                  <Close />
                  <IntlMessages id="product.cancel" />
                </Button>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>

        <Modal
          style={{ maxWidth: '880px', borderRadius: '0.5rem' }}
          centered
          fade={false}
          isOpen={this.props.isView}
        >
          <Invoice data={this.props} toggle={this.props.cancel} />
          {/* <ModalHeader toggle={this.props.cancel}>
            <IntlMessages id="dashboards.order-details" />
          </ModalHeader> */}

          {/* <ModalBody>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Order Time </b>:
                {detailing_data.order_time ? detailing_data.order_time : ""}
              </p>
              <p className="wd-50">
                <b className="font-600">Total Bill </b>: &#8377;
                {detailing_data.total_bill_value
                  ? detailing_data.total_bill_value
                  : "N/A"}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Sub Total </b>: &#8377;
                {detailing_data.sub_total
                  ? detailing_data.sub_total.toFixed(2)
                  : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">Taxes </b>: &#8377;
                {detailing_data.taxes ? detailing_data.taxes.toFixed(2) : "N/A"}
              </p>
            </div>
            {detailing_data.delivery_time ? (
              <div className="flexboxes flex-end">
                <p className="wd-50">
                  <b className="font-600">Deliver Time </b>:
                  {detailing_data.delivery_time
                    ? detailing_data.delivery_time
                    : "N/A"}
                </p>
              </div>
            ) : (
                ""
              )}
            <div className="flexboxes space-between">
              <h5 className="h5-modal text-primary inline">
                <i
                  className="simple-icon-people text-primary"
                  style={{ fontSize: "large" }}
                />
                Customer Descritiption
              </h5>
              
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Name </b>:
                {detailing_data.name ? detailing_data.name : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">E-mail </b>:
                {detailing_data.email ? detailing_data.email : "N/A"}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Mobile </b>:
                {detailing_data.mobile_number
                  ? detailing_data.mobile_number
                  : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">Address </b>:
                {detailing_data.address &&
                  detailing_data.address.length > 0 ? (
                    detailing_data.address.map((add, idx) => (
                      <>
                        {add.address ? add.address : "N/A"} &nbsp;
               {add.locality ? add.locality : "N/A"}
                      </>
                    ))) : "N/A"}
              </p>
            </div>
            <div className="flexboxes flex-end">
              <p className="wd-50">
                <b className="font-600">City </b>:
                {detailing_data.city ? detailing_data.city : "N/A"}
              </p>
            </div>

            {detailing_data.order_description &&
              detailing_data.order_description.length > 0 ? (
                <div>
                  <h5 className="h5-modal text-primary">
                    <i
                      className="iconsminds-receipt-4 text-primary"
                      style={{ fontSize: "large" }}
                    />
                  Order Descritiption
                </h5>
                  <table id="customersts">
                    <thead>
                      <tr className="btn-primary">
                        <th>Food Type</th>
                        <th>Name</th>
                        <th>Price (&#8377;)</th>
                        <th>Qty.</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailing_data.order_description.map((order, idx) => (
                        <tr key={idx}>
                          <td> {order.food_type ? order.food_type : "N/A"}</td>

                          <td><b>{order.name ? order.name : "N/A"} </b>
                            <b>AddOns :</b>
                            {order.customization_details &&
                              order.customization_details.length > 0
                              ? order.customization_details.map((cust, idx) => (

                                cust.name + " , "

                              ))
                              : "N/A"}</td>
                          <td> {order.price ? order.price : "N/A"}</td>
                          <td>
                            {order.quantity && order.quantity != "N/A" ? (
                              <b className="blink text-primary">
                                {order.quantity}
                              </b>
                            ) : (
                                "N/A"
                              )}
                          </td>
                          <td> {order.size ? order.size : "N/A"} </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
            <Button
              className="float-right mg-10"
              color="primary"
              onClick={this.props.cancel}
            >
              <IntlMessages id="product.cancel" />
            </Button>
          </ModalBody> */}
        </Modal>
      </Card>
    );
  }
}

export default OrdersList;
