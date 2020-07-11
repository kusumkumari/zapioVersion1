/* eslint-disable */
import React, { Component,Suspense } from 'react';
import {
  BrowserRouter,

} from 'react-router-dom';
import { connect } from 'react-redux';

import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { isMultiColorActive } from './constants/defaultValues';
// import { getDirection } from './helpers/Utils';
import Router from "./views/Router.js"
import AppLocale from './lang';


class App extends Component {
 
  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);

