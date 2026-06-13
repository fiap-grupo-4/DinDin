import { useState } from 'react';
import {
  resetForm as resetFormCore,
  updateField,
  validateFields as validateFieldsCore,
} from '@dindin/form-control';
import type { FormState } from '@dindin/form-control';
import { InputState } from '@dindin/ui';

export function useForm<T extends Record<string, unknown>>(
  defaultValues: FormState<T>
) {
  const [form, setForm] = useState<FormState<T>>(defaultValues);

  const onChangeField = <K extends keyof T>(field: K, newValue: T[K]) => {
    setForm((prev) => updateField(prev, field, newValue));
  };

  const isFieldValid = (field: keyof typeof form): InputState => {
    return form[field].isTouched && !form[field].isValid ? 'error' : 'default';
  };

  const validateFields = (fields: keyof T | (keyof T)[]) => {
    setForm((prev) => validateFieldsCore(prev, fields));
  };

  const resetForm = () => {
    setForm(resetFormCore(defaultValues));
  };

  return {
    form,
    setForm,
    onChangeField,
    isFieldValid,
    validateFields,
    resetForm,
  };
}
