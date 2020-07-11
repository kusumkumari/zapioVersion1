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
  FormGroup,
  Alert,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";
import { addSurveyItem } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import { listActiveCategoriesAPI, addSubcategoryAPI } from "../ApiIntegration";

class AddSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: "",
      shareholders: [{ name: "" }],
      data: [],
      dataLength: null,
      isEdit: false,
      category: '',
      errDuplicate: "",
      successMsg: "",
      errCatgory: "",
      errSubCat: ""
    };
  }

  addSubcategoryHandler = () => {
    let subcategoryArray = []
    for (let i = 0; i < this.state.shareholders.length; i++) {
      subcategoryArray.push(this.state.shareholders[i]['name'])
    }
    const { selectedOptions } = this.state;
    addSubcategoryAPI({ category: selectedOptions.toString(), subcategory_name: subcategoryArray }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          successMsg: "Category data saved successfully",
        });
        window.location.href = "/product"
      }
      else {
        this.setState({
          errCatgory: response.data.error.category,
          errDuplicate: response.data.error.duplicate_subcat,
          errSubCat: response.data.error.subcategory_name,
        });
      }
    });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOptions: selectedOption.value });
  };

  componentDidMount() {
    listActiveCategoriesAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          categorydata: apiResponse.response.data.data,
          categoryLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  componentDidUpdate() {
    setTimeout(() => this.setState({ successMsg: '', errUniCheck: '' }), 30000);
  }

  render() {
    const { modalOpen, toggleModal } = this.props;
    const { categorydata, categoryLength, errDuplicate, errSubCat, successMsg } = this.state;
    const selectData = [{ label: "Select SubCategory", value: "", id: "subCat" }];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      selectData.push({ label: category_name, value: id, key: id })
    }
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="product.add-new-sub-category" />
        </ModalHeader>
        <ModalBody>
          {successMsg ?
            <Alert color="success" className="rounded">
              {successMsg}
            </Alert>
            : ""
          }
          {errDuplicate ?
            <Alert color="danger" className="rounded">
              {errDuplicate}
            </Alert>
            : ""
          }
          {errSubCat ?
            <Alert color="danger" className="rounded">
              {errSubCat}
            </Alert>
            : ""
          }

          <Label className="mt-4">
            <IntlMessages id="product.category" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="category"
            onChange={this.handleChange}
            options={selectData}
          />
          {this.state.errCatgory ?
            <div className="invalid-feedback d-block">
              {this.state.errCatgory}
            </div>
            : ""}

          <Label className="mt-4">
            <IntlMessages id="category.title" /> &nbsp; &nbsp;&nbsp;
              <Button color="primary" style={{ borderRadius: "500px" }} className="Plus-Button text-primary" size="xs" onClick={this.handleAddShareholder}>
              <IntlMessages id="product.plus" />
            </Button>
          </Label>

          {this.state.shareholders.map((shareholder, idx) => (
            <FormGroup row key={idx}>
              <Colxx sm="10">
                <Input
                  value={shareholder.name}
                  onChange={this.handleShareholderNameChange(idx)}
                />
                {this.state.errSubName ?
                  <div className="invalid-feedback d-block">
                    {this.state.errSubName}
                  </div>
                  : ""}

              </Colxx>
              <Colxx sm="2" style={{alignSelf: "center"}}>
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
          <Button color="primary" onClick={this.addSubcategoryHandler} >
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
)(AddSubCategory);
