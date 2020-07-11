/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle, Button, Badge, Modal, ModalBody, ModalHeader } from "reactstrap";
import Pagination from "../../../components/DatatablePagination";
import IntlMessages from "../../../helpers/IntlMessages";
import { Done, Clear } from '@material-ui/icons';
import {
  ChevronRightRounded,
  RemoveRedEye
} from '@material-ui/icons'
import {
  buttonStyleDefault
} from '../../../constants/defaultValues'

class RecentOrders extends Component {

  componentDidMount() {
    const dataEdited = this.props.orderDetails.slice(0, 12);

    this.setState({
      orderDetails: dataEdited,
    });
  }

  render() {
    const {orderDetails, detailing_data}=this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
           <i className="fa fa-pizza-slice" style={{fontSize:"x-large"}} /> <IntlMessages id={"dashboards.order-details"} />
          </CardTitle>
            <ReactTable
              data={orderDetails}
              defaultPageSize={6}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={Pagination}
              columns={[
                
                {
                  Header: "Order ID",
                  accessor: "order_id",
                  filterable: true,
                  Cell: props => <p className="text-primary text-muted">{props.value}</p>
                },
                {
                  Header: "Order Status",
                  accessor: "order_status",
                  filterable: true,
                  Cell: props => <p
                  className={`font-weight-bold`}>
                  <Badge color={props.original.color_code} pill>
                    {props.value}
                  </Badge>
                </p>
                },
                {
                  Header: 'Order Time',
                  accessor: 'order_time',
                  filterable: true,
                  Cell: props => (
                    <p className='text-warning'>
                      {props.value ? props.value : 'N/A'}
                    </p>
                  )
                },
                {
                  Header: 'Delivery Time',
                  accessor: 'delivery_time',
                  filterable: true,
                  Cell: props => (
                    <p className='text-muted'>
                      {props.value ? props.value : 'N/A'}
                    </p>
                  )
                },
                {
                  Header: 'Payment Mode',
                  accessor: 'payment_mode',
                  filterable: true,
                  Cell: props => (
                    <p
                      className={`font-weight-bold`} >
                      {props.value ?
                        props.value == 'Cash on Delivery' ?
                          <Badge color="info" pill>{props.value}</Badge> :
                          <Badge color="success" pill>{props.value}</Badge>
                        : "N/A"
                      }
                    </p>
                  )
                },
                {
                  Header: 'Outlet Name',
                  accessor: 'outlet_name',
                  filterable: true,
                  Cell: props => (
                    <p className='text-info font-weight-bold'>
                      {props.value ? props.value : 'N/A'}
                    </p>
                  )
                },
                {
                  Header: '',
                  accessor: 'id',
                  Cell: props => (
                    <Button
                      outline
                      onClick={e => this.props.toggle(props.value)}
                      style={{ borderRadius: '5px' }}
                      className='d-flex flex-row align-items-center px-3 py-2 ml-3'>
                      <RemoveRedEye fontSize='small' className='mr-2' />
                      View
                    </Button>
                  )
                },
                // {
                //   Header: '',
                //   accessor: 'can_process',
                //   Cell: props => (
                //     <Button
                //       style={{ borderRadius: '5px' }}
                //       disabled={props.value ? false : true}
                //       className={`${buttonStyleDefault}`}
                //       onClick={e => {
                //         this.props.handleOrderProcess(props)
                //       }}>
                //       Process Order
                //       <ChevronRightRounded />
                //     </Button>
                //   )
                // }
              ]}
            />
        </CardBody>
      
         <Modal
         fade={false}
         style={{ boxShadow: 'none', animation: 'op 0.1s ease' }}
         isOpen={this.props.modal}
         centered>
         <ModalHeader>
           <IntlMessages id='dashboards.order-manage' />
         </ModalHeader>
         <ModalBody>
           <div>
             Are you sure...you want to process this order with Id
             <b>{this.props.orderId}</b> ?
           </div>
           <Button
             className={'float-right mg-10'}
             style={{ borderRadius: '5px' }}
             color='primary'
             onClick={e => this.props.manageOrderProcessing()}>
             Yes
           </Button>
           &nbsp;
           <Button
             outline
             className='float-right mg-10'
             color='primary'
             style={{ borderRadius: '5px' }}
             onClick={this.props.cancel}>
             <IntlMessages id='product.cancel' />
           </Button>
         </ModalBody>
       </Modal>

       <Modal
         style={{ boxShadow: 'none', animation: 'op 0.1s ease' }}
         centered
         fade={false}
         isOpen={this.props.isView}>
         <ModalHeader>
           <IntlMessages id='dashboards.order-details' />
         </ModalHeader>
         <ModalBody>
           <div className='flexboxes'>
             <p className='wd-50'>
               <b className='font-600'>Order Time </b>:
               {detailing_data.order_time ? detailing_data.order_time : ''}
             </p>
             <p className='wd-50'>
               <b className='font-600'>Total Bill </b>: &#8377;
               {detailing_data.total_bill_value
                 ? detailing_data.total_bill_value
                 : 'N/A'}
             </p>
           </div>
           <div className='flexboxes'>
             <p className='wd-50'>
               <b className='font-600'>Sub Total </b>: &#8377;
               {detailing_data.sub_total ? detailing_data.sub_total : 'N/A'}
             </p>
             <p className='wd-50'>
               <b className='font-600'>Taxes </b>: &#8377;
               {detailing_data.taxes ? detailing_data.taxes : 'N/A'}
             </p>
           </div>
           {detailing_data.delivery_time ? (
             <div className='flexboxes flex-end'>
               <p className='wd-50'>
                 <b className='font-600'>Deliver Time </b>:
                 {detailing_data.delivery_time
                   ? detailing_data.delivery_time
                   : 'N/A'}
               </p>
             </div>
           ) : (
               ''
             )}
           <div className='flexboxes space-between'>
             <h5 className='h5-modal text-primary inline'>
               <i
                 className='simple-icon-people text-primary'
                 style={{ fontSize: 'large' }}
               />
               Customer Descritiption
             </h5>
             {/* <Link color="primary" className="float-right btns-1-1" to={"/customer-history/" + detailing_data.mobile_number}>Customer History</Link> */}
           </div>
           <div className='flexboxes'>
             <p className='wd-50'>
               <b className='font-600'>Name </b>:
               {detailing_data.name ? detailing_data.name : 'N/A'}
             </p>
             <p className='wd-50'>
               <b className='font-600'>E-mail </b>:
               {detailing_data.email ? detailing_data.email : 'N/A'}
             </p>
           </div>
           <div className='flexboxes'>
             <p className='wd-50'>
               <b className='font-600'>Mobile </b>:
               {detailing_data.mobile_number
                 ? detailing_data.mobile_number
                 : 'N/A'}
             </p>
             <p className='wd-50'>
               <b className='font-600'>Address </b>:
               {detailing_data.address ? detailing_data.address : 'N/A'}
             </p>
           </div>
           <div className='flexboxes flex-end'>
             <p className='wd-50'>
               <b className='font-600'>City </b>:
               {detailing_data.city ? detailing_data.city : 'N/A'}
             </p>
           </div>
           
           {detailing_data.order_description &&
             detailing_data.order_description.length > 0 ? (
               <div>
                 <h5 className='h5-modal text-primary'>
                   <i
                     className='iconsminds-receipt-4 text-primary'
                     style={{ fontSize: 'large' }}
                   />
                   Order Descritiption
               </h5>
                 <table id='customersts'>
                   <thead>
                   <tr className='btn-primary'>
                     <th>Customization Detail</th>
                     <th>Name</th>
                     <th>Price (&#8377;)</th>
                     <th>Qty.</th>
                     <th>Size</th>
                     <th>Food Type</th>
                   </tr>
                   </thead>
                   <tbody>
                   {detailing_data.order_description.map((order, idx) => (
                     <tr key={order.id}>
                       <td>
                         {order.customization_details &&
                           order.customization_details.length > 0
                           ? order.customization_details.map((cust, idx) => (
                             <p>
                               <b>Name :</b> {cust.name} , <b>Price: </b>
                               {cust.price}
                             </p>
                           ))
                           : 'N/A'}
                       </td>
                       <td> {order.name ? order.name : 'N/A'}</td>
                       <td> {order.price ? order.price : 'N/A'}</td>
                       <td>
                         {order.quantity ? (
                           <b className='blink text-primary'>{order.quantity}</b>
                         ) : (
                             'N/A'
                           )}
                       </td>
                       <td> {order.size} </td>
                       <td> {order.food_type ? order.food_type : 'N/A'}</td>
                     </tr>
                   ))}
                   </tbody>
                 </table>
               </div>
             ) : (
               ''
             )}
           <Button
             className='float-right mg-10'
             color='primary'
             onClick={this.props.cancel}>
             <IntlMessages id='product.cancel' />
           </Button>
         </ModalBody>
       </Modal>
       </Card>
    );
  }
}

export default RecentOrders;