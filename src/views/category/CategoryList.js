/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import AutorenewIcon from '@material-ui/icons/Autorenew';
class CategoryList extends Component {
  render() {
    const { data, retrieveCategoryHandler, handleChangeStatus } = this.props;
    return (
      <Card className="mb-4">
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
        
                   <Button
                   color={this.props.status ? "warning" : "danger" }     
                    className="px-3 py-2 font-weight-bold d-flex align-items-center "
                    onClick={() => this.props.handleChangelistStatus()}
                  >
                    <AutorenewIcon className="mr-1" />
                    {this.props.status ? "Active" : "Inactive" }                </Button> 
                    &nbsp;&nbsp;
                  <Button
                    className="px-3 py-2 font-weight-bold d-flex align-items-center"
                    onClick={() => this.props.openForm()}
                  >
                    <Add className="mr-1" />
                  Add Category
                </Button>
                </div>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"category.list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            PaginationComponent={DataTablePagination}
            showPageSizeOptions={true}
            defaultFilterMethod={filterCaseInsensitive}
            minRows={2}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "category_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Category Code",
                accessor: "category_code",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Category Image",
                accessor: "category_image",
                Cell: props => (
                  <p className="text-muted">
                    {" "}
                    {props.value == "" || props.value == "null" ? (
                      "No-Image"
                    ) : (
                      <img
                        src={props.value}
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </p>
                )
              },
              {
                Header: "Priority",
                accessor: "priority",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Status",
                show: userType() == "is_cashier" ? false : true,
                accessor: "active_status",
                Cell: props => (
                  <p>
                    <Switch
                      id={name}
                      name={name}
                      className={this.props.className}
                      checked={props.value}
                      onChange={e => handleChangeStatus(props)}
                    />
                  </p>
                )
              },
              {
                Header: "Edit",
                show: userType() == "is_cashier" ? false : true,
                accessor: "id",
                Cell: props => (
                  <a href="#form">
                    <p
                      className="simple-icon-pencil text-primary font-large"
                      onClick={e => retrieveCategoryHandler(props.value)}
                    ></p>
                  </a>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default CategoryList;
