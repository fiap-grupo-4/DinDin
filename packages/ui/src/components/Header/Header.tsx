import { ProfilePicture } from "../ProfilePicture";
import { Button } from "../Button";
import { Logo } from "../Logo";

interface HeaderProps {
  onToggle: () => void;
}

export function Header({ onToggle }: HeaderProps) {
  return (
    <header className="bg-brand-600 h-20 py-5 px-4 md:px-10 flex items-center justify-between gap-3 z-20">
      <div className="flex items-center gap-1">
        <Button
          label=""
          size="sm"
          icon="MenuLine"
          className="px-2! sm:hidden"
          onClick={onToggle}
        />
        <a href="/">
          <Logo />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <h3 className="text-heading-sm text-brand-100">Fulano de Tal</h3>
          {/* 2 opções de exibição para os dados da conta, uma para telas maiores e outra para menores */}
          <p className="hidden md:block text-body-md text-brand-200 text-right">
            Agência 8127-3 | Conta 17383-4
          </p>
          <p className="md:hidden text-body-md text-brand-200 text-right">
            Ag 8127-3 | Cc 17383-4
          </p>
        </div>
        <ProfilePicture profileName="Fulano de Tal" kind="secondary" />
      </div>
    </header>
  );
}
