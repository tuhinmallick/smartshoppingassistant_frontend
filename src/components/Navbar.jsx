const Navbar = () => {
  return (
    <nav className="bg-gray-300 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold">Smart Shopping Assistant</span>
      </div>
      <div className="flex space-x-4">
        <a href="" target="_blank" rel="noopener noreferrer" className="text-yellow-500">
          🔔
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" className="text-green-500">
          💬
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" className="text-red-500">
          ❤️
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-600">
          👤
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
