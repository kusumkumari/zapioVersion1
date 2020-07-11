/* eslint-disable */
import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { userType } from '../../views/ApiIntegration';

import {
  Link,
} from "react-router-dom";
import { Notifications } from "@material-ui/icons";
const usertype = userType()

const TopnavNotifications = (props) => {
  const { notiCount, notifyDetail, notifyDetailLength, handleChange, brandnotiCount, brandnotifyDetail, brandnotifyDetailLength, handleChangeBrand } = props;
  let notificationData = []
  for (let i = 0; i < notifyDetailLength; i++) {
    const { order_id, mobile_number, email, id } = notifyDetail[i]
    notificationData.push({ order_id: order_id, title: mobile_number, date: email, id: id })
  }
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >        
          <div className='btn border border-0 bg-white p-2' > 
            <Notifications fontSize='small' color='primary' /> 
          </div>
          {usertype == 'is_outlet' && notiCount != 0 ?
            <span className="count">{notiCount}</span>
            : ""}
          {usertype == 'is_brand' && brandnotiCount != 0 ?
            <span className="count">{brandnotiCount}</span>
            : ""
          }
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {usertype == 'is_outlet' ?
              notificationData.map((notificationData, index) => (
                <div key={index} className="d-flex flex-row mb-3 pb-3 border-bottom">
                  <Link to={"/notification-list/" + notificationData.id} onClick={(e) => handleChange(notificationData.id)}>
                    <p className="font-weight-medium mb-1">{notificationData.order_id}</p>
                  </Link>
                  <div className="pl-3 pr-2">
                    <Link to={"/notification-list/" + notificationData.id} onClick={(e) => handleChange(notificationData.id)}>
                      <p className="font-weight-medium mb-1">{notificationData.title}</p>
                      <p className="text-muted mb-0 text-small">{notificationData.date}</p>
                    </Link>
                  </div>
                  <br />
                  <Link to="/notification-list/">Sell All </Link>
                </div>
              )) : ""
            }
            {usertype == 'is_brand' ?
              brandnotifyDetail.map((notificationData, index) => (
                <div key={index} className="d-flex flex-row mb-3 pb-3 border-bottom">
                  <Link to={"/notification-list/" + notificationData.id} onClick={(e) => handleChangeBrand(notificationData.id)}>
                    <p className="font-weight-medium mb-1">{notificationData.order_id}</p>
                  </Link>
                  <div className="pl-3 pr-2">
                    <Link to={"/notification-list/" + notificationData.id} onClick={(e) => handleChangeBrand(notificationData.id)}>
                      <p className="font-weight-medium mb-1">{notificationData.title}</p>
                      <p className="text-muted mb-0 text-small">{notificationData.date}</p>
                    </Link>
                  </div>
                  <br />
                </div>
              ))
              : ""}
          </PerfectScrollbar>
          {usertype == 'is_brand' && brandnotifyDetailLength == 0 ? "No Notification Found " : ""}
          {usertype == 'is_outlet' && notifyDetailLength == 0 ? "No Notification Found " : ""}
          <br />
          <Link to="/notification-list/" className="text-primary" style={{ fontSize: "large", textAlign: "center", display: "block" }}>See All </Link>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
