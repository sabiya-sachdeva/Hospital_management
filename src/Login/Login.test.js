import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

import { BrowserRouter } from "react-router-dom";

test("renders login button", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const button = screen.getByRole("button", {
    name: /login/i,
  });

  expect(button).toBeInTheDocument();
});

test("email input is focused", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByLabelText(/email/i);

  expect(emailInput).toHaveFocus();
});
