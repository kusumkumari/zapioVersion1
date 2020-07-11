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
  Badge,
  Button
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import {
  Done,
  Clear,
  Add,
  Edit,
  RemoveRedEye,
  NavigateBeforeSharp
} from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { ListAlt } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class CouponList extends Component {
  render() {
    const { data, modal, detailing_data } = this.props;

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
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add Coupon
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"coupon.coupon-list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

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
                Header: "Coupon Type",
                accessor: "coupon_type",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Coupon Code",
                accessor: "coupon_code",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Frequency",
                accessor: "frequency",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Valid From",
                accessor: "valid_frm",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Valid Till",
                accessor: "valid_till",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Category",
                accessor: "category_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Automated",
                accessor: "is_automated",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <Done style={{ color: "#0bb30b" }} />
                    ) : (
                      <Clear color="error" />
                    )}
                  </p>
                )
              },
              {
                Header: "Min Shopping",
                accessor: "is_min_shop",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <Done style={{ color: "#0bb30b" }} />
                    ) : (
                      <Clear color="error" />
                    )}
                  </p>
                )
              },
              {
                Header: "Status",
                show: userType() == "is_cashier" ? false : true,
                accessor: "active_status",
                Cell: props => (
                  <p className="text-muted">
                    <Switch
                      className={this.props.className}
                      checked={props.value}
                      onChange={e => this.props.handleChangeStatus(props)}
                    />
                  </p>
                )
              },
              {
                Header: "Action",
                accessor: "id",
                Cell: props => (
                  <div>
                    {userType() !== "is_cashier" && (
                      <Button
                        className="p-2"
                        color="#2962ff"
                        style={{ background: "#fff", color: "#0d47a1" }}
                        onClick={() => this.props.getCouponHandler(props.value)}
                      >
                        <Edit fontSize="small" />
                      </Button>
                    )}
                    <Button
                      color="#2962ff"
                      onClick={() => this.props.toggle(props.value)}
                      style={{ background: "#fff", color: "#0d47a1" }}
                      className="p-2 ml-1"
                    >
                      <RemoveRedEye fontSize="small" />
                    </Button>
                  </div>
                )
              }
            ]}
          />
          <Modal isOpen={this.props.modal} toggle={e => this.props.cancel()}>
            <ModalHeader toggle={e => this.props.cancel()}>
              <IntlMessages id="modal.coupon-detail" />
            </ModalHeader>
            <ModalBody>
              <div className="flexbox">
                {detailing_data.coupon_type &&
                detailing_data.coupon_type.length ? (
                  <div className="flexbox">
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        Coupon Type :
                      </b>
                      <span className="text-primary">
                        {detailing_data.coupon_type[0].value}
                      </span>{" "}
                      &nbsp;
                    </p>
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        {detailing_data.coupon_type[0].value} Discount Price :
                      </b>
                      {detailing_data.coupon_type[0].value == "Percentage"
                        ? detailing_data.flat_percentage
                        : detailing_data.flat_discount}
                    </p>
                  </div>
                ) : (
                  <div className="flex">
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        Percentage Price :{" "}
                      </b>{" "}
                      {detailing_data.flat_percentage}
                    </p>
                  </div>
                )}
              </div>
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Minimum Shopping :
                  </b>
                  {detailing_data.is_min_shop ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>

                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Automated :
                  </b>
                  {detailing_data.is_automated ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Coupon Code :
                  </b>
                  {detailing_data.coupon_code
                    ? detailing_data.coupon_code
                    : "N/A"}
                  &nbsp;
                </p>

                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Frequency :
                  </b>
                  {detailing_data.frequency ? detailing_data.frequency : "N/A"}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Minimum Shopping :{" "}
                  </b>
                  {detailing_data.min_shoping
                    ? detailing_data.min_shoping
                    : "N/A"}{" "}
                  &nbsp;
                </p>
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Maximum Shopping :{" "}
                  </b>
                  {detailing_data.max_shoping
                    ? detailing_data.max_shoping
                    : "N/A"}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Products Detail :{" "}
                  </b>
                  {detailing_data.product_detail &&
                  detailing_data.product_detail.length > 0
                    ? detailing_data.product_detail.map((data, idx) => (
                        <>
                          {" "}
                          <Badge
                            className={`font-weight-bold`}
                            color="primary"
                            style={{ width: "auto" }}
                            pill
                          >
                            {data.label}
                          </Badge>{" "}
                          &nbsp;{" "}
                        </>
                        // data.label + ' , '
                      ))
                    : "N/A"}
                </p>
              </div>

              {/* <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Users Detail :{" "}
                  </b>
                  {detailing_data.user_detail &&
                  detailing_data.product_detail.length > 0
                    ? detailing_data.user_detail.map((data, idx) => (
                        <>
                          {" "}
                          <Badge
                            className={`font-weight-bold`}
                            color="secondary"
                            style={{ width: "auto" }}
                            pill
                          >
                            {data.label}
                          </Badge>{" "}
                          &nbsp;{" "}
                        </>
                      ))
                    : "N/A"}
                </p>
              </div> */}
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Outlets Detail :{" "}
                  </b>
                  {detailing_data.outlet_detail &&
                  detailing_data.outlet_detail.length > 0
                    ? detailing_data.outlet_detail.map((data, idx) => (
                        <>
                          {" "}
                          <Badge
                            className={`font-weight-bold`}
                            color="warning"
                            style={{ width: "auto" }}
                            pill
                          >
                            {data.label}
                          </Badge>{" "}
                          &nbsp;{" "}
                        </>
                      ))
                    : "N/A"}
                </p>
              </div>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default CouponList;
