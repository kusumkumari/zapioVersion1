/* eslint-disable */
import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Collapse,
  CustomInput,
  Label,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from "reactstrap";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
// import CheckboxTree from 'react-checkbox-tree';
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class AuthorizationAdd extends Component {
  render() {
    const {
      userData,
      dataLength,
      data,
      roll,
      addAuthHandler
    } = this.props;

    const permissions = [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" }
    ];

    const scroll = {
      overflowY: "scroll",
      height: "370px",
      overflowX: "scroll"
    };

    return (
      <Modal isOpen={this.props.isFormOpen} style={{ height: "600px" }}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-shield" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.permissions" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post" style={scroll}>
                <table id="customersts">
                  <thead
                    style={{
                      position: "fixed",
                      maxWidth: "588px",
                      zIndex: "1",
                      top: "94px"
                    }}
                  >
                    <tr style={{ backgroundColor: "#334080" }}>
                      <th>Functionalities / Designations</th>
                      {userData.map((datas, idx) => (
                        <th id={datas.id} key={idx}>{datas.user_type}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr key="1">
                      <td colSpan="4">
                        <div
                          className="text-dark"
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            textTransform: "uppercase"
                          }}
                        >

                          &nbsp; IPOS
                        </div>
                      </td>
                    </tr>
                    {roll.map((datas, idx) => (
                      <tr key={idx}>
                        <td className="text-primary">
                          <i
                            className="iconsminds-cookies text-danger"
                            style={{ fontSize: "large" }}
                          />
                        &nbsp;  <IntlMessages id={datas.route} />

                        </td>

                        {datas.rolls.map((udata, idx) => (
                          <td key={idx}>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              style={{ width: "100%" }}
                              className="react-select"
                              classNamePrefix="react-select"
                              value={udata}
                              placeholder="Permissions"
                              onChange={(e) => this.props.handleChangeOutlets(e, datas.ids, datas.user_id)}
                              options={permissions}
                            />
                          </td>

                        ))}

                        
                      </tr>
                    ))}
                    {/* <tr key="39">
                      <td colSpan="4">
                        <div
                          className="text-dark"
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            textTransform: "uppercase"
                          }}
                        >
                          <i
                            className="iconsminds-optimization text-primary"
                            style={{ fontSize: "large" }}
                          />
                          &nbsp; Accounts
                        </div>
                      </td>
                    </tr>
                    <tr key="9">
                      <td className="text-primary">
                        <i
                          className="iconsminds-sand-watch-2 text-danger"
                          style={{ fontSize: "large" }}
                        />
                        &nbsp; Imported Data
                      </td>
                      <td>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          style={{ width: "100%" }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="CatId"
                          placeholder="Permissions"
                          onChange={this.handleChangeOutlets}
                          options={permissions}
                        />
                      </td>
                      <td>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="CatId"
                          placeholder="Permissions"
                          onChange={this.handleChangeOutlets}
                          options={permissions}
                        />
                      </td>
                      <td>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="CatId"
                          placeholder="Permissions"
                          onChange={this.handleChangeOutlets}
                          options={permissions}
                        />
                      </td>
                    </tr>
                  */}
                  </tbody>
                </table>
              </Form>
              {/* <Button
                variant="contained"
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={addAuthHandler}
              >
                <IntlMessages id="product.save" />
                &nbsp;
                <Save />
              </Button>
              <Button
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                color="danger"
                onClick={this.props.cancel}
              >
                <Close /> <IntlMessages id="product.cancel" />
              </Button> */}
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
