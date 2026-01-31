import { useState } from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parseMany } from '../lib/smsParser.js';
import { addRecords, clearRecords } from '../lib/storage.js';

const EXAMPLE = `Mtr: 0412345678
Token: 1234-5678-9012-3456
Date: 20260127 18:16
Units: 46.1
Amt: 1200.00
TknAmt: 759.07

Mtr: 0412345678
Token: 9876-5432-1098-7654
Date: 20260202 09:05
Units: 38.5
Amt: 1000.00
TknAmt: 632.50`;

export default function SmsInput() {
  const [smsText, setSmsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleProcess = () => {
    setError('');
    setSuccess('');

    const text = smsText.trim();
    if (!text) {
      setError('Paste at least one message.');
      return;
    }

    const { parsed, invalid } = parseMany(text);

    if (parsed.length === 0) {
      setError(
        'No valid messages found. Each message must include: Mtr, Token, Date(YYYYMMDD HH:mm), Units, Amt, TknAmt.'
      );
      return;
    }

    addRecords(parsed);
    setSmsText('');
    setSuccess(
      `Saved ${parsed.length} message(s).${invalid.length ? ` Skipped ${invalid.length}.` : ''}`
    );

    // so Dashboard loads fresh data immediately
    navigate('/');
  };

  const handleInsertExample = () => {
    setSmsText(EXAMPLE);
    setError('');
    setSuccess('');
  };

  const handleClear = () => {
    clearRecords();
    setSuccess('Cleared all saved records.');
    setError('');
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">SMS Input</h2>
        <p className="text-gray-600">
          Paste your messages in the MeterLink format
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={handleInsertExample}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
          >
            Insert example
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm inline-flex items-center gap-2"
          >
            <Trash2 className="size-4" />
            Clear saved data
          </button>
        </div>

        <div>
          <label
            htmlFor="sms-input"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Message text
          </label>
          <textarea
            id="sms-input"
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            placeholder={EXAMPLE}
            className="w-full h-72 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3">
            <MessageSquare className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-medium">
                Required format (blank line between messages):
              </p>
              <pre className="text-xs text-gray-600 bg-white border rounded p-3 overflow-auto">
                {`Mtr: 0412345678
Token: 1234-5678-9012-3456
Date: 20260127 18:16
Units: 46.1
Amt: 1200.00
TknAmt: 759.07`}
              </pre>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <button
          onClick={handleProcess}
          disabled={!smsText.trim()}
          className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Process SMS
        </button>
      </div>
    </div>
  );
}
