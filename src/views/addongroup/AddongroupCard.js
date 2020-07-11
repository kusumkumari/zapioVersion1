/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AddongroupAdd from "./AddongroupAdd";
import AddongroupEdit from "./AddongroupEdit";
import AddongroupList from "./AddongroupList";
import {
  addAddonGroupAPI,
  listAddonGroupAPI,
  listActiveVariantAPI,
  editAddonGroupAPI,
  changeAddonTypeStatusAPI
} from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class AddongroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: [],
      addgroup: "",
      priority:"",
      maxaddon: "",
      minaddon: "",
      description: "",
      data: [],
      dataLength: null,
      variantData: [],
      variantDataLength: null,
      addondata: "",
      addonLength: null,
      isEdit: false,
      isFormOpen: "",
      status:true,
    };
  }
  handleChange1 = e => {
    this.setState({ variant: e });
  };

  handleChangeStatus = e => {
    let id = e.original.id.toString();
    let status = (!e.original.active_status).toString();
    changeAddonTypeStatusAPI(id, status, apiResponse => {
      if (apiResponse.response.data.success == true) {
        Notification(
          1,
          apiResponse.response.data.message,
          "Addon Group Type status changed"
        );
        this.listAddonGroup(this.state.status);
      } else {
        Notification(
          0,
          "Something went wrong",
          "Addon Group status changed Error"
        );
      }
    });
  };

  listAddonGroup = (status) => {
    listAddonGroupAPI({status:status},apiResponse => {
      console.log("aaaaaaaaaaaaa",apiResponse)
      console.log(apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  };
  componentDidMount() {
    listActiveVariantAPI(apiResponse => {
      if (apiResponse.status == "success") {
        this.setState({
          variantData: apiResponse.response.data.data,
          variantDataLength: apiResponse.response.data.data.length
        });
      }
    });
    this.listAddonGroup(this.state.status);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editGroupHandler = () => {
    const {
      variant,
      id,
      addgroup,
      priority,
      minaddon,
      maxaddon,
      description
    } = this.state;
    let varid = "";
    if (variant[0]) {
      if (!variant[0].value) {
        varid = "";
      } else {
        varid = variant[0].value.toString();
      }
    } else {
      varid = variant.value.toString();
    }
    addAddonGroupAPI(
      {
        id: id.toString(),
        product_variant: varid,
        addon_gr_name: addgroup,
        priority:priority ? priority :"",
        description: description,
        max_addons: maxaddon.toString(),
        min_addons: minaddon.toString()
      },
      ({ response }) => {
        console.log("vvvvvvvvvv", response);
        if (response.data.success == true) {
          Notification(1, response.data.message, "Addon Group success");
          this.setState({
            isEdit: false,
            variant: "",
            addgroup: "",
            priority:"",
            description: "",
            minaddon: "",
            maxaddon: ""
          });
          this.listAddonGroup(this.state.status);
        } else {
          const err = response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  addGroupHandler = () => {
    const { variant, addgroup, priority, minaddon, maxaddon, description } = this.state;
    let varid = "";
    if (variant != "") {
      let a = variant.value;
      varid = a.toString();
    } else {
      varid = "";
    }
    addAddonGroupAPI(
      {
        product_variant: varid,
        addon_gr_name: addgroup,
        priority:priority,
        description: description,
        max_addons: maxaddon,
        min_addons: minaddon
      },
      ({ response }) => {
        console.log("rrrrrrrrr",response)
        if (response.data.success == true) {
          Notification(1, response.data.message, "Addon Group success");
          this.setState({
            variant: "",
            addgroup: "",
            priority: "",
            description: "",
            minaddon: "",
            maxaddon: "",
            isFormOpen: false
          });
          this.listAddonGroup(this.state.status);
        } else {
          const err = response.data.error;
          Object.keys(err).forEach(v => {
            if (err[v]) Notification(0, err[v], `${v} error!`);
          });
        }
      }
    );
  };

  retrieveAddonGroupHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false });
    editAddonGroupAPI(id.toString(), ({ response }) => {
      if (response.data.success == true) {
        let VarArray = [
          {
            label: response.data.data[0].product_variant,
            value: response.data.data[0].product_variant_id
          }
        ];
        this.setState({
          addgroup: response.data.data[0].addon_gr_name,
          priority: response.data.data[0].priority,
          description: response.data.data[0].description,
          minaddon: response.data.data[0].min_addons,
          maxaddon: response.data.data[0].max_addons,
          variant: VarArray,
          id: response.data.data[0].id
        });
      }
    });
  };

  
  handleChangelistStatus =() =>{
    this.setState({status:!this.state.status})
    this.listAddonGroup(!this.state.status);

  }

  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      variant: "",
      addgroup: "",
      priority:"",
      description:"",
      minaddon: "",
      maxaddon: ""
    });
  };
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      variant: "",
      addgroup: "",
      priority:"",
      description:"",
      minaddon: "",
      maxaddon: ""
    });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="simple-icon-arrow-up-circle text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="menu.addon-group-management"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ? (
                  <AddongroupEdit
                    {...this.state}
                    handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    handleChange3={this.handleChange3}
                    selectedOptions={this.selectedOptions}
                    addGroupHandler={this.addGroupHandler}
                    editGroupHandler={this.editGroupHandler}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
                {this.state.isFormOpen ? (
                  <AddongroupAdd
                    {...this.state}
                    handleChange={this.handleChange}
                    handleChange1={this.handleChange1}
                    selectedOptions={this.selectedOptions}
                    addGroupHandler={this.addGroupHandler}
                    cancel={this.cancel}
                  />
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <AddongroupList
              {...this.state}
              handleChange={this.handleChange}
              handleChangeStatus={this.handleChangeStatus}
              handleChangelistStatus={this.handleChangelistStatus}
              openForm={this.openForm}
              retrieveAddonGroupHandler={this.retrieveAddonGroupHandler}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(AddongroupCard);
