import { ControlProperties } from '../properties';

type ErrorControlProperties = Pick<ControlProperties, 'errors' | 'isTouched'>;

export const showErrors = ({ isTouched, errors }: ErrorControlProperties) => {
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

export const buildInputStyle = (
  styles: string,
  properties: ErrorControlProperties,
): any => {
  return [styles, { 'input-error': showErrors(properties) }];
};
