'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
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

  describe('component with HOC', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Carousel slides={slides} />);
    });

    it('sets slideIndex={0} on the core component', () => {
      expect(wrapper.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes `slides` down to the core component', () => {
      expect(wrapper.find(CoreCarousel).prop('slides')).toBe(slides);
    });
  });

  describe('core component', () => {
    const slideIndexDecrement = jest.fn();
    const slideIndexIncrement = jest.fn();

    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        />
      );
    });

    it('renders a <div>', () => {
      expect(wrapper.type()).toBe('div');
    });

    it('renders a CarouselButton labeled "Prev"', () => {
      expect(wrapper.find(CarouselButton).at(0).prop('children')).toBe('Prev');
    });

    it('renders a CarouselButton labeled "Next"', () => {
      expect(wrapper.find(CarouselButton).at(1).prop('children')).toBe('Next');
    });

    it('renders the current slide as a CarouselSlide', () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });

      wrapper.setProps({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1],
      });
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('increments `slideIndex` when Next is clicked', () => {
      wrapper.find('[data-action="next"]').simulate('click');
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
      const defaultImg = () => 'test';
      const defaultImgHeight = 1234;

      wrapper.setProps({ defaultImg, defaultImgHeight });

      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
        defaultImgHeight
      );
    });

    it('allows individual slides to override Img and imgHeight', () => {
      const Img = () => 'test';
      const imgHeight = 1234;
      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });

      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
    });
  });

  /*
  let wrapper;



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
  */
});
