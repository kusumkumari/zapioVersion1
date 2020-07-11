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
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import { addSurveyItem } from "../../redux/actions";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { Notification } from '../Utils/Notification'

import { listActiveFoodTypeAPI, addTagsAPI } from "../ApiIntegration";

 class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      foodTypeArray: [],
      file: null,
      fileData: '',
    };
    this.onDrop = this.onDrop.bind(this)
    this.resetFile = this.resetFile.bind(this)
  }
  handleChangeFoodType = e => {
    this.setState({ foodTypeArray: e })
  }
  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    })
  }

  resetFile(event) {
    event.preventDefault()
    this.setState({ file: null, fileData: null })
  }

  componentDidMount() {
    listActiveFoodTypeAPI(apiResponse => {
      if (apiResponse.status == 'success') {
        this.setState({
          fooddata: apiResponse.response.data,
          fooddataLength: apiResponse.response.data.length
        })
      }
    })
  }
  addTagHandler = () => {
    const { id, tag, foodTypeArray, fileData } = this.state
    let foodVal = ''
    if (foodTypeArray) {
      foodVal = foodTypeArray.value
    } else {
      foodVal = ''
    }
    addTagsAPI(id, tag, foodVal, fileData, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, 'Tag Success')
        this.setState({ tag: '', foodTypeArray: [], fileData: '', file: '' })
        window.location.href = "/product"
      } else {
        const err = response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    })
  }


  render() {
    const { modalOpen, toggleModal } = this.props;
    const {fooddata, fooddataLength, } = this.state;
    const foodTypeOption = [];
    for (let index = 0; index < fooddataLength; index++) {
      const { id, food_type } = fooddata[index];
      foodTypeOption.push({ label: food_type, value: id, key: id })
    }
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="add.tag" />
        </ModalHeader>
        <ModalBody>
       
          <Label className="mt-4">
            <IntlMessages id="tag.tag" />
          </Label>
          <Input type="text" name="tag" value={this.state.tag} onChange={this.handleTextChange} />
          <Label className="mt-4">
            <IntlMessages id="product.foodType" />
          </Label>
          <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                value={this.state.foodTypeArray}
                onChange={this.handleChangeFoodType}
                options={foodTypeOption} />
          <Label className="mt-4">
            <IntlMessages id="tag.image" />
          </Label>
          <Label className="mt-4" style={{
              border: "1px solid #ccc",
              display: "inlineBlock",
              padding: "6px 12px",
              cursor: "pointer",
              marginLeft: "15px",
              marginRight: "8px",
              color: "hsl(0,0%,50%)"
            }}>
              Upload Tag Image
                    <Input type="file" onChange={this.onDrop} style={{ display: "none" }} />
            </Label>
            <Label className="mt-4">
              {this.state.file && (
                <div style={{ textAlign: "center" }}>
                  <span >
                    <img style={{ height: "63px", width: "80px",objectFit:'cover' }} src={this.state.file} />&nbsp;&nbsp;
                          <i style={{ outlineColor: "primary" }} size="" className="simple-icon-trash" onClick={this.resetFile} />
                  </span>
                </div>
              )}
           </Label>
          
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="product.cancel" />
          </Button>
          <Button color="primary" onClick={this.addTagHandler}>
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
)(AddTag);

