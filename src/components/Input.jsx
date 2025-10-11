const Input = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-2 w-full text-white">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-solid rounded-[4px] p-1 bg-white text-[#191C1F] ${error ? "is-invalid" : ""}`}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
