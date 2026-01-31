import React, { createContext, useContext, useMemo, useState } from "react";
import { loadRecords, saveRecords, clearAllRecords } from "../lib/storage.js";

const RecordsContext = createContext(null);

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    const r = loadRecords();
    return [...r].sort((a, b) => (b.dateTimeISO || "").localeCompare(a.dateTimeISO || ""));
  });

  const addRecords = (newRecords) => {
    setRecords((prev) => {
      const merged = [...newRecords, ...prev];
      merged.sort((a, b) => (b.dateTimeISO || "").localeCompare(a.dateTimeISO || ""));
      saveRecords(merged);
      return merged;
    });
  };

  const clearRecords = () => {
    clearAllRecords();
    setRecords([]);
  };

  const value = useMemo(() => ({ records, addRecords, clearRecords }), [records]);

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords must be used inside <RecordsProvider>");
  return ctx;
}

