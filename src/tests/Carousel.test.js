import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;

  const slides = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1663978709986-a29387d450f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'lizard couple',
      attribution: 'author1',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1664155942208-a4792a4be4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      description: 'Thai shop',
      attribution: 'author2',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1664151268423-a11a2757f0f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'artwork',
      attribution: 'author3',
    },
  ];

  beforeEach(() => {
    //arrange
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('has an initial `slideIndex` of 0', () => {
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('renders a CarouselButton labelled "Prev"', () => {
    expect(wrapper.find(CarouselButton).at(0).prop('children')).toBe('Prev');
  });

  it('renders a CarouselButton labelled "Next"', () => {
    expect(wrapper.find(CarouselButton).at(1).prop('children')).toBe('Next');
  });

  describe('with a middle slide selected', () => {
    beforeEach(() => {
      //arrange
      wrapper.setState({ slideIndex: 1 });
    });

    it('decrements `slideIndex` when Prev is clicked.', () => {
      //act
      const prevButton = wrapper.find('[data-action="prev"]');
      prevButton.simulate('click');

      //assert
      expect(wrapper.state('slideIndex')).toBe(0);
    });

    it('increments `slideIndex` when Next is clicked', () => {
      //act
      const nextButton = wrapper.find('[data-action="next"]');
      nextButton.simulate('click');

      expect(wrapper.state('slideIndex')).toBe(2);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps `slideIndex` to max value when Prev is clicked', () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(slides.length - 1);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps `slideIndex` to min value when Next is clicked', () => {
      wrapper.setState({ slideIndex: slides.length - 1 });
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });

  it('Renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });

    wrapper.setState({ slideIndex: 1 });
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[1] });
  });
});
