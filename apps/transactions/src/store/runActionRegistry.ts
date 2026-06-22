import type { RunTransactionActionParams } from '@/src/app/transactions/types';

export type RunTransactionActionFn = (
  params: RunTransactionActionParams
) => Promise<void>;

let runActionImpl: RunTransactionActionFn | null = null;

export function setRunActionImpl(fn: RunTransactionActionFn | null) {
  runActionImpl = fn;
}

export function getRunActionImpl() {
  return runActionImpl;
}
