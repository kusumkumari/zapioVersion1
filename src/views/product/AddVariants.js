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
import IntlMessages from "../../helpers/IntlMessages";
import { addSurveyItem } from "../../redux/actions";
import { addVariantAPI } from "../ApiIntegration";

class AddVaraints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      successMsg: "",
      errVar: "",
      errUniCheck: ""
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidUpdate() {
    setTimeout(() => this.setState({ successMsg: '', errUniCheck: '', errVar: '' }), 30000);
  }

  addVariantHandler = () => {
    const { name } = this.state;
    addVariantAPI({ variant: name }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          successMsg: "Variant data saved successfully",
        });
        window.location.href = "/product"
      }
      else {
        this.setState({
          errVar: response.data.error.variant,
          errUniCheck: response.data.error.unique_check
        });
      }

    });
  };
  render() {
    const { errUniCheck, successMsg } = this.state;
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="product.add-new-variants" />
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
          <Label className="mt-4">
            <IntlMessages id="Variant.name" />
          </Label>
          <Input type="text" name="name" onChange={e => this.handleChange(e)} />
          {this.state.errVar ?
            <div className="invalid-feedback d-block">
              {this.state.errVar}
            </div>
            : ""}
          {/* <Label className="mt-4">
            <IntlMessages id="Variant.description" />
          </Label>
          <Input type="text" name="description"  onChange={e => handleChange(e)}  /> */}

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="product.cancel" />
          </Button>
          <Button color="primary" onClick={this.addVariantHandler} >
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
)(AddVaraints);
