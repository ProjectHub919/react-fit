import React, { useState, useEffect } from "react";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "./Button";
export default function ContactForm() {
  // State variables for form data, errors, and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const recaptchaRef = useRef(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Function to handle input changes and update form data (e = event)
  const handleChange = (e) => {
    const { name, value } = e.target;  // example: e.target.name = "name", e.target.value = "John Doe"
    setFormData({ ...formData, [name]: value }); // Update form data state with new value 
    // Clear error message when user types in the input field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Function to validate the form data before submission
  const validateForm = () => {
    const newErrors = {};
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    // Recaptcha validation
    if (!captchaVerified) {
      newErrors.recaptcha = "Please verify that you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleRecaptchaChange = (token) => {
    setCaptchaVerified(!!token); // Set to true if token is received, false otherwise (double ! = true if token exist)
    if (errors.recaptcha) {
      setErrors({ ...errors, recaptcha: "" });
    }
  };

  useEffect(() => {
    // Reset form status after success message is shown
    let timer;
    if (submitStatus === "success") {
      timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000); // Reset after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer on unmount or when submitStatus changes
  }, [submitStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate successful submission (no form data actual send to backend)
      setSubmitStatus("sending");

      setTimeout(() => {
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({ name: "", email: "", message: "" });
        setCaptchaVerified(false);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }, 1500);
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col gap-10 w-full mx-auto py-10 bg-slate-950"
    >
      <div className="flex flex-col gap-2 justify-center items-center p-4">
        <p className="uppercase font-medium">Contact Us</p>
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-6xl">
          Get <span className="uppercase text-blue-400">In</span> Touch
        </h2>
      </div>
      <div className="w-full flex flex-col gap-6 max-w-[800px] mx-auto p-4">
        <p className="text-center text-sm md:text-base">
          Have questions about your fitness journey? We're here to help you!
        </p>

        {/* When form submit runs the handleSubmit function */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            {/* Name Input Field */}
            <label htmlFor="name" className="text-sm text-slate-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-slate-950 border ${
                errors.name ? "border-red-500" : "border-blue-400"
              } p-3 focus:outline-none focus:border-blue-600`}
              placeholder="Your Name"
            />
            {/* Error message for name field */}
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-slate-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-slate-950 border ${
                errors.email ? "border-red-500" : "border-blue-400"
              } p-3 focus:outline-none focus:border-blue-600`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message Input Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm text-slate-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`bg-slate-950 border ${
                errors.message ? "border-red-500" : "border-blue-400"
              } p-3 focus:outline-none focus:border-blue-600`}
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Recaptcha and Submit Button */}
          <div className="grid grid-cols-2 items-start">
            <div className="flex flex-col">
              <ReCAPTCHA 
                ref={recaptchaRef} // Reference to the ReCAPTCHA component
                sitekey="6LdPGx8rAAAAAIjHxPkVWzCSkkztuE4w8wJ4ElM7" // Google's site key
                onChange={handleRecaptchaChange}
                theme="white"
              />
              {errors.recaptcha && (
                <p className="text-red-500 text-xs">{errors.recaptcha}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                text={
                  submitStatus === "sending"
                    ? "Sending..."
                    : submitStatus === "success"
                    ? "Message Sent!"
                    : "Send Message"
                }
                type="submit"
              />
            </div>
          </div>

          {/* Submission Status Message */}
          {submitStatus === "success" && (
            <p className="text-green-500 text-center font-medium">
              Thank you for your message! We'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
