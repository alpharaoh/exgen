export default function({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const { name } = path.node;
        if (t.isJSXIdentifier(name)) {
          path.node.name = t.stringLiteral(name.name);
        }
      },
      JSXClosingElement(path) {
        const { name } = path.node;
        if (t.isJSXIdentifier(name)) {
          path.node.name = t.stringLiteral(name.name);
        }
      },
    },
  };
};
