import type { ApexOptions } from 'apexcharts';
import type { AllocationData } from '../../../../services/alocationData';
export interface Month {
  key: number;
  month: string;
  number: number;
}
export interface Week {
  key: number;
  week: string;
  number: string;
}

export const getAreaSeries = (month: Month[]) => [
  {
    name: 'بازده',
    data: month.map((item) => item.number),
  },
];

export const getAreaChartOptions = (
  month: Month[]
): ApexOptions => ({
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  stroke: {
    curve: 'smooth',
    width: 3,
  },

  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 100],
    },
  },

  dataLabels: {
    enabled: false,
  },

  grid: {
    borderColor: '#f1f5f9',
  },

  xaxis: {
    categories: month.map((item) => item.month),
  },

  yaxis: {
    labels: {
      formatter: (value) => `${value}%`,
    },
  },

  tooltip: {
    y: {
      formatter: (value) => `${value}%`,
    },
  },
});









export const getDonutSeries = (
  data: AllocationData[]
) => {
  return data.map((item) => item.value);
};


export const getDonutOptions = (
  data: AllocationData[]
): ApexOptions => ({
  chart: {
    type: 'donut',
  },

  labels: data.map(
    (item) => item.name
  ),

  colors: data.map(
    (item) => item.color
  ),

  legend: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      donut: {
        size: '72%',
      },
    },
  },
});


export const getBarSeries = (week: Week[]) => [
  {
    name: "سود",
    data: week.map((item) => Number(item.number)),
  },
];


export const getBarChartOptions = (
  week: Week[]
): ApexOptions => ({
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },

  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: "45%",
    },
  },

  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: week.map((item) => item.week),
  },

  yaxis: {
    labels: {
      formatter: (value) => `${value}`,
    },
  },

  grid: {
    borderColor: "#f1f5f9",
  },
});