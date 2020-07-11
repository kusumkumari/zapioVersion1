/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CustomInput,
  FormGroup,
  Label,
  Button,
  Form,
  Input
} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { SketchPicker, PhotoshopPicker, SwatchesPicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import GroupWorkOutlinedIcon from "@material-ui/icons/GroupWorkOutlined";
import { userType } from "../ApiIntegration";

export default class ThemeAdd extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="theme.detail" color="primary" />
            <i
              className="iconsminds-palette text-primary"
              style={{ fontSize: "xx-large" }}
            />
          </CardTitle>

          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="theme.accent-color" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  style={{ backgroundColor: this.props.accentColor }}
                  name="accentVisible"
                  onClick={this.props.colorPicker}
                />
                {this.props.accentVisible ? (
                  <SketchPicker
                    color={this.props.accentColor}
                    onChangeComplete={this.props.handleAccentChangeComplete}
                  />
                ) : null}
              </Colxx>
              <Label sm="2">
                <IntlMessages id="theme.text-color" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  style={{ backgroundColor: this.props.textColor }}
                  name="textVisible"
                  onClick={this.props.colorPicker}
                />
                {this.props.textVisible ? (
                  <SketchPicker
                    color={this.props.textColor}
                    onChangeComplete={this.props.handleTextChangeComplete}
                  />
                ) : null}
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <IntlMessages id="theme.secondary-color" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  style={{ backgroundColor: this.props.secondaryColor }}
                  name="secondVisible"
                  onClick={this.props.colorPicker}
                />
                {this.props.secondVisible ? (
                  <SketchPicker
                    color={this.props.secondaryColor}
                    onChangeComplete={this.props.handleSecondChangeComplete}
                  />
                ) : null}
              </Colxx>
            </FormGroup>

            {userType() !== "is_cashier" && (
              <Button
                className="float-right"
                color="primary"
                onClick={this.props.AddThemeDetail}
              >
                <IntlMessages id="account.up" />
              </Button>
            )}
          </Form>
          {userType() !== "is_cashier" && (
            <>
              <Separator className="my-n5" />
              <CardTitle style={{ marginTop: "59px", marginBottom: "3px" }}>
                <GroupWorkOutlinedIcon
                  className="text-primary"
                  style={{ fontSize: "x-large" }}
                />
                Theme Status (
                {this.props.status ? (
                  <span className="text-success"> Active </span>
                ) : (
                  <span className="text-error"> Inactive</span>
                )}
                )
              </CardTitle>
              <Typography variant="body2" color="textSecondary">
                To enable/disable theme settings click here..
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ marginTop: "12px" }}
              >
                <Switch
                  name={"status"}
                  checked={this.props.status}
                  onChange={e =>
                    this.props.handleChangeStatus(this.props.status)
                  }
                />
              </Typography>
            </>
          )}
        </CardBody>
      </Card>
    );
  }
}
