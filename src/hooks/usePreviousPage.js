import { useNavigate, useLocation } from "react-router-dom";

export const usePreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return goBack;
};
