import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { bulkCreateUsers } from '../../features/instructorSlice';

interface BulkUserImportProps {
  onClose: () => void;
}

interface ParsedUser {
  firstName: string;
  lastName: string;
  docNumber: string;
}

export default function BulkUserImport({ onClose }: BulkUserImportProps) {
  const dispatch = useAppDispatch();
  const { cohorts } = useAppSelector((s) => s.instructor);
  const [csvText, setCsvText] = useState('');
  const [selectedCohortId, setSelectedCohortId] = useState('');
  const [parsedUsers, setParsedUsers] = useState<ParsedUser[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const parseInput = () => {
    setError('');
    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      setError('No data to parse. Enter one student per line.');
      return;
    }

    if (!selectedCohortId) {
      setError('Please select a cohort.');
      return;
    }

    const parsed: ParsedUser[] = [];
    const errors: string[] = [];

    lines.forEach((line, i) => {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length < 3) {
        errors.push(`Line ${i + 1}: Expected firstName, lastName, docNumber`);
        return;
      }
      const [firstName, lastName, docNumber] = parts;
      if (!firstName || !lastName || !docNumber) {
        errors.push(`Line ${i + 1}: Missing required field`);
        return;
      }
      parsed.push({ firstName, lastName, docNumber });
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    setParsedUsers(parsed);
    setShowPreview(true);
  };

  const handleConfirm = async () => {
    setCreating(true);
    setError('');

    try {
      const created = await dispatch(
        bulkCreateUsers({ users: parsedUsers, cohortId: selectedCohortId }),
      ).unwrap();
      setResult(`Successfully created ${created.length} student${created.length !== 1 ? 's' : ''}.`);
      setCsvText('');
      setParsedUsers([]);
      setShowPreview(false);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to create users.');
    } finally {
      setCreating(false);
    }
  };

  const generateUsername = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase().replace(/\s+/g, '')}`;
  };

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Bulk User Import
        </h3>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded transition-colors"
          style={{
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        >
          Close
        </button>
      </div>

      {result && (
        <div
          className="rounded p-3 mb-4 text-sm"
          style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--success)' }}
        >
          {result}
        </div>
      )}

      {!showPreview && (
        <>
          <div className="mb-3">
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Cohort
            </label>
            <select
              value={selectedCohortId}
              onChange={(e) => setSelectedCohortId(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm"
              style={{
                backgroundColor: 'var(--bg-root)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              <option value="">Select a cohort</option>
              {cohorts.filter((c) => c.isActive).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Student Data (one per line: firstName, lastName, docNumber)
            </label>
            <textarea
              value={csvText}
              onChange={(e) => { setCsvText(e.target.value); setResult(null); }}
              rows={8}
              placeholder={`John, Smith, 123456\nJane, Doe, 789012\nBob, Johnson, 345678`}
              className="w-full px-3 py-2 rounded text-sm font-mono"
              style={{
                backgroundColor: 'var(--bg-root)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                resize: 'vertical',
              }}
            />
          </div>

          {error && (
            <pre className="text-xs mb-3 whitespace-pre-wrap" style={{ color: 'var(--error)' }}>
              {error}
            </pre>
          )}

          <button
            onClick={parseInput}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
        </>
      )}

      {showPreview && (
        <>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            {parsedUsers.length} student{parsedUsers.length !== 1 ? 's' : ''} will be created in{' '}
            <strong>{cohorts.find((c) => c._id === selectedCohortId)?.name}</strong>:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Name
                  </th>
                  <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Username
                  </th>
                  <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                    DOC Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedUsers.map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 px-3" style={{ color: 'var(--text-primary)' }}>
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="py-2 px-3" style={{ color: 'var(--text-secondary)' }}>
                      {generateUsername(u.firstName, u.lastName)}
                    </td>
                    <td className="py-2 px-3" style={{ color: 'var(--text-muted)' }}>
                      {u.docNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {error && (
            <p className="text-xs mb-3" style={{ color: 'var(--error)' }}>
              {error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleConfirm}
              disabled={creating}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-root)',
                cursor: creating ? 'not-allowed' : 'pointer',
                opacity: creating ? 0.6 : 1,
              }}
            >
              {creating ? 'Creating...' : `Create ${parsedUsers.length} Students`}
            </button>
            <button
              onClick={() => { setShowPreview(false); setError(''); }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
}
