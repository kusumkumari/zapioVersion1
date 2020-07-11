/* eslint-disable */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { isLoggedIn, userType } from "./ApiIntegration";
// Brand Routings
import DefaultDashboard from "./app/dashboards/default";
import Category from "./category/CategoryCard";
import Login from "./user/login";
import AppLayout from "../layout/AppLayout";
import UserLayout from "../layout/UserLayout";
import Product from "./product/ProductCard";
import Outlet from "./outlet/OutletCard";
import Variant from "./variant/VariantCard";
import Addongroup from "./addongroup/AddongroupCard";
import Addon from "./addon/AddonCard";
import Subcategory from "./subcategory/SubcategoryCard";
import Food from "./food/FoodCard";
import Account from "./accounts/AccountCard";
import Changepassword from "./accounts/AccountCards";
import Coupon from "./coupon/CouponCard";
import Combo from "./combo/ComboCard";
import ComboPercentage from "./combo/ComboPercentageCard";
import CouponHistory from "./couponhistory/CouponHistoryCard";
import FeatureProduct from "./featureproduct/FeatureProductCard";
import Customer from "./customers/CustomerCard";
import Orders from "./orders/OrdersCard";
import CategoryAvailability from "./availability/CategoryAvailabilityCard";
import StockAvailability from "./stockAvailability/StockAvailabilityCard";
import Timings from "./timings/TimingsCard";
import OrderHistory from "./orderHistory/OrderHistoryCard";
import KitchenStep from "./kitchenStep/KitchenStepCard";
import FoodProcess from "./foodProcess/FoodProcessCard";
// Outlet Routes
import OutletDashboard from "./app/dashboards/OutletDashboard";
import OutletSetting from "./outletsetting/OutletSettingCard";
import OutletChangePass from "./outletsetting/OutletChangePassCard";
import DeliveryBoy from "./deliveryboy/DeliveryBoyCard";
import OrderProcessing from "./orderProcessing/OrderProcessingCard";
import CustomerHistory from "./customerhistory/CustomerHistoryCard";
import Notification from "./notification/NotificationCard";
import Availability from "./availability/AvailabilityCard";
import PaymentCard from "./payments/PaymentCard";
import ThemeCard from "./theme/ThemeCard";
import DeliveryPackageCard from "./deliveryPackage/DeliveryPackageCard";
import GoogleAnalyticsCard from "./googleAnalytics/GoogleAnalyticsCard";
import DiscountPercentage from "./discountPercentage/DiscountPercentageCard";
import PosOrderHistory from "./posOrderHistory/PosOrderHistoryCard";
import Tag from "./tag/TagCard";
import Authorization from "./authorization/AuthorizationCard";
import UserType from "./userType/UserTypeCard";
import AreaManager from "./areaManager/AreaManagerCard";
import ServerDown from "./server/ServerDown";
import OutletSync from "./outletSync/OutletSyncCard";
import MenuSync from "./menuSync/MenuSyncCard";
import OrderEmail from "./orderEmail/OrderEmailCard";
import ProductReport from "./productReport/ProductReportCard";
import AddOnReport from "./addOnReport/AddOnReportCard";
import PaymentReport from "./PaymentReport/PaymentReportCard";
import RatingReport from "./ratingReport/RatingReportCard";
import OutletLogsReport from "./outletsLogsReport/OutletLogsReportCard";
import ReceivedConfiguration from "./receivedConfiguration/ReceivedConfigurationCard";

