import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, CalendarDays, Check, ChevronDown, Clock3, Dumbbell, Flame, Footprints, HeartPulse, Plus, Sparkles, Target, TimerReset, Waves } from 'lucide-react'

const workouts = [
  { name: 'Incline barbell press', group: 'CHEST', sets: '4 × 8', load: '60 kg', state: 'Done' },
  { name: 'Seated shoulder press', group: 'SHOULDERS', sets: '4 × 9', load: '42.5 kg', state: 'Next' },
  { name: 'Cable lateral raise', group: 'DELTS', sets: '3 × 14', load: '12.5 kg', state: 'Up next' },
]
const schedule = [
  { time: '07:15', title: 'Power breakfast', note: 'Oats, whey & eggs', kcal: '520 kcal', done: true },
  { time: '13:00', title: 'Pre-workout lunch', note: 'Rice, chicken & greens', kcal: '650 kcal', done: true },
  { time: '17:00', title: 'Push day training', note: 'Progressive overload session', kcal: '75 min', done: false },
  { time: '18:30', title: 'Post-workout shake', note: 'Whey, creatine & fruit', kcal: '45g protein', done: false },
]
const muscles = [
  { name: 'Chest', level: 72, color: 'bg-lime-300', tag: 'Strong' },
  { name: 'Back', level: 68, color: 'bg-teal-300', tag: 'Building' },
  { name: 'Shoulders', level: 61, color: 'bg-amber-300', tag: 'Focus' },
  { name: 'Arms', level: 76, color: 'bg-lime-300', tag: 'Strong' },
  { name: 'Core', level: 57, color: 'bg-amber-300', tag: 'Focus' },
  { name: 'Legs', level: 70, color: 'bg-teal-300', tag: 'Building' },
]

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Aesthetix — Training dashboard' }, { name: 'description', content: 'Your personal training, strength and recovery dashboard.' }] }),
  component: Home,
})

