import EChartsReact from "echarts-for-react";

const fake = [
  { id: 1, name: "Test A", value: 85 },
  { id: 2, name: "Test B", value: 55 },
  { id: 3, name: "Test C", value: 76 },
  { id: 4, name: "Test D", value: 63 },
  { id: 5, name: "Test E", value: 50 },
  { id: 6, name: "Test F", value: 18 },
  { id: 7, name: "Test J", value: 43 },
];

const TopLearnedTopics = () => {
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
      max: 200,
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
        data: fake,
        roseType: "radius",
        label: {
          color: "#fff",
        },
        labelLine: {
          lineStyle: {
            color: "#01c380",
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
    <EChartsReact option={option} style={{ width: "100%", height: "100%" }} />
  );
};

export default TopLearnedTopics;
