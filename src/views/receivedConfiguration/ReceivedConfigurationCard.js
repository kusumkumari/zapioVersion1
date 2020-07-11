/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ReceivedConfigurationAdd from "./ReceivedConfigurationAdd";
import ReceivedConfigurationEdit from "./ReceivedConfigurationEdit";
import ReceivedConfigurationList from "./ReceivedConfigurationList";
import { listReportOutletAPI, listReceivedCOnfigurationAPI, addReceivedCOnfigurationAPI, changeReceivedConfigStatusAPI, retrieveReceivedConfigHandlerAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class ReceivedConfiguration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptions: [],
      header: "",
      footer: "",
      gst: "",
      data: [],
      dataLength: null,
      isEdit: false,
      outlet: '',
      outletLength: "",
      isFormOpen: false,
    };
  }
  handleOutletChange = selectedOption => {
    this.setState({ selectedOptions: selectedOption });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addReceivedConfigurationHandler = () => {
    const { selectedOptions, header, footer, gst } = this.state;

    let outletId = ""
    if (selectedOptions == "") {
      outletId = ""
    }
    else {
      outletId = selectedOptions.value.toString()
    }
    addReceivedCOnfigurationAPI({ outlet: outletId, header: header, footer: footer, gst: gst }, ({ response }) => {
      console.log("pechu", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "Receipt Configuration Success");
        this.setState({ selectedOptions: "", header: "", footer: "", gst: "", isFormOpen: false })
        this.listReceivedCOnfiguration();
      }
      else {
        const err = response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  };

  retrieveReceivedConfigHandler = (id) => {
    retrieveReceivedConfigHandlerAPI({ id: id.toString() }, ({ response }) => {
      console.log("ttttttttttttttttttttttt", response.data.data[0].outlet_detail)
      if (response.data.success == true) {
        this.setState({
          header: response.data.data[0].header,
          footer: response.data.data[0].footer,
          gst: response.data.data[0].gst,
          id: response.data.data[0].id,
          selectedOptions: response.data.data[0].outlet_detail,
          isEdit: true, isFormOpen: false
        })
      }
    });
  };
  listReceivedCOnfiguration = () => {
    listReceivedCOnfigurationAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    })
  }

  componentDidMount() {
    listReportOutletAPI(apiResponse => {
      console.log("oooooooooooooooooooo", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState(
          {
            outlet: apiResponse.response.data.data,
            outletLength: apiResponse.response.data.data.length,

          });
      }
      else {
        const err = apiResponse.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    })
    this.listReceivedCOnfiguration();
  }


  editReceivedConfigurationHandler = () => {
    const { selectedOptions, header, footer, gst, id } = this.state;
    let outletId = ""
    if (selectedOptions[0]) {
      outletId = selectedOptions[0].value
    }
    else {
      outletId = selectedOptions.value
    }
    addReceivedCOnfigurationAPI({ id: id.toString(), outlet: outletId, header: header, footer: footer, gst: gst }, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, "Receipt Configuration Success");
        this.setState({ selectedOptions: "", header: "", footer: "", gst: "", isEdit: false })

        this.listReceivedCOnfiguration();
      }
      else {
        const err = response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  };

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeReceivedConfigStatusAPI({ id: id.toString(), active_status: status }, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Receipt Configuration status changed")
        this.listReceivedCOnfiguration();
      }
      else {
        Notification(0, "Something went wrong", "Receipt Configuration status changed Error")
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
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-wrench text-primary" style={{ fontSize: "x-large" }} />&nbsp;
            <Breadcrumb heading="menu.received-configuration" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <ReceivedConfigurationEdit {...this.state}
                    handleChange={this.handleChange}
                    handleOutletChange={this.handleOutletChange}
                    editReceivedConfigurationHandler={this.editReceivedConfigurationHandler}
                    cancel={this.cancel}

                  />
                  : ""}
                {this.state.isFormOpen ?
                  <ReceivedConfigurationAdd {...this.state}
                    handleChange={this.handleChange}
                    handleOutletChange={this.handleOutletChange}
                    addReceivedConfigurationHandler={this.addReceivedConfigurationHandler}
                    cancel={this.cancel}
                  />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>

        </Row>
        <Row>
          <Colxx xxs="12">
            <ReceivedConfigurationList {...this.state}
              handleChange={this.handleChange}
              handleChangeStatus={this.handleChangeStatus}
              retrieveReceivedConfigHandler={this.retrieveReceivedConfigHandler}
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
export default injectIntl(ReceivedConfiguration);