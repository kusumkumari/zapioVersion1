/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Save, Close } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";

export default class AreaManagerEdit extends Component {
  render() {
    const {
      handleChange,
      AddManagerType,
      userData,
      userDataLength,
      Outletdata,
      OutletdataLength
    } = this.props;
    const userOptions = [];

    for (let index = 0; index < userDataLength; index++) {
      const { id, user_type } = userData[index];
      userOptions.push({ label: user_type, value: id, key: id });
    }
    const OutletOptions = [];
    for (let index = 0; index < OutletdataLength; index++) {
      const { id, Outletname } = Outletdata[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-administrator"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="manager.add-manager" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="manager.usertype" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={this.props.userType}
                    onChange={this.props.handleChangeUser}
                    options={userOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="manager.manager-name" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    value={this.props.name}
                    name="name"
                    onChange={handleChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="manager.username" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    value={this.props.username}
                    name="username"
                    onChange={handleChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="manager.password" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="password"
                    value={this.props.password}
                    name="password"
                    onChange={handleChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="deliveryboy-outlets" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.outlet}
                    onChange={this.props.handleChangeOutlet}
                    options={OutletOptions}
                  />
                </Colxx>
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                color="primary"
                onClick={AddManagerType}
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
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
                <Close />
                <IntlMessages id="product.cancel" />
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
