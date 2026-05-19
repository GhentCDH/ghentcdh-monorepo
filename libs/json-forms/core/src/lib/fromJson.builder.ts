import type { JsonSchema } from '@jsonforms/core';

import { ControlBuilder } from './layout/control.builder';
import type { LayoutType } from './layout/layout.builder';
import { LayoutBuilder } from './layout/layout.builder';

/**
 * Generates a GridLayout UI schema from a JSON Schema.
 *
 * Iterates over each property in the schema and creates a full-width
 * `Control` element. When no custom UI schema is provided, this serves
 * as the automatic fallback used by {@link ResourceSchema}.
 *
 * @param jsonSchema - JSON Schema whose `properties` will be converted to controls.
 * @returns A built `GridLayout` UI schema with one control per property.
 */
export const uiFromJsonSchema = (jsonSchema: JsonSchema): LayoutType => {
  const properties = jsonSchema.properties ?? {};
  const layout = LayoutBuilder.grid<Record<string, unknown>>();

  for (const key of Object.keys(properties)) {
    layout.addControl(
      ControlBuilder.properties<Record<string, unknown>>(key)
    );
  }

  return layout.build();
};
