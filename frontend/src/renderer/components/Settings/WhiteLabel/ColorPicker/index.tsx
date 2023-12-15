function InputColorPicker({ onChange, id }: any) {
  return (
    <input
      id={id}
      type="color"
      style={{
        border:"none",
        borderRadius: '50%',
        width: '25px',
        outline: 'none',
        background: 'transparent',
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
export default InputColorPicker;
