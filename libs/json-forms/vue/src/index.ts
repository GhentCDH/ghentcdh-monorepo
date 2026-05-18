// @deprecated — use JsonForm, JsonFormWithActions, JsonFormWithTable instead
// export * from './form.store';
/** @deprecated Use VeeFormComponentProperties from JsonForm */
// export * from './form.component.properties';
/** @deprecated Use JsonFormWithActions */
// export * from './form-with-actions.component.properties';
/** @deprecated Use JsonFormWithTable */
// export * from './form-with-table.component.properties';
/** @deprecated Use veeRenderers */
// export * from './renderes/controls';
/** @deprecated Use veeRenderers */
// export * from './renderes/array';
/** @deprecated Use veeRenderers */
// export * from './renderes/layouts';
/** @deprecated Use veeRenderers */
// export * from './renderes/tester';

/** @deprecated Use JsonFormWithTable */
// export { default as FormWithTableComponent } from './form-with-table.component.vue';
/** @deprecated Use JsonFormWithActions */
// export { default as FormWithActions } from './form-with-actions.component.vue';

/** @deprecated Use JsonForm */
// export { default as FormComponent } from './form.component.vue';

/** @deprecated Use VeeFormModalService */
export * from './modal';
export * from './table';
export * from './repository';
export * from './composables/useFormEvents';

// New vee-validate system
export type { ErrorMode } from './forms/errorMode';
export { formatError, registerZodErrorMap } from './forms/errorMessages';
export { default as JsonForm } from './forms/FormComponent.vue';
export { default as JsonFormWithActions } from './forms/FormWithActions.vue';
export { default as JsonFormWithTable } from './forms/FormWithTable.vue';
export { default as JsonFormModal } from './forms/modal/FormModal.vue';
export { VeeFormModalService } from './forms/modal/FormModalService';
export { customRenderes as veeRenderers } from './forms/renderes';
