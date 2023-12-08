
const TextAreaField = ({ label, value, onChange, error, maxLength }) => (
    <div className="flex flex-col">
      <label>{label}</label>
      <textarea className="w-96 h-24 border border-black rounded-lg p-2" value={value} onChange={onChange} maxLength={maxLength} />
      {error && <p className="text-orange-500 text-sm">{error} ⚠️</p>}
    </div>
  );
  
  const InputFieldWithCounter = ({ label, value, onChange, error, maxLength }) => (
    <div className="mb-4">
      <TextAreaField label={`${label} (${value.length}/${maxLength})`} value={value} onChange={onChange} error={error} maxLength={maxLength} />
    </div>
  );
  
  export default InputFieldWithCounter;