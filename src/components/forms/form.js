import React from 'react';

import { TextInput, findNodeHandle } from 'react-native';
import { ValidationOptions, FieldError } from 'react-hook-form';

export default ({
  register,
  errors,
  setValue,
  validation,
  children,
}) => {
  const Inputs = React.useRef([]);

  React.useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
      if (child.props.name)
        register({ name: child.props.id }, validation[child.props.name]);
    });
  }, [register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...child.props,
                ref: e => {
                  Inputs.current[i] = e;
                },
                onValueChange: (v) => {
                  setValue(child.props.id, v, true)
                },
                error: errors[child.props.name],
                id: child.props.id,
                key: child.props.id,
              })
            : child;
        }
      )}
    </>
  );
};
