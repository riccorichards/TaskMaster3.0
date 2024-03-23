import EChartsReact from "echarts-for-react";
import { useTaskStore } from "../../store/TaskStore";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { useUserStore } from "../../store/AuthStore";
import { useToolsStore } from "../../store/ToolsStore";

const TopLearnedTopics = () => {
  const { topWorkspaces, getTopWorkspaces } = useTaskStore();
  const { user } = useUserStore();
  const { screenSize } = useToolsStore();

  useEffect(() => {
    if (user) {
      getTopWorkspaces();
    }
  }, [getTopWorkspaces, user]);

  if (!topWorkspaces) return <Loader />;

  const option = {
    title: {
      text: "Top Learned Topics",
      left: "center",
      top: 20,
      textStyle: {
        color: "#ccc",
      },
    },
    tooltip: {
      trigger: "item",
    },
    visualMap: {
      show: false,
      min: 20,
      max: 600,
      inRange: {
        colorLightness: [1, 0],
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: topWorkspaces,
        roseType: "radius",
        label: {
          color: "#fff",
        },
        labelLine: {
          lineStyle: {
            color: "#ccd0cf",
          },
          smooth: 0.1,
          length: 5,
          length2: 10,
        },
        itemStyle: {
          color: "#01c380",
          shadowBlur: 400,
          shadowColor: "rgba(0, 0, 0, 0.8)",
        },
        animationType: "scale",
        animationEasing: "elasticOut",
      },
    ],
  };

  return (
    <EChartsReact
      option={option}
      style={{ width: "100%", height: screenSize > 425 ? "100%" : "300px" }}
    />
  );
};

export default TopLearnedTopics;
