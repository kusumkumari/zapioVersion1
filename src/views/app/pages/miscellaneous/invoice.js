import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Table } from "reactstrap";
// import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
// import IntlMessages from "../../../../helpers/IntlMessages";
import '../../../../../src/assets/css/sass/style/style.css';

class InvoicePages extends Component {

  render() {
    const data = this.props.data;
    console.log(data);
    const productData = data.detailing_data.order_description.map((arr) => {
      return (
        <tbody>
          <td><p className="prod-name" key={arr.id}>{arr.name} {arr.size.length > 4 ? <span className="prod-varient"> {arr.size}</span> : null}</p>
            {arr.add_ons.map((addonArr) => {
              return (
                <p className="prod-addon" key={addonArr.id}>Addons:  <span>{addonArr.addon_name} ₹{addonArr.price}</span></p>
              )
            })}
          </td>
          <td>{arr.quantity}</td>
          <td className="text-right">₹ {arr.price}</td>
        </tbody>
      )
    })
    return (
      <Fragment>
        {/* <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.invoice" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row> */}
        {/* <Row>
          <Colxx xxs="12">
            <Card className="mb-5">
              <CardBody>
                <IntlMessages id="pages.invoice-info" />
              </CardBody>
            </Card>
          </Colxx>
        </Row> */}

        <Row className="invoice-react">
          <Colxx xxs="12">
            <Card className="invoice-contents">
              <CardBody className="d-flex flex-column justify-content-between">
                <i className="fa fa-close text-right font-600" style={{ cursor: 'pointer' }} onClick={this.props.toggle}></i>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                    <div className="d-flex align-self-center">
                      {data.detailing_data.name ? data.detailing_data.name : null} <br />
                      {data.detailing_data.email ? data.detailing_data.email : null}
                      <br />
                      {data.detailing_data.mobile_number ? data.detailing_data.mobile_number : null}
                      <br />
                      {data.detailing_data.address &&
                        data.detailing_data.address.length > 0 ? (
                          data.detailing_data.address.map((add, idx) => (
                            <>
                              {add.address ? add.address : "N/A"}
                              {add.locality ? add.locality : "N/A"}
                            </>
                          ))) : "N/A"}
                    </div>
                    <div className="d-flex text-right align-self-center">
                      <p className="text-small mb-0 font-600">

                        {data.detailing_data.other_order_id}
                        <br />
                        {data.detailing_data.order_time}
                      </p>
                    </div>
                  </div>
                  <div className="border-bottom pt-4 mb-5" />

                  {/* <div className="d-flex flex-row justify-content-between mb-5">
                    <div className="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                    </div>
                    <div className="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">

                    </div>
                  </div> */}

                  <Table borderless>
                    <thead>
                      <tr>
                        <th className="mb-2 w-70">
                          ITEM NAME
                        </th>
                        <th className="mb-2">
                          Quantity
                        </th>
                        <th className="text-right mb-2">
                          PRICE
                        </th>
                      </tr>
                    </thead>
                    {productData}
                  </Table>
                </div>
                <div className="d-flex flex-column">
                  <div className="border-bottom pt-3 mb-5" />
                  <Table borderless className="d-flex justify-content-end">
                    <tbody>
                      <tr>
                        <td className="text-semi-muted">Subtotal :</td>
                        <td className="text-right">₹ {data.detailing_data.sub_total.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-semi-muted">Discount :</td>
                        <td className="text-right">₹ {data.detailing_data.discount_value.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-semi-muted">Tax :</td>
                        <td className="text-right">₹ {data.detailing_data.taxes.toFixed(2)}</td>
                      </tr>
                      <tr className="font-weight-bold">
                        <td className="text-semi-muted">Total :</td>
                        <td className="text-right">₹ {data.detailing_data.total_bill_value.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-semi-muted">Payment :</td>
                        <td className="text-right">{data.detailing_data.payment_mode}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="border-bottom pt-3 mb-5" />
                  {/* <p className="text-muted text-small text-center">
                    Invoice was created on a computer and is valid without the
                    signature and seal.{" "}
                  </p> */}
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default InvoicePages;
