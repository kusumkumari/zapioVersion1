/* eslint-disable */
import React, { Component } from "react";
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
import IntlMessages from "../../helpers/IntlMessages";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Pagination from "../../components/DatatablePagination";

import { Link } from "react-router-dom";
import "../../assets/css/custom.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";

class OrderProcessingList extends Component {
  render() {
    const { data, detailing_data } = this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"order.order-processing-list"} />
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
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Payment Mode",
                accessor: "payment_mode",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Order Status",
                accessor: "order_status_name",
                filterable: true,
                Cell: props => (
                  <Badge
                    className="adjs-1-2"
                    color={props.original.color_code}
                    pill
                  >
                    {props.value}
                  </Badge>
                )
              },
              {
                Header: "Order Time",
                accessor: "order_time",
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "View",
                accessor: "id",
                Cell: props => (
                  <p className="text-muted">
                    {" "}
                    <span
                      className="iconsminds-receipt-4"
                      onClick={e => this.props.toggle(props.value)}
                    ></span>
                  </p>
                )
              },
              {
                Header: "Order Processing",
                accessor: "maximum",
                Cell: props => (
                  <Button
                    color="primary"
                    className="btns-adjs"
                    disabled={props.value == 1 ? true : false}
                    onClick={e => {
                      this.props.handleOrderProcess(
                        props.original.id,
                        props.original.order_id,
                        props.original.order_status,
                        props.original.statusType
                      );
                    }}
                  >
                    Process Order
                  </Button>
                )
              }
            ]}
          />
        </CardBody>
        <Modal
          isOpen={this.props.modal}
          toggle={e => this.props.toggle(detailing_data.id)}
        >
          <ModalHeader toggle={e => this.props.toggle(detailing_data.id)}>
            <IntlMessages id="order.order-processing-detail" />
          </ModalHeader>
          <ModalBody>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Order Time </b>:{" "}
                {detailing_data.order_time}
              </p>
              <p className="wd-50">
                <b className="font-600">Total Bill </b>: &#8377;{" "}
                {detailing_data.total_bill_value}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Sub Total </b>: &#8377;{" "}
                {detailing_data.sub_total}
              </p>
              <p className="wd-50">
                <b className="font-600">Taxes </b>: &#8377;{" "}
                {detailing_data.taxes}
              </p>
            </div>
            {detailing_data.delivery_time ? (
              <div className="flexboxes">
                <p className="wd-50">
                  <b className="font-600">Deliver Time </b>:{" "}
                  {detailing_data.delivery_time}
                </p>
              </div>
            ) : (
              ""
            )}
            {detailing_data.order_description &&
            detailing_data.order_description.length > 0 ? (
              <div>
                <h5 className="h5-modal text-primary">Order Descritiption </h5>
                {detailing_data.order_description.map(order => {
                  return (
                    <div key={order.id}>
                      <div className="flexboxes">
                        <p className="wd-50">
                          <b className="font-600">Customization Detail</b> :{" "}
                          {order.customization_details}
                        </p>
                        <p className="wd-50">
                          <b className="font-600">Name </b>: {order.name}
                        </p>
                      </div>
                      <div className="flexboxes flex-end">
                        <p className="wd-50">
                          <b className="font-600">Price </b>: &#8377;{" "}
                          {order.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <div className="flexboxes space-between">
              <h5 className="h5-modal text-primary inline">
                Customer Descritiption
              </h5>
              <Link
                color="primary"
                className="float-right btns-1-1"
                to={"/customer-history/" + detailing_data.mobile_number}
              >
                Customer History
              </Link>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Name </b>: {detailing_data.name}
              </p>
              <p className="wd-50">
                <b className="font-600">E-mail </b>: {detailing_data.email}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Mobile </b>:{" "}
                {detailing_data.mobile_number}
              </p>
              <p className="wd-50">
                <b className="font-600">Address </b>: {detailing_data.address}
              </p>
            </div>
            <div className="flexboxes flex-end">
              <p className="wd-50">
                <b className="font-600">City </b>: {detailing_data.city}
              </p>
            </div>
            <h5 className="h5-modal text-primary">Delivery Boy Detail</h5>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Name </b>: {detailing_data.boyname}
              </p>
              <p className="wd-50">
                <b className="font-600">E-mail </b>: {detailing_data.boyemail}
              </p>
            </div>
            <div className="flexboxes">
              <p className="wd-50">
                <b className="font-600">Mobile </b>: {detailing_data.boymobile}
              </p>
            </div>
          </ModalBody>
        </Modal>
      </Card>
    );
  }
}

export default OrderProcessingList;
