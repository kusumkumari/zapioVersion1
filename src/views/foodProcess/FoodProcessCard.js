/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import FoodProcessAdd from "./FoodProcessAdd";
import FoodProcessBetween from "./FoodProcessBetween";
import FoodProcessEdit from "./FoodProcessEdit";
import FoodProcessList from "./FoodProcessList";
import "../../assets/css/custom.css";
import { Notification } from "../Utils/Notification";
import {
  listActiveIngredientsAPI,
  listActiveStatusProductAPI,
  listActiveVariantAPI,
  addFoodProcessAPI,
  listFoodProcessAPI,
  getFoodProcessAPI,
  retriveFoodProcessAPI,
  changeFoodProcessStatusAPI,
  removeStepAPI,
  getWithoutProcessAPI,
  betweenFoodProcessAPI
} from "../ApiIntegration";
import AddSteps from "./AddSteps";

class FoodProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientList: [{ ingredients: "", unit: "", quantity: "" }],
      file: null,
      fileData: "",
      productArray: [],
      variantArray: [],
      stepNo: "",
      stepName: "",
      stepTime: "",
      stepDiscrp: "",
      afterStep: "",
      data: [],
      dataLength: null,
      modal: false,
      isEdit: false,
      processModal: false,
      detailing_data: [],
      id: "",
      isFormOpen: "",
      productdata: [],
      productdataLength: "",
      showStepsModal: false,
      ProcessDetailing_data: [],
      isBetweenFormOpen: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }

  listProduct = () => {
    listActiveStatusProductAPI(apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          productdata: apiResponse.response.data.data,
          productdataLength: apiResponse.response.data.data.length
        });
      }
    });
  };

  componentDidMount() {
    this.listProduct();
    this.listFoodProcess();

    listActiveVariantAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          variantdata: apiResponse.response.data.data,
          variantdataLength: apiResponse.response.data.data.length
        });
      }
    });

    listActiveIngredientsAPI(apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          ingData: apiResponse.response.data.data,
          ingDataLength: apiResponse.response.data.data.length
        });
      }
    });
  }
  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    });
  }
  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null, fileData: null });
  }

  handleChangeProduct = e => {
    this.setState({ productArray: e });
  };
  handleChangeVariant = e => {
    this.setState({ variantArray: e });
  };
  handleChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleIngredientNameChange = idx => evt => {
    const newingred = this.state.ingredientList.map((ingredientList, sidx) => {
      return idx !== sidx
        ? ingredientList
        : { ...ingredientList, ingredients: evt };
    });
    this.setState({ ingredientList: newingred });
  };

  handleUnitNameChange = idx => evt => {
    const newUnit = this.state.ingredientList.map((ingredientList, sidx) => {
      if (idx !== sidx) return ingredientList;
      return { ...ingredientList, unit: evt.target.value };
    });
    this.setState({ ingredientList: newUnit });
  };
  handleQuantityNameChange = idx => evt => {
    const newUnit = this.state.ingredientList.map((ingredientList, sidx) => {
      if (idx !== sidx) return ingredientList;
      return { ...ingredientList, quantity: evt.target.value };
    });
    this.setState({ ingredientList: newUnit });
  };
  handleAddIngredients = () => {
    this.setState({
      ingredientList: this.state.ingredientList.concat([
        { ingredients: "", unit: "", quantity: "" }
      ])
    });
  };

  handleRemoveIngredients = idx => () => {
    this.setState({
      ingredientList: this.state.ingredientList.filter(
        (s, sidx) => idx !== sidx
      )
    });
  };

  listFoodProcess = () => {
    listFoodProcessAPI(apiResponse => {
      if (apiResponse.response.data.success) {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  };

  editFoodProcessHandler = () => {
    const {
      id,
      productArray,
      variantArray,
      stepNo,
      stepName,
      stepTime,
      stepDiscrp,
      ingredientList,
      fileData
    } = this.state;
    let ingArray = [];
    for (let i = 0; i < ingredientList.length; i++) {
      var ingredient = ingredientList[i].ingredients;
      ingArray.push({
        name: ingredient.label,
        id: ingredient.value,
        unit: ingredientList[i].unit,
        quantity: ingredientList[i].quantity
      });
    }
    let products = "";
    let variants = "";
    if (productArray) {
      if (productArray[0]) {
        products = productArray[0].value;
      } else {
        products = productArray.value;
      }
    } else {
      products = "";
    }
    if (variantArray) {
      if (variantArray[0]) variants = variantArray[0].value;
      else variants = variantArray.value;
    } else {
      variants = "";
    }
    if (stepTime < 1) {
      Notification(0, "Please enter a correct time value.", "Time error!");
      return;
    }
    addFoodProcessAPI(
      id,
      products,
      variants,
      stepNo,
      stepName,
      stepDiscrp,
      stepTime,
      fileData,
      ingArray,
      apiResponse => {
        if (apiResponse.response.data.success) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Creation Success"
            );
            this.setState({
              id: "",
              stepNo: "",
              ingredientList: [{ ingredients: "", unit: "" }],
              stepName: "",
              stepTime: "",
              stepDiscrp: "",
              fileData: "",
              isEdit: false
            });
            this.listFoodProcess();
          }
        } else {
          const err = apiResponse.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };
  AddFoodProcessHandler = e => {
    const {
      productArray,
      variantArray,
      stepNo,
      stepName,
      stepTime,
      stepDiscrp,
      ingredientList,
      fileData
    } = this.state;
    let ingArray = [];
    for (let i = 0; i < ingredientList.length; i++) {
      var ingredient = ingredientList[i].ingredients;
      ingArray.push({
        name: ingredient.label,
        id: ingredient.value,
        unit: ingredientList[i].unit,
        quantity: ingredientList[i].quantity
      });
    }
    let products = "";
    let variants = "";
    if (productArray) {
      products = productArray.value;
    } else {
      products = "";
    }
    if (variantArray) {
      variants = variantArray.value;
    } else {
      variants = "";
    }
    if (stepTime < 1) {
      Notification(0, "Please enter a correct time value.", "Time error!");
      return;
    }
    addFoodProcessAPI(
      "",
      products,
      variants,
      1,
      stepName,
      stepDiscrp,
      stepTime,
      fileData,
      ingArray,
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Creation Success"
            );
            this.setState({
              id: "",
              stepNo: "",
              ingredientList: [{ ingredients: "", unit: "", quantity: "" }],
              stepName: "",
              stepTime: "",
              stepDiscrp: "",
              fileData: "",
              file: ""
            });
            this.listFoodProcess();
          }
        } else {
          const err = apiResponse.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  betweenFoodProcessHandler = e => {
    const {
      productArray,
      variantArray,
      afterStep,
      stepName,
      stepTime,
      stepDiscrp,
      ingredientList,
      fileData
    } = this.state;
    let ingArray = [];
    for (let i = 0; i < ingredientList.length; i++) {
      var ingredient = ingredientList[i].ingredients;
      ingArray.push({
        name: ingredient.label,
        id: ingredient.value,
        unit: ingredientList[i].unit,
        quantity: ingredientList[i].quantity
      });
    }
    let products = "";
    let variants = "";
    if (productArray) {
      products = productArray.value;
    } else {
      products = "";
    }
    if (variantArray) {
      variants = variantArray.value;
    } else {
      variants = "";
    }
    if (stepTime < 1) {
      Notification(0, "Please enter a correct time value.", "Time error!");
      return;
    }
    betweenFoodProcessAPI(
      "",
      products,
      variants,
      afterStep,
      stepName,
      stepDiscrp,
      stepTime,
      fileData,
      ingArray,
      apiResponse => {
        console.log("between", apiResponse);

        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(
              1,
              apiResponse.response.data.message,
              "Creation Success"
            );
            this.setState({
              id: "",
              afterStep: "",
              ingredientList: [{ ingredients: "", unit: "", quantity: "" }],
              stepName: "",
              stepTime: "",
              stepDiscrp: "",
              fileData: "",
              file: "",
              isBetweenFormOpen: false
            });
            this.listFoodProcess();
          }
        } else {
          const err = apiResponse.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  addStepHandler = (stepData, callback) => {
    const {
      product,
      varient,
      step,
      process,
      description,
      time_of_process,
      image,
      ingrediate
    } = stepData;
    if (time_of_process < 1) {
      Notification(0, "Please enter a correct time value.", "Time error!");
      return;
    }
    addFoodProcessAPI(
      "",
      product,
      varient ? varient : "",
      step,
      process,
      description,
      time_of_process,
      image,
      ingrediate,
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          if (apiResponse.response.data.message) {
            Notification(1, apiResponse.response.data.message, "Success");
            this.listFoodProcess();
            this.getFoodStepsHandler({ p_id: product, v_id: varient });
            callback();
          }
        } else {
          const err = apiResponse.response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  handleChangeStatus = e => {
    let id = e.original.p_id.toString();
    let v_id = e.original.v_id.toString();
    let status = !e.original.active_status;
    changeFoodProcessStatusAPI(
      {
        p_id: id,
        v_id,
        id,
        active_status: status ? 1 : 0
      },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          Notification(1, apiResponse.response.data.message, "Status changed");
          this.listFoodProcess();
        } else {
          Notification(0, "Something went wrong", "Status changed Error");
        }
      }
    );
  };

  retreveFoodProcessHandler = id => {
    retriveFoodProcessAPI({ id }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          id: id,
          productArray: apiResponse.response.data.data[0].pro_detail,
          variantArray: apiResponse.response.data.data[0].var_detail,
          stepNo: apiResponse.response.data.data[0].step,
          stepName: apiResponse.response.data.data[0].processName,
          stepTime: apiResponse.response.data.data[0].time_of_process,
          stepDiscrp: apiResponse.response.data.data[0].description,
          ingredientList: apiResponse.response.data.data[0].ingredient_detail
            ? apiResponse.response.data.data[0].ingredient_detail
            : [{ ingredients: "", unit: "", quantity: "" }],
          file: apiResponse.response.data.data[0].image,
          isEdit: true,
          modal: false,
          processModal: false
        });
      }
    });
  };
  getFoodProcessHandler = o => {
    this.setState({ modal: true });
    const { p_id, v_id } = o;
    getFoodProcessAPI({ id: p_id.toString(), p_id, v_id }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          detailing_data: apiResponse.response.data.data
        });
      }
    });
  };
  getFoodStepsHandler = o => {
    const { p_id, v_id } = o;
    getFoodProcessAPI({ p_id, v_id, id: p_id.toString() }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState(
          {
            detailing_data: apiResponse.response.data.data
          },
          () => {
            this.setState({ showStepsModal: true, stepProduct: o });
          }
        );
      }
    });
  };
  removeStep = id => {
    removeStepAPI({ id: id }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({ modal: false });
        Notification(
          1,
          apiResponse.response.data.message,
          "This Step Deleted Successfully"
        );
        this.listFoodProcess();
      } else {
        Notification(0, "Something went wrong", "Step Deletion Error");
      }
    });
  };
  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      processModal: false,
      isBetweenFormOpen: false,
      id: "",
      stepNo: "",
      ingredientList: [{ ingredients: "", unit: "" }],
      stepName: "",
      stepTime: "",
      stepDiscrp: "",
      fileData: "",
      file: ""
    });
  };
  modalCancel = () => {
    this.setState({
      modal: false,
      processModal: false,
      isBetweenFormOpen: false
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      processModal: false,
      isBetweenFormOpen: false,
      id: "",
      stepNo: "",
      ingredientList: [{ ingredients: "", unit: "" }],
      stepName: "",
      stepTime: "",
      stepDiscrp: "",
      fileData: "",
      file: ""
    });
  };
  pendingProcessForm = () => {
    this.setState({ isFormOpen: false, isEdit: false, processModal: true });
    getWithoutProcessAPI(apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          ProcessDetailing_data: apiResponse.response.data.data
        });
      }
    });
  };
  openBetweenForm = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      processModal: false,
      isBetweenFormOpen: true,
      id: "",
      stepNo: "",
      ingredientList: [{ ingredients: "", unit: "" }],
      stepName: "",
      stepTime: "",
      stepDiscrp: "",
      fileData: "",
      file: ""
    });
  };
  render() {
    const commonProps = {
      ...this.state,
      handleChangeProduct: this.handleChangeProduct,
      handleChangeVariant: this.handleChangeVariant,
      handleIngredientNameChange: this.handleIngredientNameChange,
      handleUnitNameChange: this.handleUnitNameChange,
      handleQuantityNameChange: this.handleQuantityNameChange,
      handleRemoveIngredients: this.handleRemoveIngredients,
      handleAddIngredients: this.handleAddIngredients,
      onDrop: this.onDrop,
      resetFile: this.resetFile,
      handleChangeText: this.handleChangeText,
      cancel: this.cancel
    };
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-list text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="food.food-preparation-proces-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="9">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ? (
                  <FoodProcessEdit
                    {...commonProps}
                    editFoodProcessHandler={this.editFoodProcessHandler}
                  />
                ) : (
                  ""
                )}
                {this.state.isFormOpen ? (
                  <FoodProcessAdd
                    {...commonProps}
                    AddFoodProcessHandler={this.AddFoodProcessHandler}
                  />
                ) : (
                  ""
                )}
                {this.state.isBetweenFormOpen ? (
                  <FoodProcessBetween
                    {...commonProps}
                    betweenFoodProcessHandler={this.betweenFoodProcessHandler}
                  />
                ) : (
                  ""
                )}
                {
                  <AddSteps
                    visible={this.state.showStepsModal}
                    closeModal={() => this.setState({ showStepsModal: false })}
                    addStep={this.addStepHandler}
                    stepProduct={this.state.stepProduct}
                    detailing_data={this.state.detailing_data}
                    ingredients={this.state.ingData}
                  />
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-4">
            <FoodProcessList
              title="dashboards.top-viewed-posts"
              {...this.state}
              toggle={this.toggle}
              modalCancel={this.modalCancel}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              openBetweenForm={this.openBetweenForm}
              getFoodProcessHandler={this.getFoodProcessHandler}
              retreveFoodProcessHandler={this.retreveFoodProcessHandler}
              removeStep={this.removeStep}
              pendingProcessForm={this.pendingProcessForm}
              showSteps={id => {
                this.getFoodStepsHandler(id);
              }}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FoodProcess);
