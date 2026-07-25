import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8">

      {/* Search */}

      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-4 text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell className="text-2xl text-slate-600 hover:text-blue-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-slate-600" />

          <div>

            <h4 className="font-semibold">
              Administrator
            </h4>

            <p className="text-sm text-slate-500">
              Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;