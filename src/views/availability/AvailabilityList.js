/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";

class AvailabilityList extends Component {
  render() {
    const { data } = this.props;

    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"availability.availability-list"} />
          </CardTitle>
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
                Header: "Product Name",
                accessor: "product_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Food Type",
                accessor: "food_type",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Availability",
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

export default AvailabilityList;
