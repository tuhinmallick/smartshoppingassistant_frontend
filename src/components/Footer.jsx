import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-center p-4 mt-4">
      
      <div className="flex justify-center space-x-4 mt-2">
        <button className="flex items-center bg-blue-700 text-white px-4 py-1 rounded">
          <FaFacebook className="mr-2" /> Facebook
        </button>
        <button className="flex items-center bg-blue-500 text-white px-4 py-1 rounded">
          <FaTwitter className="mr-2" /> Twitter
        </button>
        <button 
          className="flex items-center text-white px-4 py-1 rounded" 
          style={{ 
            background: "linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)"
          }}
        >
          <FaGoogle className="mr-2" /> Google+
        </button>
      </div>
    </footer>
  );
};

export default Footer;
