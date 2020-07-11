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
  ModalBody
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Avatar from "@material-ui/core/Avatar";
import { Close, Edit } from "@material-ui/icons";

export default class ReceivedConfigurationEdit extends Component {
  render() {
    const {
      outlet,
      outletLength,
      editReceivedConfigurationHandler
    } = this.props;
    const OutletOptions = [{ label: "Select Outlet", value: "", key: "cat1" }];
    for (let index = 0; index < outletLength; index++) {
      const { id, Outletname } = outlet[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-wrench"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="edit.received-configure" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="received-outlet" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="category"
                    value={this.props.selectedOptions}
                    onChange={this.props.handleOutletChange}
                    options={OutletOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="received.header" />
                </Label>
                <Colxx sm="8">
                  <Input
                    placeholder="Header"
                    name="header"
                    value={this.props.header}
                    onChange={this.props.handleChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="received.footer" />
                </Label>
                <Colxx sm="8">
                  <Input
                    placeholder="Footer"
                    name="footer"
                    value={this.props.footer}
                    onChange={this.props.handleChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="received.gst" />
                </Label>
                <Colxx sm="8">
                  <Input
                    placeholder="GST"
                    name="gst"
                    value={this.props.gst}
                    onChange={this.props.handleChange}
                  />
                </Colxx>
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={editReceivedConfigurationHandler}
              >
                <IntlMessages id="product.edit" />
                &nbsp;
                <Edit />
              </Button>
              <Button
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                color="danger"
                onClick={this.props.cancel}
              >
                <Close /> <IntlMessages id="product.cancel" />
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
