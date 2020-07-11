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
  Alert,
  FormGroup
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { listActiveOutletAPI, addCategoryAPI, companyId1 } from "../ApiIntegration";
import { addSurveyItem } from "../../redux/actions";
import Select from "react-select";
import { Colxx } from "../../components/common/CustomBootstrap";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      label: {},
      labelColor: "",
      category: {},
      name: "",
      code: "",
      priority: "",
      errUniCheck: "",
      successMsg: "",
      errCatName: "",
      errCatCode: "",
      priority_check: "",
      priorityErr: "",
      unique_code_check: "",

    };
  }


  addCategoryHandler = () => {
    const { name, code, priority } = this.state;
   
    addCategoryAPI({
      company_auth_id: companyId1, category_name: name,
      category_code: code, priority: priority
    }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          successMsg: "Category data saved successfully",
        });
        window.location.href = "/product"
      }
      else {
        this.setState({
          errCatName: response.data.error.category_name,
          errCatCode: response.data.error.category_code,
          errUniCheck: response.data.error.unique_check,
          priority_check: response.data.error.priority_check,
          priorityErr: response.data.error.priority,
          unique_code_check: response.data.error.unique_code_check,
        });
      }
    });
  };


  componentDidUpdate() {
    setTimeout(() => this.setState({ successMsg: '' }), 30000);
  }

  handleChange1 = selectedOption => {
    this.setState({ outletValues: selectedOption })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  componentDidMount() {
    listActiveOutletAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data,
          dataLength: apiResponse.response.data.length,
        });
      }
    });
  }



  render() {
    const { errUniCheck, priority_check, successMsg } = this.state;

    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="product.add-new-category" />
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
          {priority_check ?
            <Alert color="danger" className="rounded">
              {priority_check}
            </Alert>
            : ""
          }
          {this.state.unique_code_check ?
            <Alert color="danger" className="rounded">
              {this.state.unique_code_check}
            </Alert>
            : ""
          }

          <Label className="mt-4">
            <IntlMessages id="category.title" />
          </Label>
          <div>
            <Input
              type="text"
              name="name"
              onChange={e => this.handleChange(e)}
            />
            {this.state.errCatName ?
              <div className="invalid-feedback d-block">
                {this.state.errCatName}
              </div>
              : ""}
            {this.state.errUniCheck ?
              <div className="invalid-feedback d-block">
                {this.state.errUniCheck}
              </div>
              : ""}
          </div>

          <Label className="mt-4">
            <IntlMessages id="category.code" />
          </Label>
          <div>
            <Input
              type="text"
              name="code"
              onChange={e => this.handleChange(e)}
            />
            {this.state.errCatCode ?
              <div className="invalid-feedback d-block">
                {this.state.errCatCode}
              </div>
              : ""}
          </div>



          <Label className="mt-4">
            <IntlMessages id="category.priority" />
          </Label>
          <div>
            <Input
              type="text"
              name="priority"
              onChange={e => this.handleChange(e)}
            />
            {this.state.priorityErr ?
              <div className="invalid-feedback d-block">
                {this.state.priorityErr}
              </div>
              : ""}

          </div>






          <Label className="mt-4">
                  <IntlMessages id="category.priority" />
                </Label>
                <Label sm="4" style={{
                  border: "1px solid #ccc",
                  display: "inlineBlock",
                  padding: "6px 12px",
                  cursor: "pointer",
                  marginLeft: "15px",
                  color: "hsl(0,0%,50%)"
                }}>
                  Upload Product Image
                    <Input type="file" onChange={this.props.onDrop} style={{ display: "none" }} />
                </Label>
                <Colxx sm="3">
                  {this.props.file && (
                    <div style={{ textAlign: "center" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img style={{ height: "63px", width: "180px" }} src={this.props.file} />&nbsp;&nbsp;
                          <i style={{ outlineColor: "primary" }} size="" className="simple-icon-trash" onClick={this.props.resetFile} />
                      </span>
                    </div>
                  )}
                </Colxx>





















        </ModalBody>

        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="product.cancel" />
          </Button>

          <Button color="primary" onClick={this.addCategoryHandler} >
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
)(AddCategory);
