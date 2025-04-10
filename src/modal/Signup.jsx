import { useState } from "react";
import { motion } from "framer-motion";
import { signupUser } from "../api/authAPI";
import Button from "../components/ui/Button";
import SuccessErrorMessage from "../components/ui/SuccessErrorMessage";

const Signup = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    street: "",
    city: "",
    zipcode: "",
    about: "",
    phone: "",
  });

  const [showMessage, setShowMessage] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessage(null);

    try {
      const data = await signupUser(formData);
      if (data?.token) {
        setShowMessage({
          type: "success",
          message: "Your request has been submitted.",
        });

        setTimeout(() => {
          setIsFlipped(false); // Go to login
        }, 2000);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      setShowMessage({ type: "error", message: err.message });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full bg-[#2c2c2c] p-6 shadow-xl rounded-lg"
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showMessage && (
        <SuccessErrorMessage
          type={showMessage.type}
          message={showMessage.message}
          onClose={() => setShowMessage(null)}
        />
      )}

      <div className="w-full text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {[
            "name",
            "surname",
            "email",
            "password",
            "street",
            "city",
            "zipcode",
            "about",
            "phone",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
              onChange={handleChange}
              required={field !== "about"}
            />
          ))}
          <Button type="submit" text="Sign Up" />
        </form>
        <p
          className="mt-4 text-white cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          <span className="text-[#f7f1e4] font-semibold">
            Already have an account?
          </span>
          <span className="text-[#fc372d] font-extrabold"> Sign In</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
