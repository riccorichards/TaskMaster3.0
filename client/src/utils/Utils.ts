import axios, { Method } from "axios";
import { NodeTreeType } from "../types";
class Utils {
  static scrollToComponent(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  static handleDownloadResume = (file: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  static async makeRequest<T>(
    url: string,
    method: Method = "GET",
    data?: unknown
  ): Promise<T> {
    try {
      const response = await axios({
        url: `http://localhost:5000/${url}`,
        method,
        data,
        withCredentials: true,
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  static validPeriod(str: string) {
    const validPeriodFormat =
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return validPeriodFormat.test(str);
  }

  static capitalized(str: string) {
    const firstChar = str.charAt(0).toUpperCase();
    return firstChar + str.slice(1);
  }

  static extractedWorkspace(nodes: NodeTreeType[]) {
    return nodes.map((node) => node.name);
  }

  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    return [hours, minutes, remainingSeconds]
      .map((val) => String(val).padStart(2, "0"))
      .join(":");
  }
}

export default Utils;
