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
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Avatar from "@material-ui/core/Avatar";
import { Edit, Close } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

export default class DeliveryBoyEdit extends Component {
  render() {
    const {
      editDeliveryBoyHandler,
      handleTextChange,
      Outletdata,
      OutletdataLength
    } = this.props;
    const OutletOptions = [];
    for (let index = 0; index < OutletdataLength; index++) {
      const { id, Outletname } = Outletdata[index];
      OutletOptions.push({ label: Outletname, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-tractor"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="edit.delivery-boy-management" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="deliveryboy-name" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="name"
                      value={this.props.name}
                      onChange={handleTextChange}
                    />
                    <br />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="deliveryboy-mobile" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="mobile"
                      value={this.props.mobile}
                      onChange={handleTextChange}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="deliveryboy-email" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="email"
                      value={this.props.email}
                      onChange={handleTextChange}
                    />
                  </Colxx>
                </FormGroup>

               

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="deliveryboy-address" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="teaxtarea"
                      name="address"
                      value={this.props.address}
                      onChange={handleTextChange}
                    />
                  </Colxx>
                </FormGroup>
                {userType() == "is_brand" && (
                  <FormGroup row>
                    <Label sm="3">
                      <IntlMessages id="deliveryboy-outlets" />
                    </Label>
                    <Colxx sm="9">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        isMulti={true}
                        value={this.props.outlet}
                        onChange={this.props.handleChangeOutlet}
                        options={OutletOptions}
                      />
                    </Colxx>
                  </FormGroup>
                )}
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="deliveryboy.image" />
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
                    Upload Product Image
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
                            style={{ height: "63px", width: "180px" }}
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
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={
                    userType() == "is_outlet"
                      ? editDeliveryBoyHandler
                      : this.props.editBrandDeliveryBoyHandler
                  }
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
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
