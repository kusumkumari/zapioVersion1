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

class ProductReportList extends Component {
  render() {
    const { data, dataLength } = this.props;
   
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"report.product-report-list"} />
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
                Header:"Product Name",
                filterable: true,
                accessor: "name",
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header:"Product ID",
                filterable: true,
                accessor: "id",
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header:"Qty",
                filterable: true,
                accessor: "qty",
                Cell: props => (
                  <p className={`font-weight-bold`}>
                   
                      {props.value}

                  </p>
                )
              },
              {
                Header:"Invoice No",
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
                Header: "Food Type",
                filterable: true,
                accessor: "food_type",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? props.value : "N/A"}
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

export default ProductReportList;
