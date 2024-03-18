import EChartsReact from "echarts-for-react";
import { useTaskStore } from "../../store/TaskStore";
import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";

const DailyResult = () => {
  const { dailyResult, fetchDailyResult } = useTaskStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchDailyResult();
    }
  }, [fetchDailyResult, user]);

  const option = {
    xAxis: {
      type: "category",
      data: dailyResult.map((day) => day.date),
      axisLabel: {
        color: "#4a5c6a",
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#4a5c6a",
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: dailyResult.map((day) => day.value),
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#4a5c6a",
          width: 4,
        },
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#4a5c6a",
        },
      },
    ],
    tooltip: {
      backgroundColor: "#4a5c6a",
      borderColor: "white",
      textStyle: {
        color: "black",
        fontSize: 14,
      },
    },
  };
  return (
    <EChartsReact option={option} style={{ width: "100%", height: "300px" }} />
  );
};

export default DailyResult;
