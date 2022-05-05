import { render, screen, fireEvent } from '@testing-library/react';
import ImageCarousel from "./ImageCarousel";
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
Enzyme.configure({ adapter: new Adapter() });

test("Carousel didnt crashed", async () => {
  render(<ImageCarousel />);
  const carousel = await screen.findByTestId('carousel');
  expect(carousel).toBeInTheDocument();
});

test("Only one photo at a time!", () => {
  const home = shallow(<ImageCarousel />);
  const photo = home.find('img').length;
  expect(photo).toEqual(1);
});

describe("Click tests", () => {
  it("Click next", async () => {
    render(<ImageCarousel />);
    const button = await screen.findByTestId('next-btn');
    fireEvent.click(button);
  });
  it("Click prev", async () => {
    render(<ImageCarousel />);
    const button = await screen.findByTestId('prev-btn');
    fireEvent.click(button);
  });
});

