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
class PaymentReportList extends Component {
  render() {
    const { data, dataLength } = this.props;

    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"report.payment-report-list"} />
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
                accessor: "outlet_name",
                Cell: props => (
                  <p className={`font-weight-bold`}>

                    {props.value}

                  </p>
                )
              },
              {
                Header: "Orders",
                filterable: true,
                accessor: "order_count",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              {
                Header: "COD",
                filterable: true,
                accessor: "cod",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value.toFixed(2) : "N/A"}
                  </p>
                )
              },

              {
                Header: "Dine Out",
                filterable: true,
                accessor: "Dineout",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },

              {
                Header: "EDC Amex",
                filterable: true,
                accessor: "Amex",
                Cell: props => (
                  <p className={`font-weight-bold`}>

                    {props.value}

                  </p>
                )
              },

              {
                Header: "EDC Yes Bank",
                filterable: true,
                accessor: "yes",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value}

                  </p>
                )
              },

              {
                Header: "PayTm",
                filterable: true,
                accessor: "Paytm",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value}

                  </p>
                )
              },

              {
                Header: "Mobiquik",
                filterable: true,
                accessor: "Mobiquik",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value}

                  </p>
                )
              },

              {
                Header: "Zomato Online",
                filterable: true,
                accessor: "time",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value}

                  </p>
                )
              },

              {
                Header: "Total",
                filterable: true,
                accessor: "total_amount",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                    {props.value ? props.value.toFixed(2) : "N/A"}

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

export default PaymentReportList;
