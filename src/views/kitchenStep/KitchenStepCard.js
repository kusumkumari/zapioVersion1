/* eslint-disable */
import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { Row } from 'reactstrap'
import { Colxx, Separator } from '../../components/common/CustomBootstrap'
import Breadcrumb from '../../containers/navs/Breadcrumb'
import KitchenStepAdd from './KitchenStepAdd'
import KitchenStepEdit from './KitchenStepEdit'
import KitchenStepList from './KitchenStepList'
import {
  listActiveFoodTypeAPI,
  addKitchenStepsAPI,
  listKitchenStepsAPI,
  retrieveKitchenStepsAPI,
  kitchenStepsStatusAPI
} from '../ApiIntegration'
import { Notification } from '../Utils/Notification'

class KitchenStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      isEdit: false,
      data: [],
      foodTypeArray: [],
      dataLength: null,
      file: null,
      fileData: '',
      isFormOpen: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.resetFile = this.resetFile.bind(this)
  }
  handleChangeFoodType = e => {
    this.setState({ foodTypeArray: e })
  }
  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDrop(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileData: event.target.files[0]
    })
  }

  resetFile(event) {
    event.preventDefault()
    this.setState({ file: null, fileData: null })
  }

  addStepsHandler = () => {
    const { id, name, foodTypeArray, fileData } = this.state
    let foodVal = ''
    if (foodTypeArray) {
      foodVal = foodTypeArray.value
    } else {
      foodVal = ''
    }
    addKitchenStepsAPI(id, name, foodVal, fileData, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, 'Kitchen Steps Success')
        this.setState({ name: '', foodTypeArray: [], fileData: '', file: '' })
        this.listKitchenSteps()
      } else {
        if (response.data.error.name) {
          Notification(0, response.data.error.name, 'Ingridients Name Error')
        }
        if (response.data.error.food_type) {
          Notification(0, response.data.error.food_type, 'Food Type Error')
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, 'Image Size Error')
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, 'Duplication Error')
        }
      }
    })
  }

  editStepsHandler = () => {
    const { id, name, foodTypeArray, fileData } = this.state
    let foodVal = ''
    if (foodTypeArray) {
      if (foodTypeArray[0]) {
        foodVal = foodTypeArray[0].value
      } else {
        foodVal = foodTypeArray.value
      }
    } else {
      foodVal = ''
    }
    addKitchenStepsAPI(id, name, foodVal, fileData, ({ response }) => {
      if (response.data.success == true) {
        Notification(1, response.data.message, 'Kitchen Steps Success')
        this.setState({
          name: '',
          foodTypeArray: [],
          fileData: '',
          file: '',
          isEdit: false
        })
        this.listKitchenSteps()
      } else {
        if (response.data.error.name) {
          Notification(0, response.data.error.name, 'Ingridients Name Error')
        }
        if (response.data.error.food_type) {
          Notification(0, response.data.error.food_type, 'Food Type Error')
        }
        if (response.data.error.image_size) {
          Notification(0, response.data.error.image_size, 'Image Size Error')
        }
        if (response.data.error.unique_check) {
          Notification(0, response.data.error.unique_check, 'Duplication Error')
        }
      }
    })
  }

  retrieveKitchenStepsHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false })
    retrieveKitchenStepsAPI({ id: id.toString() }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          name: response.data.data[0].name,
          foodTypeArray: response.data.data[0].foodtype_detail,
          file: response.data.data[0].image,
          id: response.data.data[0].id
        })
      }
    })
  }

  listKitchenSteps = () => {
    listKitchenStepsAPI(apiResponse => {
      if (apiResponse.status == 'success') {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        })
      }
    })
  }
  componentDidMount() {
    listActiveFoodTypeAPI(apiResponse => {
      if (apiResponse.status == 'success') {
        this.setState({
          fooddata: apiResponse.response.data,
          fooddataLength: apiResponse.response.data.length
        })
      }
    })
    this.listKitchenSteps()
  }

  handleChangeStatus = e => {
    let id = e.original.id.toString()
    let status = (!e.original.active_status).toString()
    kitchenStepsStatusAPI(
      { id: id.toString(), active_status: status },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          Notification(
            1,
            apiResponse.response.data.message,
            'Kitchen Steps Status Changed'
          )
          this.listKitchenSteps()
        } else {
          Notification(
            0,
            'Something went wrong',
            'Kitchen Steps Status changed Error'
          )
        }
      }
    )
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
      isEdit: false,
      name: '',
      fileData: '',
      file: '',
      foodTypeArray: ''
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <div id='form'></div>
            <i
              className='iconsminds-chopsticks text-primary'
              style={{ fontSize: 'x-large' }}
            />
            <Breadcrumb
              heading='menu.kitchen-step-management'
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
                  <KitchenStepEdit
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    handleChangeFoodType={this.handleChangeFoodType}
                    editStepsHandler={this.editStepsHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                  />
                ) : (
                  ''
                )}
                {this.state.isFormOpen ? (
                  <KitchenStepAdd
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    handleChangeFoodType={this.handleChangeFoodType}
                    addStepsHandler={this.addStepsHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
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
            <KitchenStepList
              {...this.state}
              retrieveKitchenStepsHandler={this.retrieveKitchenStepsHandler}
              handleChangeStatus={this.handleChangeStatus}
              title='dashboards.top-viewed-posts'
              openForm={this.openForm}
            />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(KitchenStep)
