import { Builder } from './builder';
import type { LayoutBuilder } from './layout.builder';

export const ControlType = {
  number: 'number',
  string: 'string',
  integer: 'Integer',
  autocomplete: 'autocomplete',
  textArea: 'textArea',
  markdown: 'markdown',
  array: 'array',
  custom: 'custom',
  select: 'select',
  mutliSelect: 'mutliSelect',
} as const;

export interface TextAreaOptions extends ControlOption {
  format: 'textArea';
}
export interface MarkdownOptions extends ControlOption {
  format: 'markdown';
  minHeight: string;
}

export interface DetailOptions extends ControlOption {
  format: 'array';
  layout: 'row' | 'column';
}
export interface SelectOptions extends ControlOption {
  format: 'select' | 'multiselect';
  options: Array<any>;
  labelKey?: string;
  valueKey?: string;
}

export interface AutocompleteOptions extends Omit<SelectOptions, 'format'> {
  format: 'autocomplete';
  freeText?: boolean;
  enableCreate?: string;
}
export interface AutocompleteRemoteOptions extends Omit<
  AutocompleteOptions,
  'format' | 'options'
> {
  format: 'autocomplete';
  uri: string;
  dataField?: string;
  skipAuth?: boolean;
}

export type ArrayActionType = 'edit';
export type ArrayAction = {
  type: ArrayActionType;
  idField: string;
};

export interface ControlOption {
  format?: string;
  readonly?: boolean;
  label?: string;
  styles?: Partial<any>;
  elements?: any;
  elementLabelProp?: string;
  customLabel?: string;
  actions?: ArrayAction[];
  placeholder?: string;
  hideLabel?: boolean;
  hideActions?: boolean;
}

export type ControlTypes = {
  type: 'Control' | 'Object' | 'TextCell';
  scope: string;
  options?: TextAreaOptions | AutocompleteOptions | DetailOptions;
};

export class ControlBuilder<
  TYPE,
  KEY = keyof TYPE,
> extends Builder<ControlTypes> {
  private options: ControlOption = {
    format: 'Control',
    styles: {},
  };

  private _detail?: LayoutBuilder<any>;

  private constructor(
    private readonly scope: string,
    type = 'Control',
  ) {
    super(type);
  }

  static asObject<TYPE>(property: keyof TYPE): ControlBuilder<TYPE> {
    return new ControlBuilder<TYPE>(
      `#/properties/${property as string}`,
      'Object',
    );
  }

  static properties<TYPE>(property: keyof TYPE): ControlBuilder<TYPE> {
    return new ControlBuilder<TYPE>(`#/properties/${property as string}`);
  }

  static asCustom<TYPE>(
    property: keyof TYPE,
    type: string,
  ): ControlBuilder<TYPE> {
    const builder = new ControlBuilder<TYPE>(
      `#/properties/${property as string}`,
    );

    builder.addOptions({
      format: ControlType.custom,
      type,
    } as unknown as Partial<ControlOption>);

    return builder;
  }

  detail<TYPE>(layoutBuilder: LayoutBuilder<TYPE>, label?: string) {
    this._detail = layoutBuilder;
    this.addOptions({
      format: ControlType.array,
      elementLabelProp: label,
    });
    return this;
  }

  addAction(action: ArrayAction) {
    const actions = this.options?.actions ?? [];
    actions.push(action);
    return this.addOptions({ actions });
  }

  detailFixed<TYPE>(
    layoutBuilder: LayoutBuilder<TYPE>,
    options: {
      label?: string;
      layout?: 'row' | 'column';
    } = {},
  ) {
    this._detail = layoutBuilder;
    return this.addOptions({
      hideActions: true,
      format: ControlType.array,
      layout: options.layout ?? 'column',
      elementLabelProp: options.label,
    });
  }

  labelKey(labelKey: string) {
    return this.addOptions({ labelKey });
  }

  readonly(): ControlBuilder<TYPE> {
    return this.addOptions({
      format: ControlType.string,
      readonly: true,
    });
  }

  markdown(options?: Omit<MarkdownOptions, 'format'>): ControlBuilder<TYPE> {
    return this.addOptions({
      format: ControlType.markdown,
      ...(options ?? {}),
    });
  }

  textArea(options?: Omit<TextAreaOptions, 'format'>) {
    return this.addOptions({
      format: ControlType.textArea,
      ...(options ?? {}),
    });
  }

  autocomplete(
    options:
      | Omit<AutocompleteOptions, 'format'>
      | Omit<AutocompleteRemoteOptions, 'format'>,
  ) {
    return this.addOptions({
      format: ControlType.autocomplete,
      dataField: 'data',
      ...(options ?? {}),
    });
  }

  select(options: Omit<SelectOptions, 'format'>) {
    return this.addOptions({
      format: ControlType.select,
      ...options,
    });
  }

  mutliSelect(options: Omit<SelectOptions, 'format'>) {
    return this.addOptions({
      format: ControlType.mutliSelect,
      ...options,
    });
  }

  width(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') {
    return this.addOptions({
      styles: {
        ...this.options?.styles,
        width,
        control: {
          wrapper: `input-${width}`,
        },
      },
    });
  }

  customLabel(label: string) {
    return this.addOptions({ label });
  }

  placeHolder(placeholder: string) {
    return this.addOptions({ placeholder });
  }

  hideLabel() {
    return this.addOptions({ hideLabel: true });
  }

  private addOptions(options: Partial<ControlOption>) {
    this.options = {
      ...this.options,
      ...options,
    };
    return this;
  }

  override build(): ControlTypes {
    return {
      type: this.type,
      scope: this.scope,
      options: {
        ...this.options,
        detail: this._detail ? this._detail?.build() : undefined,
      },
    } as ControlTypes;
  }
}
