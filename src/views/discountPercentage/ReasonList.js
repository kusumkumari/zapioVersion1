/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, Badge, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import Switch from "rc-switch";
import { Add, Edit, RemoveRedEye } from "@material-ui/icons";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt } from "@material-ui/icons";

class ReasonList extends Component {
  render() {
    const { reasonData, detailing_data } = this.props;

    return (
      <Card className="h-100">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
              <ListAlt />
            </Avatar>
          }
          action={
            <Button
              style={{ fontWeight: "bold" }}
              onClick={this.props.openReasonForm}
              className="px-3 py-2 d-flex flex-row align-items-center"
            >
              <Add style={{ marginRight: "5px" }} /> Add Reasons
            </Button>
          }
          title={
            <h3>
              <IntlMessages id={"reason-list"} style={{ fontWeight: "600" }} />
            </h3>
          }
        />
        <CardBody>
          <ReactTable
            data={reasonData}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            minRows={2}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Reason",
                accessor: "reason",
                filterable: true,
                Cell: props => (
                  <p className="text-muted text-primary">{props.value}</p>
                )
              },

              {
                Header: "Status",
                accessor: "active_status",
                Cell: props => (
                  <p className="text-muted">
                    <Switch
                      id={name}
                      name={name}
                      className={this.props.className}
                      checked={props.value}
                      onChange={e => this.props.handleChangeReasonStatus(props)}
                    />
                  </p>
                )
              },
              {
                Header: "Action",
                accessor: "id",
                Cell: props => (
                  <Button
                    className="p-2"
                    color="#2962ff"
                    style={{ background: "#fff", color: "#0d47a1" }}
                    onClick={() => this.props.getReasonHandler(props.value)}
                  >
                    <Edit fontSize="small" />
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

export default ReasonList;
