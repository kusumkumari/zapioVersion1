/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle, Button, Badge } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import {
  Autorenew,
  ListAlt,
  Done,
  Clear,
  AttachFile
} from "@material-ui/icons";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class MenuSyncProductList extends Component {
  render() {
    const { prodData, retrieveManagerHandler } = this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
                <ListAlt />
              </Avatar>
            }
            title={
              <h3>
                <IntlMessages
                  id={"menu-product-syncing-list"}
                  style={{ fontWeight: "600" }}
                />
              </h3>
            }
          />
          <ReactTable
            data={prodData}
            defaultPageSize={10}
            showPageJump={true}
            minRows={2}
            loading={this.props.productLoad}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "product",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-primary">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Attached At",
                accessor: "attached_at",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-info">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Sync Status",
                accessor: "sync_status",
                Cell: props => (
                  <p
                    className={`font-weight-bold`}
                    style={{ fontSize: "19px" }}
                  >
                    <Badge color={props.original.color_code} pill>
                      {props.value}
                    </Badge>
                  </p>
                )
              },
              {
                Header: "Available",
                accessor: "is_available",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <Done style={{ color: "#0bb30b" }} />
                    ) : (
                      <Clear color="error" />
                    )}
                  </p>
                )
              },
              {
                Header: "Synched",
                accessor: "is_synced",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <Done style={{ color: "#0bb30b" }} />
                    ) : (
                      <Clear color="error" />
                    )}
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
export default MenuSyncProductList;
