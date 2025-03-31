import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePreviousPage } from "../hooks/usePreviousPage";

const Breadcrumb = () => {
  const location = useLocation();
  const goBack = usePreviousPage();

  const path = location.pathname;
  const breadcrumbParts = path.split("/").filter((part) => part);

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left side: Breadcrumb Links */}
      <ul className="flex space-x-2">
        <li>
          <Link to="/" className="text-yellow-300">
            Home
          </Link>
        </li>
        {breadcrumbParts.map((part, index) => {
          const pathLink = `/${breadcrumbParts.slice(0, index + 1).join("/")}`;

          return (
            <li key={index}>
              <span className="text-blue-600">/</span>
              <Link to={pathLink} className="text-blue-600 capitalize">
                {part.replace(/-/g, " ")}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right side: "Go Back" Button */}
      {location.pathname !== "/" && (
        <button
          onClick={goBack}
          className="text-blue-600 ml-auto"
          title="Go to previous page"
        >
          &larr; Go Back
        </button>
      )}
    </div>
  );
};

export default Breadcrumb;
