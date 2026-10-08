import { visit } from "unist-util-visit";

export default function rehypeImageCaption() {
  return (tree: any) => {
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== "p") return;
      if (index === undefined || !parent) return;

      const children = node.children.filter(
        (child: any) => !(child.type === "text" && child.value.trim() === ""),
      );
      if (children.length !== 1) return;
      const [image] = children;
      if (image.type !== "element" || image.tagName !== "img") return;

      const alt = String(image.properties?.alt ?? "").trim();
      if (!alt) return;
      if (!image.properties.title) image.properties.title = alt;

      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: { className: ["content-figure"] },
        children: [
          image,
          {
            type: "element",
            tagName: "figcaption",
            properties: { ariaHidden: "true" },
            children: [{ type: "text", value: alt }],
          },
        ],
      };
    });
  };
}
