import path from "path";

const root = path.resolve(__dirname, "./src");

export const aliases = {
  "@": root,
  "@ui": path.resolve(root, "ui"),
  "@redux": path.resolve(root, "redux/index.ts"),
  "@hooks": path.resolve(root, "hooks"),
  "@services": path.resolve(root, "services"),
  "@routes": path.resolve(root, "routes"),
  "@utils": path.resolve(root, "utils"),
  "@features": path.resolve(root, "features"),
};
