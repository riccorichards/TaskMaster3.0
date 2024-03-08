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

  static capitalized(str: string) {
    const firstChar = str.charAt(0).toUpperCase();
    return firstChar + str.slice(1);
  }

  static extractedWorkspace(nodes: NodeTreeType[]) {
    return nodes.map((node) => node.name);
  }
}

export default Utils;
