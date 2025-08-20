import { Builder } from '../layout/builder';
import { LayoutBuilder } from '../layout/layout.builder';

export interface TextCellOption {
  format: 'TextCell';
  sortId?: string;
}

export interface KeyValueOption extends Omit<TextCellOption, 'format'> {
  format: 'keyValue';
  key: string;
}

export type TextCellType = {
  type: 'TextCell';
  scope: string;
  options?: KeyValueOption;
};

export class TextCellBuilder<TYPE> extends Builder<TextCellType> {
  private options: KeyValueOption | TextCellOption | undefined;

  private constructor(
    private readonly scope: string,
    type = 'TextCell',
  ) {
    super(type);
  }

  static properties<TYPE>(property: keyof TYPE): TextCellBuilder<TYPE> {
    return new TextCellBuilder<TYPE>(`#/properties/${property as string}`);
  }

  key(key: string): TextCellBuilder<TYPE> {
    this.options = {
      format: 'keyValue',
      key: key,
    };
    return this;
  }

  setSortId(sortId: string): TextCellBuilder<TYPE> {
    this.options = {
      ...(this.options ?? { format: 'TextCell' }),
      sortId: sortId,
    };
    return this;
  }

  override build(): TextCellType {
    return {
      type: this.type,
      scope: this.scope,
      options: this.options,
    } as TextCellType;
  }
}

export class TableBuilder<TYPE> {
  private builder: LayoutBuilder<TYPE>;

  private constructor() {
    this.builder = LayoutBuilder.table();
  }

  static init<TYPE>() {
    return new TableBuilder<TYPE>();
  }

  addControl(control: TextCellBuilder<TYPE>) {
    this.builder.addControls(control);
    return this;
  }

  addControls(...controls: Array<TextCellBuilder<TYPE>>) {
    this.builder.addControls(...controls);
    return this;
  }

  build() {
    return this.builder.build();
  }
}
