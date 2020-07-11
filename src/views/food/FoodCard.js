/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import FoodAdd from "./FoodAdd";
import FoodList from "./FoodList";
import { addFoodAPI, listFoodTypeAPI, editFoodAPI, changeFoodTypeStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import IntlMessages from "../../helpers/IntlMessages";
import "../../assets/css/custom.css"
import FoodEdit from "./FoodEdit";

class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      file: null,
      priceVisibilty: "",
      variantsVisibilty: "none",
      foodname: "",
      fileData: "",
      data: [],
      isEdit: false,
      dataLength: null,
      isFormOpen:false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  listFoodType = () => {
    listFoodTypeAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data,
          dataLength: apiResponse.response.data.length,
        });

      }
    });
  }
  componentDidMount() {
    this.listFoodType();
    // this.timer = setInterval(() => this.listFoodType(), 1000);
  }
//   componentWillUnmount() {
//     clearInterval(this.timer);
//     this.timer = null;
// }
  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0],
    });
  }
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  retrieveFoodHandler = (id) => {
    this.setState({ isEdit: true, isFormOpen:false })
    editFoodAPI(id, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          foodname: response.data.data[0].food_type,
          file: response.data.data[0].foodtype_image,
          id: response.data.data[0].id
        })
      }
    });
  };


  AddFoodDetail = () => {
    const { foodname, fileData } = this.state;
    let id = "add"
    addFoodAPI(id, foodname, fileData, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Food success");
        this.setState({foodname:"",file:"",fileData:"", isFormOpen:false})
        this.listFoodType();
      }
      else {
        console.log(response.data.errors)
        if (response.data.error.food_type) {
          Notification(0, response.data.error.food_type, "Food Type Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "Food Unique Error")
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, "Food Type Image Error")
        }
        if (response.data.errors) {
          Notification(0, response.data.errors, "Error")
        }

      }

    });
  };

  EditFoodDetail = (id) => {
    const { foodname, fileData } = this.state;
    addFoodAPI(id, foodname, fileData, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Food success");
        this.setState({foodname:"",file:"",fileData:"",isEdit:false})
        this.listFoodType();
      }
      else {
        if (response.data.error.food_type) {
          Notification(0, response.data.error.food_type, "Food Type Error")
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, "Food Unique Error")
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, "Food Type Image Error")
        }
        if (response.data.errors) {
          Notification(0, response.data.errors, "Error")
        }
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeFoodTypeStatusAPI(id, status, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Food Type status changed")
        this.listFoodType();
      }
      else {
        Notification(0, "Something went wrong", "Food status changed Error")
      }
    })
  }
  cancel=()=>{
    this.setState({isFormOpen:false, isEdit:false, foodname:"",file:"",fileData:"" })
  }
  openForm=()=>{
    this.setState({isFormOpen:true, isEdit:false, foodname:"",file:"",fileData:""})
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <i className="iconsminds-cookies text-primary" style={{fontSize:"x-large"}} />
            <Breadcrumb heading="food.food-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
        <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
          {this.state.isEdit ?
                  <FoodEdit {...this.state} handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    editCategoryHandler={this.editCategoryHandler}
                    EditFoodDetail={this.EditFoodDetail}
                    cancel={this.cancel}
                  />
                  :""}
                  {this.state.isFormOpen ?
                  <FoodAdd {...this.state} handleChange={this.handleChange}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    AddFoodDetail={this.AddFoodDetail}
                    cancel={this.cancel}
                  />
                  :""
                }
          </Colxx>
        </Row>
        </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-5">
            <FoodList {...this.state}
              listFoodTypeAPI={this.listFoodTypeAPI}
              retrieveFoodHandler={this.retrieveFoodHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FoodCard);