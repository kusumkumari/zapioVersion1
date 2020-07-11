/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";
import CategoryList from "./CategoryList";
import { changeCategoryTypeStatusAPI, addCategoryAPI, editCategoryAPI, companyId1, listCategoriesAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      priority: "",
      isEdit: false,
      id: "",
      data: [],
      dataLength: null,
      isFormOpen: false,
      status: true,
      file: null,
      fileData: "",
      category_desc:""
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    });
  }
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }

  addCategoryHandler = () => {
    const { name, code, priority,fileData,category_desc } = this.state;
    let id = "add"
    addCategoryAPI(id,name,code,priority,fileData,category_desc,companyId1, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Category Success")
        this.setState({ name: "", code: "", priority: "",fileData:"",file:"",category_desc, isFormOpen: false })
        this.listCategories(this.state.status);
      }
      else {
        if (response.data.error.category_name) {
          Notification(0, response.data.error.category_name, "Category Name Error")
        }
        if (response.data.error.category_code) {
          Notification(0, response.data.error.category_code, "Category Code Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "Category Duplication Error")
        }
        if (response.data.error.priority_check) {
          Notification(0, response.data.error.priority_check, "Priority Error")
        }
        if (response.data.error.priority) {
          Notification(0, response.data.error.priority, "Priority Error")
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, "Category Type Image Error")
        }
        if (response.data.error.unique_code_check) {
          Notification(0, response.data.error.unique_code_check, "Code Duplication Error")
        }
      }
    });
  };




  editCategoryHandler = (id) => {
    const { name, code, priority,fileData,category_desc } = this.state;
    addCategoryAPI(id,name,code,priority,fileData,category_desc,companyId1, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Category Success")
        this.setState({ name: "", code: "", priority: "",fileData:"",file:"",category_desc, isFormOpen: false })
        this.listCategories(this.state.status);
      }
      else {
        if (response.data.error.category_name) {
          Notification(0, response.data.error.category_name, "Category Name Error")
        }
        if (response.data.error.category_code) {
          Notification(0, response.data.error.category_code, "Category Code Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "Category Duplication Error")
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, "Category Type Image Error")
        }
        if (response.data.error.priority_check) {
          Notification(0, response.data.error.priority_check, "Priority Error")
        }
        if (response.data.error.priority) {
          Notification(0, response.data.error.priority, "Priority Error")
        }
        if (response.data.error.unique_code_check) {
          Notification(0, response.data.error.unique_code_check, "Code Duplication Error")
        }
      }
    });
  };





















  retrieveCategoryHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen: false })
    editCategoryAPI(id.toString(), ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          name: response.data.data[0].category_name,
          code: response.data.data[0].category_code,
          priority: response.data.data[0].priority,
          category_desc: response.data.data[0].description,
          id: response.data.data[0].id,
          file: response.data.data[0].category_image,

        })
      }

    });
  };

  listCategories = (status) => {
    listCategoriesAPI(status, (apiResponse) => {
      console.log("list", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    this.listCategories(this.state.status);
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeCategoryTypeStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Category Type status changed")
        this.listCategories(this.state.status);
      }
      else {
        Notification(0, "Something went wrong", "Category status changed Error")
      }
    })
  }

  handleChangelistStatus = () => {
    this.setState({ status: !this.state.status })
    this.listCategories(!this.state.status);

  }
  cancel = () => {
    this.setState({ isFormOpen: false, isEdit: false, name: "", code: "", priority: "", outletValues: "" })
  }
  openForm = () => {
    this.setState({ isFormOpen: true, isEdit: false, name: "", code: "", priority: "", outletValues: "" })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="simple-icon-briefcase text-primary" style={{ fontSize: "x-large" }} />&nbsp;
             <Breadcrumb heading="menu.category-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <CategoryEdit {...this.state} handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    editCategoryHandler={this.editCategoryHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                  />
                  : ""}
                {this.state.isFormOpen ?
                  <CategoryAdd {...this.state} handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    cancel={this.cancel}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    addCategoryHandler={this.addCategoryHandler} />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <CategoryList {...this.state}
              retrieveCategoryHandler={this.retrieveCategoryHandler}
              editCategoryHandler={this.editCategoryHandler}
              listoutletAPI={this.listoutletAPI}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              handleChangelistStatus={this.handleChangelistStatus}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Category);