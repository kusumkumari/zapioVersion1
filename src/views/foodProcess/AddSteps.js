/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  Row
} from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'
import { Colxx, } from '../../components/common/CustomBootstrap'
import Select from 'react-select'
import CustomSelectInput from '../../components/common/CustomSelectInput'
import { Close, Add, Timer, Delete, Info } from '@material-ui/icons'
import {
  buttonStyleDefault,
  centerContent
} from '../../constants/defaultValues'
import '../../assets/css/transition.css'

const defaultIng = { name: '', quantity: '', unit: '', id: '' }
const defaultState = {
  id: '',
  product: '',
  varient: '',
  step: -1,
  process: '',
  description: '',
  time_of_process: '',
  image: '',
  ingrediate: [defaultIng],
  detailing_data: []
}
export default class AddSteps extends React.Component {
  constructor() {
    super()
    this.refresh = this.refresh.bind(this)
  }
  state = defaultState
  componentDidUpdate(props) {
    const { detailing_data, stepProduct } = props
    if (detailing_data.length + 1 !== this.state.step)
      this.setState({ step: detailing_data.length + 1 })
    if (stepProduct) {
      if (this.state.product == stepProduct.p_id) return
      this.setState({
        step: detailing_data.length + 1,
        product: stepProduct.p_id,
        id: stepProduct.p_id,
        varient: stepProduct.v_id,
        stepProduct: this.props.stepProduct
      })
    }
  }
  refresh = () => {
    this.setState({
      process: '',
      description: '',
      time_of_process: '',
      image: '',
      ingrediate: [{ name: '', quantity: '', id: '', unit: '' }]
    })
  }
  onChange = e => {
    if (e.target) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  onIngChange = i => evt => {
    const { ingrediate } = this.state
    if (evt.value) {
      ingrediate[i].name = evt.value.name
      ingrediate[i].id = evt.value.id.toString()
    } else {
      ingrediate[i][evt.target.name] = evt.target.value
    }
    this.setState({ ingrediate })
  }

  updateIngredient = (stat, ind) => {
    if (stat)
      this.setState(state => ({
        ingrediate: [
          ...state.ingrediate,
          { name: '', quantity: '', unit: '', id: '' }
        ]
      }))
    else
      this.setState(state => ({
        ingrediate: state.ingrediate.filter((v, indx) => ind !== indx)
      }))
  }
  handleFileData = e => {
    this.setState({ image: e.target.files[0] })
  }
  render() {
    const {
      visible = false,
      detailing_data,
      addStep,
      ingredients,
      closeModal
    } = this.props
    const { stepProduct } = this.state
    return (
      <Modal isOpen={visible}>
        <ModalHeader>
          Add Steps
          <Close
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
            onClick={closeModal}
          />
        </ModalHeader>
        <ModalBody>
          <Row>
            <Colxx sm='12'>
              <Card>
                <CardBody>
                  <Row>
                    <Colxx sm='1'>
                    </Colxx>
                    <Colxx sm='11'>
                      <CardTitle className='d-flex flex-column align-items-start justify-content-start'>
                        <span className='font-weight-bold'>
                          {stepProduct ? stepProduct.product : null}
                        </span>
                        <span>{stepProduct ? stepProduct.variant : null}</span>
                        {stepProduct ? (
                          <span
                            className={`badge badge-${
                              stepProduct.active_status ? 'info' : 'danger'
                            } ${centerContent} rounded`}>
                            <Info className='mr-1' fontSize='small' />
                            {stepProduct.active_status ? 'Active' : 'Inactive'}
                          </span>
                        ) : null}
                      </CardTitle>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          {detailing_data
            ? detailing_data
                .sort((a, b) => a.step - b.step)
                .map(pr => (
                  <Card style={{ borderRadius: 5 }} className='my-2 entry' key={pr.step}>
                    <CardBody>
                      <Row>
                        <Colxx sm='2'>
                          <span className='border border-primary rounded-pill px-2 py-1'>
                            {pr.step}
                          </span>
                        </Colxx>
                        <Colxx sm='8' className='d-flex flex-column'>
                          <span className='font-weight-bold'>
                            {pr.processName}
                          </span>
                          <span className='text-secondary'>
                            {pr.description}
                          </span>
                        </Colxx>
                        {/* <Colxx sm='5' /> */}
                        <Colxx sm='2'>
                          <span className='border border-primary rounded-pill px-2 py-1 font-weight-bold'>
                            <Timer fontSize='small' className='mr-1' />
                            {pr.time_of_process}s
                          </span>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                ))
            : null}
          <Card style={{ borderRadius: 5 }}>
            <CardBody>
              <CardTitle style={{ color: '#aaa' }}>Next Step</CardTitle>
              <FormGroup row className='my-2'>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.step-no' />
                </Label>
                <Colxx sm='8'>
                  <Input
                    disabled
                    type='number'
                    name='stepNo'
                    value={detailing_data.length + 1}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.step-name' />
                </Label>
                <Colxx sm='8'>
                  <Input
                    type='text'
                    name='process'
                    value={this.state.process}
                    onChange={this.onChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.step-time' />
                </Label>
                <Colxx sm='8'>
                  <Input
                    type='number'
                    name='time_of_process'
                    value={this.state.time_of_process}
                    onChange={this.onChange}
                  />
                </Colxx>
              </FormGroup>
              <FormGroup row>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.step-descrip' />
                </Label>
                <Colxx sm='8'>
                  <Input
                    type='text'
                    name='description'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.process-image' />
                </Label>
                <Label
                  className='font-weight-bold'
                  sm='4'
                  style={{
                    border: '1px solid #ccc',
                    display: 'inlineBlock',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    marginLeft: '15px',
                    color: 'hsl(0,0%,50%)'
                  }}>
                  Upload Step Food Prepare Process Image
                  <Input
                    type='file'
                    onChange={this.handleFileData}
                    style={{ display: 'none' }}
                  />
                </Label>
                <Colxx sm='3'>
                  {this.state.image && (
                    <div className='entry' style={{ textAlign: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          style={{
                            height: '63px',
                            width: '80px',
                            objectFit: 'cover'
                          }}
                          src={URL.createObjectURL(this.state.image)}
                        />
                        &nbsp;&nbsp;
                        <i
                          style={{ outlineColor: 'primary' }}
                          size=''
                          className='simple-icon-trash'
                          onClick={e => {
                            e.preventDefault()
                            this.setState({ image: '' })
                          }}
                        />
                      </span>
                    </div>
                  )}
                </Colxx>
              </FormGroup>

              <FormGroup row>
                <Label className='font-weight-bold' sm='4'>
                  <IntlMessages id='food.food-ingredients' />
                </Label>
                <Colxx sm='8'>
                  {this.state.ingrediate
                    ? this.state.ingrediate.map((ing, idx) => (
                        <Row className='entry' key={idx}>
                          <FormGroup row key={idx}>
                            <Colxx sm='4'>
                              <Select
                                components={{ Input: CustomSelectInput }}
                                placeholder='Ingredients'
                                className='react-select'
                                classNamePrefix='react-select'
                                // name='iname'
                                value={{ label: ing.name }}
                                onChange={this.onIngChange(idx)}
                                options={
                                  ingredients
                                    ? ingredients
                                        .filter(v => v.active_status)
                                        .map(v => ({
                                          label: v.name,
                                          value: v,
                                          key: v.id
                                        }))
                                    : []
                                }
                              />
                            </Colxx>

                            <Colxx sm='3'>
                              <Input
                                type='text'
                                placeholder='Unit'
                                style={{ margin: 0, padding: '0.68rem' }}
                                value={ing.unit}
                                name='unit'
                                onChange={this.onIngChange(idx)}
                              />
                            </Colxx>
                            <Colxx sm='3'>
                              <Input
                                type='number'
                                placeholder='Quanity'
                                style={{ margin: 0, padding: '0.68rem' }}
                                value={ing.quantity}
                                name='quantity'
                                onChange={this.onIngChange(idx)}
                              />
                            </Colxx>
                            <Colxx sm='2' style={{ alignSelf: 'center' }}>
                              <Button
                                // disabled={idx == 0}
                                color='primary'
                                size='xs'
                                style={{ borderRadius: '500px' }}
                                className='p-2'
                                onClick={() => {
                                  this.updateIngredient(false, idx)
                                }}>
                                <Delete style={{ fontSize: '18px' }} />
                              </Button>
                            </Colxx>
                          </FormGroup>
                        </Row>
                      ))
                    : null}
                  <Row>
                    <Colxx sm='4'>
                      <Button
                        color='primary'
                        size='xs'
                        style={{ borderRadius: '500px' }}
                        className={`${centerContent} py-1 px-2`}
                        onClick={() => {
                          this.updateIngredient(true)
                        }}>
                        <Add fontSize='small' />
                        Ingredient
                      </Button>
                    </Colxx>
                    <Colxx sm='8' />
                  </Row>
                </Colxx>
              </FormGroup>
              <Row>
                <Colxx
                  sm='12'
                  className='d-flex flex-row justify-content-end mt-4'>
                  <Button
                    className={`${buttonStyleDefault} mr-2`}
                    style={{ borderRadius: 3 }}
                    color='danger'
                    onClick={() => {
                      this.setState({
                        ...defaultState,
                        ingrediate: [
                          { name: '', quantity: '', unit: '', id: '' }
                        ]
                      })
                      closeModal()
                    }}>
                    <IntlMessages id='product.cancel' />
                  </Button>
                  <Button
                    className={`${buttonStyleDefault}`}
                    style={{ borderRadius: 3 }}
                    color='primary'
                    onClick={() => {
                      addStep(this.state, this.refresh)
                    }}>
                    <IntlMessages id='product.save' />
                  </Button>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    )
  }
}
