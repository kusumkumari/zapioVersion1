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

class StockAvailabilityProductList extends Component {
  render() {
    const { proData } = this.props;

    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <i className="simple-icon-list" style={{ fontSize: "large" }} />
            </Avatar>
          }
          title={
            <h3>
              <IntlMessages
                id={"stock.product-availability"}
                style={{ fontWeight: "600" }}
              />{" "}
            </h3>
          }
        />
        <CardBody>
          <ReactTable
            data={proData}
            defaultPageSize={10}
            showPageJump={true}
            minRows={2}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Product Name",
                accessor: "product_name",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Food Type",
                accessor: "food_type",
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
                      onChange={e =>
                        this.props.handleChangeProductStatus(props)
                      }
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

export default StockAvailabilityProductList;
