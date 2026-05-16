'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Transaction } from '@/src/types/transactions.types';
import { transactionService } from '@/src/services/transactions';

import { Icon } from '@/src/components/ui/Icon';
import { Button } from '@/src/components/ui/Button';
import { TransactionModal } from '@/src/components/transactions/TransactionModal';

import { maskUtils } from '@/src/lib/utils';

interface BalanceButtonProps {
  balance: number;
}

export function BalanceButton({ balance }: BalanceButtonProps) {
  const router = useRouter();

  const [showBalance, setShowBalance] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  const handleNewTransaction = async (data: Partial<Transaction>) => {
    try {
      await transactionService.createTransactions(data);

      setIsCreateModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar nova transação:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-heading-xs lg:text-heading-md leading-heading mb-1">
            Saldo
          </p>
          <button
            type="button"
            className="flex items-center gap-2 text-brand-600 h-6 lg:h-9"
            onClick={handleShowBalance}
          >
            <Icon
              name={showBalance ? 'EyeLine' : 'EyeCloseLine'}
              className={`${showBalance && balance < 0 ? 'text-danger-400' : ''}`}
            />
            {showBalance ? (
              <span
                className={`text-heading-xs lg:text-heading-lg lg:leading-heading ${balance < 0 ? 'text-danger-400' : ''}`}
              >
                {maskUtils.getCurrencyMask(balance)}
              </span>
            ) : (
              <span className="h-1 block w-[94px] bg-brand-600 rounded" />
            )}
          </button>
        </div>
        <Button
          label="Nova Transação"
          size="sm"
          icon="AddLine"
          onClick={() => setIsCreateModalOpen(true)}
          className="w-fit"
        />
      </div>
      <TransactionModal
        key="create-new"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleNewTransaction}
      />
    </>
  );
}
