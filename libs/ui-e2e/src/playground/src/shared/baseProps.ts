import { myStyles } from '@ghentcdh/ui';

/**
 * Every ui component expects the `Input.properties` superset (id, label,
 * required, enabled, visible, styles, …). The playground reuses one default
 * object so each page only specifies the props that differ.
 */
export const baseProps = {
  id: 'control',
  label: 'Control',
  description: '',
  visible: true,
  required: false,
  enabled: true,
  isFocused: false,
  isTouched: false,
  hideLabel: false,
  width: 'min-w-input',
  type: 'text',
  styles: myStyles,
} as const;
