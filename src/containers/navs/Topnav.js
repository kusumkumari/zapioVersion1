/* eslint-disable */
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Tooltip,
  Label
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { setContainerClassnames, clickOnMobileMenu } from "../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
  isDarkSwitchActive
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavNotifications from "./Topnav.Notifications";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";

import {
  logoutAPI,
  listNotificationCountAPI,
  notificationSeenAPI,
  userType,
  soundStatusAPI,
  ChangeSoundModeAPI,
  brandNotificationCountAPI,
  notificationBrandSeenAPI
} from "../../views/ApiIntegration";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import { Notification } from "../../views/Utils/Notification";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  Settings,
  AccountCircle
} from "@material-ui/icons";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      loading: false,
      notifyDetail: [],
      notifyDetailLength: null,
      notiCount: "",
      isSound: true,
      brandnotiCount: "",
      brandnotifyDetail: [],
      sound: "",
      brandnotifyDetailLength: null,
      toggleTooltip: false
    };
    this.toggle = this.toggle.bind(this);
  }
  notification() {
    listNotificationCountAPI(apiResponse => {
      console.log("ddddddddddd", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          notiCount: apiResponse.response.data.ordercount,
          notifyDetail: apiResponse.response.data.orderdetails,
          notifyDetailLength: apiResponse.response.data.orderdetails.length
        });
      }
    });
  }
  handleChange = id => {
    notificationSeenAPI({ id: id }, apiResponse => {
      console.log("cccccccccccccc", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.orderdata,
          dataLength: apiResponse.response.data.orderdata.length
        });
      }
    });
  };
  handleChangeBrand = id => {
    notificationBrandSeenAPI({ id: id }, apiResponse => {
      console.log("aaaaaaaaa", apiResponse);
      if (apiResponse.response.data.success == true) {
        this.setState({
          data: apiResponse.response.data.orderdata,
          dataLength: apiResponse.response.data.orderdata.length
        });
      }
    });
  };
  brandNotification() {
    brandNotificationCountAPI(apiResponse => {
      console.log("bbbbbbb", apiResponse);
      if (apiResponse.response.data.status == true) {
        this.setState({
          brandnotiCount: apiResponse.response.data.ordercount,
          brandnotifyDetail: apiResponse.response.data.orderdetails,
          sound: apiResponse.response.data.sound,
          brandnotifyDetailLength: apiResponse.response.data.orderdetails.length
        });
        document.getElementById("audioSource").src =
          apiResponse.response.data.sound;
      }
    });
  }
  componentDidMount() {
    this.soundStatus();
    const usertype = userType();
    if (usertype == "is_outlet") {
      this.notification();

      this.interval = setInterval(() => {
        this.notification();
      }, 1 * 5000);
    }
    if (usertype == "is_brand") {
      this.brandNotification();
      this.interval = setInterval(() => {
        this.brandNotification();
      }, 1 * 15000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  soundStatus() {
    soundStatusAPI(apiResponse => {
      console.log("jjjjjjjj", apiResponse);
      if (apiResponse.response.data.status == true) {
        this.setState({
          isSound: apiResponse.response.data.data[0].is_sound
        });
        if (apiResponse.response.data.data[0].is_sound == false) {
          var x = (document.getElementById("audioSource").src =
            apiResponse.response.data.sound);
          x.pause();
        }
      }
    });
  }
  ChangeSoundMode(status) {
    ChangeSoundModeAPI({ is_sound: status }, apiResponse => {
      if (apiResponse.response.data.success == true) {
        this.setState({
          isSound: status
        });
        Notification(1, "", apiResponse.response.data.message);
        if (status == false) {
          var x = (document.getElementById("audioSource").src =
            apiResponse.response.data.sound);
          x.pause();
        }
      }
    });
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();
    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.setState({ loading: true });
    logoutAPI(response => {
      this.setState({ loading: false });
      this.props.history.push("/");
    });
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();
    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };
  toggle() {
    this.setState(state => ({ toggleTooltip: !state.toggleTooltip }));
  }
  render() {
    const { containerClassnames, menuClickCount } = this.props;
    const { sound } = this.state;
    const { messages } = this.props.intl;
    const usertype = userType();
    let whichUser=""
    if(usertype=="is_brand"){
      whichUser="Brand Manager"
    }
        if(usertype=="is_outlet"){
      whichUser="Outlet Manager"
    }
   else{
    whichUser=usertype
   }


    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}
          <div className="header-icons d-inline-flex align-items-center ">
            <audio
              id="audioSource"
              src={this.state.sound}
              autoPlay={this.state.isSound}
            />

            {
              // usertype=='is_outlet' ?
              <TopnavNotifications
                {...this.state}
                handleChange={this.handleChange}
                handleChangeBrand={this.handleChangeBrand}
              />
              // :""
            }

            <Button
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
              className="border border-0 bg-white p-2"
              style={{marginLeft : "-3px"}}
            >
              {this.state.isInFullScreen ? (
                <FullscreenExitOutlined fontSize="small" color="primary" />
              ) : (
                <FullscreenOutlined fontSize="small" color="primary" />
              )}
            </Button>
            <Button
              className="border border-0 bg-white p-2"
              id="brand-notif"
              style={{marginLeft: "6px"}}
            >
              {this.state.isSound ? (
                <MusicNoteOutlinedIcon
                  fontSize="small"
                  color="primary"
                  onClick={() => this.ChangeSoundMode(false)}
                />
              ) : (
                <MusicOffOutlinedIcon
                  fontSize="small"
                  color="primary"
                  onClick={() => this.ChangeSoundMode(true)}
                />
              )}
            </Button>

            <Tooltip
              placement="bottom"
              fade
              isOpen={this.state.toggleTooltip}
              target="brand-notif"
              toggle={this.toggle}
            >
              Notification sound
            </Tooltip>
            <div
              className="border border-0 p-2"
              color="primary"
              style={{ marginBottom: "-7px",marginLeft: "6px" }}
            >
              <Settings color="primary" />
              &nbsp; V.1.0.1
            </div>
            <div
              className="border border-0 p-2"
              color="primary"
              style={{ marginBottom: "-7px",marginLeft: "6px" }}
            >
              <AccountCircle color="primary" />
              &nbsp; <b color="primary" >{whichUser }</b>
            </div>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle
                className="top-nav-drop border rounded-sm px-2"
                color="empty"
              >
                <span className="name mr-1">
                  {localStorage.getItem("companyName")}
                </span>
                <span>
                  {localStorage.getItem("logo") == "null" ? (
                    <i
                      className="iconsminds-user"
                      style={{ fontSize: "x-large" }}
                    />
                  ) : (
                    <img alt="Profile" src={localStorage.getItem("logo")} />
                  )}
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {userType() !== "is_cashier" && (
                  <>
                    <Link to="/settings">
                      <DropdownItem>
                        {" "}
                        <i className="simple-icon-settings" /> Account Settings
                      </DropdownItem>
                    </Link>

                    <DropdownItem divider />
                  </>
                )}
                <Link to="/Changepassword">
                  {" "}
                  <DropdownItem>
                    {" "}
                    <i className="iconsminds-security-settings" /> Change
                    Password
                  </DropdownItem>
                </Link>

                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  <i className="simple-icon-power" /> Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems
  };
};
export default injectIntl(
  connect(mapStateToProps, { setContainerClassnames, clickOnMobileMenu })(
    TopNav
  )
);
