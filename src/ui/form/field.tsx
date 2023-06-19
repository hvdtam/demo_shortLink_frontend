import React from 'react';
import _ from 'lodash'

type Props = {
  attribute: string;
  value: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field = ({attribute, type, value, placeholder, label, required, disabled,onChange}: Props) => {
  const requiredColor = 'red-500';

  return (
    <>
      <label
        htmlFor={attribute}
        className={`mb-2 inline-block text-sm text-gray-800 sm:text-base`}
      >
        {label ? label : _.startCase(attribute)}
        {required ? <a className={`!text-${requiredColor}`}> *</a> : ''}
      </label>
      <div className="relative">
        <input
          disabled={disabled}
          value={value}
          type={type}
          placeholder={placeholder}
          name={attribute}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring h-10"
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Field;
