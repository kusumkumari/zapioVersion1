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

class AreaManagerList extends Component {
  render() {
    const { data, retrieveManagerHandler } = this.props;
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
                  Add Manager
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"manager.managers-list"}
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
            minRows={2}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Staff Name",
                accessor: "manager_name",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-primary">{props.value}</p>
                )
              },
              {
                Header: "User Type",
                accessor: "user_type",
                filterable: true,
                Cell: props => <p className=".rt-td ">{props.value}</p>
              },
              {
                Header: "Username",
                accessor: "username",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-primary">{props.value}</p>
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
                  <p style={{ display: "inline-block" }}>
                    <Button
                      outline
                      color="primary"
                      className="px-3 py-2 font-weight-bold d-flex align-items-center"
                      onClick={e => retrieveManagerHandler(props.value)}
                    >
                      <Edit className="mr-1" />
                      Edit
                    </Button>
                  </p>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}
export default AreaManagerList;
