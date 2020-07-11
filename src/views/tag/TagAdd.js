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
import { Save, Close } from "@material-ui/icons";

export default class TagAdd extends Component {
  render() {
    const { addTagHandler } = this.props;
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-tag" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.tag" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="tag.tag" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="tag"
                      value={this.props.tag}
                      onChange={this.props.handleTextChange}
                    />
                    <br />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="tag.image" />
                  </Label>
                  <Label
                    sm="4"
                    style={{
                      border: "1px solid #ccc",
                      display: "inlineBlock",
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginLeft: "15px",
                      color: "hsl(0,0%,50%)"
                    }}
                  >
                    Tag Icon (32 x 32)
                    <Input
                      type="file"
                      onChange={this.props.onDrop}
                      style={{ display: "none" }}
                    />
                  </Label>
                  <Colxx sm="4">
                    {this.props.file && (
                      <div style={{ textAlign: "center" }}>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <img
                            style={{
                              height: "63px",
                              width: "80px",
                              objectFit: "cover"
                            }}
                            src={this.props.file}
                          />
                          &nbsp;&nbsp;
                          <i
                            style={{ outlineColor: "primary" }}
                            size=""
                            className="simple-icon-trash"
                            onClick={this.props.resetFile}
                          />
                        </span>
                      </div>
                    )}
                  </Colxx>
                </FormGroup>
                <Button
                  color="primary"
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={addTagHandler}
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
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
