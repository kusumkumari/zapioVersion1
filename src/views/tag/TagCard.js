/* eslint-disable */
import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { Row } from 'reactstrap'
import { Colxx, Separator } from '../../components/common/CustomBootstrap'
import Breadcrumb from '../../containers/navs/Breadcrumb'
import TagAdd from './TagAdd'
import TagEdit from './TagEdit'
import TagList from './TagList'
import {
  listActiveFoodTypeAPI,
  addTagsAPI,
  listTagsAPI,
  retrieveTagAPI,
  tagStatusAPI
} from '../ApiIntegration'
import { Notification } from '../Utils/Notification'

class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      tag: '',
      isEdit: false,
      data: [],
      dataLength: null,
      file: null,
      fileData: '',
      isFormOpen: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.resetFile = this.resetFile.bind(this)
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

  addTagHandler = () => {
    const { id, tag, fileData } = this.state
    addTagsAPI(id, tag, fileData, ( response ) => {
      if (response.response.data.success == true) {
        Notification(1, response.response.data.message, 'Tag Success')
        this.setState({ tag: '', fileData: '', file: '', isFormOpen:false })
        this.listTags()
      } else {
        const err = response.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    })
  }

  editTagHandler = () => {
    const { id, tag, fileData } = this.state
    addTagsAPI(id, tag, fileData, ({ response }) => {
      if (response.response.data.success == true) {
        Notification(1, response.response.data.message, 'Tag Success')
        this.setState({
          name: '',
          fileData: '',
          file: '',
          isEdit: false
        })
        this.listTags()
      } else {
        const err = response.response.data.error
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`)
        })
      }
    })
  }

  retrieveTagHandler = id => {
    this.setState({ isEdit: true, isFormOpen: false })
    retrieveTagAPI({ id: id.toString() }, ({ response }) => {
      if (response.data.success == true) {
        this.setState({
          tag: response.data.data[0].tag_name,
          file: response.data.data[0].tag_image,
          id: response.data.data[0].id
        })
      }
    })
  }

  listTags = () => {
    listTagsAPI(apiResponse => {
      if (apiResponse.status == 'success') {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        })
      }
    })
  }
  componentDidMount() {
    this.listTags()
  }

  handleChangeStatus = e => {
    let id = e.original.id.toString()
    let status = (!e.original.active_status).toString()
    tagStatusAPI(
      { id: id.toString(), active_status: status },
      apiResponse => {
        if (apiResponse.response.data.success == true) {
          Notification(
            1,
            apiResponse.response.data.message,
            'Tag Status Changed'
          )
          this.listTags()
        } else {
          Notification(
            0,
            'Something went wrong',
            'Tag Status changed Error'
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
    })
  }
  openForm = () => {
    this.setState({
      isFormOpen: true,
      isEdit: false,
      name: '',
      fileData: '',
      file: '',
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <div id='form'></div>
            <i
              className='iconsminds-tag text-primary'
              style={{ fontSize: 'x-large' }}
            />
            <Breadcrumb
              heading='menu.tag'
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
                  <TagEdit
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    editTagHandler={this.editTagHandler}
                    onDrop={this.onDrop}
                    resetFile={this.resetFile}
                    cancel={this.cancel}
                  />
                ) : (
                  ''
                )}
                {this.state.isFormOpen ? (
                  <TagAdd
                    {...this.state}
                    handleTextChange={this.handleTextChange}
                    addTagHandler={this.addTagHandler}
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
            <TagList
              {...this.state}
              retrieveTagHandler={this.retrieveTagHandler}
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
export default injectIntl(Tag)
