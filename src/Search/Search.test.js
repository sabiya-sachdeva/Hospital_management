import { render, screen } from "@testing-library/react";
import Search from "./Search";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { DoctorContext } from "../DoctorContext";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

test("loads and displays doctors", async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 1,
        name: "Dr Smith",
        specialty: "Cardiologist",
        contact: {
          email: "carol.white@example.com",
        },
        image: "image.jpg",
      },
    ],
  });

  render(
    <DoctorContext.Provider value={{ setSelectedDoctor: jest.fn() }}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </DoctorContext.Provider>,
  );
  screen.debug();
  expect(await screen.findByText("Dr Smith")).toBeInTheDocument();
});
