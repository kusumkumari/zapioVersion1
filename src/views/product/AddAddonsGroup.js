/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Alert
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";
import { addSurveyItem } from "../../redux/actions";
import { listActiveVariantAPI, addAddonGroupAPI } from "../ApiIntegration";

class AddAddOnsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: "",
      addgroup: "",
      maxaddon: "",
      minaddon: "",
      errAddonGroup: "",
      errMin: "",
      errMax: "",
      errUniquecheck: "",
      errMinMax: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange1 = e => {
    this.setState({ variant: e.value });
  };
  componentDidMount() {
    listActiveVariantAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          variantData: apiResponse.response.data.data,
          variantDataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  addGroupHandler = () => {
    const { variant, addgroup, minaddon, maxaddon } = this.state;
    addAddonGroupAPI({ product_variant: variant, addon_gr_name: addgroup, max_addons: maxaddon, min_addons: minaddon }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          successMsg: "Addon Group data saved successfully",
        });
        window.location.href = "/product"
      }
      else {
        this.setState({
          errAddonGroup: response.data.error.addon_gr_name,
          errMin: response.data.error.min_addons,
          errMax: response.data.error.max_addons,
          errUniquecheck: response.data.error.unique_check,
          errMinMax: response.data.error.min_max,
        });
      }
    });
  };

  render() {
    const { modalOpen, toggleModal } = this.props;
    const { variantData, variantDataLength, successMsg, errUniquecheck, errMinMax } = this.state;
    const variantOptions = []
    for (let index = 0; index < variantDataLength; index++) {
      const { id, variant } = variantData[index];
      variantOptions.push({ label: variant, value: id, key: id })
    }
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="product.add-new-addons-group" />
        </ModalHeader>
        <ModalBody>
          {successMsg ?
            <Alert color="success" className="rounded">
              {successMsg}
            </Alert>
            : ""
          }
          {errUniquecheck ?
            <Alert color="danger" className="rounded">
              {errUniquecheck}
            </Alert>
            : ""
          }
          {errMinMax ?
            <Alert color="danger" className="rounded">
              {errMinMax}
            </Alert>
            : ""
          }
          <Label className="mt-4">
            <IntlMessages id="variant.category" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            onChange={this.handleChange1}
            options={variantOptions} />
          <Label className="mt-4">
            <IntlMessages id="addongroup.name" />
          </Label>
          <Input type="text" name="addgroup" onChange={e => this.handleChange(e)} />
          {this.state.errAddonGroup ?
            <div className="invalid-feedback d-block">
              {this.state.errAddonGroup}
            </div>
            : ""}
          <Label className="mt-4">
            <IntlMessages id="addongroup.min" />
          </Label>
          <Input type="text" name="minaddon" onChange={e => this.handleChange(e)} />
          {this.state.errMin ?
            <div className="invalid-feedback d-block">
              {this.state.errMin}
            </div>
            : ""}

          <Label className="mt-4">
            <IntlMessages id="addongroup.max" />
          </Label>
          <Input type="text" name="maxaddon" onChange={e => this.handleChange(e)} />
          {this.state.errMax ?
            <div className="invalid-feedback d-block">
              {this.state.errMax}
            </div>
            : ""}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="product.cancel" />
          </Button>
          <Button color="primary" onClick={this.addGroupHandler}>
            <IntlMessages id="product.save" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ surveyListApp }) => {
  return {
    surveyListApp
  };
};
export default connect(
  mapStateToProps,
  {
    addSurveyItem
  }
)(AddAddOnsGroup);
