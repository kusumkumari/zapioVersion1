/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Badge
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { Done, Clear } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";

class CustomerHistoryList extends Component {
  render() {
    const { data, detailing_data, modalData, customerDetail } = this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"customer.customer-history-list"} />
          </CardTitle>
          {/* <div>
            <span>
              <b>Customer Detail: &nbsp;&nbsp; </b> {customerDetail.name} , {customerDetail.email} , {customerDetail.mobile_number}</span>
          </div> */}
          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            minRows={2}
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
                Header: "Views",
                accessor: "odesc",
                Cell: props => (
                  <p className="text-muted">
                    <span
                      className="iconsminds-receipt-4"
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
              <IntlMessages id="dashboards.order-details" />
            </ModalHeader>
            <ModalBody>
              {detailing_data.order_description &&
              detailing_data.order_description.length > 0 ? (
                <div>
                  <h5 className="h5-modal text-primary">
                    Order Descritiption{" "}
                  </h5>
                  {detailing_data.order_description.map(order => {
                    return (
                      <div key={order.id}>
                        <div className="flexbox">
                          <p className="wd-50">
                            <b className="font-600">Customization Detail</b> :{" "}
                            {order.customization_details}
                          </p>
                          <p className="wd-50">
                            <b className="font-600">Name </b>: {order.name}
                          </p>
                        </div>

                        <div className="flexbox flex-end">
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
              <div>
                <h5 className="h5-modal text-primary">
                  Customer Descritiption{" "}
                </h5>
                <div className="flexbox">
                  <p className="wd-50">
                    <b className="font-600">Name</b> : {detailing_data.name}
                  </p>
                  <p className="wd-50">
                    <b className="font-600">Email </b>: {detailing_data.email}
                  </p>
                </div>

                <div className="flexbox">
                  <p className="wd-50">
                    <b className="font-600">Address </b>:{" "}
                    {detailing_data.address}
                  </p>
                  <p className="wd-50">
                    <b className="font-600">City </b>: {detailing_data.city}
                  </p>
                </div>
                <div className="flexbox flex-end">
                  <p className="wd-50">
                    <b className="font-600">Locality </b>:{" "}
                    {detailing_data.locality}
                  </p>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default CustomerHistoryList;
