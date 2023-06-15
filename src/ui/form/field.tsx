import React from 'react';
import _ from 'lodash'

type Props = {
  attribute: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const Field = ({attribute, type, placeholder, label, required}: Props) => {
  const requiredColor = 'red-500';

  return (
    <>
      <label
        htmlFor={attribute}
        className={`mb-2 inline-block text-sm text-gray-800 sm:text-base`}
      >
        {label ? label : _.startCase(attribute)}
        {required ? <span className={`!text-${requiredColor}`}> *</span> : ''}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          name={attribute}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring h-10"
        />
      </div>
    </>
  )
}

export default Field;
