/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-times";
// use material theme
import "react-times/css/material/default.css";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class TimingsForm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isSetTiming}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-clock" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="timing.timing-manage" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="5">
                  <IntlMessages id="timing.open-time" />
                </Label>
                <Colxx sm="7">
                  <TimePicker
                    time={this.props.openingTime}
                    onTimeChange={this.props.handleOpeningTime}
                    timeMode="12"
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="5">
                  <IntlMessages id="timing.close-time" />
                </Label>
                <Colxx sm="7">
                  <TimePicker
                    time={this.props.closingTime}
                    onTimeChange={this.props.handleClosingTime}
                    timeMode="12"
                  />
                </Colxx>
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                color="primary"
                onClick={this.props.addTiming}
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
