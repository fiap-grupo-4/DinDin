export type FormFieldCustomValidation = {
  message: string;
  value: boolean;
};

export type FormField<T> = {
  value: T;
  isValid: boolean;
  isTouched: boolean;
  validation?: (value: T) => boolean | FormFieldCustomValidation;
};

export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
};
