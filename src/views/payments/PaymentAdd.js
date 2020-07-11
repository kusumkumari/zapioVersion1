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
import GroupWorkOutlinedIcon from "@material-ui/icons/GroupWorkOutlined";
import {
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  VpnKeyOutlined,
  HttpsOutlined,
  EditOutlined
} from "@material-ui/icons/";
import Chip from "@material-ui/core/Chip";
import { userType } from "../ApiIntegration";

export default class PaymentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, AddPaymentDetail, isDisable } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="payment.detail" color="primary" />
            <AccountBalanceWalletOutlined
              className="text-primary"
              style={{ fontSize: "xx-large" }}
            />
          </CardTitle>
          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="2">
                <VpnKeyOutlined className="text-primary" />
                <IntlMessages id="payment.key-id" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.keyId}
                  disabled={isDisable}
                  name="keyId"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <HttpsOutlined className="text-primary" />
                <IntlMessages id="payment.key-secret" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.keySecret}
                  disabled={isDisable}
                  name="keySecret"
                  onChange={handleChange}
                />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <MonetizationOnOutlined className="text-primary" />

                <IntlMessages id="payment.symbol" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.symbol}
                  disabled={isDisable}
                  name="symbol"
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
                <Button
                  className="float-right"
                  color="primary"
                  onClick={AddPaymentDetail}
                >
                  <IntlMessages id="account.up" />
                </Button>
              ))}
          </Form>
          {userType() !== "is_cashier" && (
            <>
              <Separator className="my-n5" />
              <CardTitle style={{ marginTop: "59px", marginBottom: "3px" }}>
                <GroupWorkOutlinedIcon
                  className="text-primary"
                  style={{ fontSize: "x-large" }}
                />
                Payment Status (
                {this.props.status ? (
                  <span className="text-success"> Active </span>
                ) : (
                  <span className="text-error"> Inactive</span>
                )}
                )
              </CardTitle>
              <Typography variant="body2" color="textSecondary">
                To enable/disable Payment settings click here..
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ marginTop: "12px" }}
              >
                <Switch
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
