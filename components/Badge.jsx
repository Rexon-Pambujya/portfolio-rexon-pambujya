"use client";
import CountUp from "react-countup";
export const Badge = ({
  containerStyles,
  icon,
  endCountNum,
  endCountText,
  badgeText,
}) => {
  return (
    <div className={`badge ${containerStyles}`}>
      <div className=" text-xl lg:text-3xl text-primary">{icon}</div>
      <div className="flex items-center gap-x-2">
        <div className=" text-2xl lg:text-4xl leading-none font-bold text-primary">
          <CountUp end={endCountNum} delay={1} duration={4} />
          {endCountText}
        </div>
        <div className="max-w-[70px] leading-none text-[12px] lg:text-[15px] font-medium text-black">
          {badgeText}
        </div>
      </div>
    </div>
  );
};
