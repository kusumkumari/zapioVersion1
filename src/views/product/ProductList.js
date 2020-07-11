/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import "../../assets/css/custom.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";
import { Colxx } from "../../components/common/CustomBootstrap";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import ReactTooltip from "react-tooltip";
import AutorenewIcon from '@material-ui/icons/Autorenew';

class ProductList extends Component {
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
                <div className="flexbox">
                  <i
                    className="simple-icon-briefcase mr-1 text-primary ft-6s font-weight-bold"
                    onClick={this.props.catToggleModal}
                    data-tip
                    data-for="category"
                  />
                  <ReactTooltip id="category" type="error">
                    <span> Add Category</span>
                  </ReactTooltip>
                  &nbsp; &nbsp;
                  <i
                    data-tip
                    data-for="subcategory"
                    onClick={this.props.subCatToggleModal}
                    className="simple-icon-screen-desktop mr-1 text-primary font-weight-bold ft-6s"
                  />
                  <ReactTooltip id="subcategory" type="error">
                    <span>Add Sub Category </span>
                  </ReactTooltip>
                  &nbsp; &nbsp;
                  <i
                    data-tip
                    data-for="variant"
                    onClick={this.props.varntToggleModal}
                    className="simple-icon-paper-plane mr-1 text-primary font-weight-bold ft-6s"
                  />
                  <ReactTooltip id="variant" type="error">
                    <span>Add Variant </span>
                  </ReactTooltip>
                  &nbsp; &nbsp;
                  <i
                    data-tip
                    data-for="AddonsGroup"
                    onClick={this.props.addOnsGrpToggleModal}
                    className="simple-icon-arrow-up-circle mr-1 text-primary font-weight-bold ft-6s"
                  />
                  <ReactTooltip id="AddonsGroup" type="error">
                    <span>Add AddOns Group </span>
                  </ReactTooltip>
                  &nbsp; &nbsp;
                  <i
                    data-tip
                    data-for="Addons"
                    onClick={this.props.addOnToggleModal}
                    className="simple-icon-plus mr-1 text-primary font-weight-bold ft-6s"
                  />
                  <ReactTooltip id="Addons" type="error">
                    <span>Add AddOns </span>
                  </ReactTooltip>
                  &nbsp; &nbsp;
                  <i
                    data-tip
                    data-for="ptag"
                    onClick={this.props.addOnTagModal}
                    className="iconsminds-tag mr-1 text-primary font-weight-bold ft-6s"
                  />
                  <ReactTooltip id="ptag" type="error">
                    <span>Add Product Tag </span>
                  </ReactTooltip>
                  &nbsp;&nbsp;
                  <Button
                    color={this.props.status ? "warning" : "danger"}
                    className="px-3 py-2 font-weight-bold d-flex align-items-center "
                    onClick={() => this.props.handleChangelistStatus()}
                  >
                    <AutorenewIcon className="mr-1" />
                    {this.props.status ? "Active" : "Inactive"}                </Button>

