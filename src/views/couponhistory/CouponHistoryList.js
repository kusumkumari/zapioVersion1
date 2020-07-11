/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  Modal,
  Badge,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt } from "@material-ui/icons";

class CouponHistoryList extends Component {
  render() {
    const { data, detailing_data, modalData } = this.props;
    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <ListAlt />
            </Avatar>
          }
          title={
            <h3>
              <IntlMessages
                id={"coupon.coupon-history-list"}
                style={{ fontWeight: "600" }}
              />{" "}
            </h3>
          }
        />
        <CardBody>
          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            minRows={2}
            className="-striped -highlight"
            columns={[
              {
                Header: "Coupon Code",
                accessor: "c_code",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Coupon Used At",
                accessor: "coupon_used_at",
                filterable: true,
                Cell: props => <p className="text-info">{props.value}</p>
              },
              {
                Header: "Order Id",
                accessor: "order_id",
                filterable: true,
                Cell: props => <p className="text-dark">{props.value}</p>
              },
              {
                Header: "Payment Mode",
                accessor: "payment_mode",
                filterable: true,
                Cell: props => (
                  <p
                    className={`font-weight-bold`}
                    style={{ fontSize: "14px" }}
                  >
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              {
                Header: "Sub Total",
                accessor: "sub_total",
                filterable: true,
                Cell: props => (
                  <p className="text-success"> &#8377; {props.value}</p>
                )
              },
              {
                Header: "Discount Value",
                accessor: "discount_value",
                filterable: true,
                Cell: props => (
                  <p className="text-danger">&#8377; {props.value}</p>
                )
              },
              {
                Header: "Total Bill",
                accessor: "total_bill_value",
                filterable: true,
                Cell: props => (
                  <p className="text-info">&#8377; {props.value}</p>
                )
              },
              {
                Header: "Views",
                accessor: "odesc",
                Cell: props => (
                  <p className="text-muted">
                    <span
                      className="simple-icon-eye text-primary font-weight-bold ft-6s"
                      style={{ padding: "8px 8px", lineHeight: "0px" }}
                      onClick={e => this.props.toggle(props)}
                    ></span>
                  </p>
                )
              }
            ]}
          />
          <Modal
            isOpen={this.props.modal}
            toggle={e => this.props.toggle(modalData)}
          >
            <ModalHeader toggle={e => this.props.toggle(modalData)}>
              <IntlMessages id="order.order-details" />
            </ModalHeader>
            <ModalBody>
              <div>
                <div>
                  <h5 className="h5-modal text-primary">
                    Customer Descritiption{" "}
                  </h5>
                  <div className="flexbox">
                    <p className="wd-50">
                      <b className="text-info font-600">Name</b> :{" "}
                      {detailing_data.cname}
                    </p>
                    <p className="wd-50">
                      <b className="text-info font-600">Email </b>:{" "}
                      {detailing_data.email}
                    </p>
                  </div>

                  <div className="flexbox">
                    <p className="wd-50">
                      <b className="text-info font-600">Address </b>:{" "}
                      {detailing_data.address}
                    </p>
                    <p className="wd-50">
                      <b className="text-info font-600">City </b>:{" "}
                      {detailing_data.city}
                    </p>
                  </div>
                  <div className="flexbox flex-end">
                    <p className="wd-50">
                      <b className="text-info font-600">Locality </b>:{" "}
                      {detailing_data.locality}
                    </p>
                  </div>
                </div>
                <h5 className="h5-modal text-primary">Order Descritiption </h5>
                {detailing_data.odesc && detailing_data.odesc.length > 0 ? (
                  <div>
                    <table id="customersts">
                      <thead>
                        <tr className="btn-primary">
                          <th>Customization Detail</th>
                          <th>Name</th>
                          <th>Price (&#8377;)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailing_data.odesc.map((order, idx) => (
                          <tr key={idx}>
                            <td>
                              {order.customization_details &&
                              order.customization_details.length > 0
                                ? order.customization_details.map(
                                    (cust, idx) => (
                                      <p>
                                        <b>Name :</b> {cust.name} ,{" "}
                                        <b>Price: </b>
                                        {cust.price}
                                      </p>
                                    )
                                  )
                                : "N/A"}
                            </td>
                            <td> {order.name ? order.name : "N/A"}</td>
                            <td> {order.price ? order.price : "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default CouponHistoryList;
