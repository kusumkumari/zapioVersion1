/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Save, Close } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";

export default class MenuSyncAdd extends Component {
  render() {
    const { syncOutlets, outletData, outletDataLength } = this.props;
    const proOptions = [];
    // for (let index = 0; index < outletDataLength; index++) {
    //   const { id, outlet_name } = outletData[index];
    //   proOptions.push({ label: outlet_name, value: id, key: id });
    // }

    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="iconsminds-shuffle-1"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="menu-sync.management" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="menu-sync.product-enable-items" />
              </CardTitle>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="menu-sync.products" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.outlets}
                    onChange={this.props.handleChangeOutlets}
                    options={proOptions}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="2">
                  <IntlMessages id="menu-sync.select-all" />
                </Label>
                <Colxx sm="4">
                  <CustomInput
                    type="checkbox"
                    id="isAutomated"
                    value={this.props.isAutomated}
                    checked={this.props.isAutomated}
                    // onClick={this.props.handleAutomated}
                  />
                </Colxx>
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                color="primary"
                onClick={syncOutlets}
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
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
