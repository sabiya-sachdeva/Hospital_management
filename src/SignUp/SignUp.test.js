import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";

//test case to chedk if user can type into input

test("User can type into input field", async () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>,
  );
  const firstname = screen.getByLabelText(/first name/i);
  await userEvent.type(firstname, "john");
  expect(firstname).toHaveValue("john");
});

//form submission

test("form submittes successfully", () => {
  global.fetch = jest.fn(() => {
    Promise: resolvePath({
      ok: true,
    });
  });
});
