/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  CardTitle,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { ChevronRightRounded, RemoveRedEye } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { buttonStyleDefault } from "../../constants/defaultValues";
import { userType } from "../ApiIntegration";

class OutletLogsReportList extends Component {
  render() {
    const { data, dataLength } = this.props;

    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"report.outletlogs-report-list"} />
          </CardTitle>
          <ReactTable
            data={data}
            pages={this.props.pages}
            minRows={2}
            loading={this.props.loading}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={false}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            onPageChange={this.props.onPageChange}
            className="-striped -highlight"
            columns={[
              {
                Header: "Outlet",
                filterable: true,
                accessor: "outlet",
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Opening Time",
                filterable: true,
                accessor: "opening_time",
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Closing Time",
                filterable: true,
                accessor: "closing_time",
                Cell: props => (
                  <p className={`font-weight-bold`}>

                    {props.value}

                  </p>
                )
              },
              {
                Header: "Date",
                filterable: true,
                accessor: "created_at",
                Cell: props => (
                  <p className={`font-weight-bold`}>

                    {props.value}

                  </p>
                )
              },
              {
                Header: "User",
                filterable: true,
                accessor: "user",
                Cell: props => (
                  <p className={`font-weight-bold text-info`}>

                    {props.value}
                  </p>
                )
              },
            ]}
          />
        </CardBody>

      </Card>
    );
  }
}

export default OutletLogsReportList;
