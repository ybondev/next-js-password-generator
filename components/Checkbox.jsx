"use client";

const Checkbox = (props) => {
  const { value, onChange } = props;

  return (
    <>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        id="checkbox"
      />
    </>
  );
};

export default Checkbox;
