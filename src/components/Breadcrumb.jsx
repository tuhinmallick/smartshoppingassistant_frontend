// Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePreviousPage } from "../hooks/usePreviousPage"; // Import the custom hook

const Breadcrumb = () => {
  const location = useLocation();
  const goBack = usePreviousPage(); // Get the goBack function from the custom hook

  // Split the current path into breadcrumb parts
  const path = location.pathname;
  const breadcrumbParts = path.split("/").filter((part) => part);

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="flex justify-between items-center">
        {/* Left side: Breadcrumb Links */}
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="text-blue-600">
              Home
            </Link>
          </li>
          {breadcrumbParts.map((part, index) => {
            const pathLink = `/${breadcrumbParts
              .slice(0, index + 1)
              .join("/")}`;

            return (
              <li key={index}>
                <span className="text-gray-500">/</span>
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
            onClick={goBack} // Trigger goBack function when clicked
            className="text-blue-600 ml-auto"
            title="Go to previous page"
          >
            &larr; Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
