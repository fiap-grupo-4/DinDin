"use client";

import { useState } from "react";
import { Icon } from "../../ui/Icon";
import { maskUtils } from "@/src/lib/utils";

interface WelcomeCardBalanceBtnProps {
  balance: number;
}

export function WelcomeCardBalanceBtn({ balance }: WelcomeCardBalanceBtnProps) {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  return (
    <button
      type="button"
      className="flex items-center gap-2 text-brand-600 h-6 lg:h-9"
      onClick={handleShowBalance}
    >
      <Icon name={showBalance ? "EyeLine" : "EyeCloseLine"} className={`${showBalance && balance < 0 ? "text-danger-400" : ""}`} />
      {showBalance ? (
        <span
          className={`text-heading-xs lg:text-heading-lg lg:leading-heading ${balance < 0 ? "text-danger-400" : ""}`}
        >
          {maskUtils.getCurrencyMask(balance)}
        </span>
      ) : (
        <span className="h-1 block w-[94px] bg-brand-600 rounded" />
      )}
    </button>
  );
}
