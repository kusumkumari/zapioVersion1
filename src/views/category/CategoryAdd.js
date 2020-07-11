/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class CategoryAdd extends Component {
  render() {
    const { handleChange, addCategoryHandler, onDrop, resetFile, } = this.props;
    return (
      <Modal isOpen={this.props.isFormOpen}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i
              className="simple-icon-briefcase"
              style={{ fontSize: "xx-large" }}
            />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.category-management" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
               
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="category.title" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="name"
                      value={this.props.name}
                      onChange={handleChange}
                    />
                    <br />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="category.code" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="text"
                      name="code"
                      value={this.props.code}
                      onChange={handleChange}
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="category.priority" />
                  </Label>
                  <Colxx sm="9">
                    <Input
                      type="number"
                      name="priority"
                      value={this.props.priority}
                      onChange={handleChange}
                    />
                  </Colxx>
                </FormGroup>


                <FormGroup row>
                <Label sm="3">
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
                  Upload Category Image
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
                <Label sm="3">
                  <IntlMessages id="category.category-description" />
                </Label>
                <Colxx sm="9">
                  <Input type="textarea" name="category_desc" value={this.props.category_desc} onChange={handleChange} />
                </Colxx>
              </FormGroup>

              <Button
                  color="primary"
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }}
                  onClick={addCategoryHandler} >
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
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

    );
  }
}
