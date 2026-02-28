import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { createExercise, updateExercise } from '../../features/exercisesSlice';
import type { Exercise, ExerciseType, Tier, TestCase, Resource } from '@codeforge/shared';
import { TIER_META, TYPE_META, BASE_POINTS } from '@codeforge/shared/constants';
import TierBadge from '../shared/TierBadge';
import TypeBadge from '../shared/TypeBadge';

// ─── Types ─────────────────────────────────────────────────────────────────

interface ExerciseWizardProps {
  onClose: () => void;
  onCreated: () => void;
  editExercise?: Exercise;
}

type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: 'Basics' },
  { step: 2, label: 'Instructions' },
  { step: 3, label: 'Code' },
  { step: 4, label: 'Tests' },
  { step: 5, label: 'Extras' },
  { step: 6, label: 'Review' },
];

const ASSERTION_OPTIONS: TestCase['assertion'][] = [
  'exists',
  'textContains',
  'countAtLeast',
  'equals',
  'oneOf',
  'sourceContains',
  'sourceMatch',
  'hasId',
  'hasClass',
  'contains',
];

const STARTER_PLACEHOLDERS: Record<ExerciseType, string> = {
  js: 'function myFunction() {\n  // your code here\n}',
  html: '<!-- Your HTML here -->',
  css: '/* Your styles here */',
  'html-css': '<!-- Your HTML here -->\n\n/* CSS will be in a separate editor */',
};

// ─── Tooltip Component ─────────────────────────────────────────────────────

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((p) => !p)}
    >
      <span
        className="inline-flex items-center justify-center rounded-full text-xs font-bold"
        style={{
          width: 16,
          height: 16,
          backgroundColor: 'var(--bg-raised)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border)',
          cursor: 'help',
          fontSize: 10,
          marginLeft: 4,
        }}
      >
        ?
      </span>
      {show && (
        <div
          className="text-xs rounded-lg p-2"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 6,
            width: 240,
            backgroundColor: 'var(--bg-raised)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>
      )}
    </span>
  );
}

// ─── Chip Input Component ──────────────────────────────────────────────────

