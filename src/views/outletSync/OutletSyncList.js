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
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class OutletSyncList extends Component {
  render() {
    const { data } = this.props;
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
                <div className="flaxbox">
                  <Button
                    color="primary"
                    onClick={() => this.props.getAttachedOutlets()}
                  >
                    <AttachFile className="mr-1" />
                    Attach Outlets
                  </Button>{" "}
                  &nbsp; &nbsp;
                  <Button onClick={() => this.props.openForm()}>
                    <Autorenew className="mr-1" />
                    Initate Synching
                  </Button>
                </div>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"outlet-sync.outlet-syncing-list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />
          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            minRows={2}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Outlet Name",
                accessor: "outlet_name",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-primary">
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Urban Piper Store ID",
                accessor: "urbanpiper_store_id",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td ">{props.value ? props.value : "N/A"}</p>
                )
              },
              {
                Header: "Action At",
                accessor: "action_at",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-success">
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
                filterable: true,
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
              },
              {
                Header: "Status",
                accessor: "store_status",
                show: userType() == "is_cashier" ? false : true,
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
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}
export default OutletSyncList;
