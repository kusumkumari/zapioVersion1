/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt, Add } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class KitchenStepList extends Component {
  render() {
    const {
      data,
      retrieveKitchenStepsHandler,
      handleChangeStatus
    } = this.props;
    return (
      <Card className="mb-4">
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
                Add Ingredient
              </Button>
            )
          }
          title={
            <h3>
              <IntlMessages
                id={"kitchen-step.list"}
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
            PaginationComponent={DataTablePagination}
            showPageSizeOptions={true}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Ingredients Name",
                accessor: "name",
                filterable: true,
                Cell: props => (
                  <p className="text-info .rt-td">
                    <i
                      className="iconsminds-pepper text-primary"
                      style={{ fontSize: "large" }}
                    />
                    {props.value}
                  </p>
                )
              },
              {
                Header: "Food Type",
                accessor: "food_name",
                filterable: true,
                Cell: props => (
                  <p
                    className="text-success
                "
                  >
                    {props.value}
                  </p>
                )
              },
              {
                Header: "Steps Pic",
                accessor: "image",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <img
                        src={props.value}
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                      />
                    ) : (
                      "No-Image"
                    )}
                  </p>
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
                      onChange={e => handleChangeStatus(props)}
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
                      className="simple-icon-pencil tex-primary font-large"
                      onClick={() => retrieveKitchenStepsHandler(props.value)}
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

export default KitchenStepList;
