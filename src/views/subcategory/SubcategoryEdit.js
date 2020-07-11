/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
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
import { Close, Edit } from "@material-ui/icons";

export default class SubcategoryEdit extends Component {
  render() {
    const {
      categorydata,
      namehandleChange,
      name,
      EdithandleChange,
      subcategoryname,
      categoryLength,
      editSubcategoryHandler,
      onDrop, resetFile,
    } = this.props;
    const selectData = [{ label: "Select Category", value: "", key: "cat2" }];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      selectData.push({ label: category_name, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isEdit}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-screen-desktop"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="edit.category-management" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="product.category" />
                </Label>
                <Colxx sm="8">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={this.props.categoryArray}
                    onChange={EdithandleChange}
                    options={selectData}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="category.title" />
                </Label>
                <Colxx sm="8">
                  <Input
                    type="text"
                    name="subcategoryname"
                    value={subcategoryname}
                    onChange={namehandleChange}
                  />
                </Colxx>
              </FormGroup>

              
            

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="category.image" />
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
                  Upload Subcategory Image
                  <Input
                    type="file"
                    onChange={onDrop}
                    style={{ display: "none" }}
                  />
                </Label>
                <Colxx sm="3">
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
                          onClick={resetFile}
                        />
                      </span>
                    </div>
                  )}
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="category.category-description" />
                </Label>
                <Colxx sm="8">
                  <Input type="textarea" name="category_desc" value={this.props.description} onChange={this.props.handleChangeText} />
                </Colxx>
              </FormGroup>





              <Button
                variant="contained"
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={editSubcategoryHandler}
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
                <Close /> <IntlMessages id="product.cancel" />
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}
