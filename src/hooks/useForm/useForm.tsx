import { useState } from 'react';
import { InputState } from '@/src/components/ui/Input/Input';
import { FormFieldCustomValidation, FormState } from '@/src/types/forms.types';

export function useForm<T extends Record<string, unknown>>(
  defaultValues: FormState<T>
) {
  const [form, setForm] = useState<FormState<T>>(defaultValues);

  const getFieldValidation = (
    validation: boolean | FormFieldCustomValidation
  ): { isValid: boolean; errorMessage?: string } => {
    if (typeof validation === 'boolean') {
      return { isValid: validation };
    }

    return { isValid: validation.value, errorMessage: validation.message };
  };

  const validateField = <K extends keyof T>(
    value: T[K],
    field: FormState<T>[K]
  ): { isValid: boolean; errorMessage?: string } => {
    if (!field.validation) {
      return { isValid: field.isValid };
    }

    return getFieldValidation(field.validation(value));
  };

  const onChangeField = <K extends keyof T>(field: K, newValue: T[K]) => {
    setForm((prev) => {
      const { isValid, errorMessage } = validateField(newValue, prev[field]);

      return {
        ...prev,
        [field]: {
          ...prev[field],
          isValid,
          errorMessage,
          value: newValue,
          isTouched: true,
        },
      };
    });
  };

  const isFieldValid = (field: keyof typeof form): InputState => {
    return form[field].isTouched && !form[field].isValid ? 'error' : 'default';
  };

  const validateFields = (fields: keyof T | (keyof T)[]) => {
    const keys = Array.isArray(fields) ? fields : [fields];

    setForm((prev) => {
      const next = { ...prev };

      keys.forEach((field) => {
        const { isValid, errorMessage } = validateField(
          prev[field].value,
          prev[field]
        );

        next[field] = {
          ...prev[field],
          isValid,
          errorMessage,
          isTouched: true,
        };
      });

      return next;
    });
  };

  const resetForm = () => {
    setForm(defaultValues);
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
