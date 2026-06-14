import type { FormField, FormFieldCustomValidation, FormState } from "./types";

function getFieldValidation(validation: boolean | FormFieldCustomValidation): {
  isValid: boolean;
  errorMessage?: string;
} {
  if (typeof validation === "boolean") {
    return { isValid: validation };
  }

  return {
    isValid: validation.value,
    errorMessage: validation.message,
  };
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function validateFieldValue<
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  value: T[K],
  field: FormField<T[K]>,
): { isValid: boolean; errorMessage?: string } {
  if (!field.validation) {
    return { isValid: field.isValid };
  }

  return getFieldValidation(field.validation(value));
}

export function updateField<
  T extends Record<string, unknown>,
  K extends keyof T,
>(form: FormState<T>, field: K, value: T[K]) {
  const { isValid, errorMessage } = validateFieldValue(value, form[field]);

  return {
    ...form,
    [field]: {
      ...form[field],
      value,
      isValid,
      errorMessage,
      isTouched: true,
    },
  } as FormState<T>;
}

export function validateFields<T extends Record<string, unknown>>(
  form: FormState<T>,
  fields: (keyof T)[] | keyof T,
) {
  const keys = Array.isArray(fields) ? fields : [fields];
  const next = { ...form };

  keys.forEach((field) => {
    const { isValid, errorMessage } = validateFieldValue(
      next[field].value,
      next[field],
    );

    next[field] = {
      ...next[field],
      isValid,
      errorMessage,
      isTouched: true,
    };
  });

  return next;
}

export function resetForm<T extends Record<string, unknown>>(
  defaultValues: FormState<T>,
) {
  return cloneValue(defaultValues);
}