const BrandRoutes = () => (
  <AppLayout>
    <Route exact path="/" component={DefaultDashboard} />
    <Route exact path="/category/" component={Category} />
    <Route exact path="/product/" component={Product} />
    <Route exact path="/subcategory/" component={Subcategory} />
    <Route exact path="/outlet/" component={Outlet} />
    <Route exact path="/variant/" component={Variant} />
    <Route exact path="/addongroup/" component={Addongroup} />
    <Route exact path="/addon/" component={Addon} />
    <Route exact path="/food/" component={Food} />
    <Route exact path="/settings/" component={Account} />
    <Route exact path="/settings/payment/" component={PaymentCard} />
    <Route exact path="/settings/theme/" component={ThemeCard} />
    <Route
      exact
      path="/settings/delivery-package/"
      component={DeliveryPackageCard}
    />
    <Route
      exact
      path="/settings/google-analytics/"
      component={GoogleAnalyticsCard}
    />
    <Route exact path="/settings/usertype/" component={UserType} />
    <Route exact path="/settings/authorization/" component={Authorization} />
    <Route exact path="/settings/email/order" component={OrderEmail} />

    <Route exact path="/changepassword/" component={Changepassword} />
    <Route exact path="/coupons/" component={Coupon} />
    <Route exact path="/combo/" component={Combo} />
    <Route exact path="/combo_percentage/" component={ComboPercentage} />
    <Route exact path="/coupon-history/" component={CouponHistory} />
    <Route exact path="/discount_percentage/" component={DiscountPercentage} />

    <Route exact path="/feature-product/" component={FeatureProduct} />
    <Route exact path="/customers/" component={Customer} />
    <Route exact path="/orders/" component={Orders} />
    <Route exact path="/product_report/" component={ProductReport} />
    <Route exact path="/addon_report/" component={AddOnReport} />
    <Route exact path="/rating_report/" component={RatingReport} />
    <Route exact path="/outletlog_report/" component={OutletLogsReport} />

    <Route exact path="/payment/" component={PaymentReport} />
    <Route exact path="/notification-list/" component={Notification} />
    <Route exact path="/notification-list/:id" component={Notification} />
    <Route
      exact
      path="/outletmanager/stock_availability/"
      component={StockAvailability}
    />
    <Route exact path="/outletmanager/timing/" component={Timings} />
    <Route exact path="/received-configuration/" component={ReceivedConfiguration} />

    <Route exact path="/order_history/:id" component={OrderHistory} />
    <Route exact path="/kitchenstep/" component={KitchenStep} />
    <Route exact path="/food_process/" component={FoodProcess} />

    <Route exact path="/area_manager/" component={AreaManager} />
    <Route exact path="/urban/outlet-sync/" component={OutletSync} />
    <Route exact path="/urban/menu-sync/" component={MenuSync} />

    <Route exact path="/pos/order-history/" component={PosOrderHistory} />
    <Route exact path="/tag/" component={Tag} />
    <Route exact path="/delivery-boy/" component={DeliveryBoy} />

    <Route path="/server" component={ServerDown} />
  </AppLayout>
);

// const OutletsRoutes = () => (
//   <AppLayout>
//     <Route exact path="/" component={OutletDashboard} />
//     <Route exact path="/settings/" component={OutletSetting} />
//     <Route exact path="/changepassword/" component={OutletChangePass} />
//     <Route exact path="/delivery-boy/" component={DeliveryBoy} />
//     <Route exact path="/order-processing/" component={OrderProcessing} />
//     <Route exact path="/coupon-history/" component={CouponHistory} />
//     <Route exact path="/customer-history/:mobile" component={CustomerHistory} />
//     <Route exact path="/notification-list/" component={Notification} />
//     <Route exact path="/notification-list/:id" component={Notification} />
//     <Route exact path="/product-availability/" component={Availability} />
//     <Route
//       exact
//       path="/category-availability/"
//       component={CategoryAvailability}
//     />
//     <Route path="/server" component={ServerDown} />
//   </AppLayout>
// );

const WrappedWithoutLoginRoutes = () => (
  <UserLayout>
    <Route path="/" component={Login} />
  </UserLayout>
);

const Router = () => (
  <Switch>
    <Route
      path="/"
      render={() => {
        const loggedIn = isLoggedIn();
        const usertype = userType();
        if (loggedIn) {
          return <BrandRoutes />;
          // if (usertype == "is_outlet") {
          //   return <OutletsRoutes />;
          // }
          // if (usertype == "is_brand") {
          //   return <BrandRoutes />;
          // }
          // if (usertype == "is_cashier") {
          //   return <CashiorRoutes />;
          // }
        } else {
          return <WrappedWithoutLoginRoutes />;
        }
      }}
    />
  </Switch>
);

export default Router;
