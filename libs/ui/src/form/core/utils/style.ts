import type { MyStyles } from '../styles';

export const showErrors = (
  isTouched: boolean,
  isFocused: boolean,
  errors: string | undefined,
) => {
  return !!(isTouched && errors);
};

export const isDescriptionHidden = (
  visible: boolean,
  description: string | undefined,
  isFocused: boolean,
  showUnfocusedDescription: boolean,
): boolean => {
  return (
    description === undefined ||
    (description !== undefined && !visible) ||
    (!showUnfocusedDescription && !isFocused)
  );
};

export const inputClasses = (
  styles: MyStyles | any,
  isFocused: boolean,
  isTouched: boolean,
  errors: string | undefined,
) => {
  return [
    styles?.control.input,
    { 'input-error': showErrors(isTouched, isFocused, errors) },
  ];
};
