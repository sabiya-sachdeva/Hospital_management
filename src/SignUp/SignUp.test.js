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

test("form submits successfully", async () => {
  global.fetch = jest.fn(() =>  //jest automatically created a fucntion for us like myfunction()
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "Signup successful",
        }),
    })
  );

  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  await userEvent.type(
    screen.getByLabelText(/first name/i),
    "John"
  );

  const submitButton = screen.getByRole("button", {
    name: /signup/i,
  });

  await userEvent.click(submitButton);

  expect(fetch).toHaveBeenCalled();
});
