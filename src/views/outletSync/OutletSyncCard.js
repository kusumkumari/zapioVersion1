/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import OutletSyncAdd from "./OutletSyncAdd";
import OutletSyncList from "./OutletSyncList";
import { syncOutletsAPI, listUnInitatedOutletsAPI, listSyncedOutletsAPI, getAttachedOutletsAPI, changeOutletSyncStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import "../../assets/css/custom.css"

class OutletSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: [],
      outlets: [],
      outletData:[],
      outletDataLength: "",
      dataLength: null,
      isFormOpen: false,
    };

  }

  componentDidMount() {
    this.listUnInitatedOutlets();
    this.listSyncedOutlets();
  }

  handleChangeOutlets = (e) => {
    this.setState({
      outlets: e,
    });
  };

  listUnInitatedOutlets = () => {
    listUnInitatedOutletsAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          outletData: apiResponse.response.data.data,
          outletDataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  listSyncedOutlets= () => {
    listSyncedOutletsAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  syncOutlets = () => {
    const { outlets } = this.state;
    let outletArray=[]
    for(let i=0; i<outlets.length; i++){
      outletArray.push(outlets[i].value)
    }
    syncOutletsAPI({ outlet_ids: outletArray}, (response) => {
      if (response.response.data.status == true) {
        this.setState({ outlets: [], isFormOpen: false })
        Notification(1, response.response.data.message, "Outlets are Synched");
        this.listSyncedOutlets();
      }
      else {
        const err = response.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    });
  };

  getAttachedOutlets =()=>{
    getAttachedOutletsAPI((apiResponse) => {
      if (apiResponse.response.data.status == true) {
        Notification(1, apiResponse.response.data.message, "Attached Outlets");
        this.listSyncedOutlets();
      }
    });
  }
 
  cancel = () => {
    this.setState({ isFormOpen: false, outlets: [], id: "",})
  }
  openForm = () => {
    this.setState({ isFormOpen: true, outlets: [], id: "", })
    this.listUnInitatedOutlets();

  }
  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeOutletSyncStatusAPI({ outlet_id: id, store_status: status }, (apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.response.data.status == true) {
        Notification(1, apiResponse.response.data.message, "Outlet status changed")
        this.listSyncedOutlets();
      }
      else {
        Notification(0, "Something went wrong", "Outlet status changed Error")
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i className="iconsminds-sync text-primary" style={{ fontSize: "x-large" }} />
            <Breadcrumb heading="outlet-sync.management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isFormOpen ?
                  <OutletSyncAdd {...this.state} 
                    handleChangeOutlets={this.handleChangeOutlets}
                    syncOutlets={this.syncOutlets}
                    cancel={this.cancel}
                  />
                  : ""
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12" className="mb-5">
            <OutletSyncList {...this.state}
            handleChangeStatus={this.handleChangeStatus}
            getAttachedOutlets={this.getAttachedOutlets}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(OutletSync);