function ChipInput({
  label,
  values,
  onChange,
  placeholder,
  suggestions,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = useMemo(() => {
    if (!suggestions || !input.trim()) return [];
    const q = input.toLowerCase();
    return suggestions.filter(
      (s) => s.toLowerCase().includes(q) && !values.includes(s),
    ).slice(0, 8);
  }, [suggestions, input, values]);

  const addValue = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValue(input);
    }
  };

  return (
    <div>
      <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <div
        className="flex flex-wrap gap-1 p-2 rounded min-h-[38px]"
        style={{
          backgroundColor: 'var(--bg-root)',
          border: '1px solid var(--border)',
        }}
      >
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-xs"
              style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              x
            </button>
          </span>
        ))}
        <div style={{ position: 'relative', flex: 1, minWidth: 120 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full text-sm bg-transparent outline-none"
            style={{ color: 'var(--text-primary)', border: 'none' }}
            placeholder={values.length === 0 ? placeholder : 'Add more...'}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              className="rounded text-xs overflow-y-auto"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                maxHeight: 160,
                backgroundColor: 'var(--bg-raised)',
                border: '1px solid var(--border)',
                zIndex: 40,
              }}
            >
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addValue(s)}
                  className="block w-full text-left px-3 py-1.5 text-xs transition-colors"
                  style={{ color: 'var(--text-primary)', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Wizard ───────────────────────────────────────────────────────────

export default function ExerciseWizard({ onClose, onCreated, editExercise }: ExerciseWizardProps) {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((s) => s.exercises.collections);
  const categories = useAppSelector((s) => s.exercises.categories);

  const isEdit = !!editExercise;

  // Flatten category keys for suggestions
  const categoryKeys = useMemo(() => Object.keys(categories), [categories]);

  // ─── Form State ────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Step 1
  const [title, setTitle] = useState(editExercise?.title || '');
  const [type, setType] = useState<ExerciseType>(editExercise?.type || 'js');
  const [tier, setTier] = useState<Tier>(editExercise?.tier || 1);
  const [collectionId, setCollectionId] = useState(editExercise?.collectionId || '');
  const [categoryTags, setCategoryTags] = useState<string[]>(editExercise?.category || []);
  const [tags, setTags] = useState<string[]>(editExercise?.tags || []);
  const [description, setDescription] = useState(editExercise?.description || '');

  // Step 2
  const [instructions, setInstructions] = useState(editExercise?.instructions || '');

  // Step 3
  const [starterCode, setStarterCode] = useState(editExercise?.starterCode || '');
  const [solution, setSolution] = useState(editExercise?.solution || '');
  const [providedHtml, setProvidedHtml] = useState(editExercise?.providedHtml || '');

  // Step 4
  const [testRunner, setTestRunner] = useState(editExercise?.testRunner || '');
  const [testCases, setTestCases] = useState<TestCase[]>(editExercise?.testCases || []);

  // Step 5
  const [hints, setHints] = useState<string[]>(editExercise?.hints || []);
  const [resources, setResources] = useState<Resource[]>(editExercise?.resources || []);
  const [solutionGate, setSolutionGate] = useState<number>(editExercise?.solutionGate ?? 10);
  const [basePoints, setBasePoints] = useState<number>(editExercise?.basePoints ?? BASE_POINTS[1]);

  // Update basePoints when tier changes (unless in edit mode and user has overridden)
  const [basePointsOverridden, setBasePointsOverridden] = useState(false);

  const handleTierChange = (newTier: Tier) => {
    setTier(newTier);
    if (!basePointsOverridden) {
      setBasePoints(BASE_POINTS[newTier]);
    }
  };

  // ─── Validation ────────────────────────────────────────────────────────

  const validateStep = (step: WizardStep): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!title.trim()) errors.title = 'Title is required';
        if (!description.trim()) errors.description = 'Description is required';
        break;
      case 2:
        if (!instructions.trim()) errors.instructions = 'Instructions are required';
        break;
      case 3:
        if (!solution.trim()) errors.solution = 'Solution is required';
        break;
      case 4:
        if (type === 'js' && !testRunner.trim()) errors.testRunner = 'Test runner code is required for JS exercises';
        if (type !== 'js' && testCases.length === 0) errors.testCases = 'At least one test case is required for HTML/CSS exercises';
        break;
      case 5:
        // All optional
        break;
      case 6:
        // Final review, all validated
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 6) as WizardStep);
    }
  };

  const goPrev = () => {
    setValidationErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1) as WizardStep);
  };

  const goToStep = (step: WizardStep) => {
    // Allow going backward freely; going forward requires validation up to that point
    if (step < currentStep) {
      setValidationErrors({});
      setCurrentStep(step);
    } else {
      // Validate all steps up to the target
      for (let s = currentStep; s < step; s++) {
        if (!validateStep(s as WizardStep)) return;
      }
      setCurrentStep(step);
    }
  };

  // ─── Submit ────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    const payload = {
      title: title.trim(),
      type,
      tier,
      category: categoryTags,
      tags,
      description: description.trim(),
      instructions: instructions.trim(),
      starterCode,
      solution,
      testRunner: type === 'js' ? testRunner : '',
      testCases: type !== 'js' ? testCases : undefined,
      providedHtml: (type === 'css' || type === 'html-css') ? providedHtml : undefined,
      hints,
      resources,
      solutionGate: solutionGate || undefined,
      basePoints: basePoints || undefined,
      collectionId: collectionId || undefined,
    };

    try {
      if (isEdit && editExercise) {
        await dispatch(updateExercise({ id: editExercise._id, ...payload })).unwrap();
      } else {
        await dispatch(createExercise(payload as any)).unwrap();
      }
      onCreated();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save exercise');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Test Case Helpers ─────────────────────────────────────────────────

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { query: '', assertion: 'exists', property: '', value: '', description: '' },
    ]);
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: any) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)),
    );
  };

  const removeTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Hint Helpers ──────────────────────────────────────────────────────

  const addHint = () => setHints([...hints, '']);
  const updateHint = (index: number, value: string) => {
    setHints((prev) => prev.map((h, i) => (i === index ? value : h)));
  };
  const removeHint = (index: number) => {
    setHints((prev) => prev.filter((_, i) => i !== index));
  };
  const moveHint = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= hints.length) return;
    const next = [...hints];
    [next[index], next[target]] = [next[target], next[index]];
    setHints(next);
  };

  // ─── Resource Helpers ──────────────────────────────────────────────────

  const addResource = () => setResources([...resources, { label: '', url: '', description: '' }]);
  const updateResource = (index: number, field: keyof Resource, value: string) => {
    setResources((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };
  const removeResource = (index: number) => {
    setResources((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Input Styles ─────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-root)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
  };

  const inputErrorStyle = (field: string): React.CSSProperties =>
    validationErrors[field]
      ? { ...inputStyle, borderColor: 'var(--error, #ef4444)' }
      : inputStyle;

  const codeStyle: React.CSSProperties = {
    ...inputStyle,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 13,
    lineHeight: '1.5',
    tabSize: 2,
  };

  // ─── Render Steps ─────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          Title <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded text-sm"
          style={inputErrorStyle('title')}
          placeholder="e.g. Array Map Practice"
        />
        {validationErrors.title && (
          <span className="text-xs mt-0.5 block" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.title}</span>
        )}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ExerciseType)}
            className="w-full px-3 py-2 rounded text-sm"
            style={inputStyle}
          >
            {(Object.keys(TYPE_META) as ExerciseType[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_META[t].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Tier
          </label>
          <select
            value={tier}
            onChange={(e) => handleTierChange(Number(e.target.value) as Tier)}
            className="w-full px-3 py-2 rounded text-sm"
            style={inputStyle}
          >
            {([1, 2, 3, 4, 5] as Tier[]).map((t) => (
              <option key={t} value={t}>
                {t} - {TIER_META[t].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Collection (optional)
          </label>
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={inputStyle}
          >
            <option value="">None</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ChipInput
        label="Categories"
        values={categoryTags}
        onChange={setCategoryTags}
        placeholder="Type and press Enter to add categories"
        suggestions={categoryKeys}
      />

      <ChipInput
        label="Tags"
        values={tags}
        onChange={setTags}
        placeholder="Type and press Enter to add tags"
      />

      <div>
        <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          Description <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded text-sm resize-none"
          style={inputErrorStyle('description')}
          placeholder="A brief summary of this exercise"
        />
        {validationErrors.description && (
          <span className="text-xs mt-0.5 block" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.description}</span>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          Instructions <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
        </label>
        <span className="text-xs block mb-2" style={{ color: 'var(--text-muted)' }}>
          Markdown is supported in instructions.
        </span>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={14}
          className="w-full px-3 py-2 rounded text-sm resize-vertical"
          style={inputErrorStyle('instructions')}
          placeholder={"Write clear instructions for the student. Markdown is supported.\n\nExample:\nWrite a function called `greet` that takes a name and returns a greeting string."}
        />
        {validationErrors.instructions && (
          <span className="text-xs mt-0.5 block" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.instructions}</span>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          Starter Code
        </label>
        {type === 'html-css' && (
          <span className="text-xs block mb-1" style={{ color: 'var(--accent)' }}>
            Note: Students will get separate HTML and CSS editors. Provide the starter HTML here.
          </span>
        )}
        <textarea
          value={starterCode}
          onChange={(e) => setStarterCode(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 rounded text-sm resize-vertical"
          style={codeStyle}
          placeholder={STARTER_PLACEHOLDERS[type]}
        />
      </div>

      <div>
        <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          Solution <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
        </label>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 rounded text-sm resize-vertical"
          style={{
            ...codeStyle,
            ...(validationErrors.solution ? { borderColor: 'var(--error, #ef4444)' } : {}),
          }}
          placeholder="The complete solution code"
        />
        {validationErrors.solution && (
          <span className="text-xs mt-0.5 block" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.solution}</span>
        )}
      </div>

      {(type === 'css' || type === 'html-css') && (
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Provided HTML
            <InfoTooltip text="The HTML document that students' CSS will be applied to. This HTML is displayed but not editable by students." />
          </label>
          <textarea
            value={providedHtml}
            onChange={(e) => setProvidedHtml(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 rounded text-sm resize-vertical"
            style={codeStyle}
            placeholder="<div class='container'>\n  <h1>Style me!</h1>\n</div>"
          />
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col gap-4">
      {type === 'js' ? (
        <>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Test Runner Code <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
              <InfoTooltip text="Write JavaScript assertions that test the student's code. The student's code runs in the same scope, so you can call their functions directly. Use assert(condition, message) for each test." />
            </label>
            <textarea
              value={testRunner}
              onChange={(e) => setTestRunner(e.target.value)}
              rows={14}
              className="w-full px-3 py-2 rounded text-sm resize-vertical"
              style={{
                ...codeStyle,
                ...(validationErrors.testRunner ? { borderColor: 'var(--error, #ef4444)' } : {}),
              }}
              placeholder={"// Write tests using assert-style checks\n// The student's code is available in the scope\n\nassert(myFunction(1) === 2, 'myFunction(1) should return 2');"}
            />
            {validationErrors.testRunner && (
              <span className="text-xs mt-0.5 block" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.testRunner}</span>
            )}
          </div>
          <div
            className="rounded p-3 text-xs"
            style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <strong>Tip:</strong> JS exercises use a test runner function. The student's code executes first, then your test code runs in the same scope. Use <code>assert(condition, description)</code> for each check.
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Test Cases <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
              <InfoTooltip text="Each test case checks a CSS selector against an assertion. For example, check that an element 'exists', or that its text 'textContains' a value." />
            </label>
            <button
              type="button"
              onClick={addTestCase}
              className="px-3 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-root)',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Add Test Case
            </button>
          </div>

          {validationErrors.testCases && (
            <span className="text-xs" style={{ color: 'var(--error, #ef4444)' }}>{validationErrors.testCases}</span>
          )}

          {testCases.map((tc, i) => (
            <div
              key={i}
              className="rounded p-3 flex flex-col gap-2"
              style={{ backgroundColor: 'var(--bg-root)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Test Case {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeTestCase(i)}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--error, #ef4444)',
                    cursor: 'pointer',
                    background: 'none',
                    border: '1px solid var(--error, #ef4444)',
                  }}
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label className="block text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    Query (CSS selector)
                  </label>
                  <input
                    type="text"
                    value={tc.query || ''}
                    onChange={(e) => updateTestCase(i, 'query', e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle}
                    placeholder="e.g. h1, .container, #main"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    Assertion
                  </label>
                  <select
                    value={tc.assertion}
                    onChange={(e) => updateTestCase(i, 'assertion', e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle}
                  >
                    {ASSERTION_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label className="block text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    Property
                  </label>
                  <input
                    type="text"
                    value={tc.property || ''}
                    onChange={(e) => updateTestCase(i, 'property', e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle}
                    placeholder="e.g. textContent, color"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    Value
                  </label>
                  <input
                    type="text"
                    value={typeof tc.value === 'object' ? (tc.value as string[]).join(', ') : (tc.value ?? '')}
                    onChange={(e) => updateTestCase(i, 'value', e.target.value)}
                    className="w-full px-2 py-1.5 rounded text-xs"
                    style={inputStyle}
                    placeholder="Expected value"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                  Description <span style={{ color: 'var(--error, #ef4444)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={tc.description}
                  onChange={(e) => updateTestCase(i, 'description', e.target.value)}
                  className="w-full px-2 py-1.5 rounded text-xs"
                  style={inputStyle}
                  placeholder="e.g. Page should have an h1 element"
                />
              </div>
            </div>
          ))}

          <div
            className="rounded p-3 text-xs"
            style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <strong>Tip:</strong> HTML/CSS exercises use structured test cases. Each test case uses a CSS selector to find elements and an assertion to check properties. Common assertions: <code>exists</code> (element is present), <code>textContains</code> (text includes value), <code>hasClass</code> (element has CSS class).
          </div>
        </>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="flex flex-col gap-5">
      {/* Hints */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Hints
            <InfoTooltip text="Hints unlock progressively as students make more attempts (at 3, 6, and 9 attempts). Add them in order of increasing helpfulness." />
          </label>
          <button
            type="button"
            onClick={addHint}
            className="px-3 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Add Hint
          </button>
        </div>
        {hints.length === 0 && (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Add hints that unlock progressively as students make more attempts
          </p>
        )}
        {hints.map((hint, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <div className="flex flex-col gap-0.5 pt-2">
              <button
                type="button"
                onClick={() => moveHint(i, -1)}
                disabled={i === 0}
                className="text-xs leading-none"
                style={{
                  color: i === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                  cursor: i === 0 ? 'default' : 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                {'\u25B2'}
              </button>
              <button
                type="button"
                onClick={() => moveHint(i, 1)}
                disabled={i === hints.length - 1}
                className="text-xs leading-none"
                style={{
                  color: i === hints.length - 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                  cursor: i === hints.length - 1 ? 'default' : 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                {'\u25BC'}
              </button>
            </div>
            <span
              className="inline-flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-2"
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'var(--bg-raised)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                fontSize: 10,
              }}
            >
              {i + 1}
            </span>
            <textarea
              value={hint}
              onChange={(e) => updateHint(i, e.target.value)}
              rows={2}
              className="flex-1 px-3 py-2 rounded text-sm resize-none"
              style={inputStyle}
              placeholder={`Hint ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeHint(i)}
              className="text-xs px-2 py-1 rounded mt-2"
              style={{
                color: 'var(--error, #ef4444)',
                cursor: 'pointer',
                background: 'none',
                border: '1px solid var(--error, #ef4444)',
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Resources
          </label>
          <button
            type="button"
            onClick={addResource}
            className="px-3 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Add Resource
          </button>
        </div>
        {resources.map((r, i) => (
          <div
            key={i}
            className="rounded p-3 mb-2 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--bg-root)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Resource {i + 1}
              </span>
              <button
                type="button"
                onClick={() => removeResource(i)}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  color: 'var(--error, #ef4444)',
                  cursor: 'pointer',
                  background: 'none',
                  border: '1px solid var(--error, #ef4444)',
                }}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <input
                type="text"
                value={r.label}
                onChange={(e) => updateResource(i, 'label', e.target.value)}
                className="px-2 py-1.5 rounded text-xs"
                style={inputStyle}
                placeholder="Label (e.g. MDN: Array.map)"
              />
              <input
                type="text"
                value={r.url}
                onChange={(e) => updateResource(i, 'url', e.target.value)}
                className="px-2 py-1.5 rounded text-xs"
                style={inputStyle}
                placeholder="URL"
              />
            </div>
            <input
              type="text"
              value={r.description || ''}
              onChange={(e) => updateResource(i, 'description', e.target.value)}
              className="px-2 py-1.5 rounded text-xs"
              style={inputStyle}
              placeholder="Description (optional)"
            />
          </div>
        ))}
      </div>

      {/* Solution Gate & Base Points */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Solution Gate
            <InfoTooltip text="Number of unique attempts a student must make before they can view the solution. Default is 10." />
          </label>
          <input
            type="number"
            value={solutionGate}
            onChange={(e) => setSolutionGate(Number(e.target.value))}
            min={1}
            className="w-full px-3 py-2 rounded text-sm"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Base Points
            <InfoTooltip text={`Auto-calculated from tier. Tier ${tier} = ${BASE_POINTS[tier]} points. Override if needed.`} />
          </label>
          <input
            type="number"
            value={basePoints}
            onChange={(e) => {
              setBasePoints(Number(e.target.value));
              setBasePointsOverridden(true);
            }}
            min={1}
            className="w-full px-3 py-2 rounded text-sm"
            style={inputStyle}
          />
          {!basePointsOverridden && (
            <span className="text-xs mt-0.5 block" style={{ color: 'var(--text-muted)' }}>
              Auto: Tier {tier} = {BASE_POINTS[tier]} pts
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => {
    const collectionName = collections.find((c) => c._id === collectionId)?.name;

    return (
      <div className="flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Review Exercise
        </h3>

        {/* Preview Card */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-root)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TierBadge tier={tier} size="md" showName />
            <TypeBadge type={type} />
            <h4 className="font-heading font-bold text-lg ml-1" style={{ color: 'var(--text-primary)' }}>
              {title || 'Untitled Exercise'}
            </h4>
          </div>

          {description && (
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
          )}

          {categoryTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {categoryTags.map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {instructions && (
            <div
              className="rounded p-3 text-sm mb-3"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {instructions.length > 300 ? instructions.slice(0, 300) + '...' : instructions}
            </div>
          )}
        </div>

        {/* Summary Table */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-root)', border: '1px solid var(--border)' }}
        >
          <h4 className="font-heading font-semibold text-xs mb-3" style={{ color: 'var(--text-primary)' }}>
            Summary
          </h4>
          <div className="grid gap-2 text-xs" style={{ gridTemplateColumns: 'auto 1fr' }}>
            <span style={{ color: 'var(--text-muted)' }}>Type:</span>
            <span style={{ color: 'var(--text-primary)' }}>{TYPE_META[type].label}</span>

            <span style={{ color: 'var(--text-muted)' }}>Tier:</span>
            <span style={{ color: 'var(--text-primary)' }}>{tier} - {TIER_META[tier].name}</span>

            <span style={{ color: 'var(--text-muted)' }}>Collection:</span>
            <span style={{ color: 'var(--text-primary)' }}>{collectionName || 'None'}</span>

            <span style={{ color: 'var(--text-muted)' }}>Categories:</span>
            <span style={{ color: 'var(--text-primary)' }}>{categoryTags.join(', ') || 'None'}</span>

            <span style={{ color: 'var(--text-muted)' }}>Tags:</span>
            <span style={{ color: 'var(--text-primary)' }}>{tags.join(', ') || 'None'}</span>

            <span style={{ color: 'var(--text-muted)' }}>Base Points:</span>
            <span style={{ color: 'var(--text-primary)' }}>{basePoints}</span>

            <span style={{ color: 'var(--text-muted)' }}>Solution Gate:</span>
            <span style={{ color: 'var(--text-primary)' }}>{solutionGate} attempts</span>

            <span style={{ color: 'var(--text-muted)' }}>Starter Code:</span>
            <span style={{ color: 'var(--text-primary)' }}>{starterCode ? `${starterCode.split('\n').length} lines` : 'None'}</span>

            <span style={{ color: 'var(--text-muted)' }}>Solution:</span>
            <span style={{ color: 'var(--text-primary)' }}>{solution ? `${solution.split('\n').length} lines` : 'None'}</span>

            <span style={{ color: 'var(--text-muted)' }}>Tests:</span>
            <span style={{ color: 'var(--text-primary)' }}>
              {type === 'js'
                ? testRunner ? `Test runner (${testRunner.split('\n').length} lines)` : 'None'
                : `${testCases.length} test case(s)`}
            </span>

            <span style={{ color: 'var(--text-muted)' }}>Hints:</span>
            <span style={{ color: 'var(--text-primary)' }}>{hints.length}</span>

            <span style={{ color: 'var(--text-muted)' }}>Resources:</span>
            <span style={{ color: 'var(--text-primary)' }}>{resources.length}</span>
          </div>
        </div>

        {error && (
          <p className="text-xs" style={{ color: 'var(--error, #ef4444)' }}>
            {error}
          </p>
        )}
      </div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          {isEdit ? 'Edit Exercise' : 'Create Exercise'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-2 py-1 rounded"
          style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          {'\u2715'}
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto">
        {STEPS.map(({ step, label }) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <button
              key={step}
              type="button"
              onClick={() => goToStep(step)}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
              style={{
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                color: isActive
                  ? 'var(--accent)'
                  : isCompleted
                    ? 'var(--success, #34d399)'
                    : 'var(--text-muted)',
              }}
            >
              <span
                className="inline-flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  width: 22,
                  height: 22,
                  fontSize: 11,
                  backgroundColor: isActive
                    ? 'var(--accent)'
                    : isCompleted
                      ? 'var(--success, #34d399)'
                      : 'var(--bg-raised)',
                  color: isActive || isCompleted
                    ? 'var(--bg-root)'
                    : 'var(--text-muted)',
                  border: isActive
                    ? 'none'
                    : isCompleted
                      ? 'none'
                      : '1px solid var(--border)',
                }}
              >
                {isCompleted ? '\u2713' : step}
              </span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        >
          Cancel
        </button>

        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={goPrev}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            >
              Previous
            </button>
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={goNext}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-root)',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-root)',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
                border: 'none',
              }}
            >
              {submitting
                ? 'Saving...'
                : isEdit
                  ? 'Save Changes'
                  : 'Create Exercise'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
