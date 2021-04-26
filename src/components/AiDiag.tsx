import { ApexOptions } from 'apexcharts';
import React, { useMemo } from 'react';
import ApexCharts from 'react-apexcharts';
import { INTERVAL } from '../domain/use-simulator';

interface AiDiagProps {
  expectedErrors: number[];
}
export function AiDiag(props: AiDiagProps) {
  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: INTERVAL - 20,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'AI diagnosis',
        align: 'left',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'numeric',
      },
      yaxis: {
        max: 0.5,
        min: 0,
        labels: {
          formatter: (v: number) => {
            return (Math.round(v * 10) / 10).toString();
          },
        },
      },
      legend: {
        show: false,
      },
    };
  }, []);

  const series = [
    {
      name: 'series-1',
      data: props.expectedErrors,
    },
  ];

  return (
    <ApexCharts options={options} series={series} type="line" height={350} />
  );
}
