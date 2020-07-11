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

class AddOnReportList extends Component {
  render() {
    const { data, dataLength } = this.props;
   
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"report.addon-report-list"} />
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
                Header:"AddOn Name",
                filterable: true,
                accessor: "addon_name",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                   
                      {props.value}

                  </p>
                )
              },
              {
                Header:"Invoice No.",
                filterable: true,
                accessor: "order_id",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              // {
              //   Header: "Qty",
              //   filterable: true,
              //   accessor: "qty",
              //   Cell: props => (
              //     <p className="text-muted">
              //       {props.value ? props.value : "N/A"}
              //     </p>
              //   )
              // },
              {
                Header: "Price",
                filterable: true,
                accessor: "price",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Outlet",
                filterable: true,
                accessor: "outlet",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Source",
                filterable: true,
                accessor: "source",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header:"Date",
                filterable: true,
                accessor: "dt",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                   
                      {props.value}

                  </p>
                )
              },
              {
                Header:"Time",
                filterable: true,
                accessor: "time",
                Cell: props => (
                  <p className={`font-weight-bold`}>
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

export default AddOnReportList;
