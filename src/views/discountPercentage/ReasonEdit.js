/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import { Edit, Close } from "@material-ui/icons";

export default class ReasonEdit extends Component {
  render() {
    return (
      <Modal isOpen={this.props.openReasonEditForm}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-pricing"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="reason.edit" />
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
                onClick={this.props.EditReasonHandler}
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
