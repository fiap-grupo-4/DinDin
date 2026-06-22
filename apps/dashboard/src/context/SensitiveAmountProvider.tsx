'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface SensitiveAmountContextValue {
  showSensitiveAmount: boolean;
  toggleShowSensitiveAmount: () => void;
}

const SensitiveAmountContext = createContext<SensitiveAmountContextValue | null>(
  null
);

interface SensitiveAmountProviderProps {
  children: ReactNode;
}

export default function SensitiveAmountProvider({
  children,
}: SensitiveAmountProviderProps) {
  const [showSensitiveAmount, setShowSensitiveAmount] = useState(false);

  const toggleShowSensitiveAmount = useCallback(() => {
    setShowSensitiveAmount((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ showSensitiveAmount, toggleShowSensitiveAmount }),
    [showSensitiveAmount, toggleShowSensitiveAmount]
  );

  return (
    <SensitiveAmountContext.Provider value={value}>
      {children}
    </SensitiveAmountContext.Provider>
  );
}

export function useSensitiveAmountContext() {
  const context = useContext(SensitiveAmountContext);

  if (!context) {
    throw new Error(
      'useSensitiveAmount must be used within SensitiveAmountProvider'
    );
  }

  return context;
}
