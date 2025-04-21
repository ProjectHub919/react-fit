import React from "react";
import SectionWrapper from "./SectionWrapper";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Bryan Lee",
      role: "Fitness Fan",
      text: "PowerUP seriously changed how I approach my workouts. I used to feel all over the place, but now I've got a plan that actually works for me. Super easy to follow and I'm finally seeing results!",
    },
    {
      name: "Sarah Tan",
      role: "Active Runner",
      text: "I run a lot and needed something that could keep up with my training. PowerUP gives me just what I need when I need it. No fluff — just solid, reliable workout support.",
    },
    {
      name: "Johnson Chen",
      role: "Gym Beginner",
      text: "I was intimidated by fitness apps before, but PowerUP made it so easy to get started and track my progress. Now I'm hooked!",
    },
  ];

  return (
    <SectionWrapper
      id="testimonials"
      header="SUCCESS STORIES"
      title={["What", "USERS", "Say"]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-14">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-slate-950 p-6 rounded-lg relative flex flex-col justify-between h-full">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full">
              <i className="fa-solid fa-quote-left text-white"></i>
            </div>
            <p className="mb-6 text-slate-300">{testimonial.text}</p>
            <div className="text-center gap-4">
              <h4 className="font-medium">{testimonial.name}</h4>
              <p className="text-sm text-blue-400">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
