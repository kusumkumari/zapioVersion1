/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt, Edit } from "@material-ui/icons";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class SubcategoryList extends Component {
  render() {
    const { data, retrieveSubcategoryHandler, handleChangeStatus } = this.props;
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
              <Button
                className="px-3 py-2 font-weight-bold d-flex align-items-center"
                onClick={() => this.props.openForm()}
              >
                <Add className="mr-1" />
                Add Sub Category
              </Button>
            }
            title={
              <h3>
                <IntlMessages
                  id={"subcategory.list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

          <ReactTable
            data={data}
            defaultPageSize={10}
            filterable={true}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            minRows={2}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "subcategory_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Category",
                accessor: "category_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Subcategory Image",
                accessor: "subcategory_image",
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
                Header: "Status",
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
                accessor: "id",
                Cell: props => (
                  <a href="#form">
                    <p
                      className="simple-icon-pencil text-primary font-large"
                      onClick={e => retrieveSubcategoryHandler(props.value)}
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

export default SubcategoryList;
