import { Logo } from "../Logo";

export function Header() {
  return (
    <header className="bg-brand-600 h-20 py-5 px-10">
      <a href="/">
        <Logo />
      </a>
    </header>
  );
}
