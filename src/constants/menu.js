/* eslint-disable */

import { userType, menus } from "./../views/ApiIntegration";
let data = [];

const usertype = userType();

// if (usertype == "is_outlet") {
//   data = [
//     {
//       id: "dashboards",
//       icon: "simple-icon-speedometer",
//       label: "menu.dashboards",
//       to: "/"
//     },
//     {
//       id: "deliveryboy",
//       icon: "iconsminds-tractor",
//       label: "menu.delivery-boy",
//       to: "/delivery-boy"
//     },
//     {
//       id: "orderprocessing",
//       icon: "iconsminds-refresh",
//       label: "menu.order-processing",
//       to: "/order-processing",
//       subs: [
//         {
//           icon: "iconsminds-refresh",
//           label: "menu.order-processing",
//           to: "/order-processing"
//         },
//         {
//           icon: "iconsminds-letter-open",
//           label: "menu.coupon-history",
//           to: "/coupon-history/"
//         }
//       ]
//     },
//     {
//       id: "availability",
//       icon: "iconsminds-check",
//       label: "menu.availability",
//       to: "",
//       subs: [
//         {
//           icon: "simple-icon-briefcase",
//           label: "menu.category",
//           to: "/category-availability/"
//         },
//         {
//           icon: "simple-icon-list",
//           label: "menu.products",
//           to: "/product-availability/"
//         }
//       ]
//     }
//   ];
// }
// if (usertype == "is_brand") {
  data = JSON.parse(menus())
//   data = [
//     {
//       id: "dashboards",
//       icon: "simple-icon-speedometer",
//       label: "menu.dashboards",
//       to: "/"
//     },

//     {
//       id: "categorys",
//       icon: "simple-icon-book-open",
//       label: "menu.categorys",
//       to: "/category",
//       subs: [
//         {
//           icon: "iconsminds-cookies",
//           label: "menu.food-list",
//           to: "/food/"
//         },
//         {
//           icon: "simple-icon-briefcase",
//           label: "menu.categorys-list",
//           to: "/category/"
//         },
//         {
//           icon: "simple-icon-screen-desktop",
//           label: "menu.sub-list",
//           to: "/subcategory/"
//         },

//         {
//           icon: "simple-icon-paper-plane",
//           label: "menu.variant-list",
//           to: "/variant/"
//         },
//         {
//           icon: "simple-icon-arrow-up-circle",
//           label: "menu.addongroup-list",
//           to: "/addongroup/"
//         },
//         {
//           icon: "simple-icon-plus",
//           label: "menu.addon-list",
//           to: "/addon/"
//         },
//         {
//           icon: "simple-icon-list",
//           label: "menu.product",
//           to: "/product/"
//         },
//         {
//           icon: "simple-icon-note",
//           label: "menu.feature-product",
//           to: "/feature-product/"
//         },
//         {
//           icon: "iconsminds-tag",
//           label: "menu.tag",
//           to: "/tag/"
//         }
//       ]
//     },

