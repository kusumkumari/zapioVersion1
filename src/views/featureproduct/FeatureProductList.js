/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, Button } from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { Add, ListAlt } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class FeatureProductList extends Component {
  render() {
    const { data, retrieveFeatureProductHandler } = this.props;
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
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add Feature
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"feature.list"}
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
                Header: "Outlets",
                accessor: "outlet",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Feature Products",
                accessor: "featured",
                filterable: true,
                Cell: props => (
                  <p className=".rt-td text-primary">{props.value}</p>
                )
              },
              {
                Header: "Status",
                show: userType() == "is_cashier" ? false : true,
                accessor: "active_status",
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
              },
              {
                Header: "Edit",
                show: userType() == "is_cashier" ? false : true,
                accessor: "id",
                Cell: props => (
                  <a href="#form">
                    <p
                      className="simple-icon-pencil text-primary font-large"
                      onClick={e => retrieveFeatureProductHandler(props.value)}
                    ></p>
                  </a>
                )
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default FeatureProductList;
