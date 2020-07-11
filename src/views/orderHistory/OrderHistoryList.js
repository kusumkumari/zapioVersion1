/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Badge
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import "../../assets/css/custom.css";
import IntlMessages from "../../helpers/IntlMessages";
import { PeopleAltOutlined } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";

class OrderHistoryList extends Component {
  render() {
    const { data, detailing_data, customerData } = this.props;
    return (
      <>
        <Card className="wd-50">
          <CardBody>
            <CardTitle>
              <PeopleAltOutlined className="text-primary" />{" "}
              <IntlMessages id={"order.customer-detail"} />
            </CardTitle>
            <table>
              <tbody>
                <tr>
                  <td
                    className="text-primary"
                    style={{
                      textTransform: "uppercase",
                      lineHeight: "2",
                      width: " 150px"
                    }}
                  >
                    <i
                      className="iconsminds-male text-primary"
                      style={{ fontSize: "large" }}
                    />{" "}
                    {customerData.name ? customerData.name : "N/A"}{" "}
                  </td>
                  <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                  <td>
                    {" "}
                    <i
                      className="iconsminds-mail text-primary"
                      style={{ fontSize: "large" }}
                    />{" "}
                    {customerData.email ? customerData.email : "N/A"}{" "}
                  </td>
                </tr>
                <tr>
                  <td
                    className="th-c text-primary"
                    style={{
                      textTransform: "uppercase",
                      lineHeight: "2",
                      width: "150px"
                    }}
                  >
                    {" "}
                    <i
                      className="iconsminds-smartphone-4 text-primary"
                      style={{ fontSize: "large" }}
                    />{" "}
                    {customerData.mobile ? customerData.mobile : "N/A"}{" "}
                  </td>
                  <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                  <td>
                    {" "}
                    <i
                      className="iconsminds-user text-primary"
                      style={{ fontSize: "large" }}
                    />{" "}
                    {customerData.customer_type
                      ? customerData.customer_type
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="h-100 my-2">
          <CardBody>
            <CardTitle>
              <IntlMessages id={"order.order-history-list"} />
            </CardTitle>
            <ReactTable
              data={data}
              defaultPageSize={10}
              showPageJump={true}
              minRows={2}
              showPageSizeOptions={true}
              PaginationComponent={Pagination}
              defaultFilterMethod={filterCaseInsensitive}
              className="-striped -highlight"
              columns={[
                {
                  Header: "Order ID",
                  accessor: "order_id",
                  filterable: true,
                  Cell: props => (
                    <p className="text-muted text-primary">
                      {props.value ? (
                        <>
                          <i
                            className="iconsminds-cart-quantity"
                            style={{ fontSize: "large" }}
                          />
                          <span>{props.value}</span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  )
                },
                {
                  Header: "Order Time",
                  accessor: "order_time",
                  filterable: true,
                  Cell: props => (
                    <p className="text-muted">
                      {props.value ? (
                        <>
                          <i className="iconsminds-clock text-primary" />
                          <span>{props.value}</span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  )
                },
                {
                  Header: "Source",
                  accessor: "source",
                  filterable: true,
                  Cell: props => (
                    <p className="text-muted">
                      {" "}
                      {props.value ? <span>{props.value}</span> : "N/A"}{" "}
                    </p>
                  )
                },
                {
                  Header: "Delivery Time",
                  accessor: "delivery_time",
                  filterable: true,
                  Cell: props => (
                    <p className="text-muted">
                      {props.value != "N/A" ? (
                        <>
                          <i className="iconsminds-alarm-clock text-primary" />
                          <span>{props.value}</span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  )
                },
                {
                  Header: "Payment Mode",
                  accessor: "payment_mode",
                  filterable: true,
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
                  Header: "Order Status",
                  accessor: "order_status",
                  filterable: true,
                  Cell: props => (
                    <p className={`font-weight-bold`}>
                      <Badge color={props.original.color_code} pill>
                        {props.value}
                      </Badge>
                    </p>
                  )
                },

                {
                  Header: "Order Detail",
                  accessor: "id",
                  Cell: props => (
                    <p className="text-muted">
                      <span
                        className="simple-icon-eye text-primary font-large border bg-white p-2 mx-2"
                        style={{ borderRadius: "500px" }}
                        onClick={e => this.props.toggle(props.value)}
                      ></span>
                    </p>
                  )
                }
              ]}
            />
          </CardBody>
          <Modal isOpen={this.props.modal}>
            <ModalHeader>
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
                  {detailing_data.sub_total ? detailing_data.sub_total : "N/A"}
                </p>
                <p className="wd-50">
                  <b className="font-600">Taxes </b>: &#8377;
                  {detailing_data.taxes ? detailing_data.taxes : "N/A"}
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
                    />{" "}
                    Order Descritiption{" "}
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
                            {" "}
                            {order.customization_details &&
                            order.customization_details.length > 0
                              ? order.customization_details.map((cust, idx) => (
                                  <p key={idx}>
                                    <b>Name :</b> {cust.name} , <b>Price: </b>{" "}
                                    {cust.price}{" "}
                                  </p>
                                ))
                              : "N/A"}
                          </td>
                          <td> {order.name ? order.name : "N/A"}</td>
                          <td> {order.price ? order.price : "N/A"}</td>
                          <td>
                            {" "}
                            {order.quantity ? (
                              <b className="blink text-primary">
                                {order.quantity}
                              </b>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td> {order.size} </td>
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
      </>
    );
  }
}

export default OrderHistoryList;
