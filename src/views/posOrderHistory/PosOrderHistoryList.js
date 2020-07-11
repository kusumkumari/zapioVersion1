/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  Button,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
  CardTitle
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { RemoveRedEye } from "@material-ui/icons";
import CardHeader from "@material-ui/core/CardHeader";
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import Avatar from "@material-ui/core/Avatar";
import {
  PollOutlined,
  PeopleAltOutlined,
  TimeToLeave,
  AccountBox,
  AccessAlarmOutlined,
  AccountTreeOutlined,
  BubbleChartOutlined,
  StorefrontOutlined,
  CreditCardOutlined,
  AddShoppingCartOutlined
} from "@material-ui/icons";

class PosOrderHistoryList extends Component {
  render() {
    const { data, detailing_data } = this.props;

    return (
      <Card className="h-100">
        <CardBody>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
                <ListAlt />
              </Avatar>
            }
            title={
              <h3>
                <IntlMessages
                  id={"pos.order-history-list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

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
                accessor: "ids",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Order At",
                accessor: "date",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Source",
                accessor: "source",
                filterable: true,
                Cell: props => (
                  <p className="text-primary font-weight-bold">{props.value}</p>
                )
              },
              {
                Header: "Tax",
                accessor: "total_tax",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Total Value",
                accessor: "total",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Deviation",
                accessor: "priority4",
                filterable: true,
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Customer Details",
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
              }
            ]}
          />
        </CardBody>
        <Modal isOpen={this.props.modal}>
          <ModalHeader toggle={this.props.cancel}>
            <IntlMessages id="modal.customer-detail" />
          </ModalHeader>
          <ModalBody>
            <Row>
              <Colxx sm="12">
                <Card>
                  <CardBody>
                    <Row>
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="11">
                        <CardTitle
                          className="d-flex flex-column "
                          style={{ marginBottom: "9px" }}
                        >
                          <span>
                            <PeopleAltOutlined className="text-primary" />{" "}
                            Customer Details
                          </span>
                        </CardTitle>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span
                            style={{ color: "#4556ac", fontWeight: "bold" }}
                          >
                            <i
                              className="iconsminds-male text-primary"
                              style={{ fontSize: "large" }}
                            />{" "}
                            {detailing_data.customer_name
                              ? detailing_data.customer_name
                              : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span
                            style={{ color: "#4556ac", fontWeight: "bold" }}
                          >
                            <i
                              className="iconsminds-smartphone-4 text-primary"
                              style={{ fontSize: "large" }}
                            />{" "}
                            {detailing_data.customer_number
                              ? detailing_data.customer_number
                              : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
            <Row className="my-2">
              <Colxx sm="12">
                <Card>
                  <CardBody>
                    <Row>
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="11">
                        <CardTitle
                          className="d-flex flex-column "
                          style={{ marginBottom: "9px" }}
                        >
                          <span color="primary">
                            <PollOutlined className="text-primary" /> Order
                            Details
                          </span>
                        </CardTitle>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <AccessAlarmOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Order ID: </b> :{" "}
                            {detailing_data.ids ? detailing_data.ids : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <AccessAlarmOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Invoice Number : </b> :{" "}
                            {detailing_data.invoice_number
                              ? detailing_data.invoice_number
                              : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <CreditCardOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Order Type </b>:{" "}
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              {detailing_data.order_type
                                ? detailing_data.order_type
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <AddShoppingCartOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Outlet </b>:
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              {detailing_data.outlet
                                ? detailing_data.outlet
                                : "N/A"}{" "}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                    </Row>

                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <PeopleAltOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Payment Mode </b>:{" "}
                            <span
                              style={{ fontWeight: "bold" }}
                              className="text-primary"
                            >
                              {detailing_data.payment_mode
                                ? detailing_data.payment_mode
                                : "N/A"}{" "}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <AccountTreeOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Order Status </b> :
                            <span
                              style={{ fontWeight: "bold", color: "#b69329" }}
                            >
                              {detailing_data.status_name
                                ? detailing_data.status_name
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      {/* <Colxx sm='6'>
                      <div className='d-flex flex-column '>
                        <span >
                        <b className="font-600"> Prefare Food </b>: Migrata Pizza
                        </span>
                      </div>
                    </Colxx> */}
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <StorefrontOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Discount Value: </b> :
                            &#8377;
                            <span
                              style={{ fontWeight: "bold", color: "#b69329" }}
                            >
                              {detailing_data.discount_value
                                ? detailing_data.discount_value
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <BubbleChartOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Tax </b>: &#8377;{" "}
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              {detailing_data.total_tax
                                ? detailing_data.total_tax
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <StorefrontOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Sub Total: </b> : &#8377;
                            <span
                              style={{ fontWeight: "bold", color: "#b69329" }}
                            >
                              {detailing_data.sub_total
                                ? detailing_data.sub_total
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <BubbleChartOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Total </b>: &#8377;{" "}
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              {detailing_data.total
                                ? detailing_data.total
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <StorefrontOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Created On: </b> :
                            <span
                              style={{ fontWeight: "bold", color: "#b69329" }}
                            >
                              {detailing_data.created_on
                                ? detailing_data.created_on
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <BubbleChartOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Time </b>:{" "}
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              {detailing_data.time
                                ? detailing_data.time
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <StorefrontOutlined
                              className="iconsminds-clock text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Source: </b> :
                            <span
                              style={{ fontWeight: "bold", color: "#b69329" }}
                            >
                              {detailing_data.source
                                ? detailing_data.source
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
            <Row className="my-4">
              <Colxx sm="12">
                <Card>
                  <CardBody>
                    <Row>
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="11">
                        <CardTitle
                          className="d-flex flex-column "
                          style={{ marginBottom: "9px" }}
                        >
                          <span color="primary">
                            <TimeToLeave className="text-primary" /> Delivery
                            Boy Details
                          </span>
                        </CardTitle>
                      </Colxx>
                    </Row>
                    <Row className="my-2">
                      {/* <Colxx sm='1'></Colxx> */}
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <i
                              className="iconsminds-male text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Name </b> :{" "}
                            {detailing_data.rider_name
                              ? detailing_data.rider_name
                              : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                      <Colxx sm="6">
                        <div className="d-flex flex-column ">
                          <span>
                            <i
                              className="iconsminds-mail text-primary"
                              style={{ fontSize: "large" }}
                            />
                            <b className="font-600"> Email </b> :{" "}
                            {detailing_data.rider_number
                              ? detailing_data.rider_number
                              : "N/A"}
                          </span>
                        </div>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>

            <Button
              className="float-right my-3 mx-1"
              color="primary"
              style={{ borderRadius: 3 }}
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

export default PosOrderHistoryList;
