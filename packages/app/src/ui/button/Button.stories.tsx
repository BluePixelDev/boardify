import { Button } from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
};

export const Default = () => (
  <Button label="Click Me" onClick={() => alert("Button clicked!")} />
);
export const Disabled = () => (
  <Button
    label="Disabled"
    onClick={() => alert("Button clicked!")}
    disabled={true}
  />
);
export const Submit = () => (
  <Button
    label="Submit"
    onClick={() => alert("Button clicked!")}
    type="submit"
  />
);
export const CustomStyle = () => (
  <Button
    label="Custom Style"
    onClick={() => alert("Button clicked!")}
    style={{ backgroundColor: "blue", color: "white", padding: "10px 20px" }}
  />
);
