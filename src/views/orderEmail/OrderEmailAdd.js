/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
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
  Title,
  ListAlt,
  LocalOffer,
  AlternateEmail,
  EmojiEvents,
  LibraryBooks,
  Image,
  EditOutlined,
  GroupWorkOutlined
} from "@material-ui/icons/";
import Chip from "@material-ui/core/Chip";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
import { userType } from "../ApiIntegration";

export default class OrderEmailAdd extends Component {
  render() {
    const {
      handleChange,
      AddOrderEmailDetail,
      isDisable,
      onDrop,
      resetFile,
      couponData,
      couponDataLength
    } = this.props;
    const couponOptions = [{ label: "Select Coupon", key: "1s", value: "" }];
    for (let index = 0; index < couponDataLength; index++) {
      const { key, label, value } = couponData[index];
      couponOptions.push({ label: label, value: value, key: key });
    }
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="orderemail-detail" color="primary" />
            &nbsp;
            <AlternateEmail
              className="text-primary"
              style={{ fontSize: "xx-large" }}
            />
          </CardTitle>
          <Form className="dashboard-quick-post" method="post">
            <FormGroup row>
              <Label sm="2">
                <Title className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.title" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="text"
                  value={this.props.title}
                  disabled={isDisable}
                  name="title"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <EmojiEvents className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.coupon" />
              </Label>
              <Colxx sm="4">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isDisabled={isDisable}
                  value={this.props.coupon}
                  onChange={this.props.handleChangeCoupon}
                  options={couponOptions}
                />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <ListAlt className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.content" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="textarea"
                  value={this.props.content}
                  disabled={isDisable}
                  name="content"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <LibraryBooks className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.subcontent" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="textarea"
                  value={this.props.subContent}
                  disabled={isDisable}
                  name="subContent"
                  onChange={handleChange}
                />
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">
                <LocalOffer className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.discontent" />
              </Label>
              <Colxx sm="4">
                <Input
                  type="textarea"
                  value={this.props.discountContent}
                  disabled={isDisable}
                  name="discountContent"
                  onChange={handleChange}
                />
              </Colxx>
              <Label sm="2">
                <Image className="text-primary" />
                &nbsp;
                <IntlMessages id="orderemail.image" />
              </Label>
              <Label
                sm="2"
                style={{
                  border: "1px solid #ccc",
                  display: "inlineBlock",
                  cursor: "pointer",
                  color: "hsl(0,0%,50%)"
                }}
              >
                Upload Image
                <Input
                  type="file"
                  onChange={onDrop}
                  disabled={isDisable}
                  style={{ display: "none" }}
                />
              </Label>
              <Colxx sm="2">
                {this.props.file && (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ height: "63px" }} src={this.props.file} />{" "}
                      &nbsp;&nbsp;
                      {!isDisable && (
                        <i
                          style={{ outlineColor: "primary" }}
                          size=""
                          className="simple-icon-trash"
                          disabled={isDisable}
                          onClick={resetFile}
                        />
                      )}
                    </span>
                  </div>
                )}
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
                  onClick={() => AddOrderEmailDetail()}
                >
                  <IntlMessages id="account.up" />
                </Button>
              ))}
          </Form>
          <br />
          <br />
          {userType() !== "is_cashier" && (
            <>
              <Separator />
              <br />
              <CardTitle style={{ marginBottom: "3px" }}>
                &nbsp;
                <GroupWorkOutlined
                  className="text-primary"
                  style={{ fontSize: "x-large" }}
                />
                &nbsp; Order Email Status (
                {this.props.status ? (
                  <span className="text-success"> Active </span>
                ) : (
                  <span className="text-error"> Inactive</span>
                )}
                )
              </CardTitle>
              <Typography variant="body2" color="textSecondary">
                To enable/disable Order Email settings click here..
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
