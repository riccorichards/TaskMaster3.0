import EChartsReact from "echarts-for-react";

const result = [
  { id: 1, date: 1, value: 75 },
  { id: 2, date: 2, value: 55 },
  { id: 3, date: 3, value: 80 },
  { id: 4, date: 4, value: 65 },
  { id: 5, date: 5, value: 90 },
  { id: 6, date: 6, value: 100 },
  { id: 7, date: 7, value: 70 },
  { id: 8, date: 8, value: 83 },
];

const DailyResult = () => {
  const option = {
    xAxis: {
      type: "category",
      data: result.map((day) => day.date),
      axisLabel: {
        color: "#01c380",
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#01c380",
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: result.map((day) => day.value),
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#01c380",
          width: 4,
        },
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#01c380",
        },
      },
    ],
    tooltip: {
      backgroundColor: "#01c380",
      borderColor: "white",
      textStyle: {
        color: "black",
        fontSize: 14,
      },
    },
  };
  return (
    <EChartsReact option={option} style={{ width: "100%", height: "100%" }} />
  );
};

export default DailyResult;
