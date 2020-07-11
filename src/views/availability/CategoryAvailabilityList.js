/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";

class CategoryAvailabilityList extends Component {
  render() {
    const { data } = this.props;

    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"availability.cat-availability-list"} />
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
                Header: "Category Name",
                accessor: "category_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Category Code",
                accessor: "category_code",
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

export default CategoryAvailabilityList;
