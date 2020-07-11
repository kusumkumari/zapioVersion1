/* eslint-disable */
import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Collapse,
  CustomInput,
  Label,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from "reactstrap";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
// import CheckboxTree from 'react-checkbox-tree';
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import Avatar from "@material-ui/core/Avatar";
import { Save, Close } from "@material-ui/icons";

export default class AuthorizationAdd extends Component {
  render() {
    const {
      userData,
      posmanager,
      cashier,
      salesmanager,
      admin,
      outletmanager,
      shiftmanager,
      areamanager,
      callmanager,
      financemanager,
      marketingmanager,
      BillPosmanager,
      BillSalesmanager,
      BillCashier,
      BillAdmin,
      BillOutletmanager,
      BillShiftmanager,
      BillAreamanager,
      BillCallmanager,
      BillFinancemanager,
      BillMarketingmanager
    } = this.props;

    const permissions = [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" }
    ];


    return (
      <Modal isOpen={this.props.isFormOpen} style={{ height: "600px" }}>
        <ModalHeader className="flexboxes" toggle={this.props.cancel}>
          <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
            <i className="iconsminds-shield" style={{ fontSize: "xx-large" }} />
          </Avatar>
          &nbsp;
          <IntlMessages id="add.permissions" />
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <table id="customersts">
                  <thead
                    style={{
                      position: "fixed",
                      zIndex: "1",
                      top: "94px"
                    }}
                  >
                    <tr style={{ backgroundColor: "#334080" }}>
                      <th>Functionalities / Designations</th>
                      {userData.map((datas, idx) => (
                        <th id={datas.id} key={idx}>{datas.user_type}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr key="1" className="btn-warning">
                      <td>
                        <div
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color:"white"
                          }}
                        >

                          &nbsp; IPOS
                        </div>
                      </td>
                    </tr>
                   <div className="flexbox">
                    <table> 
                      <tr style={{width: "128px"}}>
                      {posmanager.map((data,idx)=>

                        <td className="text-primary d-block btp" key={idx}>
                          <div className="flexbox">
                          <i
                            className={data.icon+" text-danger"}
                            style={{ fontSize: "large",lineHeight:"1" }}
                          />
                        &nbsp;     <IntlMessages className="ft-s" id={data.route} />
                          </div>
                        </td>
                      
                      )}
                      
                       </tr>
                       </table>

                       <table>
                         <tr>
                         {posmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                      <table>
                         <tr>
                         {salesmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {cashier.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   








                      <table>
                         <tr>
                         {admin.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {outletmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {shiftmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {areamanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {callmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {financemanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {marketingmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleChangeOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      </div>
                  

                  {/* Billing Module */}
                      <tr key="1" className="btn-primary">
                      <td colSpan="4">
                        <div
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color:"white"
                          }}
                        >

                          &nbsp; Billing
                        </div>
                      </td>
                    </tr>
                   <div className="flexbox">
                    <table> 
                      <tr style={{width: "128px"}}>
                      {BillPosmanager.map((data,idx)=>

                        <td className="text-primary d-block btp" key={idx}>
                          <div className="flexbox">
                          <i
                            className={data.icon+" text-danger"}
                            style={{ fontSize: "large",lineHeight:"1" }}
                          />
                        &nbsp;     <IntlMessages className="ft-s" id={data.route} />
                          </div>
                        </td>
                      
                      )}
                      
                       </tr>
                       </table>

                       <table>
                         <tr>
                         {BillPosmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                      <table>
                         <tr>
                         {BillSalesmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillCashier.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   








                      <table>
                         <tr>
                         {BillAdmin.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillOutletmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillShiftmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillAreamanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>

                      <table>
                         <tr>
                         {BillCallmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillFinancemanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      <table>
                         <tr>
                         {BillMarketingmanager.map((data,idx)=>

                        <td className="d-block" key={idx}>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            style={{ width: "100%" }}
                            className="react-select"
                            classNamePrefix="react-select"
                            value={data.rolls}
                            placeholder="Permissions"
                            onChange={(e)=>this.props.handleBillOutlets(e,data.ids,data.types)}
                            options={permissions}
                          />
                        </td>
                         )}
                      </tr>
                      </table>
                   
                      </div>
                  
                
                  </tbody>
                </table>
              </Form>

            </CardBody>
          </Card>
      
        </ModalBody>
      </Modal>
    );
  }
}
