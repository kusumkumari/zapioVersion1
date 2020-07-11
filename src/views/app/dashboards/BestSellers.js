/* eslint-disable */
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CardBody, CardTitle } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'

export const BestSellers = props => {
  const { produtcs } = props
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <i
            className='iconsminds-chef-hat text-primary'
            style={{ fontSize: 'x-large' }}
          />
          <IntlMessages id='dashboards.best-sellers' />
        </CardTitle>
        <div className='scroll dashboard-list-with-thumbs'>
          {produtcs && produtcs.length > 0 ? (
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}>
              {produtcs.slice(0, 6).map((order, index) => {
                return (
                  <Card className='border-sm my-2 mx-1' key={index}>
                    <CardBody className='px-3 py-4'>
                      <div key={index} className='d-flex flex-row'>
                        <p className='d-block position-relative'>
                          {order.img ? (
                            <img
                              src={order.img}
                              alt={order.title}
                              className='rounded-sm'
                              style={{
                                height: '100px',
                                width: '100px',
                                objectFit: 'cover',
                                boxShadow: '0 2px 10px #00000024'
                              }}
                            />
                          ) : (
                            <img
                              src={require('../../../assets/no-image.png')}
                              alt={order.title}
                              className='rounded-sm'
                              style={{
                                height: '100px',
                                width: '100px',
                                objectFit: 'cover'
                              }}
                            />
                          )}
                        </p>

                        <div className='d-flex flex-column align-items-start px-3'>
                          <p className='list-item-heading font-weight-bold'>
                            {order.title}
                          </p>
                          <div className='pr-4'>
                            <p className='text-muted text-small'>
                              {order.description}
                            </p>
                          </div>
                          <div
                            className={`badge badge-${
                              order.category == 'Vegetarian' ? 'info' : 'danger'
                            } text-small font-weight-medium d-none d-sm-block rounded px-2 py-1`}>
                            {order.category}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
            </PerfectScrollbar>
          ) : (
            <p style={{ textAlign: 'center' }}>No Data Available</p>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default BestSellers
