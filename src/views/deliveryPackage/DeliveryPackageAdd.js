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
  LocalShippingOutlined,
  BusinessCenterOutlined,
  EmojiSymbolsOutlined,
  MonetizationOnOutlined,
  GroupWorkOutlined,
  EditOutlined
} from "@material-ui/icons/";
import Chip from "@material-ui/core/Chip";
import { userType } from "../ApiIntegration";

export default class DeliveryPackageAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, AddDeliveryDetail, isDisable } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="delivery.detail" color="primary" />
            &nbsp;
            <LocalShippingOutlined
              className="text-primary"
              style={{ fontSize: "xx-large" }}
            />
          </CardTitle>
          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="2">
                <LocalShippingOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="delivery.delivery-charge" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.deliveryCharge}
                  disabled={isDisable}
                  name="deliveryCharge"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <BusinessCenterOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="delivery.package-charge" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.packageCharge}
                  disabled={isDisable}
                  name="packageCharge"
                  onChange={handleChange}
                />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <EmojiSymbolsOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="delivery.tax-cgst" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.Cgst}
                  disabled={isDisable}
                  name="Cgst"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <EmojiSymbolsOutlined className="text-primary" />
                &nbsp;
                <IntlMessages id="delivery.tax-sgst" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.Sgst}
                  disabled={isDisable}
                  name="Sgst"
                  onChange={handleChange}
                />
              </Colxx>
            </FormGroup>
            <FormGroup row>
              <Label sm="2">
                <MonetizationOnOutlined className="text-primary" />
                &nbsp;
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
                  onClick={AddDeliveryDetail}
                >
                  <IntlMessages id="account.up" />
                </Button>
              ))}
          </Form>
          {userType() !== "is_cashier" && (
            <>
              <Separator />
              <CardTitle style={{ marginTop: "20px", marginBottom: "3px" }}>
                &nbsp;
                <GroupWorkOutlined
                  className="text-primary"
                  style={{ fontSize: "x-large" }}
                />
                &nbsp; Delivery & Packages Status (
                {this.props.status ? (
                  <span className="text-success"> Active </span>
                ) : (
                  <span className="text-error"> Inactive</span>
                )}
                )
              </CardTitle>
              <Typography variant="body2" color="textSecondary">
                To enable/disable Delivery & Packages settings click here..
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
