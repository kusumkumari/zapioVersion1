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
import { Save, Close } from "@material-ui/icons";

export default class SubcategoryAdd extends Component {
  render() {
    const {
      categorydata,
      categoryLength,
      handleShareholderNameChange,
      handleChange,
      handleRemoveShareholder,
      handleAddShareholder,
      handleShareholderImageChange,
      addSubcategoryHandler,
      handleShareholderDescChange
    } = this.props;
    const selectData = [{ label: "Select Category", value: "", key: "cat1" }];
    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      selectData.push({ label: category_name, value: id, key: id });
    }
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-screen-desktop"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.subcategory-management" />
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
                    name="category"
                    value={this.props.selectedOptions}
                    onChange={handleChange}
                    options={selectData}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label sm="4">
                  <IntlMessages id="subcategory.title" />
                </Label>
                <Colxx sm="8">
                  <Button
                    color="primary"
                    size="xs"
                    style={{ borderRadius: "500px" }}
                    className="Plus-Button text-primary"
                    onClick={handleAddShareholder} >
                    <IntlMessages id="product.plus" />
                  </Button>
                </Colxx>
              </FormGroup>
              
              {this.props.shareholders.map((shareholder, idx) => (
                <>
                  <FormGroup row key={idx}>
                    <Colxx sm="3">
                      <Input
                        placeholder="Sub Category Name"
                        value={shareholder.name}
                        onChange={handleShareholderNameChange(idx)}
                      />
                    </Colxx>
                    
                   
                    <Label
                      sm="3"
                      style={{
                        border: "1px solid #ccc",
                        display: "inlineBlock",
                        padding: "6px 12px",
                        cursor: "pointer",
                        color: "hsl(0,0%,50%)",
                        height: "44px",
                        marginTop: "5px",
                      }}
                    >
                      Upload Sub Category Image
                    <Input
                        type="file"
                        onChange={handleShareholderImageChange(idx)}
                        style={{ display: "none" }}
                      />
                    </Label>
                    {shareholder.displayImage && (
                    <Colxx sm="2">
                  
                        <div style={{ textAlign: "center" }}>
                          <span style={{ display: "flex", alignItems: "center" }}>
                            <img
                              style={{ height: "49px", width: "145px" }}
                              src={shareholder.displayImage}
                            />
                          </span>
                        </div>
                     
                    </Colxx>
                       )}
                    <Colxx sm="3">
                      <Input type="textarea" rows="1" 
                      placeholder="Sub Category Description"
                          value={shareholder.subcategory_desc}
                          onChange={handleShareholderDescChange(idx)}
                          />
                    </Colxx>
                    <Colxx sm="1" style={{ alignSelf: "center" }}>
                      <Button
                        color="primary"
                        size="xs"
                        style={{ borderRadius: "500px" }}
                        className="Plus-Button text-primary"
                        onClick={handleRemoveShareholder(idx)}
                      >
                        <IntlMessages id="product.sub" />
                      </Button>
                    </Colxx>
                 
                  
                 </FormGroup>
             
                </>
              ))}

              <Button
                color="primary"
                color="primary"
                className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                style={{ borderRadius: 5 }}
                onClick={addSubcategoryHandler}
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
