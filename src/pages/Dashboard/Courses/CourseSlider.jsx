// Disabling lint cause we can not do anything with css imports
/* eslint-disable */
import { Keyboard, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../../styles/Courses.scss";
import Card from "@components/Card/Card";
import CourseCard from "../../../components/CourseCard/CourseCard";
import cardPic from "../../../assets/images/publish-card-pic.svg";

const swiperBreakpoints = {
  320: {
    slidesPerView: 1,
  },
  576: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 2,
  },
  992: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
  1440: {
    slidesPerView: 4,
  },
  1680: {
    slidesPerView: 5,
  },
  1920: {
    slidesPerView: 6,
  },
  2560: {
    slidesPerView: 7,
  },
};
const courseCards = [
  {
    id: 1,
    title: "Design Conference",
    detail: "Coach: David Everson",
    img: cardPic,
  },
  {
    id: 2,
    title: "Design Conference",
    detail: "Coach: David Everson",
    img: cardPic,
  },
  {
    id: 3,
    title: "Structured Query",
    detail: "Account Academy X",
    img: cardPic,
  },
  {
    id: 4,
    title: "Advance programing",
    detail: "Account Academy X",

    img: cardPic,
  },
  {
    id: 5,
    title: "Blogs creation",
    detail: "Account Academy X",
    img: cardPic,
  },
  {
    id: 6,
    title: "Web Design",
    detail: "Account Academy X",
    img: cardPic,
  },
  {
    id: 7,
    title: "Web Design",
    detail: "Account Academy X",
    img: cardPic,
  },
  {
    id: 8,
    title: "Web Design",
    detail: "Account Academy X",

    img: cardPic,
  },
];
const CourseSlider = () => {
  return (
    <div className="slider-section">
      <Swiper
        loop={true}
        breakpoints={swiperBreakpoints}
        navigation={true}
        spaceBetween={10}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      >
        {courseCards.map((course, index) => (
          <SwiperSlide key={`${course.id}_${index + 1}`}>
            <CourseCard {...course} archive={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default CourseSlider;
