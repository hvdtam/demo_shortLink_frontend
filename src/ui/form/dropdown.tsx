import React from 'react';
import _ from 'lodash'

type Props = {
  attribute: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  defaultValue: string;
  options: { key: any, value: any }[];
  required?: boolean;
};

const Dropdown = ({attribute, defaultValue, label, options, required, onChange}: Props) => {
  const requiredColor = 'red-500';

  return (
    <>
      <label
        htmlFor={attribute}
        className={`mb-2 inline-block text-sm text-gray-800 sm:text-base`}
      >
        {label ? label : _.startCase(attribute)} {required ? <span className={`text-${requiredColor}`}>*</span> : ''}
      </label>
      <div className="relative">
        <select
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring h-10"
          value={defaultValue}
          onChange={onChange}>
          <option>{defaultValue}</option>
          {options.map((option, index) => (
            <option key={option.key} value={option.key}>{option.value}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Dropdown;
