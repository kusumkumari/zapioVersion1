/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, Button } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt } from "@material-ui/icons";
import { buttonStyleDefault } from "../../constants/defaultValues";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { userType } from "../ApiIntegration";

class ComboList extends Component {
  render() {
    const { data, retrieveComboHandler, handleChangeStatus } = this.props;
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
                  className={buttonStyleDefault}
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add Combo
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages id={"combo.list"} style={{ fontWeight: "600" }} />{" "}
              </h3>
            }
          />

          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            PaginationComponent={DataTablePagination}
            showPageSizeOptions={true}
            defaultFilterMethod={filterCaseInsensitive}
            minRows={2}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "combo_name",
                filterable: true,
                Cell: props => (
                  <p className="text-primary .rt-td">{props.value}</p>
                )
              },
              {
                Header: "Product",
                accessor: "product_name",
                filterable: true,
                Cell: props => <p className="text-info .rt-td">{props.value}</p>
              },
              {
                Header: "Free Product",
                accessor: "free_product_name",
                filterable: true,
                Cell: props => <p className="text-success">{props.value}</p>
              },
              {
                Header: "Item Qty",
                accessor: "product_quantity",
                filterable: true,
                Cell: props => <p className="text-danger">{props.value}</p>
              },
              {
                Header: "Free Items",
                accessor: "free_pro_quantity",
                filterable: true,
                Cell: props => <p className="text-danger">{props.value}</p>
              },
              {
                Header: "Valid From",
                accessor: "valid_frm",
                filterable: true,
                Cell: props => <p className="text-dark">{props.value}</p>
              },
              {
                Header: "Valid Till",
                accessor: "valid_till",
                filterable: true,
                Cell: props => <p className="text-dark">{props.value}</p>
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
                      className="simple-icon-pencil text-primary font-weight-bold ft-6s"
                      onClick={e => retrieveComboHandler(props.value)}
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

export default ComboList;
