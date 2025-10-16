import React from "react";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  type = "input", 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  options = [],
  rows,
  ...props 
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value, name);
    }
  };

  if (type === "textarea") {
    return (
      <TextArea
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    );
  }

  if (type === "select") {
    return (
      <Select
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        error={error}
        {...props}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    );
  }

  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      error={error}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default FormField;