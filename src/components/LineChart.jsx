import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('YYYY/DD/MM'));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: '感染者数',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: '感染者数',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

const LineChart = ({ data }) =>{
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(Math.max(data.length - 30, 1));
        break;
      case '10':
        customData = data.slice(Math.max(data.length - 10, 1));
        break;

      default:
        customData = data;
        break;
    }

    setOptions(generateOptions(customData));
  }, [data, reportType]);

  return (
    <>
      <ButtonGroup
        size='small'
        aria-label='small outlined button group'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          color={reportType === 'all' ? 'secondary' : ''}
          onClick={() => setReportType('all')}
        >
          全て
        </Button>
        <Button
          color={reportType === '30' ? 'secondary' : ''}
          onClick={() => setReportType('30')}
        >
          30日
        </Button>
        <Button
          color={reportType === '10' ? 'secondary' : ''}
          onClick={() => setReportType('7')}
        >
          10日
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export default LineChart
