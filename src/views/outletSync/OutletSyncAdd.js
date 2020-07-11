/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Autorenew, Close } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";

export default class AOutletSyncAdd extends Component {
  render() {
    const { syncOutlets, outletData, outletDataLength } = this.props;
    const outletOptions = [];
    for (let index = 0; index < outletDataLength; index++) {
      const { id, outlet_name } = outletData[index];
      outletOptions.push({ label: outlet_name, value: id, key: id });
    }

    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-sync" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="outlet-sync.outlet sync" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="outlet-sync.outlets" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={this.props.outlets}
                    onChange={this.props.handleChangeOutlets}
                    options={outletOptions}
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
                <IntlMessages id="outlet-sync,initiate-syncing" />
                &nbsp;
                <Autorenew />
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
