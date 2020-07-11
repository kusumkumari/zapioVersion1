/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class FoodList extends Component {
  render() {
    const { data, retrieveFoodHandler } = this.props;
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
                  Add Food
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages id={"food.list"} style={{ fontWeight: "600" }} />{" "}
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
                Header: "Food Type",
                accessor: "food_type",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Food Image",
                accessor: "foodtype_image",
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
                show: userType() == "is_cashier" ? false : true,
                accessor: "active_status",
                Cell: props => (
                  <p>
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
                show: userType() == "is_cashier" ? false : true,
                accessor: "id",
                Cell: props => (
                  <span>
                    <span
                      className="simple-icon-pencil text-primary font-large"
                      onClick={e => retrieveFoodHandler(props.value)}
                    ></span>
                  </span>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}
export default FoodList;
