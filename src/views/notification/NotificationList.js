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

class NotificationList extends Component {
  render() {
    const { data, detailing_data } = this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"notification.notification-list"} />
          </CardTitle>

          <ReactTable
            data={data}
            defaultPageSize={5}
            showPageJump={true}
            minRows={2}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            columns={[
              {
                Header: "Order ID",
                accessor: "order_id",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Order Status",
                accessor: "order_status_name",
                filterable: true,
                Cell: props => (
                  <p className="text-muted">
                    {" "}
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              {
                Header: "Order Time",
                accessor: "order_time",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Payment Mode",
                accessor: "payment_mode",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Sub Total",
                accessor: "sub_total",
                filterable: true,
                Cell: props => (
                  <p className="text-muted"> &#8377; {props.value}</p>
                )
              },
              {
                Header: "Discount Value",
                accessor: "discount_value",
                filterable: true,
                Cell: props => (
                  <p className="text-muted">&#8377; {props.value}</p>
                )
              },
              {
                Header: "Total Bill",
                accessor: "total_bill_value",
                filterable: true,
                Cell: props => (
                  <p className="text-muted">&#8377; {props.value}</p>
                )
              },
              {
                Header: "View",
                accessor: "id",
                Cell: props => (
                  <p className="text-muted">
                    <span
                      className="simple-icon-eye text-primary font-large"
                      style={{ fontSize: "large" }}
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
                <b className="font-600">Order Time </b>:{" "}
                {detailing_data.order_time ? detailing_data.order_time : ""}
              </p>
              <p className="wd-50">
                <b className="font-600">Total Bill </b>: &#8377;{" "}
                {detailing_data.total_bill_value
                  ? detailing_data.total_bill_value
                  : "N/A"}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Sub Total </b>: &#8377;{" "}
                {detailing_data.sub_total ? detailing_data.sub_total : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">Taxes </b>: &#8377;{" "}
                {detailing_data.taxes ? detailing_data.taxes : "N/A"}
              </p>
            </div>
            {detailing_data.delivery_time ? (
              <div className="flexboxes flex-end">
                <p className="wd-50">
                  <b className="font-600">Deliver Time </b>:{" "}
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
                {" "}
                <i
                  className="simple-icon-people text-primary"
                  style={{ fontSize: "large" }}
                />{" "}
                Customer Descritiption
              </h5>
              {/* <Link color="primary" className="float-right btns-1-1" to={"/customer-history/" + detailing_data.mobile_number}>Customer History</Link> */}
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Name </b>:{" "}
                {detailing_data.name ? detailing_data.name : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">E-mail </b>:{" "}
                {detailing_data.email ? detailing_data.email : "N/A"}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Mobile </b>:{" "}
                {detailing_data.mobile_number
                  ? detailing_data.mobile_number
                  : "N/A"}
              </p>
              <p className="wd-50">
                <b className="font-600">Address </b>:{" "}
                {detailing_data.address ? detailing_data.address : "N/A"}
              </p>
            </div>
            <div className="flexboxes flex-end">
              <p className="wd-50">
                <b className="font-600">City </b>:{" "}
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
                  <tr className="btn-primary">
                    <th>Customization Detail</th>
                    <th>Name</th>
                    <th>Price (&#8377;)</th>
                    <th>Qty.</th>
                    <th>Size</th>
                    <th>Food Type</th>
                  </tr>
                  {detailing_data.order_description.map((order, idx) => (
                    <tr key={order.id}>
                      <td>
                        {" "}
                        {order.customization_details &&
                        order.customization_details.length > 0
                          ? order.customization_details.map((cust, idx) => (
                              <p>
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
                          <b className="text-primary">{order.quantity}</b>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td> {order.size} </td>
                      <td> {order.food_type ? order.food_type : "N/A"}</td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              ""
            )}

            {/* <h5 className="h5-modal text-primary">Delivery Boy Detail</h5>
         <div className="flexboxes">
           <p className="wd-50"><b className="font-600">Name </b>: {detailing_data.boyname ? detailing_data.boyname : "N/A"}</p>
           <p className="wd-50"><b className="font-600">E-mail </b>: {detailing_data.boyemail ? detailing_data.boyemail : "N/A"}</p>
         </div>
         <div className="flexboxes">
           <p className="wd-50"><b className="font-600">Mobile </b>: {detailing_data.boymobile ? detailing_data.boymobile : "N/A"}</p>
         </div> */}
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

export default NotificationList;
