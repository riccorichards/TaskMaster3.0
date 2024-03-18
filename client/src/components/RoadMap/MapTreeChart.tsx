import Echart from "echarts-for-react";
import { useNodeTree } from "../../store/NodeTreeStore";
import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import Loader from "../Loader/Loader";

const MapTreeChart = () => {
  const { fetchEntireNodeTree, isLoading, error, nodeTree } = useNodeTree();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.username) {
      fetchEntireNodeTree(user?.username);
    }
  }, [fetchEntireNodeTree, user?.username]);

  if (error)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error: {error}
      </div>
    );

  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "tree",
        data: [nodeTree],
        left: "2%",
        right: "2%",
        top: "40.5%",
        bottom: "10%",
        symbol: "emptyCircle",
        orient: "BT",
        expandAndCollapse: true,
        lineStyle: {
          color: "#4a5c6a",
          width: 2,
          shadowColor: "#06141b",
          shadowBlur: 5,
        },
        label: {
          position: "bottom",
          rotate: 0,
          verticalAlign: "top",
          align: "center",
          color: "#4a5c6a",
          fontSize: 14,
          fontWeight: "bold",
        },
        leaves: {
          label: {
            position: "top",
            rotate: 90,
            verticalAlign: "middle",
            align: "left",
          },
        },
        emphasis: {
          focus: "descendant",
        },
        animationDurationUpdate: 750,
      },
    ],
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        boxShadow: "0 0 1px #ccd0cf",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        nodeTree && (
          <Echart
            option={option}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )
      )}
    </div>
  );
};

export default MapTreeChart;
