import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CODE BLOCK COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--text-on-surface-subtle)] hover:text-tech transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="p-5 overflow-x-auto text-sm text-[var(--text-on-surface-muted)] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROPS TABLE COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--surface-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-black/5 dark:bg-white/5">
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-on-surface)]">Prop</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-on-surface)]">Tipo</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-on-surface)]">Default</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-on-surface)]">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-t border-[var(--surface-border)]">
              <td className="px-4 py-3 font-mono text-tech">{prop.name}</td>
              <td className="px-4 py-3 text-[var(--text-on-surface-muted)]">{prop.type}</td>
              <td className="px-4 py-3 text-[var(--text-on-surface-subtle)] font-mono text-xs">{prop.default}</td>
              <td className="px-4 py-3 text-[var(--text-on-surface-muted)]">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
