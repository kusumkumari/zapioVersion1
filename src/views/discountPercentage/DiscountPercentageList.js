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
import { Done, Clear, Add, Edit, RemoveRedEye } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt } from "@material-ui/icons";

class DiscountPercentageList extends Component {
  render() {
    const { data, detailing_data } = this.props;

    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <ListAlt />
            </Avatar>
          }
          action={
            <Button
              style={{ fontWeight: "bold" }}
              onClick={this.props.openForm}
              className="px-3 py-2 d-flex flex-row align-items-center"
            >
              <Add style={{ marginRight: "5px" }} /> Add Discount
            </Button>
          }
          title={
            <h3>
              <IntlMessages
                id={"discount.percentage-list"}
                style={{ fontWeight: "600" }}
              />
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
            minRows={2}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Discount Name",
                accessor: "discount_name",
                filterable: true,
                Cell: props => (
                  <p className="text-muted text-primary">{props.value}</p>
                )
              },
              {
                Header: "Discount Type",
                accessor: "discount_type",
                filterable: true,
                Cell: props => <p className="text-info">{props.value}</p>
              },

              {
                Header: "Valid From",
                accessor: "valid_frm",
                filterable: true,
                Cell: props => (
                  <p className="text-warning">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Valid Till",
                accessor: "valid_till",
                filterable: true,
                Cell: props => (
                  <p className="text-secondary">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },

              {
                Header: "Status",
                accessor: "active_status",
                Cell: props => (
                  <p className="text-muted">
                    <Switch
                      id={name}
                      name={name}
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
                    <Button
                      className="p-2"
                      color="#2962ff"
                      style={{ background: "#fff", color: "#0d47a1" }}
                      onClick={() => this.props.getDiscountHandler(props.value)}
                    >
                      <Edit fontSize="small" />
                    </Button>
                    <Button
                      color="#2962ff"
                      onClick={() => this.props.toggle(props.value)}
                      style={{ background: "#fff", color: "#0d47a1" }}
                      className="p-2 ml-1"
                    >
                      <RemoveRedEye fontSize="small" />
                    </Button>
                    {/* <span
                      className='simple-icon-pencil text-primary font-large'
                      onClick={e =>
                        this.props.getCouponHandler(props.value)
                      }></span>{' '}
                    &nbsp;
                    <span
                      className='simple-icon-eye text-primary font-large'
                      onClick={e => this.props.toggle(props.value)}></span> */}
                  </div>
                )
              }
            ]}
          />
          <Modal isOpen={this.props.modal} toggle={e => this.props.cancel()}>
            <ModalHeader toggle={e => this.props.cancel()}>
              <IntlMessages id="modal.discount-detail" />
            </ModalHeader>
            <ModalBody>
              <div className="flexbox">
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Discount Name :
                    </b>
                    {detailing_data.discount_name}
                  </p>
                </div>
                {detailing_data.discount_type &&
                detailing_data.discount_type.length ? (
                  <div className="flexbox">
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        Discount Type :
                      </b>
                      <span className="text-primary">
                        {detailing_data.discount_type[0].value}
                      </span>{" "}
                      &nbsp;
                    </p>
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        {detailing_data.discount_type[0].value} Discount Price :
                      </b>
                      {detailing_data.discount_type[0].value == "Percentage"
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
                    Minimum Order Value :
                  </b>
                  {detailing_data.is_min_shop ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>

                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>Reason :</b>
                  {detailing_data.is_reason_required ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>
              </div>
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    All Category :
                  </b>
                  {detailing_data.is_all_category ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>

                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    All Products :
                  </b>
                  {detailing_data.is_all_product ? (
                    <Done style={{ color: "#0bb30b" }} />
                  ) : (
                    <Clear color="error" />
                  )}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Role Detail :
                  </b>
                  <span>  {detailing_data.user_roll &&
                      detailing_data.user_roll.length > 0
                        ? detailing_data.user_roll.map((data, idx) => (
                            <>
                              <Badge
                                key={idx}
                                className={`font-weight-bold`}
                                color="info"
                                style={{ width: "auto" }}
                                pill
                              >
                                {data.label}
                              </Badge>
                              &nbsp;
                            </>
                            // data.label + ' , '
                          ))
                        : "N/A"}</span>
                  
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
                    Category Detail :{" "}
                  </b>
                  {detailing_data.is_all_category ? (
                    "All Categorys"
                  ) : (
                    <span>
                      {detailing_data.category &&
                      detailing_data.category.length > 0
                        ? detailing_data.category.map((data, idx) => (
                            <>
                              <Badge
                                key={idx}
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
                    </span>
                  )}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Products Detail :{" "}
                  </b>
                  {detailing_data.is_all_product ? (
                    "All Products"
                  ) : (
                    <span>
                      {detailing_data.product_detail &&
                      detailing_data.product_detail.length > 0
                        ? detailing_data.product_detail.map((data, idx) => (
                            <>
                              <Badge
                                key={idx}
                                className={`font-weight-bold`}
                                color="primary"
                                style={{ width: "auto" }}
                                pill
                              >
                                {data.label}
                              </Badge>
                              &nbsp;
                            </>
                            // data.label + ' , '
                          ))
                        : "N/A"}
                    </span>
                  )}
                </p>
              </div>

              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Outlets Detail :{" "}
                  </b>
                  {detailing_data.outlet_detail &&
                  detailing_data.outlet_detail.length > 0
                    ? detailing_data.outlet_detail.map((data, idx) => (
                        <>
                          <Badge
                            key={idx}
                            className={`font-weight-bold`}
                            color="warning"
                            style={{ width: "auto" }}
                            pill
                          >
                            {data.label}
                          </Badge>
                          &nbsp;
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

export default DiscountPercentageList;
