import { render } from "@testing-library/react";
import Footerdetails from "./Footerdetails";

test("footer renders", () => {
  try {
    render(<Footerdetails />);
  } catch (err) {
    console.log("ERROR:", err);

    if (err.errors) {
      console.log("INNER ERRORS:");
      err.errors.forEach((e, index) => {
        console.log(`Error ${index + 1}:`, e);
      });
    }

    throw err;
  }
});
