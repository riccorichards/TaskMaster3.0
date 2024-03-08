import { NodeDocument } from "../database/type";

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
}

export default Utils;
