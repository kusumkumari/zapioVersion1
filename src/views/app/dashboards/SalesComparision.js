/* eslint-disable */
import React from "react";
import {
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import {LineChart} from "../../../components/charts"


const SalesComparision = (props) => {
  const { lineChartData , id, icon }=props;
  return (
    <Card>
      <CardBody>
        <CardTitle>
        <i className={icon} style={{fontSize:"x-large"}} /> <IntlMessages id={id} />
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesComparision;
