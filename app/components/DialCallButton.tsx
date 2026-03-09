"use client";

import { useState } from "react";

type DialCallButtonProps = {
  label: string;
  className: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function DialCallButton({
  label,
  className,
  icon: Icon,
}: DialCallButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/dial", {
        method: "POST",
      });

      if (!response.ok) {
        console.error("Error al agendar la llamada");
      }
    } catch (error) {
      console.error("Error al llamar a la API de marcado", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {Icon ? <Icon className="h-5 w-5" /> : null}
      <span>{loading ? "Agendando..." : label}</span>
    </button>
  );
}

