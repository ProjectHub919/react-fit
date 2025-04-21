import React from "react";
import SectionWrapper from "./SectionWrapper";

export default function FeatureSection() {
  const features = [
    {
      icon: "fa-solid fa-dumbbell",
      title: "Custom Workouts",
      description:
        "Generate workouts tailored to your specific fitness goals and muscle groups.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Progress Tracking",
      description:
        "Track your performance and see your improvements over time with detailed statistics.",
    },
    {
      icon: "fa-solid fa-users",
      title: "Expert Guildance",
      description:
        "Access professional workout plans designed by certified fitness trainers.",
    },
    {
      icon: "fa-solid fa-mobile-screen",
      title: "Mobile Friendly",
      description:
        "Take your workout plans anywhere with out responsive mobile design.",
    },
  ];

  return (
    <SectionWrapper
      id={"features"}
      header={"WHY CHOOSE US"}
      title={["Fitness", "REIMAGINED", "For You"]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-950 p-6 rounded-lg border border-blue-400/20 hover:border-blue-400 transition colors duration-300"
          >
            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-blue-500/20 rounded-full">
              <i className={`${feature.icon} text-xl text-blue-400`}></i>
            </div>
            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
