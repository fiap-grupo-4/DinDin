import { Button } from "../Button";
import { Icon } from "../Icon";

interface NavbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Navbar({ isOpen, onToggle }: NavbarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 z-10 h-screen overflow-hidden bg-brand-800 text-brand-100 transition-all duration-300 ${
        isOpen ? "w-50" : "w-15"
      }`}>

      <div className="flex h-full flex-col justify-between pt-25 py-4 px-2">
        <Button label={isOpen ? "Fechar" : ""} size="sm" icon={isOpen ? "MenuFoldLine" : "MenuUnfoldLine"}
            className="px-2!" onClick={onToggle} />

        <div className="space-y-6">
          <nav aria-label="Principal" className="space-y-2">
            <a key="Dashboard" href="/"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-body-lg font-medium text-brand-100 transition-colors hover:bg-brand-700">
                <Icon name="DashboardLine" className={isOpen ? "" : "mx-auto"} style={{ color: "var(--color-brand-100)" }} />
                {isOpen && <span>Dashboard</span>}
            </a>
            <a key="Transações" href="/transactions"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-body-lg font-medium text-brand-100 transition-colors hover:bg-brand-700">
                <Icon name="MoneyDollarCircleLine" className={isOpen ? "" : "mx-auto"} style={{ color: "var(--color-brand-100)" }} />
                {isOpen && <span>Transações</span>}
            </a>
          </nav>
        </div>

        <a href="#"
          className="flex items-center gap-3 rounded-md px-2 py-2 text-body-lg font-medium text-brand-100 transition-colors hover:bg-brand-700">
          <Icon name="SettingsLine" className={isOpen ? "" : "mx-auto"} style={{ color: "var(--color-brand-100)" }} />
          {isOpen && <span>Configurações</span>}
        </a>
      </div>
    </aside>
  );
}