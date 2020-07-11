/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Switch from "rc-switch";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class TimingsList extends Component {
  render() {
    const { data } = this.props;
    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <ListAlt />
            </Avatar>
          }
          title={
            <h3>
              <IntlMessages
                id={"timing.timing-list"}
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
            minRows={2}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Outlet Name",
                accessor: "Outletname",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value}</p>
              },
              {
                Header: "Opening Time",
                accessor: "opening_time",
                filterable: true,
                Cell: props => (
                  <p className="text-info">
                    {" "}
                    <i className="iconsminds-clock" />{" "}
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Closing Time",
                accessor: "closing_time",
                filterable: true,
                Cell: props => (
                  <p className="text-success">
                    {" "}
                    <i className="iconsminds-clock" />{" "}
                    {props.value ? props.value : "N/A"}
                  </p>
                )
              },
              {
                Header: "Open Status",
                show: userType() == "is_cashier" ? false : true,
                accessor: "is_open",
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
              },
              {
                Header: "Manage Timing",
            //    show: userType() == "is_cashier" ? false : true,
                accessor: "id",
                Cell: props => (
                  <Button
                    color="primary"
                 //   disabled={props.value == 1 ? true : false}
                    onClick={e => {
                      this.props.handleOrderProcess(props.value);
                    }}
                  >
                    <i
                      className="iconsminds-clock"
                      style={{ fontSize: "large" }}
                    />{" "}
                    Set Timing
                  </Button>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default TimingsList;
