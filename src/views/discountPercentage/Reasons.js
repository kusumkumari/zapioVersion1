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
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class Reasons extends Component {
  render() {
    return (
      <Modal isOpen={this.props.openReasonForm}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-pricing"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="reason.add" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="reason.reason" />
                </Label>
                <Colxx sm="6">
                  <Input
                    type="text"
                    value={this.props.reason}
                    name="reason"
                    onChange={this.props.handleChangeText}
                  />
                </Colxx>
              </FormGroup>

              <Button
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={this.props.AddReasonHandler}
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
