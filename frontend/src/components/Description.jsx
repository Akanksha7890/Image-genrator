import React from "react";
import sampleImg from '../assets/sample_img_1.png'
 // 👈 apni image ka path yaha do

const Description = () => {
  return (
    <section className="w-full bg-[#f9fafb] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Create AI Images
          </h2>
          <p className="text-gray-500 mt-3">
            Turn your imagination into visuals
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={sampleImg}
              alt="AI Generated"
              className="rounded-xl shadow-lg max-w-sm w-full"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Introducing the AI-Powered Text to Image Generator
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Easily bring your ideas to life with our free AI image generator.
              Whether you need stunning visuals or unique imagery, our tool
              transforms your text into eye-catching images with just a few
              clicks.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Simply type in a text prompt, and our cutting-edge AI will generate
              high-quality images in seconds. From product visuals to character
              designs and portraits, even concepts that don’t yet exist can be
              visualized effortlessly.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Description;
