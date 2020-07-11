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
import { Edit, Close } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";

export default class UserAdd extends Component {
  render() {
    const { handleChange, EditUserType } = this.props;
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-user" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="usertype.edit-usertype" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="usertype-usertype" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    value={this.props.userType}
                    name="userType"
                    onChange={handleChange}
                  />
                </Colxx>
              </FormGroup>

              <Button
                variant="contained"
                color="primary"
                color="primary"
                onClick={EditUserType}
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
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
