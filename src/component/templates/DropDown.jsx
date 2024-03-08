/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function DropDown({ state, options, Setfunc }) {
  return (
    <select defaultValue={state} onChange={(e) => Setfunc(e.target.value)}>
      {options.map((elem, index) => (
        <option key={index} value={elem}>
          {elem.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
