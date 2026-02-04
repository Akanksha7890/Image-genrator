import React from "react";

const testimonials = [
  {
    name: "Donald Jackman",
    role: "Graphic Designer",
    rating: 5,
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Richard Nelson",
    role: "Content Creator",
    rating: 5,
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "James Washington",
    role: "Co-Founder",
    rating: 5,
    text: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    image: "https://i.pravatar.cc/100?img=56",
  },
];

const Testimonial = () => {
  return (
    <section className="w-full bg-[#fdfaf6] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Customer testimonials
          </h2>
          <p className="text-gray-500 mt-3">
            What Our Users Are Saying
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full"
                />
              </div>

              {/* Name */}
              <h3 className="text-center font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-center text-sm text-gray-500 mb-3">
                {item.role}
              </p>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="text-orange-400 text-lg">★</span>
                ))}
              </div>

              {/* Review */}
              <p className="text-center text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
