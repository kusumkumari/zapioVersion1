/* eslint-disable */
import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { Row } from 'reactstrap'
import { Colxx, Separator } from '../../components/common/CustomBootstrap'
import Breadcrumb from '../../containers/navs/Breadcrumb'
import AuthorizationAdd from './AuthorizationAdd'
import AuthorizationEdit from './AuthorizationEdit'
import AuthorizationList from './AuthorizationList'
import {
  listPerrmissionAPI,
  AddPermissionAPI,
  listBillPerrmissionAPI,
  AddBillPermissionAPI
} from '../ApiIntegration'
import { Notification } from '../Utils/Notification'

class Authorization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataLength: null,
      isFormOpen: false,
      userData: [],
      posmanager: [],
      salesmanager: [],
      cashier: [],
      admin: [],
      outletmanager: [],
      shiftmanager: [],
      areamanager: [],
      callmanager: [],
      financemanager: [],
      marketingmanager: [],
      BillUserData: [],
      BillPosmanager: [],
      BillSalesmanager: [],
      BillCashier: [],
      BillAdmin: [],
      BillOutletmanager: [],
      BillShiftmanager: [],
      BillAreamanager: [],
      BillCallmanager: [],
      BillFinancemanager: [],
      BillMarketingmanager: [],
    }
  }

  handleChangeOutlets = (e, mid, uid) => {
    console.log("ooooooooo", e.value, mid, uid)
    this.AddPermission(e.value, mid, uid)

  }

  handleBillOutlets = (e, mid, uid) => {
    console.log("ccccccccccccccccc", e.value, mid, uid)
    this.AddBillPermission(e.value, mid, uid)

  }

  listPerrmission = () => {
    listPerrmissionAPI(apiResponse => {
      console.log('kkkkkkkkkkkkkkk', apiResponse)
      if (apiResponse.status == 'success') {
        this.setState({
          userData: apiResponse.response.data.usertype,
          posmanager: apiResponse.response.data.posmanager,
          salesmanager: apiResponse.response.data.salesmanager,
          cashier: apiResponse.response.data.cashier,
          admin: apiResponse.response.data.admin,
          outletmanager: apiResponse.response.data.outletmanager,
          shiftmanager: apiResponse.response.data.shiftmanager,
          areamanager: apiResponse.response.data.areamanager,
          callmanager: apiResponse.response.data.callmanager,
          financemanager: apiResponse.response.data.financemanager,
          marketingmanager: apiResponse.response.data.marketingmanager,
        })
      }
    })
  }

  listBillPerrmission = () => {
    listBillPerrmissionAPI(apiResponse => {
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', apiResponse.response)
      if (apiResponse.response.data.success == true) {
        this.setState({
          BillUserData: apiResponse.response.data.usertype,
          BillPosmanager: apiResponse.response.data.posmanager,
          BillSalesmanager: apiResponse.response.data.salesmanager,
          BillCashier: apiResponse.response.data.cashier,
          BillAdmin: apiResponse.response.data.admin,
          BillOutletmanager: apiResponse.response.data.outletmanager,
          BillShiftmanager: apiResponse.response.data.shiftmanager,
          BillAreamanager: apiResponse.response.data.areamanager,
          BillCallmanager: apiResponse.response.data.callmanager,
          BillFinancemanager: apiResponse.response.data.financemanager,
          BillMarketingmanager: apiResponse.response.data.marketingmanager,
        })
      }
    })
  }

  componentDidMount() {
    this.listPerrmission();
    this.listBillPerrmission();
  }

  AddPermission = (value, mid, uid) => {
    AddPermissionAPI({ user_type: uid, main_route: mid, label: value ? value : "" }, ({ response }) => {
      console.log("rrrrrrrrrrrrrrrrrr", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "Permission Success")
        this.listPerrmission();
      }
      else {
        console.log(response.data.error)
        // if (response.data.error.id) {
        //   Notification(0, response.data.error.id, "Addon Group Error")
        // }
        // if (response.data.error.addon_name) {
        //   Notification(0, response.data.error.addon_name, "Addon Name Error")
        // }
        // if (response.data.error.price) {
        //   Notification(0, response.data.error.price, "Addon Price Error")
        // }
        // if (response.data.error.identifier) {
        //   Notification(0, response.data.error.identifier, "Addon Identifier Error")
        // }
        // if (response.data.error.addon_detail) {
        //   Notification(0, response.data.error.addon_detail, "Addon Detail Error")
        // }
      }
    });


  }

  AddBillPermission = (value, mid, uid) => {
    AddBillPermissionAPI({ user_type: uid, main_route: mid, label: value ? value : "" }, ({ response }) => {
      console.log("rrrrrrrrrrrrrrrrrr", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "Permission Success")
        this.listBillPerrmission();
      }
      else {
        console.log(response.data.error)
        // if (response.data.error.id) {
        //   Notification(0, response.data.error.id, "Addon Group Error")
        // }
        // if (response.data.error.addon_name) {
        //   Notification(0, response.data.error.addon_name, "Addon Name Error")
        // }
        // if (response.data.error.price) {
        //   Notification(0, response.data.error.price, "Addon Price Error")
        // }
        // if (response.data.error.identifier) {
        //   Notification(0, response.data.error.identifier, "Addon Identifier Error")
        // }
        // if (response.data.error.addon_detail) {
        //   Notification(0, response.data.error.addon_detail, "Addon Detail Error")
        // }
      }
    });


  }

  cancel = () => {
    this.setState({
      isFormOpen: false,
      isEdit: false,
      name: '',
      fileData: '',
      file: '',
      foodTypeArray: ''
    })
  }
  openForm = () => {
    this.setState({
      isFormOpen: true,
    })
    this.listPerrmission();
    this.listBillPerrmission();
  }


  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <div id='form'></div>
            <i
              className='iconsminds-shield text-primary'
              style={{ fontSize: 'x-large' }}
            />
            <Breadcrumb
              heading='menu.setting-permission'
              match={this.props.match}
            />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg='12' xl='8'>
            <Row>
              <Colxx md='12' className='mb-4'>
                {this.state.isEdit ? (
                  <AuthorizationEdit
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    handleChangeFoodType={this.handleChangeFoodType}
                    editTagHandler={this.editTagHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                  />
                ) : (
                    ''
                  )}
                {this.state.isFormOpen ? (
                  <AuthorizationAdd
                    {...this.state}
                    handleChangeOutlets={this.handleChangeOutlets}
                    handleBillOutlets={this.handleBillOutlets}
                    cancel={this.cancel}

                  />
                ) : (
                    ''
                  )}
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12'>
            <AuthorizationList
              {...this.state}
              handleChangeOutlets={this.handleChangeOutlets}
              handleBillOutlets={this.handleBillOutlets}
              openForm={this.openForm}
            />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(Authorization)
