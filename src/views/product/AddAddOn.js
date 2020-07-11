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
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { addSurveyItem } from "../../redux/actions";
import { listActiveAddonGroupAPI, addAddonAPI } from "../ApiIntegration";

class AddAddOn extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      addon: "",
      shareholders: [{ name: "", price: "" }],
      isEdit: false,
      id: null,
      associated_addons: '',
      data: [],
      dataLength: null,
      errAdon: "",
      errUniCheck: "",
      errAddon: "",
      errPrice: "",
    };
  }
  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ price: "", name: "" }]),
    });
  };
  handleChange = e => {
    this.setState({ addon: e.value });
  };
  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };
  handlePriceNameChange = idx => evt => {
    const newPrice = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, price: evt.target.value };
    });
    this.setState({ shareholders: newPrice });
  };
  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };
  componentDidMount() {
    listActiveAddonGroupAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          addondata: apiResponse.response.data,
          addonLength: apiResponse.response.data.length,
        });
      }
    });

  }
  addAddonHandler = () => {
    const { shareholders, id, addon } = this.state;
    let addonArray = []
    for (let i = 0; i < shareholders.length; i++) {
      addonArray.push({ 'addon_name': shareholders[i].name, 'price': shareholders[i].price })
    }
    addAddonAPI(addon, addonArray, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          successMsg: "Addon data saved successfully",
        });
        window.location.href = "/product"
      }
      else {
        this.setState({
          errAdon: response.data.error.id,
          errCatCode: response.data.error.category_code,
          errUniCheck: response.data.error.unique_check,
          errAddon: response.data.error.addon_name,
          errPrice: response.data.error.price,
        });
      }
    });
  };

  render() {
    const { modalOpen, toggleModal } = this.props;
    const { addondata, addonLength, successMsg, errUniCheck, errAddon, errPrice } = this.state;
    const selectData = [
    ];
    for (let index = 0; index < addonLength; index++) {
      const { id, addon_gr_name } = addondata[index];
      selectData.push({ label: addon_gr_name, value: id, key: id })
    }
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="product.add-new-addon" />
        </ModalHeader>
        <ModalBody>
          {successMsg ?
            <Alert color="success" className="rounded">
              {successMsg}
            </Alert>
            : ""
          }
          {errUniCheck ?
            <Alert color="danger" className="rounded">
              {errUniCheck}
            </Alert>
            : ""
          }
          {errPrice ?
                     <Alert color="danger" className="rounded">
              {errPrice}
            </Alert>
            : ""
          }
          {errAddon ?
                     <Alert color="danger" className="rounded">
              {errAddon}
 
            </Alert>
            : ""
          }

          <Label className="mt-4">
            <IntlMessages id="addongroup.category" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="addon"
            onChange={this.handleChange}
            options={selectData} />
          {this.state.errAdon ?
            <div className="invalid-feedback d-block">
              {this.state.errAdon}
            </div>
            : ""}

          <Label className="mt-4">
            <IntlMessages id="product.Addon" />
            <Button color="primary" size="xs" style={{ borderRadius: "500px", marginLeft: "10px" }} className="Plus-Button text-primary" onClick={this.handleAddShareholder}>
              &nbsp;<IntlMessages id="product.plus" />
            </Button>
          </Label>
          {this.state.shareholders.map((shareholder, idx) => (
            <FormGroup row key={idx}>
              <Colxx sm="5">
                <Input
                  value={shareholder.name}
                  placeholder="Name"
                  onChange={this.handleShareholderNameChange(idx)}
                />
              </Colxx>
              <Colxx sm="5">
                <Input type="number"
                  value={shareholder.price}
                  placeholder="Price"
                  onChange={this.handlePriceNameChange(idx)}
                />
              </Colxx>
              <Colxx sm="2" style={{ alignSelf: "center" }}>
                <Button color="primary" size="xs" style={{ borderRadius: "500px" }} className="Plus-Button text-primary" onClick={this.handleRemoveShareholder(idx)}>
                  <IntlMessages id="product.sub" />
                </Button>
              </Colxx>
            </FormGroup>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="product.cancel" />
          </Button>
          <Button color="primary" onClick={this.addAddonHandler}>
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
)(AddAddOn);
