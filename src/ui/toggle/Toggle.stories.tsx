import { Toggle } from "./Toggle";

export default {
  title: "Toggle",
  component: Toggle,
};

export const Default = () => (
  <Toggle
    value={false}
    onChange={(checked) => console.log("Toggle changed:", checked)}
  />
);
