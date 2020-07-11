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

export default class AddonAdd extends Component {
  render() {
    const {
      addondata,
      addonLength,
      addAddonHandler,
      handleAddShareholder,
      handleChange,
      handleShareholderNameChange,
      handlePriceNameChange,
      handleRemoveShareholder
    } = this.props;
    const selectData = [];
    for (let index = 0; index < addonLength; index++) {
      const { id, addon_gr_name } = addondata[index];
      selectData.push({ label: addon_gr_name, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="simple-icon-plus" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="addon.post" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="addongroup.category" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="addon"
                    value={this.props.addon}
                    onChange={handleChange}
                    options={selectData}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="addongroup.addon-identifier" />
                </Label>
                <Colxx sm="8">
                <Input
                      value={this.props.identifier}
                      placeholder="identifier"
                      onChange={this.props.handleText}
                    />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.Addon" />
                </Label>
                <Colxx sm="4">
                  <Button
                    color="primary"
                    size="xs"
                    style={{ borderRadius: "500px" }}
                    className="Plus-Button text-primary"
                    onClick={(this.props, handleAddShareholder)}
                  >
                    <IntlMessages id="product.plus" />
                  </Button>
                </Colxx>
              </FormGroup>
              {this.props.shareholders.map((shareholder, idx) => (
                <FormGroup row key={idx}>
                  <Colxx sm="5">
                    <Input
                      value={shareholder.name}
                      placeholder="Name"
                      onChange={handleShareholderNameChange(idx)}
                    />
                  </Colxx>

                  <Colxx sm="5">
                    <Input
                      value={shareholder.price}
                      placeholder="Price"
                      onChange={handlePriceNameChange(idx)}
                    />
                  </Colxx>
                  <Colxx sm="2" style={{ alignSelf: "center" }}>
                    <Button
                      color="primary"
                      size="xs"
                      style={{ borderRadius: "500px" }}
                      className="Plus-Button text-primary"
                      onClick={handleRemoveShareholder(idx)}
                    >
                      <IntlMessages id="product.sub" />
                    </Button>
                  </Colxx>
                </FormGroup>
              ))}

              <Button
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={addAddonHandler}
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
