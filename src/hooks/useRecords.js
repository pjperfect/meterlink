import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadRecords } from '../lib/storage.js';

function sortNewestFirst(records) {
  return [...records].sort((a, b) =>
    (b.dateTimeISO || '').localeCompare(a.dateTimeISO || '')
  );
}

export default function useRecords() {
  const location = useLocation();
  const [records, setRecords] = useState(() => sortNewestFirst(loadRecords()));

  useEffect(() => {
    setRecords(sortNewestFirst(loadRecords()));
  }, [location.pathname]);

  return useMemo(() => records, [records]);
}
