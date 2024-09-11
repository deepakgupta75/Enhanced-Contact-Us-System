import React, { useState } from "react";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Send form data to API
        const response = await fetch("https://enhanced-contact-us-system-11.onrender.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Form data submitted successfully:", data);
          setFormData({
            name: "",
            email: "",
            phone: "",
            topic: "",
            message: "",
          });
          alert("Query submitted successfully!");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('/map.jpg')", // Path to your background image
          zIndex: "1",
        }}
      />

      <div className="relative container mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center  text-white decoration-white mb-8 ">
          Enhanced Contact Us System
        </h1>

        {/* Grid layout with 50/50 split */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
          {/* Right Section - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full bg-gray-800 shadow-lg rounded-lg z-10">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-black/50 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6 z-10"
              >
                {/* Name Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Topic Field (Select Dropdown) */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="topic"
                  >
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback on Contact System</option>
                    <option value="Suggestion">Any Suggestion </option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter your message"
                    rows="1"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-white text-black rounded-md"
                  >
                    Submit Query
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
