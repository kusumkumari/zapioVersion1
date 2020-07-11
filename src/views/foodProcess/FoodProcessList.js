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
  Button
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import "../../assets/css/custom.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import {
  Add,
  Close,
  Delete,
  Edit,
  AccountTreeOutlined,
  ListAlt
} from "@material-ui/icons";
import { centerContent } from "../../constants/defaultValues";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { userType } from "../ApiIntegration";

class ProductList extends Component {
  render() {
    const { data, detailing_data, ProcessDetailing_data } = this.props;

    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <ListAlt />
            </Avatar>
          }
          action={
            userType() !== "is_cashier" && (
              <div className="d-flex flex-row justify-content-between">
                <Button
                  color="warning"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openBetweenForm()}
                >
                  <AccountTreeOutlined className="mr-1" />
                  Add In Between Process
                </Button>
                &nbsp;&nbsp;
                <Button
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.pendingProcessForm()}
                >
                  <AccountTreeOutlined className="mr-1" />
                  Products Without Process
                </Button>
                &nbsp;&nbsp;
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add Process
                </Button>
              </div>
            )
          }
          title={
            <h3>
              <IntlMessages
                id={"food.food-process-list"}
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
            minRows={2}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Product",
                accessor: "product",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Variant",
                accessor: "variant",
                filterable: true,
                Cell: props => (
                  <p className="text-info">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Total Time",
                accessor: "total_time",
                filterable: true,
                Cell: props => (
                  <p className="text-success">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Total Steps",
                accessor: "total_steps",
                filterable: true,
                Cell: props => (
                  <p className="text-dark">
                    {props.value ? props.value : "N/A"}
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
                Header: "Views",
                accessor: "p_id",
                Cell: props => (
                  <span>
                    <span
                      className="simple-icon-eye text-primary font-large"
                      onClick={e =>
                        this.props.getFoodProcessHandler(props.original)
                      }
                    ></span>
                  </span>
                )
              },
              {
                Header: "Add Steps",
                show: userType() == "is_cashier" ? false : true,
                accessor: "p_id",
                Cell: props => (
                  <span>
                    <Button
                      onClick={() => {
                        this.props.showSteps(props.original);
                      }}
                      className={`${centerContent} px-2 py-1`}
                      style={{ borderRadius: 3 }}
                    >
                      <Add />
                      Add step
                    </Button>
                  </span>
                )
              }
            ]}
          />
          <Modal isOpen={this.props.modal}>
            <ModalHeader>
              <IntlMessages id="modal.food-process-detail" />
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
              <div className="flexbox">
                <div style={{ width: "65%" }}>
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Product :
                    </b>
                    <span style={{ color: "#4556ac", fontWeight: "bold" }}>
                      {detailing_data[0] && detailing_data[0].product
                        ? detailing_data[0].product
                        : "N/A"}
                    </span>
                  </p>
                </div>
                <div style={{ width: "35%" }}>
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Variant :
                    </b>
                    <span style={{ color: "#4556ac", fontWeight: "bold" }}>
                      {detailing_data[0] && detailing_data[0].variant
                        ? detailing_data[0].variant
                        : "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {detailing_data ? (
                <table id="customersts">
                  <thead className="btn-primary">
                    <tr>
                      {userType() !== "is_cashier" && <th>Action</th>}
                      <th>Step No.</th>
                      <th>Name</th>
                      <th>Time </th>
                      <th>Discription</th>
                      <th>Image</th>
                      <th>Ingredient Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailing_data.map((data, idx) => (
                      <tr key={idx}>
                        {userType() !== "is_cashier" && (
                          <td>
                            <div className="flexbox">
                              <Button
                                className="border border-0 p-2 text-primary"
                                color="#2962ff"
                                style={{ background: "#fff" }}
                                onClick={e =>
                                  this.props.retreveFoodProcessHandler(data.id)
                                }
                              >
                                <Edit fontSize="small" />
                              </Button>
                              <Button
                                color="#2962ff"
                                onClick={() => this.props.removeStep(data.id)}
                                style={{ background: "#fff" }}
                                className="border border-0 p-2 ml-1 text-primary"
                              >
                                <Delete fontSize="small" />
                              </Button>
                            </div>
                          </td>
                        )}
                        <td style={{ color: "#4556ac", fontWeight: "bold" }}>
                          {data.step}
                        </td>
                        <td>{data.processName}</td>
                        <td style={{ color: "#4556ac", fontWeight: "bold" }}>
                          {data.time_of_process}
                        </td>
                        <td>{data.description}</td>
                        <td>
                          {data.image ? (
                            <img
                              src={data.image}
                              style={{
                                height: "90px",
                                width: "90px",
                                objectFit: "cover"
                              }}
                            />
                          ) : (
                            <img
                              src={require("../../assets/no-image.png")}
                              style={{
                                height: "90px",
                                width: "90px",
                                objectFit: "cover"
                              }}
                            />
                          )}
                        </td>
                        <td>
                          {data.ingredient && data.ingredient.length > 0
                            ? data.ingredient.map((data1, idx) => (
                                <div key={idx}>
                                  <i
                                    key={idx}
                                    className="iconsminds-pepper text-primary"
                                    style={{ fontSize: "large" }}
                                  />
                                  {data1.key +
                                    " " +
                                    data1.unit +
                                    " " +
                                    data1.value}
                                  <br />
                                </div>
                              ))
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                ""
              )}
              <Button
                className="float-right my-3"
                color="primary"
                style={{ borderRadius: 3 }}
                onClick={this.props.modalCancel}
              >
                <IntlMessages id="product.cancel" />
              </Button>
            </ModalBody>
          </Modal>

          <Modal isOpen={this.props.processModal}>
            <ModalHeader>
              <i
                className="iconsminds-cheese text-primary"
                style={{ fontWeight: "bold", fontSize: "xx-large" }}
              />
              <IntlMessages id="modal.remaining-product-detail" />
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
              <>
                <ReactTable
                  data={ProcessDetailing_data}
                  defaultPageSize={10}
                  showPageJump={true}
                  showPageSizeOptions={true}
                  PaginationComponent={Pagination}
                  defaultFilterMethod={filterCaseInsensitive}
                  className="-striped -highlight"
                  columns={[
                    {
                      Header: "Product",
                      accessor: "product_name",
                      filterable: true,
                      Cell: props => <p className="text-muted">{props.value}</p>
                    },
                    {
                      Header: "Variant",
                      accessor: "varient_name",
                      filterable: true,
                      Cell: props => (
                        <p className="text-muted">
                          {props.value ? props.value : "N/A"}
                        </p>
                      )
                    }
                  ]}
                />
                <Button
                  className="float-right my-3"
                  color="primary"
                  style={{ borderRadius: 3 }}
                  onClick={this.props.modalCancel}
                >
                  <IntlMessages id="product.cancel" />
                </Button>
              </>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default ProductList;
