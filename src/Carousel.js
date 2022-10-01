import React from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';

export class Carousel extends React.PureComponent {
  handlePrevClick = () => {
    const { slideIndexDecrement, slides } = this.props;
    slideIndexDecrement(slides.length);
  };

  handleNextClick = () => {
    const { slideIndexIncrement, slides } = this.props;
    slideIndexIncrement(slides.length);
  };

  render() {
    const {
      defaultImg,
      defaultImgHeight,
      slideIndex,
      slideIndexDecrement: _slideIndexDecrement,
      slideIndexIncrement: _slideIndexIncrement,
      slides,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        <CarouselSlide
          imgHeight={defaultImgHeight}
          Img={defaultImg}
          {...slides[slideIndex]}
        />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }

  static propTypes = {
    defaultImg: CarouselSlide.propTypes.Img,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    slideIndex: PropTypes.number.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };
}

export default HasIndex(Carousel, 'slideIndex');
