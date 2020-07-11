/* eslint-disable */
import React, { Component } from 'react'
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { NotificationManager } from '../../components/common/react-notifications'
import { Formik, Form, Field } from 'formik'
import { Colxx } from '../../components/common/CustomBootstrap'
import IntlMessages from '../../helpers/IntlMessages'
import { loginAPI } from '../ApiIntegration'
import { LockRounded } from '@material-ui/icons'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onUserLogin = values => {
    if (!this.props.loading) {
      if (values.email !== '' && values.password !== '') {
        loginAPI(values.email, values.password, response => {
          if (response.response.data['credential'] == false) {
            let errorMsg = response.response.data['message']
            this.componentDidUpdate(errorMsg)
          }
          if (response.response.data['success'] == true) {
            NotificationManager.success(
              response.response.data['message'],
              'Login success',
              1000,
              null,
              null,
              ''
            )
            window.location.href = '/'
            // this.props.history.push('/');
          }
        })
      }
    }
  }

  validateEmail = value => {
    let error
    if (!value) {
      error = 'Please enter your Username'
    }
    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    //   error = "Invalid email address";
    // }
    return error
  }

  validatePassword = value => {
    let error
    if (!value) {
      error = 'Please enter your password'
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters'
    }
    return error
  }

  componentDidUpdate(error) {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 1000, null, null, '')
    }
  }

  render() {
    const { password, email } = this.state
    const initialValues = { email, password }

    return (
      <Row className='h-100'>
        <Colxx
          xxs='5'
          md='5'
          className='mx-auto my-auto p-0'>
          <Card className='auth-card'>
            <div className='position-relative image-side '>
              <p className='text-white h2'>Zapio Food Services</p>
              <p className='white mb-0'>
                Please use your credentials to login.
                <br />
                If you are not a member, please{' '}
                <NavLink to={`/register`} className='white'>
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className='form-side'>
              <div to='' className='white'>
                <span className='logo-single' />
              </div>
              <CardTitle className='d-inline-flex align-items-center mb-4'>
                <LockRounded fontSize='small' className='mr-2' />
                <IntlMessages id='user.login-title' />
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className='av-tooltip tooltip-label-bottom'>
                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.username' />
                      </Label>
                      <Field
                        className='form-control'
                        name='email'
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className='invalid-feedback d-block'>
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.password' />
                      </Label>
                      <Field
                        className='form-control'
                        type='password'
                        name='password'
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className='invalid-feedback d-block'>
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className='d-flex justify-content-between align-items-center mt-2'>
                      <Button
                        // color='primary'
                        style={{background:'#ffd600',color:'#000',border:'none'}}
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? 'show-spinner' : ''
                        }`}
                        size='lg'>
                        <span className='spinner d-inline-block'>
                          <span className='bounce1' />
                          <span className='bounce2' />
                          <span className='bounce3' />
                        </span>
                        <span className='label'>
                          <IntlMessages id='user.login-title' />
                        </span>
                      </Button>
                    </div>
                    {/* <NavLink to={`/user/forgot-password`}>
                      <IntlMessages id='user.forgot-password' />
                    </NavLink> */}
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    )
  }
}

export default Login
