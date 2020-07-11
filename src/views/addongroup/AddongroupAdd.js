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
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class AddongroupAdd extends Component {
  render() {
    const {
      handleChange,
      handleChange1,
      addGroupHandler,
      variantData,
      variantDataLength
    } = this.props;
    const variantOptions = [
      { label: "Select Variant", value: "", key: "Variant" }
    ];
    for (let index = 0; index < variantDataLength; index++) {
      const { id, variant } = variantData[index];
      variantOptions.push({ label: variant, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-arrow-up-circle"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="addongroup.add" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="variant.category" />
                  </Label>
                  <Colxx sm="8">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={this.props.variant}
                      onChange={handleChange1}
                      options={variantOptions}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="addongroup.name" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="text"
                      name="addgroup"
                      value={this.props.addgroup}
                      onChange={e => handleChange(e)}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                <Label sm="4">
                    <IntlMessages id="addongroup.priority" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="number"
                      name="priority"
                      value={this.props.priority}
                      onChange={e => handleChange(e)}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="AddonGroup-description" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="textarea"
                      name="description"
                      value={this.props.description}
                      onChange={this.props.handleChange}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="addongroup.min" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="number"
                      name="minaddon"
                      value={this.props.minaddon}
                      onChange={e => handleChange(e)}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="4">
                    <IntlMessages id="addongroup.max" />
                  </Label>
                  <Colxx sm="8">
                    <Input
                      type="number"
                      name="maxaddon"
                      value={this.props.maxaddon}
                      onChange={e => handleChange(e)}
                    />
                  </Colxx>
                </FormGroup>
                <Button
                  color="primary"
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={addGroupHandler}
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
