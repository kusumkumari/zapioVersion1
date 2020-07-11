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
  Row,
  Button
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import { Colxx } from "../../components/common/CustomBootstrap";

import IntlMessages from "../../helpers/IntlMessages";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Link } from "react-router-dom";
import {
  Close,
  ListAlt,
  CloudDownload,
  CloudUpload,
  Done,
  Clear,
  PollOutlined,
  PeopleAltOutlined,
  AccessAlarmOutlined,
  AccountTreeOutlined,
  BubbleChartOutlined,
  StorefrontOutlined,
  CreditCardOutlined,
  AddShoppingCartOutlined
} from "@material-ui/icons";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import ReactTooltip from "react-tooltip";
import { API_BASEURL_IMG } from "../ApiIntegration.js";
import { userType } from "../ApiIntegration";

class CustomerList extends Component {
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
            action={
              userType() !== "is_cashier" && (
                <div className="flaxbox">
                  <a
                    href={API_BASEURL_IMG}
                    target="_blank"
                    className="btn-primary px-3 py-2 font-weight-bold align-items-center"
                    style={{ borderRadius: "50px" }}
                  >
                    Sample Csv
                  </a>
                  &nbsp;&nbsp;
                  <Button
                    className="px-3 py-2 font-weight-bold align-items-center"
                    onClick={() => this.props.UploadExcel()}
                  >
                    Upload New
                  </Button>
                  <input
                    className="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={this.props.handleChangeImage}
                  />
                </div>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"customer.customer-list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />
          <ReactTable
            data={data}
            pages={this.props.pages}
            // minRows={0}
            loading={this.props.loading}
            manual
            page={this.props.page - 1}
            defaultPageSize={20}
            showPageJump={true}
            showPageSizeOptions={false}
            PaginationComponent={Pagination}
            onPageChange={this.props.onPageChange}
            minRows={2}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "name",
                Cell: props => (
                  <p className="text-primary">
                    <i className="iconsminds-male text-primary" />
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Email",
                accessor: "email",
                Cell: props => (
                  <p className="text-info">
                    <i className="iconsminds-mail text-primary" />
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Mobile/Username",
                accessor: "mobile",
                Cell: props => (
                  <p className="text-dark">
                    <i className="iconsminds-smartphone-4 text-primary" />
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },

              {
                Header: "Customer since",
                accessor: "created_at",
                Cell: props => (
                  <p className="text-success">
                    <i className="iconsminds-clock text-primary" />
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Customer Type",
                accessor: "customer_type",
                Cell: props => (
                  <p className="text-warning">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Total Orders",
                accessor: "total_order",
                Cell: props => (
                  <p className="text-danger">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Total Spent",
                accessor: "total_spent",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              // {
              //   Header: "Status",
              //   accessor: "active_status",
              //   Cell: props => <p><Switch
              //     id={name}
              //     name={name}
              //     className={this.props.className}
              //     checked={props.value}
              //     onChange={(e) => this.props.handleChangeStatus(props)} />
              //   </p>
              // },
              {
                Header: "Customer Profile",
                accessor: "id",
                Cell: props => (
                  <span
                    className="simple-icon-eye text-primary font-large border bg-white p-2 mx-2"
                    style={{ borderRadius: "500px" }}
                    onClick={e =>
                      this.props.getCustomerDetailHandler(props.value)
                    }
                  ></span>
                )
              }
            ]}
          />
          <Modal isOpen={this.props.modal}>
            <ModalHeader>
              <IntlMessages id="modal.customer-detail" />
              <Close
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer"
                }}
                onClick={this.props.modalCancel}
              />
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
                              {detailing_data.name
                                ? detailing_data.name
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
                              />{" "}
                              {detailing_data.email
                                ? detailing_data.email
                                : "N/A"}
                            </span>
                          </div>
                        </Colxx>
                      </Row>
                      <Row>
                        {/* <Colxx sm='1'></Colxx> */}
                        <Colxx sm="6">
                          <div className="d-flex flex-column ">
                            <span
                              style={{ color: "#4556ac", fontWeight: "bold" }}
                            >
                              <i
                                className="iconsminds-smartphone-4 text-primary"
                                style={{ fontSize: "large" }}
                              />{" "}
                              {detailing_data.mobile
                                ? detailing_data.mobile
                                : "N/A"}
                            </span>
                          </div>
                        </Colxx>
                        <Colxx sm="6">
                          <div className="d-flex flex-column ">
                            <span>
                              <i
                                className="iconsminds-post-mail text-primary"
                                style={{ fontSize: "large" }}
                              />{" "}
                              {detailing_data.address
                                ? detailing_data.address
                                : "N/A"}
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
                              <PollOutlined className="text-primary" /> Order
                              Analysis
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
                              <b className="font-600"> First Order </b> :{" "}
                              {detailing_data.first_order
                                ? detailing_data.first_order
                                : "N/A"}
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
                              <b className="font-600"> Last Order </b> :{" "}
                              {detailing_data.last_order
                                ? detailing_data.last_order
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
                              <b className="font-600"> Total Spent </b>: &#8377;{" "}
                              <span
                                style={{ color: "#4556ac", fontWeight: "bold" }}
                              >
                                {detailing_data.total_spent
                                  ? detailing_data.total_spent
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
                              <b className="font-600"> Order Average </b>:
                              &#8377;
                              <span
                                style={{ color: "#4556ac", fontWeight: "bold" }}
                              >
                                {detailing_data.order_avg
                                  ? detailing_data.order_avg
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
                              <b className="font-600"> Customer Type </b>:{" "}
                              <span
                                style={{ fontWeight: "bold" }}
                                className="text-primary"
                              >
                                {detailing_data.customer_type
                                  ? detailing_data.customer_type
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
                              <b className="font-600"> Order Pattern </b> :
                              <span
                                style={{ fontWeight: "bold", color: "#b69329" }}
                              >
                                {detailing_data.order_pattern == "First Order"
                                  ? detailing_data.order_pattern
                                  : detailing_data.order_pattern}
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
                              <b className="font-600"> Preferred Outlet </b> :
                              <span
                                style={{ fontWeight: "bold", color: "#b69329" }}
                              >
                                {detailing_data.preferred_outlet
                                  ? detailing_data.preferred_outlet
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
                              <b className="font-600"> Total Orders </b>:{" "}
                              <span
                                style={{ color: "#4556ac", fontWeight: "bold" }}
                              >
                                {detailing_data.total_order
                                  ? detailing_data.total_order
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

              <Button
                className="float-right my-3 mx-1"
                color="primary"
                style={{ borderRadius: 3 }}
                onClick={this.props.modalCancel}
              >
                <IntlMessages id="product.cancel" />
              </Button>
              <Link to={"/order_history/" + detailing_data.id}>
                <Button
                  className="float-right my-3"
                  color="warning"
                  style={{ borderRadius: 3 }}
                  onClick={this.props.modalCancel}
                >
                  <IntlMessages id="product.order-history" />
                </Button>
              </Link>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default CustomerList;
