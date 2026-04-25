"use client";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { ProfilePicture } from "../../ui/ProfilePicture/ProfilePicture";
import { WelcomeCardBalanceBtn } from "./WelcomeCardBalanceBtn";

interface WelcomeCardProps {
  balance: number;
}

export function WelcomeCard({ balance }: WelcomeCardProps) {
  const handleNewTransaction = () => {
    console.log("open new transaction modal");
  };

  return (
    <Container>
      <div className="flex items-center gap-3">
        <ProfilePicture profileName="fulano de tal" />
        <h1>Seja bem-vindo, Fulano de Tal</h1>
      </div>
      <p className="text-body-lg leading-body text-gray-700 my-9">
        Com o DinDin, você acompanha seu dinheiro de forma simples e organizada.
        Gerencie suas transações, visualize seu saldo em tempo real e tenha mais
        controle sobre sua vida financeira — tudo em um só lugar.
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-heading-md leading-heading mb-1">Saldo</p>
          <WelcomeCardBalanceBtn balance={balance} />
        </div>
        <Button
          label="Nova Transação"
          size="sm"
          icon="AddLine"
          onClick={handleNewTransaction}
        />
      </div>
    </Container>
  );
}
