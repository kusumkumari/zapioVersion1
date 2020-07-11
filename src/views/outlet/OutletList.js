/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt, Add } from "@material-ui/icons";

class OutletList extends Component {
  render() {
    const { data, handleChangeStatus } = this.props;
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
              className="px-3 py-2 font-weight-bold d-flex align-items-center"
              onClick={() => this.props.openForm()}
            >
              <Add className="mr-1" />
              Add Outlet
            </Button>
          }
          title={
            <h3>
              <IntlMessages id={"outlet.list"} style={{ fontWeight: "600" }} />
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
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Address",
                accessor: "address",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Username",
                accessor: "username",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "City",
                accessor: "city",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Area",
                accessor: "area",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Outlet Image",
                accessor: "outlet_image",
                Cell: props => (
                  <p className="text-muted">
                    {" "}
                    {props.value == "" || props.value == "null" ? (
                      "No-Image"
                    ) : (
                      <img
                        src={props.value}
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </p>
                )
              },
              {
                Header: "Status",
                accessor: "active_status",
                Cell: props => (
                  <p>
                    <Switch
                      id={name}
                      name={name}
                      className={this.props.className}
                      checked={props.value}
                      onChange={e => handleChangeStatus(props)}
                    />
                  </p>
                )
              }
              // {
              //   Header: "Edit",
              //   accessor: "id",
              //   Cell: props => <p className="iconsminds-brush"  onClick={(e) => retrieveCategoryHandler(props.value)}>
              // </p>
              // }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}
export default OutletList;
