/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button,Form } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Add, ListAlt, Edit } from "@material-ui/icons";
import { userType } from "../ApiIntegration";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
class AuthorizationList extends Component {
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

    const scroll = {
      overflowY: "scroll",
      height: "370px",
      overflowX: "scroll"
    };
    return (
      <Card className="mb-4">
        <CardBody>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "black" }}>
                <ListAlt />
              </Avatar>
            }
            action={
              userType() !== "is_cashier" && (
                <Button
                  className="px-3 py-2 font-weight-bold d-flex align-items-center"
                  onClick={() => this.props.openForm()}
                >
                  <Add className="mr-1" />
                  Add Permissions
                </Button>
              )
            }
            title={
              <h3>
                <IntlMessages
                  id={"authorization.list"}
                  style={{ fontWeight: "600" }}
                />{" "}
              </h3>
            }
          />

          <Card>
            <CardBody>
              <Form className="dashboard-quick-post">
                <table id="customersts">
                  <thead
                    // style={{
                    //   position: "fixed",
                    //   maxWidth: "978px",
                    //   zIndex: "1",
                    //   top: "94px"
                    // }}
                  >
                    <tr style={{ backgroundColor: "#334080" }}>
                      <th>Functionalities / Designations</th>
                      {userData.map((datas, idx) => (
                        <th id={datas.id} key={idx}>{datas.user_type}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="btn-warning">
                      <td colSpan="11">
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
                      <tr colSpan="2">
                      {posmanager.map((data,idx)=>

                        <td  className="text-primary d-block btp" key={idx}>
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
      
        </CardBody>
      </Card>
    );
  }
}

export default AuthorizationList;