                  <Button
                    className="px-3 py-2 font-weight-bold d-flex align-items-center"
                    onClick={() => this.props.openForm()}
                    style={{ marginLeft: "15px" }}
                  >
                    <Add className="mr-1" />
                    Add Product
                  </Button>
                </div>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"product.product-list"}
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
                Header: "Product",
                accessor: "product_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Product ID",
                accessor: "ids",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Priority",
                accessor: "priority",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Product Code",
                accessor: "product_code",
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
                Header: "Food Type",
                accessor: "FoodType_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },

              {
                Header: "Creation Date",
                accessor: "created_at",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Updation Date",
                accessor: "updated_at",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
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
                Header: "Action",
                accessor: "id",
                Cell: props => (
                  <span>
                    {userType() !== "is_cashier" && (
                      <a href="#form">
                        <span
                          className="simple-icon-pencil text-primary font-large"
                          onClick={e =>
                            this.props.getProductHandler(props.value)
                          }
                        ></span>
                      </a>
                    )}
                    &nbsp;
                    <span
                      className="simple-icon-eye text-primary font-large"
                      onClick={e => this.props.toggle(props.value)}
                    ></span>
                  </span>
                )
              }
            ]}
          />
          <Modal
            isOpen={modal}
            toggle={e => this.props.toggle(detailing_data.id)}
          >
            <ModalHeader toggle={e => this.props.toggle(detailing_data.id)}>
              <IntlMessages id="modal.product-detail" />
            </ModalHeader>
            <ModalBody>
              <div className="flexbox">
                <div className="flex">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Has Variant :{" "}
                    </b>{" "}
                    {detailing_data.has_variant ? "Yes" : "No"}
                  </p>
                </div>
                {detailing_data.subcat_detail ? (
                  <div className="flex">
                    <p className="p1-1">
                      <b style={{ fontSize: "15px", padding: "10px" }}>
                        Sub Category :{" "}
                      </b>{" "}
                      {detailing_data.subcat_detail[0].label}
                    </p>
                  </div>
                ) : (
                    ""
                  )}
              </div>
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Food Type :{" "}
                  </b>{" "}
                  {detailing_data.food_type}
                </p>
              </div>
              {detailing_data.addon_details ? (
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>Tags : </b>
                    {detailing_data.tags.map(
                      (data1, idx) => data1.label + ", "
                    )}
                  </p>
                </div>
              ) : (
                  ""
                )}

              {detailing_data.tax_association ? (
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>Tax  : </b>
                    {detailing_data.tax_association.map(
                      (data1, idx) => data1.label + ", "
                    )}
                  </p>
                </div>
              ) : (
                  ""
                )}

              {detailing_data.platform_detail ? (
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>Aggregater  : </b>
                    {detailing_data.platform_detail.map(
                      (data1, idx) => data1.label + ", "
                    )}
                  </p>
                </div>
              ) : (
                  ""
                )}


              {detailing_data.price != 0 ? (
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Price :
                    </b>
                    {detailing_data.price}
                  </p>
                </div>
              ) : (
                  ""
                )}
              {detailing_data.discount_price != 0 ? (
                <div className="flexbox">
                  <p className="p1-1">
                    <b style={{ fontSize: "15px", padding: "10px" }}>
                      Discount Price :{" "}
                    </b>{" "}
                    {detailing_data.discount_price}
                  </p>
                </div>
              ) : (
                  ""
                )}
              {detailing_data.variant_deatils ? (
                <table id="customersts">
                  <tr className="btn-primary">
                    <th>Variant</th>
                    <th>End Product ID</th>
                    <th>Price</th>
                    <th>Discount (%)</th>
                    <th>AddOn Group</th>
                  </tr>
                  {detailing_data.variant_deatils.map((data, idx) => (
                    <tr>
                      <td>{data.name.label}</td>
                      <td>{data.u_id}</td>
                      <td>{data.price}</td>
                      <td>{data.dis}</td>
                      <td>
                        {" "}
                        {data.addonGroup.map(
                          (data1, idx) => data1.label + ", "
                        )}
                      </td>
                    </tr>
                  ))}
                </table>
              ) : (
                  ""
                )}
              <br />
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Product Description :{" "}
                  </b>{" "}
                  {detailing_data.product_desc}
                </p>
              </div>
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    KOT Description :{" "}
                  </b>{" "}
                  {detailing_data.kot_desc}
                </p>
              </div>
              <FormGroup row>
                {detailing_data.product_image && detailing_data.product_image.length > 0 && detailing_data.product_image.map((data, index) => (
                  <Colxx sm="6">
                    <img src={data} style={{ border: "1px solid #ccc", height: "250px", width: "500px", marginTop: "15px", padding: "20px" }} />
                  </Colxx>
                ))}
              </FormGroup>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default ProductList;
