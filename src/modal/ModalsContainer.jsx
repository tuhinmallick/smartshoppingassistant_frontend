import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const ModalsContainer = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <>
      {/* Popup Modals */}
      {isLoginOpen && (
        <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      )}
      {isSignupOpen && (
        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setSignupOpen(false)}
        />
      )}

      {/* Buttons to Open Modals */}
      <div className="fixed bottom-10 right-10 space-x-4">
        <button
          onClick={() => setLoginOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => setSignupOpen(true)}
          className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </>
  );
};

export default ModalsContainer;
