/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  CustomInput,
  Label,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Avatar from '@material-ui/core/Avatar';
import { Close, Edit } from '@material-ui/icons';

export default class AuthorizationEdit extends Component {
  render() {
    const { userData, userDataLength, addTagHandler } = this.props;
    const userTypeOption = [];
    for (let index = 0; index < userDataLength; index++) {
      const { id, user_type } = userData[index];
      userTypeOption.push({ label: user_type, value: id, key: id })
    }
    const nodes = [
      {
        value: 'catalog',
        label: 'Catalog',
        children: [
          { value: 'food', label: 'Food Type' },
          { value: 'categories', label: 'Categories' },
          { value: 'categories', label: 'Categories' },
          { value: 'subcategories', label: 'Sub Categories' },

          { value: 'outlet', label: 'Outlet' },
          { value: 'variant', label: 'Variant' },
          { value: 'addongroup', label: 'Add On Group' },
          { value: 'categories', label: 'Categories' },
          { value: 'addon', label: 'Add On' },

          { value: 'product', label: 'Product' },
          { value: 'featureproduct', label: 'Feature Product' },
          { value: 'producttag', label: 'Product Tag' },
        ],
      },
      {
        value: 'coupon',
        label: 'Coupon Engine',
        children: [
          { value: 'coupons', label: 'Coupons' },
          { value: 'qtycombo', label: 'Quantity Based Combo' },
          { value: 'percombo', label: 'Percentage Based Combo' },
          { value: 'coupnhistory', label: 'Coupon History' },
          { value: 'dis', label: 'Discount Percentage' },
        ],
      },
      {
        value: 'outletmanager',
        label: 'Outlet Manager',
        children: [
          { value: 'stock', label: 'Stock Availability' },
          { value: 'timing', label: 'Manage Timings' },
          {
            value: 'kitchen', label: 'Kitchen',
            children: [
              { value: 'ing', label: 'Manage Ingridients' },
              { value: 'foodPrepare', label: 'Food Prepare Process' },

            ]
          }
        ],
      }];

    return (
      <Modal
        isOpen={this.props.isEdit}
      >
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>

          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}
          >
            <i className="iconsminds-shield" style={{ fontSize: "xx-large" }} />
          </Avatar>&nbsp;
          <IntlMessages id='edit.authorization' />

        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="edit.authorization" />
                <i className="iconsminds-add text-primary" style={{ fontSize: "large" }} />
              </CardTitle>

              <Form className="dashboard-quick-post">
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="authorization.usertype" />
                  </Label>
                  <Colxx sm="9">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      value={this.props.foodTypeArray}
                      onChange={this.props.handleChangeFoodType}
                      options={userTypeOption} />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label sm="3">
                    <IntlMessages id="authorization.modules" />
                  </Label>
                  <Colxx sm="9">
                    <CheckboxTree
                      nodes={nodes}
                      checked={this.props.checked}
                      expanded={this.props.expanded}
                      onCheck={this.props.handleModule}
                      onExpand={this.props.handleModuleExpand}
                      expandOnClick={true}
                      icons={{
                        check: <i class="fa fa-check-square" aria-hidden="true" style={{ color: "green" }} />,
                        uncheck: <i class="fa fa-square" aria-hidden="true" style={{ color: "green" }} />,
                        halfCheck: <i class="fa fa-minus-square" aria-hidden="true" style={{ color: "green" }} />,
                        expandClose: <i class="fa fa-chevron-right" aria-hidden="true" style={{ color: "green" }} />,
                        expandOpen: <i class="fa fa-chevron-down" aria-hidden="true" style={{ color: "green" }} />,
                        expandAll: <i class="fa fa-plus-square" aria-hidden="true" style={{ color: "green" }} />,
                        collapseAll: <i class="fa fa-minus-square" aria-hidden="true" style={{ color: "green" }} />,
                        parentClose: <i class="fa fa-folder" aria-hidden="true" />,
                        parentOpen: <i class="fa fa-folder-open" aria-hidden="true" />,
                        leaf: <i class="fa fa-file" aria-hidden="true" />,
                      }}
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>

                  <Label sm="3" >
                    <IntlMessages id="authorization.action" />
                  </Label>

                  <Colxx sm="9">
                    <CustomInput
                      type="checkbox"
                      id="exCustomInline"
                      label="Add"
                      inline
                    />
                    <CustomInput
                      type="checkbox"
                      id="exCustomInline2"
                      label="Edit"
                      inline
                    />
                    <CustomInput
                      type="checkbox"
                      id="exCustomInline2"
                      label="View"
                      inline
                    />
                    <CustomInput
                      type="checkbox"
                      id="exCustomInline2"
                      label="Status Change"
                      inline
                    />
                  </Colxx>
                </FormGroup>

                <Button variant="contained"
                  color="primary"
                  color="primary"
                  className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }} onClick={addTagHandler} >
                  <IntlMessages id="product.edit" />&nbsp;
                <Edit />
                </Button>
                <Button className="px-3 py-2 font-weight-bold d-flex align-items-center float-right mg-10"
                  style={{ borderRadius: 5 }} color="danger" onClick={this.props.cancel}  >
                  <Close /> <IntlMessages id="product.cancel" />
                </Button>
              </Form>

            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

    );
  }
}
