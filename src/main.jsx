import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Clipboard, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import './styles.css';

const examples = ['Add Stripe checkout to my Next.js app', 'Fix the slow search query in our dashboard', 'Add dark mode without breaking existing themes'];
function makeBrief(task) {
  return `# Agent Brief\n\n## Objective\n${task}\n\n## Assumptions\n- Preserve existing public APIs and user-facing behavior.\n- Follow the project’s current conventions before introducing new dependencies.\n- Keep the change scoped; do not refactor unrelated code.\n\n## Likely files to inspect\n- The relevant page, component, or route\n- Existing data/API and type definitions\n- Tests and configuration for this feature\n\n## Implementation plan\n1. Inspect the existing flow and identify the smallest safe change.\n2. Implement the feature using established project patterns.\n3. Add or update focused tests for the happy path and one failure case.\n4. Review the diff for unrelated changes and accessibility issues.\n\n## Verification\n- Run the project’s formatter, linter, and relevant test command.\n- Manually test the changed flow on desktop and mobile.\n- Confirm errors are visible and recoverable.\n\n## Risks / rollback\nRisk: existing edge cases may not be covered by current tests.\nRollback: revert the focused commit if verification or regression checks fail.`;
}
function App() {
  const [task, setTask] = useState(''); const [brief, setBrief] = useState(''); const [copied, setCopied] = useState(false);
  const generate = () => { if (task.trim()) setBrief(makeBrief(task.trim())); };
  const copy = async () => { await navigator.clipboard.writeText(brief); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return <main><nav><a className="brand" href="/"><span>CTAIO</span> / LABS</a><div className="nav-note"><span className="dot"/> Built for agentic engineers</div></nav>
    <section className="hero"><div className="eyebrow">A better first message</div><h1>Give your coding agent<br/><em>a brief worth following.</em></h1><p className="lede">Agent Brief turns a fuzzy task into a clear, testable implementation plan for Claude Code, Cursor, and other coding agents.</p></section>
    <section className="workspace"><div className="panel input-panel"><div className="panel-head"><span className="number">01</span><div><h2>Describe the task</h2><p>Be rough. The brief will add the structure.</p></div></div><textarea value={task} onChange={e=>setTask(e.target.value)} placeholder="e.g. Add Stripe checkout to my Next.js app"/><div className="examples">{examples.map(x=><button key={x} onClick={()=>setTask(x)}>{x}</button>)}</div><button className="primary" onClick={generate} disabled={!task.trim()}>Generate brief <ArrowRight size={17}/></button></div>
    <div className="panel output-panel"><div className="panel-head"><span className="number">02</span><div><h2>Your agent brief</h2><p>Review it before you hand over the keyboard.</p></div>{brief&&<button className="copy" onClick={copy}>{copied?<><Check size={15}/> Copied</>:<><Clipboard size={15}/> Copy Markdown</>}</button>}</div>{brief?<pre>{brief}</pre>:<div className="empty"><Sparkles size={22}/><span>Your structured brief will appear here.</span></div>}</div></section>
    <section className="principles"><div><ShieldCheck size={18}/><strong>Small scope.</strong> Fewer surprises.</div><div><ShieldCheck size={18}/><strong>Explicit checks.</strong> Less “it looks right”.</div><div><ShieldCheck size={18}/><strong>Human review.</strong> Agents accelerate judgement.</div></section>
    <footer>CTAIO / LABS <span>Agent Brief · v1.0</span></footer></main>
}
createRoot(document.getElementById('root')).render(<App />);
