/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import { Close, Edit } from "@material-ui/icons";

export default class VariantEdit extends Component {
  render() {
    const { handleChange, editVariantHandler, id } = this.props;
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-paper-plane"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="edit.variant" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="Variant.name" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    name="name"
                    value={this.props.name}
                    onChange={e => handleChange(e)}
                  />
                </Colxx>
              </FormGroup>

              <Button
                variant="contained"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={editVariantHandler}
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
