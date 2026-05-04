'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ProfilePicture } from '../../ui/ProfilePicture/ProfilePicture';
import { WelcomeCardBalanceBtn } from './WelcomeCardBalanceBtn';
import { CreateTransactionModal } from '../TransactionModal/CreateTransaction';
import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/src/types/transactions.types';

interface WelcomeCardProps {
  balance: number;
}

export function WelcomeCard({ balance }: WelcomeCardProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleNewTransaction = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateTransaction = async (
    newTransaction: Omit<Transaction, 'id'>
  ) => {
    try {
      await transactionService.createTransaction(newTransaction);
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar transação', error);
    }
  };

  return (
    <Container>
      <div className="flex items-center gap-3">
        <ProfilePicture profileName="fulano de tal" />
        <h1>Seja bem-vindo, Fulano de Tal</h1>
      </div>

      <p className="text-body-md lg:text-body-lg leading-body text-gray-700 my-4 md:my-7 lg:my-14">
        Com o DinDin, você acompanha seu dinheiro de forma simples e organizada.
        Gerencie suas transações, visualize seu saldo em tempo real e tenha mais
        controle sobre sua vida financeira – tudo em um só lugar.
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-heading-xs lg:text-heading-md leading-heading mb-1">
            Saldo
          </p>
          <WelcomeCardBalanceBtn balance={balance} />
        </div>

        <Button
          label="Nova Transação"
          size="sm"
          icon="AddLine"
          onClick={handleNewTransaction}
          className="w-fit"
        />
      </div>

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTransaction}
      />
    </Container>
  );
}
