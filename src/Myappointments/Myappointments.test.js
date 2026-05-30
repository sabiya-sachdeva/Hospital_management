import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Myappointment from "./Myappointment";
import { BrowserRouter } from "react-router-dom";

test("Loads appointment", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: "1",
            doctorname: "Dr Smith",
            date: "2026-06-01",
            time: "10:00",
          },
        ]),
    }),
  );
  render(
    <BrowserRouter>
      <Myappointment />
    </BrowserRouter>,
  );
  const doctor = await screen.findByText(/Dr Smith/i);
  expect(doctor).toBeInTheDocument();
});

test("Cancel Appointment", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: async () => [
        {
          _id: "1",
          doctorname: "Dr Smith",
          date: "2026-06-01",
          time: "10:00",
        },
      ],
    })
    .mockResolvedValueOnce({
      //The component performs multiple asynchronous fetch calls. The first fetch loads appointments and the second fetch cancels an appointment. I used mockResolvedValueOnce() so that each fetch call receives a different mocked response in the same order that the component executes them.
      json: async () => ({
        message: "Appoitnment cancelled successfully",
      }),
    });
  render(
    <BrowserRouter>
      <Myappointment />
    </BrowserRouter>,
  );
  const button = await screen.findByRole("button", {
    name: /cancel/i,
  });
  await userEvent.click(button);
  const doctor = await screen.findByText(/Dr Smith/i);
  expect(doctor).not.toBeInTheDocument();
});
