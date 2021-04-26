import { ApexOptions } from 'apexcharts';
import { memo, useMemo } from 'react';
import ApexCharts from 'react-apexcharts';
import { INTERVAL } from '../hooks/use-simulator';
import { useTrackHistory } from '../hooks/use-tracking-history';

interface ChartProps {
  simTime: number;
  currentValue: number;
  min?: number;
  max?: number;
  title: string;
}

function RealtimeChartPure(props: ChartProps) {
  const { data } = useTrackHistory(props.simTime, props.currentValue);

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
        text: props.title,
        align: 'left',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'numeric',
        range: 100,
        // range: XAXISRANGE,
      },
      yaxis: {
        max: props.max,
        min: props.min,
      },
      legend: {
        show: false,
      },
    };
  }, [props.title, props.min, props.max]);

  const series = [
    {
      name: 'series-1',
      data: data,
    },
  ];

  return (
    <ApexCharts options={options} series={series} type="line" height={350} />
  );
}

export const RealtimeChart = memo(RealtimeChartPure, (prev, next) => {
  return prev.simTime === next.simTime;
});
