import { Dispatch, SetStateAction, useState } from 'react';

type ReturnType = {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: Dispatch<SetStateAction<boolean>>;
};

export const useBoolean = (defaultValue?: boolean): ReturnType => {
  const [value, setValue] = useState(!!defaultValue);

  const onTrue = () => {
    setValue(true);
  };

  const onFalse = () => {
    setValue(false);
  };

  const onToggle = () => {
    setValue((prev) => !prev);
  };

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
};