function Home() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [checked, setChecked] = useState([true, true, false, false])
  const [running, setRunning] = useState(false)
  const [toast, setToast] = useState('')
  const toggleSchedule = (index: number) => {
    const next = [...checked]
    next[index] = !next[index]
    setChecked(next)
    setToast(next[index] ? 'Routine marked complete' : 'Routine moved back to your plan')
    window.setTimeout(() => setToast(''), 2200)
  }
  return (
    <main className="min-h-dvh bg-[#0c100f] text-[#f2f3ed] selection:bg-lime-300/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(174,219,92,0.12),transparent_48%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-12 sm:px-7 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] py-5">
          <a href="#home" className="flex items-center gap-3" aria-label="Aesthetix home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-300 text-[#161b11] shadow-[0_5px_24px_rgba(190,235,110,0.18)]"><Activity size={20} strokeWidth={2.6} /></span>
            <span><span className="block text-[15px] font-extrabold tracking-[0.14em]">AESTHETIX</span><span className="block text-[10px] font-medium tracking-[0.16em] text-white/40">PHYSIQUE, WITH PURPOSE</span></span>
          </a>
          <nav className="order-3 flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto" aria-label="Main navigation">
            {['Overview', 'Training lab', 'Progress'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${activeTab === tab ? 'bg-white/[0.1] font-semibold text-white' : 'text-white/45 hover:bg-white/[0.06] hover:text-white'}`}>{tab}</button>)}
          </nav>
          <div className="flex items-center gap-3"><span className="hidden items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-xs text-white/60 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Friday, 14 November</span><button aria-label="Profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-lime-200/30 bg-lime-200/10 text-sm font-bold text-lime-100">J</button></div>
        </header>

        <section id="home" className="grid gap-8 pb-8 pt-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-12">
          <div><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-200/15 bg-lime-200/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-200"><Sparkles size={13} /> Your training snapshot</div><h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[58px]">Build strength.<br /><span className="font-serif italic font-normal text-lime-200">Become your best.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:text-base">A clear view of your training, recovery, and the small wins that add up to real progress.</p></div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Metric label="Muscle level" value="58" suffix="/100" icon={<Dumbbell size={15} />} trend="+3 this month" />
            <Metric label="Daily potential" value="82" suffix="%" icon={<Target size={15} />} trend="On track" />
            <Metric label="Training streak" value="12" suffix="days" icon={<Flame size={15} />} trend="Best: 18 days" />
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(350px,0.85fr)]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#151a17] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)] sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-lime-200"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Today's focus</div><h2 className="mt-2 text-2xl font-semibold tracking-tight">Push day <span className="text-white/35">·</span> Hypertrophy</h2><p className="mt-1 text-sm text-white/45">Chest, shoulders & triceps <span className="px-1.5">/</span> 5 exercises</p></div><button onClick={() => { setToast('Training session started'); setRunning(true); window.setTimeout(() => setToast(''), 2200) }} className="group flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-bold text-[#18200f] transition hover:scale-[1.03] hover:bg-lime-200 active:scale-[0.98]"><Dumbbell size={16} /> {running ? 'Session started' : 'Start workout'} <ArrowRight size={15} className="transition group-hover:translate-x-0.5" /></button></div>
              <div className="mt-6 grid gap-2.5">
                {workouts.map((exercise, index) => <div key={exercise.name} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.055] bg-[#0e1311]/70 px-4 py-3.5 transition hover:border-lime-200/20 hover:bg-[#111713]"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.055] font-mono text-xs text-white/45">0{index + 1}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{exercise.name}</p><p className="mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-white/35">{exercise.group} <span className="px-1">·</span> {exercise.sets}</p></div></div><div className="flex shrink-0 items-center gap-3"><span className="hidden font-mono text-xs text-white/55 sm:block">{exercise.load}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${exercise.state === 'Done' ? 'bg-lime-300/10 text-lime-200' : 'bg-white/[0.06] text-white/55'}`}>{exercise.state}</span><button onClick={() => setToast(`${exercise.name} selected`)} aria-label={`Open ${exercise.name}`} className="text-white/25 transition hover:text-lime-200"><ArrowRight size={16} /></button></div></div>)}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4"><div className="flex items-center gap-2 text-xs text-white/45"><Clock3 size={14} /><span>Estimated time</span><strong className="font-semibold text-white/75">55 min</strong><span className="text-white/20">·</span><span>Rest between sets</span><strong className="font-semibold text-white/75">90 sec</strong></div><button onClick={() => { setRunning(!running); setToast(running ? 'Timer paused' : '90 second rest timer started'); window.setTimeout(() => setToast(''), 2200) }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-200 transition hover:text-lime-100"><TimerReset size={14} /> {running ? 'Pause timer' : 'Quick rest timer'}</button></div>
            </section>

            <section className="rounded-[28px] border border-white/[0.09] bg-[#151a17] p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Balanced development</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Muscle level map</h2></div><button onClick={() => setActiveTab('Progress')} className="flex items-center gap-1.5 text-xs font-semibold text-lime-200 hover:text-lime-100">View progress <ArrowRight size={14} /></button></div>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{muscles.map((muscle) => <div key={muscle.name}><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-sm font-semibold">{muscle.name}</span><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${muscle.tag === 'Focus' ? 'bg-amber-200/10 text-amber-200' : 'bg-white/[0.06] text-white/40'}`}>{muscle.tag}</span></div><span className="font-mono text-xs text-white/60">{muscle.level}<span className="text-white/30"> / 100</span></span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className={`h-full rounded-full ${muscle.color} transition-all`} style={{ width: `${muscle.level}%` }} /></div></div>)}</div>
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-amber-200/10 bg-amber-100/[0.045] px-4 py-3 text-xs leading-5 text-white/55"><Sparkles size={15} className="shrink-0 text-amber-200" /><span><strong className="text-amber-100">A good next focus:</strong> Add a little shoulder volume this week to keep your progress balanced.</span></div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[28px] border border-white/[0.09] bg-[#151a17] p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Recovery check-in</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Fuel your progress</h2></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-200/10 text-teal-200"><HeartPulse size={18} /></span></div>
              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1311]/70 p-4"><div className="flex items-end justify-between"><div><p className="text-xs text-white/45">Protein today</p><p className="mt-1 font-mono text-2xl font-semibold">110<span className="text-sm text-white/35"> / 155 g</span></p></div><span className="text-xs font-semibold text-lime-200">71%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[71%] rounded-full bg-gradient-to-r from-lime-300 to-teal-200" /></div><p className="mt-2 text-[11px] text-white/35">45g left to reach your daily target</p></div>
              <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/[0.07] bg-[#0e1311]/70 p-3.5"><div className="flex items-center gap-2 text-xs text-white/45"><Waves size={14} className="text-teal-200" /> Hydration</div><p className="mt-2 font-mono text-lg font-semibold">2.4 <span className="text-xs font-normal text-white/35">/ 3.5 L</span></p><div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[68%] rounded-full bg-teal-200" /></div></div><div className="rounded-2xl border border-white/[0.07] bg-[#0e1311]/70 p-3.5"><div className="flex items-center gap-2 text-xs text-white/45"><HeartPulse size={14} className="text-violet-200" /> Sleep</div><p className="mt-2 font-mono text-lg font-semibold">7.5 <span className="text-xs font-normal text-white/35">hours</span></p><p className="mt-2 text-[10px] text-lime-200">Good recovery window</p></div></div>
            </section>

            <section className="rounded-[28px] border border-white/[0.09] bg-[#151a17] p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Your day, at a glance</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Daily rhythm</h2></div><button aria-label="Add routine" onClick={() => { setToast('Your routine editor is ready'); window.setTimeout(() => setToast(''), 2200) }} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.09] text-white/60 transition hover:border-lime-200/30 hover:text-lime-200"><Plus size={17} /></button></div><div className="space-y-0.5">{schedule.map((item, index) => <div key={item.time} className="flex gap-3 py-3"><div className="flex w-12 shrink-0 flex-col items-center"><span className="font-mono text-[10px] text-white/40">{item.time}</span><span className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border ${checked[index] ? 'border-lime-300/50 bg-lime-300/15 text-lime-200' : 'border-white/15 bg-white/[0.03] text-white/20'}`}>{checked[index] ? <Check size={11} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span></div><button onClick={() => toggleSchedule(index)} className="min-w-0 flex-1 border-b border-white/[0.06] pb-3 text-left"><div className="flex items-center justify-between gap-2"><p className={`truncate text-sm font-semibold ${checked[index] ? 'text-white/45 line-through decoration-white/20' : 'text-white/90'}`}>{item.title}</p><span className="shrink-0 text-[10px] text-white/35">{item.kcal}</span></div><p className="mt-1 text-xs text-white/40">{item.note}</p></button></div>)}</div><button onClick={() => setToast('Showing your full day schedule')} className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] py-2.5 text-xs font-semibold text-white/55 transition hover:border-white/15 hover:text-white/80">See full schedule <ChevronDown size={14} /></button></section>

            <section className="rounded-[28px] border border-lime-200/15 bg-[linear-gradient(135deg,rgba(177,217,108,0.10),rgba(21,26,23,0.9)_56%)] p-5"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-lime-200"><CalendarDays size={14} /> Weekly momentum</div><div className="mt-4 flex items-end justify-between"><div><p className="text-3xl font-semibold tracking-tight">4<span className="text-base text-white/45"> / 5</span></p><p className="mt-1 text-xs text-white/45">training sessions completed</p></div><div className="flex items-center gap-1 text-xs font-semibold text-lime-200"><ArrowUpRight size={15} /> 12%</div></div><div className="mt-4 flex items-end gap-1.5" aria-label="Weekly training activity">{[48, 80, 60, 94, 72, 24, 16].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-1.5"><span className="w-full rounded-t-md bg-lime-200/75" style={{ height: `${height}px`, opacity: index > 4 ? 0.28 : 0.82 }} /><span className="text-[9px] text-white/35">{'MTWTFSS'[index]}</span></div>)}</div></section>
          </aside>
        </div>
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] py-5 text-[11px] text-white/30"><span>Move well. Get stronger. Keep showing up.</span><span className="flex items-center gap-1.5"><Footprints size={13} /> Your progress, one session at a time</span></footer>
      </div>
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-lime-200/20 bg-[#20291c] px-4 py-3 text-sm font-medium text-lime-100 shadow-xl">{toast}</div>}
    </main>
  )
}

function Metric({ label, value, suffix, icon, trend }: { label: string; value: string; suffix: string; icon: React.ReactNode; trend: string }) {
  const positive = trend.includes('+')
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 sm:rounded-[22px] sm:p-4"><div className="flex items-center justify-between gap-1 text-white/40"><span className="truncate text-[10px] font-medium sm:text-xs">{label}</span><span className="hidden sm:block">{icon}</span></div><p className="mt-2 flex items-baseline gap-1"><span className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">{value}</span><span className="text-[10px] text-white/35">{suffix}</span></p><p className="mt-1.5 flex items-center gap-1 text-[9px] text-white/45 sm:text-[10px]">{positive ? <ArrowUpRight size={12} className="text-lime-200" /> : <BarChart3 size={11} className="text-lime-200" />}{trend}</p></div>
}
