import { NodeDocument, TaskDocument } from "../database/type";

class Utils {
  static defineAbsolutePath(nodes: NodeDocument[], path: string) {
    const findNode = nodes.find((node) => node.node === path);

    if (!findNode) return false;

    const newPath = findNode.path + `${findNode.node}` + "/";
    return newPath;
  }

  static buildHierarchy = (nodes: NodeDocument[]) => {
    const findChildren = (parentPath: string): any => {
      return nodes
        .filter((node) => node.path === parentPath)
        .map((node) => ({
          name: node.node,
          children: findChildren(parentPath + node.node + "/"),
        }));
    };

    const hierarchy = findChildren(`/`);

    return hierarchy;
  };

  static extractDate(createdAt: string) {
    const date = new Date(createdAt);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}`;
  }

  static defineRemainDays(period: string, startDay: string) {
    //startDay Tue Mar 08 2024 16:28:06 GMT+0400 (Georgia Standard Time)
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
    const journeyDurationDays = Math.ceil(journeyDuration / (1000 * 3600 * 24));
    const usedDays = journeyDurationDays - differenceInDays;

    const result = ((usedDays / journeyDurationDays) * 100).toFixed(2);
    return { result, differenceInDays };
  }
}

export default Utils;