//     {
//       id: "discount",
//       icon: "simple-icon-tag",
//       label: "menu.discount-engine",
//       to: "/discount",
//       subs: [
//         {
//           icon: "simple-icon-trophy",
//           label: "menu.coupons",
//           to: "/coupons/"
//         },
//         {
//           icon: "simple-icon-tag",
//           label: "menu.combo",
//           to: "/combo/"
//         },
//         {
//           icon: "simple-icon-share-alt",
//           label: "menu.combo-percentage",
//           to: "/combo_percentage/"
//         },
//         {
//           icon: "iconsminds-letter-open",
//           label: "menu.coupon-history",
//           to: "/coupon-history/"
//         },
//         {
//           icon: "iconsminds-pricing",
//           label: "menu.dis-percentage",
//           to: "/discount_percentage/"
//         }
//       ]
//     },
//     {
//       id: "outletmanager",
//       icon: "iconsminds-shop-4",
//       label: "menu.outletmanager",
//       to: "/outletmanager",
//       subs: [
//         {
//           icon: "iconsminds-shop",
//           label: "menu.outlet-list",
//           to: "/outlet/"
//         },
//         {
//           icon: "iconsminds-tractor",
//           label: "menu.delivery-boy",
//           to: "/delivery-boy"
//         },
//         {
//           icon: "iconsminds-check",
//           label: "menu.stock-availability",
//           to: "/outletmanager/stock_availability/"
//         },
//         {
//           icon: "iconsminds-clock",
//           label: "menu.manage-timing",
//           to: "/outletmanager/timing/"
//         },
//         {
//           icon: "iconsminds-chopsticks",
//           label: "menu.kitchen-step",
//           to: "/kitchenstep/",
//           subs: [
//             {
//               icon: "iconsminds-chopsticks",
//               label: "menu.manage-ingridients",
//               to: "/kitchenstep/"
//             },
//             {
//               icon: "iconsminds-chef-hat",
//               label: "menu.manage-food-prepare-process",
//               to: "/food_process/"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: "customers",
//       icon: "simple-icon-people",
//       label: "menu.customers",
//       to: "/customers"
//     },
//     {
//       id: "reports",
//       icon: "iconsminds-notepad",
//       label: "menu.reports",
//       to: "/reports/",
//       subs: [
//     {
//       icon: "simple-icon-layers",
//       label: "menu.orders",
//       to: "/orders"
//     },
//     {
//       icon: "simple-icon-list",
//       label: "menu.product-report",
//       to: "/product_report"
//     },
//     {
//       icon: "simple-icon-plus",
//       label: "menu.addon-report",
//       to: "/addon_report"
//     },
//   ]
// },
//     {
//       id: "settings",
//       icon: "simple-icon-settings",
//       label: "menu.settings",
//       to: "/settings",
//       subs: [
//         {
//           icon: "iconsminds-wallet",
//           label: "menu.payment",
//           to: "/settings/payment/"
//         },
//         {
//           icon: "iconsminds-pantone",
//           label: "menu.setting-theme",
//           to: "/settings/theme"
//         },
//         {
//           icon: "iconsminds-box-with-folders",
//           label: "menu.setting-deliver-package",
//           to: "/settings/delivery-package"
//         },
//         {
//           icon: "iconsminds-statistic",
//           label: "menu.setting-google-analytics",
//           to: "/settings/google-analytics"
//         },
//         {
//           icon: "iconsminds-shield",
//           label: "menu.setting-users",
//           to: "/settings/users",
//           subs: [
//             {
//               icon: "iconsminds-user",
//               label: "menu.setting-usertype",
//               to: "/settings/usertype"
//             },
//             {
//               icon: "iconsminds-shield",
//               label: "menu.setting-permission",
//               to: "/settings/authorization"
//             },
//             {
//               icon: "iconsminds-administrator",
//               label: "menu.managers",
//               to: "/area_manager/"
//             }
//           ]
//         },
//         {
//           icon: "iconsminds-shield",
//           label: "menu.setting-email",
//           to: "/settings/email",
//           subs: [
//             {
//               icon: "iconsminds-mail-settings",
//               label: "menu.settings.email.order",
//               to: "/settings/email/order/"
//             }
//           ]
//         }
//       ]
//     },

//     {
//       id: "urbanpiper",
//       icon: "iconsminds-ustream",
//       label: "menu.urban-piper",
//       to: "/urban",
//       subs: [
//         {
//           icon: "iconsminds-sync",
//           label: "menu.outlet-sync",
//           to: "/urban/outlet-sync/"
//         },
//         {
//           icon: "iconsminds-shuffle-1",
//           label: "menu.menu-sync",
//           to: "/urban/menu-sync/"
//         }
//       ]
//     },
//     {
//       id: "pos",
//       icon: "iconsminds-optimization",
//       label: "menu.pos",
//       to: "/pos",
//       subs: [
//         {
//           icon: "iconsminds-sand-watch-2",
//           label: "menu.order-history",
//           to: "/pos/order-history/"
//         }
//       ]
//     }
//   ];
// }

export default data;
