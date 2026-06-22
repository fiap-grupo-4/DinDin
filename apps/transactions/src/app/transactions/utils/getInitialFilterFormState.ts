import { FormState } from '@dindin/form-control';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { FilterFormValues } from '../types';

export function getInitialFilterFormState(): FormState<FilterFormValues> {
  return {
    transactionType: {
      value: TRANSACTION_TYPES[0].value,
      isValid: false,
      isTouched: false,
    },
    description: {
      value: '',
      isValid: false,
      isTouched: false,
    },
    date: {
      value: '',
      isValid: false,
      isTouched: false,
    },
  };
}
