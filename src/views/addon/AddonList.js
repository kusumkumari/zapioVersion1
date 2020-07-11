/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Pagination from "../../components/DatatablePagination";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt } from "@material-ui/icons";
import { userType } from "../ApiIntegration";
import {
  Done,
  Clear,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import AutorenewIcon from '@material-ui/icons/Autorenew';

class AddonList extends Component {
  render() {
    const { data, detailing_data, Rtid, retrieveAddonsHandler } = this.props;
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

              <div className="flexbox">
                <Button
                  color={this.props.status ? "warning" : "danger"}
                  className="px-3 py-2 font-weight-bold d-flex align-items-center "
                  onClick={() => this.props.handleChangelistStatus()}
                >
                  <AutorenewIcon className="mr-1" />
                  {this.props.status ? "Active" : "Inactive"}                </Button>
                 &nbsp;&nbsp;
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add AddOn
                </Button>
              </div>
            }
            title={
              <h3>
                <IntlMessages id={"addon.list"} style={{ fontWeight: "600" }} />{" "}
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
                Header: "Addon Group Name",
                accessor: "addon_gr_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Identifier",
                accessor: "identifier",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },

              {
                Header: "Edit",
                show: userType() == "is_cashier" ? false : true,
                accessor: "id",
                Cell: props => (
                  <p
                    className="simple-icon-pencil text-primary font-large"
                    onClick={e => retrieveAddonsHandler(props.value)}
                  ></p>
                )
              },
              {
                Header: "Status",
                accessor: "active_status",
                Cell: props => (
                  <p>
                    {props.value ? <Done style={{ color: "#0bb30b" }} /> : <Clear color="error" />}
                  </p>
                )
              },
              {
                Header: "View",
                accessor: "id",
                Cell: props => (
                  <p
                    className="simple-icon-eye text-primary font-large"
                    onClick={e => this.props.toggle(props.value)}
                  ></p>
                )
              }
            ]}
          />

          <Modal
            isOpen={this.props.modal}
            toggle={e => this.props.toggle(Rtid)}
          >
            <ModalHeader toggle={e => this.props.toggle(Rtid)}>
              <IntlMessages id="addon.addon-detail" />
            </ModalHeader>
            <ModalBody>
              {detailing_data && detailing_data.length > 0 ? (
                     <div>
                
                  <h5 className="text-primary">Associated Add-ons</h5>
                  <table id="customersts">
                    <thead>
                      <tr className="btn-primary">
                        <th>Unique ID</th>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailing_data.map((data, idx) => (
                        <tr key={idx}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                  ""
                )}
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}
export default AddonList;
