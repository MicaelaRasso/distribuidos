"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ocurrió un error</h2>
      <button onClick={() => reset()}>Intentar otra vez</button>
    </div>
  );
}