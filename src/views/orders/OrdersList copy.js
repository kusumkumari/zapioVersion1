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
  Button
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { ChevronRightRounded, RemoveRedEye } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { buttonStyleDefault } from "../../constants/defaultValues";
import { userType } from "../ApiIntegration";

class OrdersList extends Component {
  render() {
    const { data, detailing_data } = this.props;
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
            manual
            page={this.props.page - 1}
            defaultPageSize={20}
            showPageJump={true}
            showPageSizeOptions={false}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            onPageChange={this.props.onPageChange}
            className="-striped -highlight"
            columns={[
              {
                Header: (
                  <b onClick={() => this.props.onFilter("order_id")}>
                    Order ID
                  </b>
                ),
                accessor: "order_id",
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: (
                  <b onClick={() => this.props.onFilter("order_status")}>
                    Order Status
                  </b>
                ),
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
                Header: (
                  <b onClick={() => this.props.onFilter("order_time")}>
                    Order Time
                  </b>
                ),
                accessor: "order_time",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: (
                  <b onClick={() => this.props.onFilter("delivery_time")}>
                    Delivery Time
                  </b>
                ),
                accessor: "delivery_time",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: (
                  <b onClick={() => this.props.onFilter("payment_mode")}>
                    Payment Mode
                  </b>
                ),
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
                Header: (
                  <b onClick={() => this.props.onFilter("outlet")}>
                    Outlet Name
                  </b>
                ),
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
                show: userType() == "is_cashier" ? false : true,
                accessor: "can_process",
                Cell: props => (
                  <Button
                    style={{ borderRadius: "5px" }}
                    disabled={props.value ? false : true}
                    className={`${buttonStyleDefault}`}
                    onClick={e => {
                      this.props.manageOrderProcessing(props);
                    }}
                  >
                    Process Order
                    <ChevronRightRounded />
                  </Button>
                )
              }
            ]}
          />
        </CardBody>

        <Modal
          style={{ boxShadow: "none", animation: "op 0.1s ease" }}
          centered
          fade={false}
          isOpen={this.props.isView}
        >
          <ModalHeader toggle={this.props.cancel}>
            <IntlMessages id="dashboards.order-details" />
          </ModalHeader>
          <ModalBody>
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
              {/* <Link color="primary" className="float-right btns-1-1" to={"/customer-history/" + detailing_data.mobile_number}>Customer History</Link> */}
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
                {detailing_data.address ? detailing_data.address : "N/A"}
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
                      <th>Customization Detail</th>
                      <th>Name</th>
                      <th>Price (&#8377;)</th>
                      <th>Qty.</th>
                      <th>Size</th>
                      <th>Food Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailing_data.order_description.map((order, idx) => (
                      <tr key={idx}>
                        <td>
                          {order.customization_details &&
                          order.customization_details.length > 0
                            ? order.customization_details.map((cust, idx) => (
                                <p>
                                  <b>Name :</b> {cust.name} , <b>Price: </b>
                                  {cust.price}
                                </p>
                              ))
                            : "N/A"}
                        </td>
                        <td> {order.name ? order.name : "N/A"}</td>
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
                        <td> {order.food_type ? order.food_type : "N/A"}</td>
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
          </ModalBody>
        </Modal>
      </Card>
    );
  }
}

export default OrdersList;
