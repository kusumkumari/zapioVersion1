/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Button
} from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { ListAlt } from "@material-ui/icons";
import { Add, RemoveRedEye, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

class DeliveryBoyList extends Component {
  render() {
    const {
      data,
      retrieveDeliveryBoyHandler,
      handleChangeStatus,
      detailing_data
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
            <Button
              style={{ fontWeight: "bold" }}
              onClick={this.props.openForm}
              className="px-3 py-2 d-flex flex-row align-items-center"
            >
              <Add style={{ marginRight: "5px" }} /> Add Delivery Boy
            </Button>
          }
          title={
            <h3>
              <IntlMessages
                id={"delivery-boy.list"}
                style={{ fontWeight: "600" }}
              />
            </h3>
          }
        />
        <CardBody>
          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            PaginationComponent={DataTablePagination}
            minRows={2}
            showPageSizeOptions={true}
            defaultFilterMethod={filterCaseInsensitive}
            className="-striped -highlight"
            columns={[
              {
                Header: "Name",
                accessor: "name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: "Email",
                accessor: "email",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: "Mobile",
                accessor: "mobile",
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
                Header: "Profile Pic",
                accessor: "profile_pic",
                Cell: props => (
                  <p className="text-muted">
                    {props.value ? (
                      <img src={props.value} width={50} height={50} />
                    ) : (
                      "No-Image"
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
              },
              {
                Header: "Edit",
                accessor: "id",
                Cell: props => (
                  <div>
                    <Button
                      className="p-2"
                      color="#2962ff"
                      style={{ background: "#fff", color: "#0d47a1" }}
                      onClick={() =>
                        this.props.retrieveDeliveryBoyHandler(props.value)
                      }
                    >
                      <Edit fontSize="small" />
                    </Button>
                    {userType() == "is_brand" && (
                      <Button
                        color="#2962ff"
                        onClick={() => this.props.toggle(props.value)}
                        style={{ background: "#fff", color: "#0d47a1" }}
                        className="p-2 ml-1"
                      >
                        <RemoveRedEye fontSize="small" />
                      </Button>
                    )}
                  </div>
                )
              }
            ]}
          />
          <Modal isOpen={this.props.modal} toggle={e => this.props.cancel()}>
            <ModalHeader toggle={e => this.props.cancel()}>
              <IntlMessages id="modal.delivery-boy-detail" />
            </ModalHeader>
            <ModalBody>
              <div className="flexbox">
                <p className="p1-1">
                  <b style={{ fontSize: "15px", padding: "10px" }}>
                    Outlets Detail :{" "}
                  </b>
                  {detailing_data &&
                  detailing_data.outlet &&
                  detailing_data.outlet.length > 0
                    ? detailing_data.outlet.map((data, idx) => (
                        <>
                          {" "}
                          <Badge
                            className={`font-weight-bold`}
                            color="warning"
                            style={{ width: "auto" }}
                            pill
                          >
                            {data.label}
                          </Badge>{" "}
                          &nbsp;{" "}
                        </>
                      ))
                    : "N/A"}
                </p>
              </div>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default DeliveryBoyList;
