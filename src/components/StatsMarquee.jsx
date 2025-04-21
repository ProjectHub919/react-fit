import React from "react";
import Marquee from "react-fast-marquee";

export default function StatsMarquee() {
  const stats = [
    { value: "100+", label: "Exercise Options" },
    { value: "10k+", label: "Happy Users" },
    { value: "50+", label: "Workout Plans" },
    { value: "24/7", label: "Support" },
    { value: "100+", label: "Exercise Options" },
    { value: "10k+", label: "Happy Users" },
    { value: "50+", label: "Workout Plans" },
    { value: "24/7", label: "Support" },
  ];

  return (
    /* Stats Section */
    <div className="py-12 md:py-20">
      <Marquee
        className="overflow-hidden bg-blue-500/10 p-6"
        speed={250}
        gradient={false}
        loop={0}
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex-shrink-0 mx-24">
            <div className="flex items-center gap-4">
              <p className="text-4xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-4xl uppercase tracking-wider text-white">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
