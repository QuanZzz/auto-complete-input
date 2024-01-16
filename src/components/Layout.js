import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-600 text-black">
      <div className="relative flex-1 overflow-y-auto z-10">
        <div className="flex flex-col mx-auto min-h-full px-6 py-16 max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
