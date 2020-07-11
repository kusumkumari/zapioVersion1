/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { userType } from "../ApiIntegration";

class StockAvailabilityCategoryList extends Component {
  render() {
    const { data } = this.props;

    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <i
                className="simple-icon-briefcase"
                style={{ fontSize: "large" }}
              />
            </Avatar>
          }
          title={
            <h3>
              <IntlMessages
                id={"stock.category-availability"}
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
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Category Name",
                accessor: "category_name",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Code",
                accessor: "category_code",
                filterable: true,
                Cell: props => <p className="text-info">{props.value}</p>
              },
              {
                Header: "Priority",
                accessor: "priority",
                filterable: true,
                Cell: props => <p className="text-success">{props.value}</p>
              },
              {
                Header: "Availability",
                show: userType() == "is_cashier" ? false : true,
                accessor: "is_available",
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
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default StockAvailabilityCategoryList;
