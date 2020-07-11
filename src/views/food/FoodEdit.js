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
import Avatar from "@material-ui/core/Avatar";
import { Close, Edit } from "@material-ui/icons";

export default class FoodAdd extends Component {
  render() {
    const { id, handleChange, EditFoodDetail, onDrop, resetFile } = this.props;
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-cookies"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="food.edit-food" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food-name" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    name="foodname"
                    value={this.props.foodname}
                    onChange={handleChange}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="food.image" />
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
                  Upload Food Image
                  <Input
                    type="file"
                    onChange={onDrop}
                    style={{ display: "none" }}
                  />
                </Label>
                <Colxx sm="3">
                  {this.props.file && (
                    <div style={{ textAlign: "center" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{ height: "63px", width: "120px" }}
                          src={this.props.file}
                        />{" "}
                        &nbsp;&nbsp;
                        <i
                          style={{ outlineColor: "primary" }}
                          size=""
                          className="simple-icon-trash"
                          onClick={resetFile}
                        />
                      </span>
                    </div>
                  )}
                </Colxx>
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={e => EditFoodDetail(id)}
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
