import { Link } from "react-router-dom";

const BadgeIcon = ({ to, icon, count, hoverClass }) => (
  <Link
    to={to}
    className={`relative text-4xl ${hoverClass} transition-colors duration-300`}
  >
    {icon}
    {count > 0 && (
      <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
        {count}
      </span>
    )}
  </Link>
);

export default BadgeIcon;
