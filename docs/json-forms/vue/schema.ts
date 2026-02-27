import {
  ControlBuilder,
  LayoutBuilder,
} from '../../../libs/json-forms/core/src';
import { toJSONSchema, z } from 'zod';

export const FormSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    firstname: { type: 'string' },
    age: { type: 'integer' },
    total: { type: 'number' },
    boolean: { type: 'boolean' },
    comment: { type: 'string' },
    autocomplete: { type: 'string' },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          email: { type: 'string' },
        },
        required: ['id', 'createdAt', 'email'],
        additionalProperties: false,
      },
    },
  },
  required: ['name'],
  additionalProperties: false,
};

const emailSchemaDef = z.object({
  id: z.number(),
  createdAt: z.string(),
  email: z.string(),
});

const formSchemaDef = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
  firstname: z.string(),
  age: z.number(),
  total: z.number(),
  boolean: z.boolean(),
  comment: z.string(),
  autocomplete: z.string(),
  emails: z.array(emailSchemaDef),
});
export type FormSchema = z.infer<typeof formSchemaDef>;
export type EmailSchema = z.infer<typeof emailSchemaDef>;

export const formSchema = toJSONSchema(formSchemaDef, {
  unrepresentable: 'any',
  target: 'draft-07',
});

export const fixedArrayUiSchema = LayoutBuilder.vertical<FormSchema>()
  .addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('emails').detailFixed(
      LayoutBuilder.horizontal<EmailSchema>().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  )
  .build();

export const arrayUiSchema = LayoutBuilder.vertical<FormSchema>()
  .addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('emails').detail(
      LayoutBuilder.horizontal<EmailSchema>().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  )
  .build();

export const exampleUiSchema = LayoutBuilder.vertical<FormSchema>().addControls(
  LayoutBuilder.horizontal<FormSchema>().addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.properties('firstname')
      .customLabel('First name')
      .placeHolder('custom label'),
  ),
  LayoutBuilder.horizontal<FormSchema>().addControls(
    ControlBuilder.properties('age').width('xs'),
    ControlBuilder.properties('total')
      .hideLabel()
      .placeHolder('hide the label'),
    ControlBuilder.properties('boolean'),
  ),
  // If you don't want a row here, just omit it.
  // If you do want a textarea later, uncomment next line:
  // LayoutBuilder.horizontal().addControls(ControlBuilder.properties('comment').textArea()),
  LayoutBuilder.horizontal().addControls(
    ControlBuilder.properties('autocomplete').autocomplete({
      uri: 'https://swapi.dev/api/people/?search=',
      skipAuth: true,
      dataField: 'results',
      labelKey: 'name',
      field: {
        id: 'url',
        label: 'name',
      },
    }),
  ),
  LayoutBuilder.horizontal().addControls(
    ControlBuilder.properties('emails').detail(
      LayoutBuilder.horizontal<EmailSchema>().addControls(
        ControlBuilder.properties('email'),
      ),
    ),
  ),
);
