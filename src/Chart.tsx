import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import { INTERVAL } from './domain/use-simulator';

function useTrackHistory(value: Value) {
  const [data, setData] = useState([value.value]);

  useEffect(() => {
    console.log(value);
    setData((oldData) => {
      // if (oldData.length < 20) {
      //   oldData = [...new Array(21)].map((_, i) => 0);
      // }
      const newData = [...oldData, Math.floor(value.value)];
      // if (newData.length > 20) {
      //   newData.shift();
      // }
      return newData;
    });
  }, [value.id]);

  return { data };
}

interface Value {
  id: number;
  value: number;
}
interface ChartProps {
  currentValue: Value;
  min?: number;
  max?: number;
  title: string;
}
export function Chart(props: ChartProps) {
  const { data } = useTrackHistory(props.currentValue);

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
        range: 50,
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
