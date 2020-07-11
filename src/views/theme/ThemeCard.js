/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ThemeAdd from "./ThemeAdd";
import { Notification } from "../Utils/Notification";
import { listThemeAPI,addThemeDetailAPI, changeThemeStatusAPI } from "../ApiIntegration";


class ThemeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accentColor:"#fff",
      textColor:"#fff",
      secondaryColor:"#fff",
      id:"",
      accentVisible:false,
      textVisible:false,
      secondVisible:false,
      status:false,
    };
  }
  handleAccentChangeComplete = (color) => {
    this.setState({ accentColor: color.hex, accentVisible:false });
  };
  handleTextChangeComplete = (color) => {
    this.setState({ textColor: color.hex, textVisible:false });
  };
  handleSecondChangeComplete = (color) => {
    this.setState({ secondaryColor: color.hex, secondVisible:false });
  };
  colorPicker =e=>{
    if(e.target.name=="accentVisible"){
    this.setState({
      accentVisible: true, textVisible:false,
      secondVisible:false,
    });
  }
  if(e.target.name=="textVisible"){
    this.setState({
      accentVisible: false, textVisible:true,
      secondVisible:false,
    });
  }
  if(e.target.name=="secondVisible"){
    this.setState({
      accentVisible: false, textVisible:false,
      secondVisible:true,
    });
  }
  }

  themeData = () => {
    listThemeAPI((response) => {
      if (response.response.data.success == true) {
        this.setState({
          accentColor: response.response.data.accent_color ? response.response.data.accent_color:"#fff",
          textColor : response.response.data.textColor ? response.response.data.textColor:"#fff",
          secondaryColor : response.response.data.secondaryColor ? response.response.data.secondaryColor:"#fff",
          id : response.response.data.id,
          status:response.response.data.active_status,
        });
      }
    });
  }

  componentDidMount() {
    this.themeData();
  }
 
  AddThemeDetail = () => {
    const { id,accentColor,textColor,secondaryColor } = this.state;
    addThemeDetailAPI({id:id,accent_color:accentColor, textColor:textColor, secondaryColor:secondaryColor}, ({ response }) => {
      if (response.data.status == true) {
        Notification(1, response.data.message, "Theme success");
        this.themeData();
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
    let id = this.state.id.toString()
    let status = (!e).toString()
    changeThemeStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "Theme status changed")
        this.themeData();
      }
      else {
        Notification(0, "Something went wrong", "Theme status changed Error")
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <div id="form"></div>
          <i className="iconsminds-pantone text-primary" style={{fontSize:"x-large"}} />&nbsp;
            <Breadcrumb heading="theme.settings" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
            <Row>
              <Colxx md="12" className="mb-4">
                <ThemeAdd {...this.state}
                 colorPicker={this.colorPicker}
                 handleAccentChangeComplete={this.handleAccentChangeComplete}
                 handleTextChangeComplete={this.handleTextChangeComplete}
                 handleSecondChangeComplete={this.handleSecondChangeComplete}
                 AddThemeDetail={this.AddThemeDetail}
                 handleChangeStatus={this.handleChangeStatus}
                  />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(ThemeCard);