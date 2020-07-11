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
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import AutorenewIcon from '@material-ui/icons/Autorenew';

class AddongroupList extends Component {
  render() {
    const { data, handleChangeStatus, retrieveAddonGroupHandler } = this.props;
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
                <div className="flexbox">
        
                <Button
                color={this.props.status ? "warning" : "danger" }     
                 className="px-3 py-2 font-weight-bold d-flex align-items-center "
                 onClick={() => this.props.handleChangelistStatus()}
               >
                 <AutorenewIcon className="mr-1" />
                 {this.props.status ? "Active" : "Inactive" }                </Button> 
                 &nbsp;&nbsp;
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add AddOn Group
                </Button>
                </div>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"addongroup.list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={Pagination}
            defaultFilterMethod={filterCaseInsensitive}
            minRows={2}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "addon_gr_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Priority",
                accessor: "priority",
                filterable: true,
                Cell: props => <p className="text-primary">{props.value ? props.value : "N/A"}</p>
              },
              {
                Header: "Variant Name",
                accessor: "variant_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Description",
                accessor: "description",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Max Addon",
                accessor: "max_addons",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Min Addon",
                accessor: "min_addons",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
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
                      className="simple-icon-pencil text-primary font-large"
                      onClick={e => retrieveAddonGroupHandler(props.value)}
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
export default AddongroupList;
