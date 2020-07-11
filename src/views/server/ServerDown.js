import React from 'react'
import { Col, Row, Card, CardBody } from 'reactstrap'
import { centerContent } from '../../constants/defaultValues'

const pop = {
  fontWeight: 'bold',
  fontSize: '2rem',
  whiteSpace: 'nowrap',
  padding: '20px',
  background: '#2962ff',
  borderRadius: '50px',
  color:'#fff',
  borderBottomLeftRadius:'5px',
  animation:'op2 0.5s ease',
  boxShadow:'0 2px 5px rgba(0,0,0,0.2)',
  transformOrigin:'bottom left'
}
const ServerDown = () => {
  return (
    <Row
      style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
      className='d-flex align-items-center justify-content-center'>
      <Col />
      <Col>
        <Card>
          <CardBody className='d-flex flex-row'>
            <img
            alt="Server Down"
              style={{ width: '250px', height: '250px' }}
              src={require('./server.svg')}
            />
            <div className={`${centerContent} flex-column ml-2`} style={{ flex: 1 }}>
              <p style={pop}>Server Busy!</p>
              <p style={{fontWeight:'bold'}}>Please try again later</p>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  )
}
export default ServerDown
