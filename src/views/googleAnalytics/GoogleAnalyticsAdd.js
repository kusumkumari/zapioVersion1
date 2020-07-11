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
import Typography from "@material-ui/core/Typography";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import {
  MultilineChartOutlined,
  TimelineOutlined,
  ContactsOutlined,
  EditOutlined,
  GroupWorkOutlined
} from "@material-ui/icons/";
import Chip from "@material-ui/core/Chip";
import { userType } from "../ApiIntegration";

export default class GoogleAnalyticsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, AddGoogleDetail, isDisable } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="google.analytics-detail" color="primary" />
            &nbsp;
            <MultilineChartOutlined
              className="text-primary"
              style={{ fontSize: "xx-large" }}
            />
          </CardTitle>
          <Form className="dashboard-quick-post" method="post">
            <FormGroup row>
              <Label sm="2">
                <TimelineOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="google.snippits" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.googleSnippet}
                  disabled={isDisable}
                  name="googleSnippet"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <ContactsOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="google.uid" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.uid}
                  disabled={isDisable}
                  name="uid"
                  onChange={handleChange}
                />
              </Colxx>
            </FormGroup>

            {userType() !== "is_cashier" &&
              (isDisable ? (
                <Chip
                  icon={<EditOutlined />}
                  label="Want To Edit"
                  onClick={this.props.makeEnable}
                  variant="outlined"
                  color="primary"
                  className="float-right"
                />
              ) : (
                // <Button className="float-right" color="primary" onClick={this.props.makeEnable} >
                // <EditOutlined className="text-primary"  />
                // </Button>
                <Button
                  className="float-right"
                  color="primary"
                  onClick={() => AddGoogleDetail()}
                >
                  <IntlMessages id="account.up" />
                </Button>
              ))}
          </Form>
          {userType() !== "is_cashier" && (
            <>
              <Separator className="my-n5" />
              <CardTitle style={{ marginTop: "59px", marginBottom: "3px" }}>
                &nbsp;
                <GroupWorkOutlined
                  className="text-primary"
                  style={{ fontSize: "x-large" }}
                />
                &nbsp; Google Analytics Status (
                {this.props.status ? (
                  <span className="text-success"> Active </span>
                ) : (
                  <span className="text-error"> Inactive</span>
                )}
                )
              </CardTitle>
              <Typography variant="body2" color="textSecondary">
                To enable/disable Google Analytics settings click here..
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
