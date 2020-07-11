/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { listOutletSettingAPI } from "../ApiIntegration";
import SettingEdit from "./SettingEdit";


class OutletSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

    };
  }

  companydata = () => {
    listOutletSettingAPI((response) => {
      console.log("outletttttttttttt", response.response.data.data[0])
      if (response.status == "success") {
        this.setState({
          data: response.response.data.data[0],
        });
      }
    });
  }

  componentWillMount() {
    this.companydata();
  }
  
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <div id="form"></div>
            <Breadcrumb heading="account.managements" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                  <SettingEdit {...this.state} />
              </Colxx>
            </Row>
          </Colxx>
        </Row>

      </Fragment>
    );
  }
}
export default injectIntl(OutletSetting);