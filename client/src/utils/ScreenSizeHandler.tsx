import { useEffect } from "react";
import { useToolsStore } from "../store/ToolsStore";

const ScreenSizeHandler = () => {
  const { screenSizeReader } = useToolsStore();

  useEffect(() => {
    const handleResize = () => {
      screenSizeReader(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSizeReader]);

  return null;
};

export default ScreenSizeHandler;
