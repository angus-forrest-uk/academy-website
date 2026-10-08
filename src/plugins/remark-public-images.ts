import { visit } from "unist-util-visit";
import { isBareImageRef, toPublicImagePath } from "../lib/images";

export default function remarkPublicImages() {
  return (tree: any) => {
    const imageRefs = new Set<string>();
    visit(tree, "imageReference", (node: any) => {
      imageRefs.add(node.identifier);
    });

    visit(tree, "image", (node: any) => {
      if (isBareImageRef(node.url)) node.url = toPublicImagePath(node.url);
    });
    visit(tree, "definition", (node: any) => {
      if (imageRefs.has(node.identifier) && isBareImageRef(node.url)) {
        node.url = toPublicImagePath(node.url);
      }
    });
  };
}
