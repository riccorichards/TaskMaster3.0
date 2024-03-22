import axios, { Method } from "axios";
import { NodeTreeType } from "../types";
import takeAccessTokenFromStorage from "./takeAccessTokenFromStorage";
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
  //
  //https://task-master-zjvca.ondigitalocean.app/
  static async makeRequest<T>(
    url: string,
    method: Method = "GET",
    data?: unknown
  ): Promise<T> {
    try {
      const { accessToken, refreshToken } = takeAccessTokenFromStorage();
      const response = await axios({
        url: `http://localhost:5000/api/${url}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh": refreshToken,
        },
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

  static extractDate(createdAt: string) {
    const date = new Date(createdAt);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hr = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day}-${hr}:${min}`;
  }

  static defineRemainDays(period: string, startDay: string) {
    const endTime = new Date(period);
    const today = new Date();
    const start = new Date(startDay);

    //normalize both days at the start of the day
    endTime.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    //define the difference between target day and today in milleseconds
    const differentInTime = endTime.getTime() - today.getTime();
    const journeyDuration = endTime.getTime() - start.getTime();
    //convert milleseconds into days
    const differenceInDays = Math.ceil(differentInTime / (1000 * 3600 * 24));
    const journeyDurationDays = Math.ceil(differentInTime / (1000 * 3600 * 24));
    console.log({ journeyDuration, journeyDurationDays, startDay });

    return differenceInDays;
  }
}

export default Utils;
