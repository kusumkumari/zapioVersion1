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
  ModalBody,
  ModalHeader
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Avatar from '@material-ui/core/Avatar';
import { Save, Close } from '@material-ui/icons';

export default class KitchenStepAdd extends Component {
  render() {
    const { fooddata, fooddataLength, addStepsHandler } = this.props;
    const foodTypeOption = [];
    for (let index = 0; index < fooddataLength; index++) {
      const { id, food_type } = fooddata[index];
      foodTypeOption.push({ label: food_type, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-chopsticks" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.kitchen-step" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="kitchen-ingridient-name" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="name"
                      value={this.props.name}
                      onChange={this.props.handleTextChange}
                    />
                    <br />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="product.foodType" />
                  </Label>
                  <Colxx sm="9">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      value={this.props.foodTypeArray}
                      onChange={this.props.handleChangeFoodType}
                      options={foodTypeOption}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="kitchen.image" />
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
                    Upload Steps Image
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
                  onClick={addStepsHandler}
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
