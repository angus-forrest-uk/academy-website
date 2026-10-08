import { visit } from "unist-util-visit";

export default function rehypeTableScroll() {
  return (tree: any) => {
    const wrapped = new Set<unknown>();

    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== "table") return;
      if (index === undefined || !parent) return;
      // The wrapper is itself an element, so the walk meets each table twice.
      if (wrapped.has(node)) return;
      wrapped.add(node);

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["content-table", `content-table--cols-${countColumns(node)}`],
          tabIndex: 0,
        },
        children: [node],
      };
    });
  };
}

function countColumns(table: any): number {
  let widest = 1;
  const MAX = 8;

  visit(table, "element", (node: any) => {
    if (node.tagName !== "tr") return;

    let span = 0;
    for (const cell of node.children ?? []) {
      if (cell.type !== "element") continue;
      if (cell.tagName !== "td" && cell.tagName !== "th") continue;
      const declared = Number.parseInt(String(cell.properties?.colSpan ?? 1), 10);
      span += Number.isFinite(declared) && declared > 0 ? declared : 1;
    }
    if (span > widest) widest = span;
  });

  return Math.min(widest, MAX);
}
