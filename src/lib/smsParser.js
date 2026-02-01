function getField(message, field) {
  const re = new RegExp(`^${field}\\s*:\\s*(.+)$`, 'im');
  const match = message.match(re);
  return match ? match[1].trim() : null;
}

function toNumber(value) {
  if (!value) return null;
  const n = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

function parseDateToISO(raw) {
  const m = raw.match(/^(\d{4})(\d{2})(\d{2})\s+(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m;
  return `${y}-${mo}-${d}T${h}:${mi}:00`;
}

export function splitMessages(text) {
  return text
    .split(/\n\s*\n/g)
    .map((m) => m.trim())
    .filter(Boolean);
}

export function parseMany(text) {
  const messages = splitMessages(text);
  const parsed = [];
  const invalid = [];

  for (const msg of messages) {
    const meter = getField(msg, 'Mtr');
    const token = getField(msg, 'Token');
    const dateRaw = getField(msg, 'Date');
    const units = toNumber(getField(msg, 'Units'));
    const amount = toNumber(getField(msg, 'Amt'));
    const tokenAmount = toNumber(getField(msg, 'TknAmt'));
    const dateTimeISO = dateRaw ? parseDateToISO(dateRaw) : null;

    if (
      !meter ||
      !token ||
      !dateTimeISO ||
      units == null ||
      amount == null ||
      tokenAmount == null
    ) {
      invalid.push(msg);
      continue;
    }

    parsed.push({
      id: crypto.randomUUID(),
      meter,
      token,
      dateRaw,
      dateTimeISO,
      units,
      amount,
      tokenAmount,
    });
  }

  return { parsed, invalid };
}
