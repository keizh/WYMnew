/* eslint-disable react/prop-types */
function Loader({ width = "500px" }) {
  return (
    <div className="h-full w-full bg-[#000000] flex items-center justify-center">
      <img className={`w-[${width}]`} src="public\spin.gif" alt="" />
    </div>
  );
}

export default Loader;

// COMPONENT IS COMPLETED
