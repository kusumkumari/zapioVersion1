/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, FormGroup, Label, Button, CardBody } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import "../../assets/css/custom.css";
import { Notification } from "../Utils/Notification";
import {
  API_BASE_URL,
  companyId1,
  downloadRatingCSVAPI,
  uploadRatingExcelFormatAPI
} from "../ApiIntegration";
import IntlMessages from "../../helpers/IntlMessages";
import moment from "moment";
import DatePicker from "react-datepicker";
import '../../assets/css/date.css';
import "../../assets/css/sass/style/style.css";
import $ from "jquery";

class RatingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,
      detailing_data: [],
      loading: false,
      start_date: moment().format("YYYY-MM-DD H:mm:ss"),
    };
  }

  handleChangeStart = date => {
    this.setState({
      start_date: moment(date).format("YYYY-MM-DD H:mm:ss")
    });
  };

  downloadCSV = () => {
    downloadRatingCSVAPI(
      {
        start_date: this.state.start_date,
      },
      apiResponse => {
        console.log("aaaaaaaaaaa", apiResponse)

      }
    );
  }

  UploadExcel = () => {
    $(".file-upload").click();
  };

  handleChangeImage = e => {
    let file = e.target.files[0];
    console.log(file);
    uploadRatingExcelFormatAPI(file, response => {
      console.log("image upateeeeeeee", response);
      if (response.response.data.success == true) {
        Notification(1, response.response.data.message, "Rating Report Uploaded Successfully");
      } else {
        const err = response.data.error;
        Object.keys(err).forEach(v => {
          if (err[v]) Notification(0, err[v], `${v} error!`);
        });
      }
    });
  };



  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i
              className="iconsminds-receipt-4 text-primary"
              style={{ fontSize: "x-large" }}
            />
            &nbsp;
            <Breadcrumb
              heading="report.rating-report"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="mb-7">
          <Colxx lg="12" xl="12">
            <Card className="rounded-sm">
              <CardBody className="d-flex align-items-center  px-1 py-3" style={{ justifyContent: "space-between" }}>
                <div className="col-8" style={{ display: "flex" }}>
                  <i
                    className="iconsminds-clock" style={{ marginRight: "30px", lineHeight: "2.5rem", fontSize: "2rem" }}
                  />
                  <DatePicker
                    timeFormat="H:mm:ss"
                    showTimeSelect
                    timeIntervals={15}
                    selected={moment(this.state.start_date, "YYYY-MM-DD H:mm:ss")}
                    onChange={this.handleChangeStart}
                    dateFormat="MM/DD/YYYY h:mm:ss: A"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  {/* <Button
                    color="primary"
                    style={{ fontSize: "15px", paddingLeft: "8px", marginRight: "20px" }}
                    onClick={this.downloadCSV}
                  >
                    <i
                      className="simple-icon-cloud-download text-white fixedDownloadBtn"
                    />
                      Download Rating
                    </Button> */}


                  <a
                    href={API_BASE_URL + "/ordermgnt/ratingcsv/?start_date=" + this.state.start_date + "&token=" + localStorage.getItem("token")}
                    className="btn btn-primary"
                    target="_blank"
                    style={{ fontSize: "15px", paddingLeft: "8px", marginRight: "20px" }}

                    color="primary"
                  ><i
                      className="simple-icon-cloud-download text-white fixedDownloadBtn"
                    />
                  Download Rating</a>
                  &nbsp;&nbsp;
                    <Button
                    color="warning"
                    style={{ fontSize: "15px", paddingLeft: "8px" }}
                    onClick={this.UploadExcel}
                  >
                    <i
                      className="simple-icon-cloud-upload text-white fixedDownloadBtn"
                    />         Upload Rating
                       <input
                      className="file-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={this.handleChangeImage}
                    />
                  </Button>

                </div>
                {/* <a
                  // href={API_BASE_URL + "/product/report/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}
                  className="float-right"
                  style={{ marginRight: "10px", marginLeft: "40px" }}
                  color="primary"
                >
                  <i
                    className="simple-icon-cloud-download bg-primary text-white fixedDownloadBtn"
                  />
                </a>
                <a
                  // href={API_BASE_URL + "/product/report/csv/?start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&cid=" + companyId1 + "&token=" + localStorage.getItem("token") + "&outlet_id=" + this.state.outlets}
                  className="float-right"
                  style={{ marginRight: "10px", marginLeft: "40px" }}
                  color="primary"
                >
                  <i
                    className="simple-icon-cloud-upload bg-primary text-white fixedDownloadBtn"
                  />
                </a> */}



              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(RatingReport);
