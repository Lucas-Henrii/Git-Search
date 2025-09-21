const Input = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "is-invalid" : ""}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
