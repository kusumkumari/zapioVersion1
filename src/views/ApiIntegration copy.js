/* eslint-disable */
import axios from 'axios';
import { Notification } from "./Utils/Notification";

// const API_BASE_URL = 'https://zapio-admin.com/api';
// const API_BASE_URL = 'http://192.168.0.103:8080/api';
const API_BASE_URL = 'http://192.168.0.112:1234/api';

export let companyId1 = localStorage.getItem("company");
let companyId = localStorage.getItem("company");
export const isLoggedIn = () => localStorage.getItem("token");
export const userType = () => localStorage.getItem("usertype");

function handlerError(error, callback) {
  console.log("eeeeeeeeeeee",error.message,error.status,error)
  if(error.message =="Network Error"){
    // location.href = "/server";
    Notification(
      0,
      'There is a problem while connecting to server',
      'Network Error'
    )
  }
  if(error.response == undefined){
    console.log(error)
  }
  else if (error.response.status == 500) {
    location.href = "/server";
  }
  else if (error.response.status == 401) {

    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("usertype");
    localStorage.removeItem("companyName");
    localStorage.removeItem("logo");
    localStorage.removeItem("__theme_color")
    location.href = "/";
  } else {
    callback && callback({
      status: 'error',
      response: error,
    });
  }
}
// For Authorization

