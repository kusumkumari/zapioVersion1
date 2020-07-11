/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import SubcategoryAdd from "./SubcategoryAdd";
import SubcategoryEdit from "./SubcategoryEdit";
import SubcategoryList from "./SubcategoryList";
import { listActiveCategoriesAPI, listSubcategoryAPI, addSubcategoryAPI, updateSubcategoryAPI, changeSubcategoryStatusAPI, editSubCategoryAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class SubcategoryCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptions: [],
      shareholders: [{ name: "", image: null, displayImage: null,subcategory_desc:"" }],
      data: [],
      dataLength: null,
      isEdit: false,
      category: '',
      categoryArray: [],
      subcategoryname: "",
      isFormOpen: false,
      file: null,
      fileData: "",
      description:""

    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  handleChange = selectedOption => {
    this.setState({ selectedOptions: selectedOption });
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
  namehandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  EdithandleChange = selectedOption => {
    this.setState({ categoryArray: selectedOption });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "",subcategory_desc:"", image: null }])
    });
  };

  addSubcategoryHandler = () => {
    const { selectedOptions, shareholders } = this.state;
    let subcategoryArray = []
    for (let i = 0; i < shareholders.length; i++) {
      subcategoryArray.push(shareholders[i]['name'])
    }
    let catId = ""
    if (selectedOptions == "") {
      catId = ""
    }
    else {
      catId = selectedOptions.value.toString()
    }
    addSubcategoryAPI(catId, shareholders, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Subcategory Success");
        this.setState({ selectedOptions: "", shareholders: [{ name: "",subcategory_desc:"", image: null, displayImage: null }], isFormOpen: false })
        this.listSubcategory();
      }
      else {
        if (response.data.error.category) {
          Notification(0, response.data.error.category, "Subcategory Name Error")
        }
        if (response.data.error.subcategory_name) {
          Notification(0, response.data.error.subcategory_name, "Subcategory Name Error")
        }
        if (response.data.error.duplicate_subcat) {
          Notification(0, response.data.error.duplicate_subcat, "Subcategory Duplication Error")
        }
      }
    });
  };

  retrieveSubcategoryHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen: false })
    editSubCategoryAPI(id.toString(), ({ response }) => {
      if (response.data.success == true) {
        let CatArray = [{ label: response.data.data[0].category_name, value: response.data.data[0].cat_id }]
        this.setState({
          name: response.data.data[0].category_name,
          cat_id: response.data.data[0].cat_id,
          subcategoryname: response.data.data[0].subcategory_name,
          id: response.data.data[0].id,
          file: response.data.data[0].subcategory_image,
          description: response.data.data[0].description,

          categoryArray: CatArray,
        })
      }
    });
  };
  listSubcategory = () => {
    listSubcategoryAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    })
  }

  componentDidMount() {
    listActiveCategoriesAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          categorydata: apiResponse.response.data.data,
          categoryLength: apiResponse.response.data.data.length,
        });
      }
    });
    this.listSubcategory();
  }

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };


  
  handleShareholderDescChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, subcategory_desc: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };

  

  handleShareholderImageChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, image: evt.target.files[0], displayImage: URL.createObjectURL(evt.target.files[0]), };
    });
    this.setState({ shareholders: newShareholders, });
  };


  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  editSubcategoryHandler = () => {
    const { subcategoryname, id, categoryArray,description,fileData } = this.state;
    let catId = ""
    if (categoryArray[0]) {
      catId = categoryArray[0].value
    }
    else {
      catId = categoryArray.value
    }
     
    updateSubcategoryAPI(id.toString(),catId.toString(),subcategoryname,description,fileData, ({ response }) => {
   
      if (response.data.success == true) {
        Notification(1, response.data.message, "Subcategory Success");
        this.setState({ subcategoryname: "", categoryArray: "", isEdit: false })

        this.listSubcategory();
      }
      else {
        if (response.data.error.category) {
          Notification(0, response.data.error.category, "Subcategory Name Error")
        }
        if (response.data.error.subcategory_name) {
          Notification(0, response.data.error.subcategory_name, "Subcategory Name Error")
        }
        if (response.data.error.duplicate_subcat) {
          Notification(0, response.data.error.duplicate_subcat, "Subcategory Duplication Error")
        }
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeSubcategoryStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "SubCategory status changed")
        this.listSubcategory();
      }
      else {
        Notification(0, "Something went wrong", "SubCategory status changed Error")
      }
    })
  }
  cancel = () => {
    this.setState({ isFormOpen: false, isEdit: false, subcategoryname: [{ name: "" }], categoryArray: "" })
  }
  openForm = () => {
    this.setState({ isFormOpen: true, isEdit: false, subcategoryname: [{ name: "" }], categoryArray: "" })
  }
  render() {
    console.log("tttttttttttttttttttt", this.state.shareholders)
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="simple-icon-screen-desktop text-primary" style={{ fontSize: "x-large" }} />&nbsp;
            <Breadcrumb heading="menu.subcategory-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <SubcategoryEdit {...this.state}
                    handleChange1={this.handleChange1}
                    addCategoryHandler={this.addCategoryHandler}
                    handleShareholderNameChange={this.handleShareholderNameChange}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    handleAddShareholder={this.handleAddShareholder}
                    editSubcategoryHandler={this.editSubcategoryHandler}
                    EdithandleChange={this.EdithandleChange}
                    namehandleChange={this.namehandleChange}
                    cancel={this.cancel}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}

                  />
                  : ""}
                {this.state.isFormOpen ?
                  <SubcategoryAdd {...this.state}
                    handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    addCategoryHandler={this.addCategoryHandler}
                    handleShareholderNameChange={this.handleShareholderNameChange}
                    handleRemoveShareholder={this.handleRemoveShareholder}
                    handleAddShareholder={this.handleAddShareholder}
                    handleShareholderImageChange={this.handleShareholderImageChange}
                    handleShareholderDescChange={this.handleShareholderDescChange}
                    addSubcategoryHandler={this.addSubcategoryHandler}
                    cancel={this.cancel}
                  />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>
          {/* <Colxx lg="12" xl="6" className="mb-4">
            <SubcategoryList {...this.state}
              handleChange={this.handleChange}
              retrieveSubcategoryHandler={this.retrieveSubcategoryHandler}
              editSubcategoryHandler={this.editSubcategoryHandler}
              listSubcategoryAPI={this.listSubcategoryAPI}
              title="dashboards.top-viewed-posts" />
          </Colxx> */}
        </Row>
        <Row>
          <Colxx xxs="12">
            <SubcategoryList {...this.state}
              handleChange={this.handleChange}
              handleChangeStatus={this.handleChangeStatus}
              retrieveSubcategoryHandler={this.retrieveSubcategoryHandler}
              editSubcategoryHandler={this.editSubcategoryHandler}
              listSubcategoryAPI={this.listSubcategoryAPI}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(SubcategoryCard);