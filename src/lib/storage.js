const KEY = "meterlink_records_v1";

export function loadRecords() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecords(newRecords) {
  const existing = loadRecords();
  const merged = [...newRecords, ...existing];

  // newest first
  merged.sort((a, b) =>
    (b.dateTimeISO || "").localeCompare(a.dateTimeISO || "")
  );

  localStorage.setItem(KEY, JSON.stringify(merged));
  return merged;
}

export function clearRecords() {
  localStorage.removeItem(KEY);
}
