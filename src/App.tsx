import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <p className="flex text-3xl sm:justify-center">Questions App</p>
      <nav className="flex sm:justify-center space-x-4 bg-slate-400">
        {[
          ["List", "/questions"],
          ["Create", "/questions/create"],
        ].map(([title, url]) => (
          <Link className="text-xl" to={url}>
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default App;
