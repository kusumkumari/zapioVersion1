/* eslint-disable */
import React, { Component } from "react";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { listCategoriesAPI } from "../ApiIntegration";


export default class CategorySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorydata: [],
      categoryLength: "",
    }
  }

  componentWillMount() {
    listCategoriesAPI((apiResponse) => {
      if (apiResponse.status == "success") {
        this.setState({
          categorydata: apiResponse.response.data.data,
          categoryLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  render() {
    const { categorydata, categoryLength } = this.state;
    const selectData = []

    for (let index = 0; index < categoryLength; index++) {
      const { id, category_name } = categorydata[index];
      selectData.push({ label: category_name, value: id, key: id })
    }

    return (
      <Select
        components={{ Input: CustomSelectInput }}
        className="react-select"
        classNamePrefix="react-select"
        name="category"
        onChange={this.props.handleChange}
        options={selectData} />
    );
  }
}
