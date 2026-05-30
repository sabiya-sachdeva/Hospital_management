

import { render } from "@testing-library/react";
import { Row, Col } from "antd";
test("inspect matchMedia", () => {
  console.log("matchMedia =", window.matchMedia);

  console.log(
    "descriptor =",
    Object.getOwnPropertyDescriptor(window, "matchMedia")
  );

  expect(true).toBe(true);
});