export const loginAPI = (username, password, callback) => {
  let url = `${API_BASE_URL}/brand_outlet/login/`;
  axios.post(url, {
    username: username, password: password
  }).then(response => {
    console.log("login",response)
    if (response.data["success"] == true) {
      localStorage.setItem("route", response.data.route);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("company", response.data.user_id);
      localStorage.setItem("usertype", response.data.user_type);
      localStorage.setItem("companyName", response.data.name);
      localStorage.setItem("logo", response.data.logo);

    }
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const logoutAPI = (callback) => {
  let url = `${API_BASE_URL}/brand_outlet/logout/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("companyName");
    localStorage.removeItem("usertype");
    localStorage.removeItem("logo");
    localStorage.removeItem("__theme_color")

    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changepasswordAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/brand_outlet/ChangePassword/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
// For Configuration

export const listCompanyAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/company/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addProfileAPI = (formdata, address, website, support_person, support_person_email_id, support_person_mobileno, owner_name, owner_email, owner_phone, bannerFileData, callback) => {
  let url = `${API_BASE_URL}/brandprofile/updation/`;
  console.log("xxxxxxxxxxxxxx", bannerFileData)
  const formData = new FormData();
  formData.append('company_logo', formdata);
  formData.append('company_landing_imge', bannerFileData);
  formData.append('address', address);
  formData.append('website', website);
  formData.append('support_person', support_person);
  formData.append('support_person_email_id', support_person_email_id);
  formData.append('support_person_mobileno', support_person_mobileno);
  formData.append('owner_name', owner_name);
  formData.append('owner_email', owner_email);
  formData.append('owner_phone', owner_phone);
  axios.post(url, formData, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveFoodTypeAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/FoodType/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const listActiveTagAPI = (callback) => {
  let url = `${API_BASE_URL}/filterlisting/ActiveTags/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listActiveCategoriesAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/Category/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveOutletAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/Outlet/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCityAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/City/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCityWiseAreaAPI = (cityId, callback) => {
  let url = `${API_BASE_URL}/configuration_data/citywise_area_data/`;
  axios.post(url, { id: cityId.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveVariantAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/variant/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveAddonGroupAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/AddonDetails/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCatWiseOutletAPI = (catId, callback) => {
  let url = `${API_BASE_URL}/configuration_data/catwise_outlet_data/`;
  axios.post(url, { cat_id: catId.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCatWiseSubcategoryAPI = (catId, callback) => {
  let url = `${API_BASE_URL}/configuration_data/catwise_subcat_data/`;
  axios.post(url, { cat_id: catId.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveProductAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/filterlisting/product/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveCustomerAPI = (callback) => {
  let url = `${API_BASE_URL}/Customer/Active/listing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


// For Categories

export const listCategoriesAPI = (callback) => {
  let url = `${API_BASE_URL}/configuration_data/catagory_data/`;
  axios.post(url, { company_auth_id: companyId }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addCategoryAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/catagory/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const editCategoryAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/category/`;
  axios.post(url, { id: id }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeCategoryTypeStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/Category/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Outlets

export const listoutletAPI = (callback) => {
  let url = `${API_BASE_URL}/configuration_data/outlet_data/`;
  axios.post(url, { company_auth_id: companyId }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addOutletAPI = (name, password, outletname, address, longitude, latitude, city, area, callback) => {
  console.log("rrrrrrrrrrrr", name, password, outletname, address, longitude, latitude, city, area)
  let url = `${API_BASE_URL}/brand_outlet/outlet_creation/`;
  axios.post(url, {
    username: name,
    password: password,
    Outletname: outletname,
    latitude: latitude,
    longitude: longitude,
    city: city,
    area: area,
    address: address,
    company_auth_id: companyId
  }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeOutletStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/Outlet/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Food Type

export const listFoodTypeAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/FoodType/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addFoodAPI = (id, food_type, formdata, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/foodtype/`;
  console.log("rrrrrrrrrrrrr",formData)
  const formData = new FormData();
  if (id == "add") {
    formData.append('foodtype_image', formdata);
    formData.append('food_type', food_type);

  }
  else {
    formData.append('foodtype_image', formdata);
    formData.append('food_type', food_type);
    formData.append('id', id);
  }

  axios.post(url, formData, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const editFoodAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/foodtype/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeFoodTypeStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/foodtype/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Variants

export const listVariantAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/variant/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getVariantAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/variant/`;
  axios.post(url, { id: id }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addVariantAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/variant/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeVariantStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/variant/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For AddonGroup 

export const listAddonGroupAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/AddonDetails/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addAddonGroupAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/addons/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const editAddonGroupAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/AddonDetails/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getAddOnsAPI = (id, callback) => {
  let url = `${API_BASE_URL}/addons/associate/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


// For SubCategory

export const listSubcategoryAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/SubCategory/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addSubcategoryAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/create_data/subcatagory/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const editSubCategoryAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/subcategory/`;
  axios.post(url, { id: id }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const updateSubcategoryAPI = (payload, callback) => {

  let url = `${API_BASE_URL}/update_data/subcatagory/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeSubcategoryStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/subcategory/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Product 

export const listProductAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/product/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addProductAPI = (id, catId, subCatId,tags, addOnGroupArray, variantsArray, price,discount, product_name, priority, fileData, foodType, product_code, product_discrp, hasVariant, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/product/`;
  console.log("iiiiiiiiiiiiiiiiiiii", id,fileData, foodType, product_code, product_discrp, hasVariant)
  const formData = new FormData();
  if (id) {
    formData.append('id', id);
  }
  formData.append('product_image', fileData);
  formData.append('product_category', catId);
  formData.append('product_subcategory', subCatId);
  formData.append('addpn_grp_association', JSON.stringify(addOnGroupArray));
  formData.append('discount_price', discount);
  formData.append('variant_deatils', JSON.stringify(variantsArray));
  formData.append('price', price);
  formData.append('priority', priority);
  formData.append('product_name', product_name);
  formData.append('food_type', foodType);
  formData.append('tags', JSON.stringify(tags));
  formData.append('product_code', product_code);
  formData.append('product_desc', product_discrp);
  formData.append('has_variant', hasVariant);
  axios.post(url, formData, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getProductAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/product/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeProductStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/product/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Add On

export const listAddonAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/AddonDetails/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addAddonAPI = (id, associated_addons, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/addonassociation/`;
  axios.post(url, {
    id: id.toString(),
    associated_addons: associated_addons,
  }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeAddonTypeStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/AddonDetails/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listAssociateVariantAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/variant/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// for Coupons

export const AddCouponAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/discount/coupon/create_update/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCouponAPI = (callback) => {
  let url = `${API_BASE_URL}/discount/coupon/listing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getCouponAPI = (id, callback) => {
  let url = `${API_BASE_URL}/discount/coupon/retrieve/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeCouponStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/discount/coupon/action/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCouponHistoryAPI = (callback) => {
  const usertype = userType();
  let url = ""
  if (usertype == 'is_outlet') {
    url = `${API_BASE_URL}/history/outlet/couponHistory/`;
  }
  if (usertype == 'is_brand') {
    url = `${API_BASE_URL}/history/brand/couponHistory/`;
  }
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// for Quantity Based Combos

export const AddQtyComboAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/discount/quantitycombo/create_update/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listQtyComboAPI = (callback) => {
  let url = `${API_BASE_URL}/discount/QuantityCombo/listing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getQtyComboAPI = (id, callback) => {
  let url = `${API_BASE_URL}/discount/QuantityCombo/retrieve/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeQtyComboStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/discount/QuantityCombo/action/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Percentage Combo

export const AddPercentComboAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/discount/percentcombo/create_update/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listPercentAPI = (callback) => {
  let url = `${API_BASE_URL}/discount/PercentCombo/listing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getPercentComboAPI = (id, callback) => {
  let url = `${API_BASE_URL}/discount/PercentCombo/retrieve/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changePercentComboStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/discount/PercentCombo/action/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Feature Product

export const addFeatureProductAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/createupdate_data/feature_product/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listFeatureProductAPI = (callback) => {
  let url = `${API_BASE_URL}/listing_data/feature_product/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const retrieveFeatureProductAPI = (id, callback) => {
  let url = `${API_BASE_URL}/retrieval_data/featureProduct/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeFeatureProductStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/action/FeaturedProduct/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Customer

export const listCustomerAPI = (callback) => {
  let url = `${API_BASE_URL}/Customer/All/listing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Orders

export const listOrdersAPI = (callback) => {
  let url = `${API_BASE_URL}/ordermgnt/Order/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Delivery Boy

export const addDeliveryBoyAPI = (id, name, email, mobile, address, fileData, callback) => {
  const formData = new FormData();
  if (id) {
    formData.append('id', id);
  }
  formData.append('profile_pic', fileData);
  formData.append('name', name);
  formData.append('mobile', mobile);
  formData.append('email', email);
  formData.append('address', address);
  let url = `${API_BASE_URL}/outlet/deliveryboy/registration/`;
  axios.post(url, formData, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listDeliveryBoyAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/deliveryboy/listdata/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const retriveDeliveryBoyAPI = (id, callback) => {
  let url = `${API_BASE_URL}/outlet/retrieval_data/delivery_boy/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeDeliveryBoyStatusAPI = (id, status, callback) => {
  let url = `${API_BASE_URL}/outlet/action/DeliveryBoy/`;
  axios.post(url, { id: id, active_status: status }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Dashboard

export const listDashboardCardsAPI = (callback) => {
  let url = `${API_BASE_URL}/dashboard/brand/home/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    console.log("uuuuuuuuu",error)
    handlerError(error, callback);
  });
}
// For Order Processing

export const listOrderProcessingAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/orderlisting/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeOrderProcessingStatusAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/outlet/orderStatuschange/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const retriveOrderProcessingAPI = (id, callback) => {
  let url = `${API_BASE_URL}/outlet/retrievalOrder/`;
  axios.post(url, { id: id.toString() }, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Outlet Dashboard

export const listOutletDashboardAPI = (callback) => {
  let url = `${API_BASE_URL}/dashboard/outlet/home/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCustomerDataAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/history/outlet/customerHistory/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Outlet Setting

export const listOutletSettingAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/retrieve/outlet/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Notification 

export const listNotificationCountAPI = (callback) => {
  let url = `${API_BASE_URL}/notification/ordernotification/count/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listNotificationAPI = (callback) => {
  let url =""
  if(localStorage.getItem("usertype")=="is_outlet"){
      url = `${API_BASE_URL}/notification/ordernotification/all/`;
  }
  else{
    url = `${API_BASE_URL}/notification/all/`;
  }
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const notificationSeenAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/notification/ordernotification/seen/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

//For Outlet On Off

export const OutletOnOffAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/outlet/onoff/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getOutletOnOffAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/is_open/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
// For Product availability

export const listOutletProductAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/listing/product`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const productAvailibiltyAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/outlet/availability/product/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listOutletCategoryAPI = (callback) => {
  let url = `${API_BASE_URL}/outlet/listing/category/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const categoryAvailibiltyAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/outlet/availability/Category/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listBrandOutletAPI = (callback) => {
  let url = `${API_BASE_URL}/outletmgmt/OutletListing/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listBrandCategoriesAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/Category/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listBrandProductsAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/Product/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const brandCategoryAvailibiltyAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/Categoryavail/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const brandProductAvailibiltyAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/Productavail/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const brandOutletStatusAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/IsOpen/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addTimingAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/Timing/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getTimingAPI = (payload,callback) => {
  let url = `${API_BASE_URL}/outletmgmt/TimeRetrieval/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getOrderAPI= (payload,callback) => {
  let url = `${API_BASE_URL}/ordermgnt/Retrieval/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const manageOrderProcessingAPI= (payload,callback) => {
  let url = `${API_BASE_URL}/ordermgnt/ChangeStatus/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const soundStatusAPI= (callback) => {
  let url = `${API_BASE_URL}/sound/status/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const ChangeSoundModeAPI= (payload,callback) => {
  let url = `${API_BASE_URL}/sound/ChangeStatus/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const addKitchenStepsAPI = (id, name, foodtype, fileData, callback) => {
  const formData = new FormData();
  if (id) {
    formData.append('id', id);
  }
  formData.append('image', fileData);
  formData.append('name', name);
  formData.append('food_type', foodtype);
  let url = `${API_BASE_URL}/kitchen/createupdate_data/ingredient/`;
  axios.post(url, formData, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listKitchenStepsAPI= (callback) => {
  let url = `${API_BASE_URL}/kitchen/list/ingredient/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const retrieveKitchenStepsAPI= (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/retrieve/ingredient/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const kitchenStepsStatusAPI= (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/action/ingredient/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const brandNotificationCountAPI= (callback) => {
  let url = `${API_BASE_URL}/notification/ordercount/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const notificationBrandSeenAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/notification/seen/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listActiveStatusProductAPI = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/Product/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listActiveIngredientsAPI  = (callback) => {
  let url = `${API_BASE_URL}/Activelisting/Ingredient/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const addFoodProcessAPI  = (id,products,variants,stepNo,stepName,stepDiscrp,stepTime,fileData,ingArray,callback) => {
  const formData = new FormData();
  if (id!="") {
    formData.append('id', id);
  }
  formData.append('image', fileData);
  formData.append('product', products);
  formData.append('varient', variants);
  formData.append('step', stepNo);
  formData.append('process', stepName);
  formData.append('description', stepDiscrp);
  formData.append('time_of_process', stepTime);
  formData.append('ingrediate', JSON.stringify(ingArray));
  console.log("qqqqqqqqqqqqqqqqqqqq",formData.get('ingrediate'), formData.get('image'))
  let url = `${API_BASE_URL}/kitchen/createupdate_data/stepprocess/`;
  axios.post(url,formData, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listFoodProcessAPI  = (callback) => {
  let url = `${API_BASE_URL}/kitchen/product/stepprocess/list/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const getFoodProcessAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/product/stepprocess/view/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const retriveFoodProcessAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/product/stepprocess/retrieve/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeFoodProcessStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/product/stepprocess/action/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    console.log("Error data",response.data)
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const productwiseVarient  = (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/productwiseVariant/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addThemeDetailAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/theme/edit/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listThemeAPI  = (callback) => {
  let url = `${API_BASE_URL}/theme/setting/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeThemeStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/theme/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listPaymentAPI  = (callback) => {
  let url = `${API_BASE_URL}/payment/setting/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addPaymentAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/payment/edit/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changePaymentStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/payment/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changecustomerStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/Customer/Action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getCustomerAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/Customer/OrderAnalysis/retrieve/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const removeStepAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/kitchen/processStep/delete/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listDeliveryAPI  = (callback) => {
  let url = `${API_BASE_URL}/deliverycharge/setting/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addDeliveryAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/deliverycharge/edit/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const changeDeliveryStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/deliverycharge/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const listOrderHistoryAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/Customer/OrderHistory/listing/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listgoogleAnyltcsAPI  = (callback) => {
  let url = `${API_BASE_URL}/Analytics/setting/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addGoogleAnyltcsAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/Analytics/edit/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const changeGoogleAnyltcsStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/Analytics/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const listDiscountAPI  = (callback) => {
  let url = `${API_BASE_URL}/offer/product/list/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addDiscountAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/offer/product/save/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const changeDiscountStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/offer/product/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getWithoutProcessAPI  = (callback) => {
  let url = `${API_BASE_URL}/kitchen/processStep/remaining/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listPosOrdersAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/front/pos/list/data/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addTagsAPI = (id, tag, fileData, callback) => {
  const formData = new FormData();
  if (id) {
    formData.append('id', id);
  }
  formData.append('tag_image', fileData);
  formData.append('tag_name', tag);
  let url = `${API_BASE_URL}/tag/createupdate_data/`;
  axios.post(url, formData, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listTagsAPI  = (callback) => {
  let url = `${API_BASE_URL}/tag/list/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const retrieveTagAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/tag/retrieve/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const tagStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/tag/action/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addUserTypeAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/createupdate/usertype/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listUserTypeAPI  = (callback) => {
  let url = `${API_BASE_URL}/manager/listing/usertype/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getUserTypeAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/retrieval/usertype/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeUserTypeStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/action/usertype/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listActiveUserTypeAPI = (callback) => {
  let url = `${API_BASE_URL}/manager/activelisting/usertype/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listManagersAPI = (callback) => {
  let url = `${API_BASE_URL}/manager/listing/profile/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const addManagerAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/createupdate/profile/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getManagerAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/retrieval/profile/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeManagerStatusAPI  = (payload,callback) => {
  let url = `${API_BASE_URL}/manager/action/profile/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listParentModuleAPI = (callback) => {
  let url = `${API_BASE_URL}/manager/listing/MainRoute/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listSubModuleAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/manager/listing/Route/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listSubSubModuleAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/manager/listing/SubRoute/`;
  axios.post(url,payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback && callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

