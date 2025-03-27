// usePreviousPage.js
import { useNavigate, useLocation } from "react-router-dom";

export const usePreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate to the previous page
  const goBack = () => {
    navigate(-1); // Go back to the previous page in the history stack
  };

  return goBack;
};
