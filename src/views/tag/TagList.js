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
import { Add, ListAlt } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class TagList extends Component {
  render() {
    const { data, retrieveTagHandler, handleChangeStatus } = this.props;
    return (
      <Card className="mb-4">
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
                  Add Tag
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages id={"tag.list"} style={{ fontWeight: "600" }} />{" "}
              </h3>
            }
          />

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
                Header: "Tag",
                accessor: "tag_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },

              {
                Header: "Image",
                accessor: "tag_image",
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
                      onClick={() => retrieveTagHandler(props.value)}
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

export default TagList;
