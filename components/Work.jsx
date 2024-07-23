"use client";

import Link from "next/link";
import { Button } from "./ui/button";

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import ProjectCard from "./ProjectCard";

import projectData from "./projectData";

export default function Work() {
  return (
    <section className="w-auto relative mb-12 xl:mb-48 xl:mt-14">
      <div className=" px-7 lg:pr-6 lg:pl-6 mx-auto w-auto">
        <div className="mx-auto text-center mb-12 flex flex-col justify-center items-center">
          <h2 className="section-title mb-4 xl:mb-12 text-center">Projects</h2>
          <p className="subtitle mb-8">Look at some of my projects</p>
          <Link href="/projects">
            <Button>All Projects</Button>
          </Link>
        </div>
        <div className="w-full right-0 top-10">
          <Swiper
            className="h-[510px]"
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={30}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: "true" }}
            autoplay={{
              delay: 2800, // Change this value to control the delay between slides (in milliseconds)
              disableOnInteraction: false, // Slides will continue to autoplay after user interactions
            }}
            loop={true}
          >
            {projectData.slice(0, 6).map((project, index) => {
              return (
                <SwiperSlide key={index}>
                  {<ProjectCard project={project} />}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
