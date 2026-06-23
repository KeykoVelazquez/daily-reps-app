import { useState, useEffect, useRef } from "react";

// ─── Theme tokens ────────────────────────────────────────────────
const DARK = {
  bg:"#0b0d10", bgDeep:"#07080a", surface1:"#17191e", surface1Top:"#1d2026",
  surface2:"#21242b", surface3:"#2b2f37",
  hairline:"rgba(255,255,255,0.07)", hairlineStrong:"rgba(255,255,255,0.12)",
  text1:"#f4f5f7", text2:"#9aa0a8", text3:"#686d75",
  controlFill:"rgba(255,255,255,0.04)", controlStroke:"rgba(255,255,255,0.10)",
  shadow1:"0 1px 2px rgba(0,0,0,0.45)", shadow2:"0 8px 20px rgba(0,0,0,0.45)",
  hi:"inset 0 1px 0 rgba(255,255,255,0.05)",
};
const LIGHT = {
  bg:"#f1f2f4", bgDeep:"#e4e6e9", surface1:"#ffffff", surface1Top:"#ffffff",
  surface2:"#eceef1", surface3:"#e0e3e7",
  hairline:"rgba(0,0,0,0.08)", hairlineStrong:"rgba(0,0,0,0.14)",
  text1:"#14161a", text2:"#5e646d", text3:"#9aa0a8",
  controlFill:"rgba(0,0,0,0.03)", controlStroke:"rgba(0,0,0,0.12)",
  shadow1:"0 1px 2px rgba(20,22,26,0.08)", shadow2:"0 8px 20px rgba(20,22,26,0.10)",
  hi:"inset 0 1px 0 rgba(255,255,255,0.6)",
};
const ACC = {
  gold:"#c9a23a", green:"#34c27b", periwinkle:"#8fa1f0",
  info:"#2e8dff", danger:"#ff5a5f",
};

// ─── Custom line icons — pixel-traced from reference PNGs ────────
function IconFlex({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 443.47 443.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M307.44,221.07c51.42,4.81,102.61,34.34,109.16,86.85,4.48,35.87-7.18,69.19-34.05,92.7-41.72,36.49-106.65,44.89-161.31,42.31-55.84-2.63-129.1-17.85-178.17-42.86-22.86-11.66-16.57-36.52-15.7-55.58l1.11-24.21c4.5-42.04,13.01-81.65,27.79-121.71,18.03-48.88,39.05-95.25,63.58-140.96C134.32,30.65,155.51.02,185.36,2.33c32.33,2.5,72.2,17.2,86.35,43.75,8.44,15.85,6.85,32.77-5.1,46.47,11.56,13.91,7.91,34.42-8.23,44.48l-51.83,25.95c-9.9,4.95-23.68.72-32.56.45-3.23,11.88-1.79,22.51-3.37,33-4.49,29.67,4.21,57.73,5.48,90.25,28.88-42.57,80.19-70.39,131.34-65.6ZM148.74,208.75l7.34-57.76c.5-3.94-.41-7.44,2.66-9.82,7.19-5.59,23.04,9.28,45.65,2.77,9.17-2.64,16.5-7.75,24.76-11.55,16.15-7.43,31.84-18.83,24.29-26.38-4.53-4.53-20.9,9.53-50.36,3.51-9.77-2-5.43,9.72-12.78,13.75-3.04,1.67-9.53,2.23-11.26-.81-5.74-10.1,4.1-26.64,1.02-57.21-.57-5.61,9.31-9.44,14.09-8.24,24.76,6.18,38.45-5.71,42.07,5.28,3.12,9.47-13.6,14.9-29.24,16.84-3.42.42-6.94,6.73-4.5,7.74,20.18,8.31,51.26-.3,54.65-16.16,1.61-7.5-.42-16.91-6.32-22.61-20.11-19.44-66.04-38.05-87.15-19.06-17.33,15.6-28.29,37.35-38.54,58.41l-6.92,14.22c-8.06,16.56-14.6,32.09-22.14,49.06-23.51,52.88-42.1,108.87-46.88,166.87l-1.76,21.35-.07,36.13c0,4.85,7.87,8.61,12.39,10.52,53.68,22.72,110.48,35.12,168.92,37.51,32.12,1.31,61.95-2.4,92.1-11.33,22.99-6.81,41.91-18.38,58.15-36.09,14.51-15.82,19.49-36.09,18.74-58.3-1.81-53.92-66.83-84.01-119.45-74.88-22.57,3.91-44.38,12-61.11,26.63-16.56,14.48-28.91,30.43-35.6,50.79-1,3.04-5.29,5.3-7.46,5.5-2.62.24-6.12-1.78-9.1-4.78-9.93,7.09-19.08,15.3-31.69,14.28,1.07-2.73,1.96-7.1,3.89-9.11,36.99-38.68,6.85-79.7,11.6-117.06Z"/>
    </svg>
  );
}

function IconSteak({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 443.47 443.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M372.4,148.78c-14.62,24.77-43.37,37.93-71.87,33.61-29.05-4.41-44.08-35.88-34.64-63.34,9.57-27.82,37.26-44.35,66.39-42.55,16.97,1.05,31.96,9.62,39.51,22.36,9.13,15.39,10.38,33.36.61,49.92ZM349.89,143.42c8.62-11.03,10.07-28.57-.39-37.68-12.89-11.22-29.75-8.97-43.41-2.41-20.12,9.66-26.38,33.32-17.66,47.31,10.57,16.96,43.75,15.44,61.46-7.22Z"/>
      <path fill={color} d="M442.28,171.5c-2.51-21.68-5.14-42.28-11.21-63.13-16.16-55.5-66.87-88.65-124.21-89.16l-12.56-.11c-56-.5-107.65,28.51-129.35,79.96-28.94,68.62-61.78,87.3-126.73,118.98C8.38,232.61-1.08,258.45.1,290.8c1.89,52.05,13.28,85.4,65.07,100.69,10.39,3.07,21.73,6.15,33.64,6.07l48.32-.32c65.42-6.27,127.35-23.82,186.06-53.43,43.79-22.08,92.89-62.47,104.91-109.43,5.38-21.01,6.6-41.92,4.18-62.87ZM342.23,313.59c-53.33,33.14-120.51,51.22-182.62,61.3l-21.99.87c-25.92,1.02-43.16,1.34-70.77-6.35-32.8-9.14-44.97-36.82-42.55-68.47,16.65,16.63,38.17,22.7,60.61,23.49,66.84,2.36,96.26-49.2,136.05-55.67l79.97-13c6.9-1.12,14.11-3.01,18.72-7.97,2.37-2.55,2.18-7.04,1.37-9.7-.95-3.11-5.68-4.41-10.2-3.78l-61.88,8.56c-17.04,2.36-33.37,4.25-50.38,11.74,0,0-.17.05-.48.15-10.28,3.34-19.83,8.6-28.21,15.42-36.11,29.4-84.77,45.54-126.93,21.44-5.2-2.97-11.01-9.41-14.28-14.32-8.61-12.95-.84-28.91,11.88-35.81l30.77-16.78c17.7-9.65,34.35-18.07,51.56-31.06l15.91-13.28c18.04-19.41,32.44-40.64,41.8-65.52,14.23-37.81,44.44-64.02,84.26-71.22,29.3-5.29,58.81-5.64,86.66,5.77,46.37,18.99,70.01,64.39,49.77,108.11-10.66,23.02-27.16,41.74-49.09,54.29-4.24,2.43-6.45,5.24-6.4,9.51.04,3.63,1.89,8.22,6.74,9.04,23,3.9,57.9-36.99,68.17-65.74,9.69,70.44-21.41,113.53-78.46,148.98Z"/>
    </svg>
  );
}

function IconFlame({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 443.47 443.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M219.31,306.49l-.8-21.69c-37.98,30.82-44.73,93.77-23.3,133.59,3.6,6.69,8.67,14.77,3.6,22.75-8.27,13-141.55-30.25-152-151.89-4.76-55.42,14.57-110.11,52.62-150.57,7.04-7.48,12.28-17.36,23.05-20.5,7.26-2.11,12.73,6.89,12.12,13.87-4.1,46.5,14.51,85.06,15.66,71.69,5.08-59.1,39.74-78.34,44.79-124.46,2.29-20.88,1.91-42.11-3.07-62.77-1.12-4.65-2.38-7.76.27-11.21,2.33-3.03,7.1-6.32,11.77-5.02,27.13,7.56,49.29,23.38,69.25,42.28,35.4,33.52,52.73,77.73,48.76,127.1l-8.32,53.69,11.94-9.16c22.07-25.88,24.42-49.5,33.67-50.24,11.49-.93,16.3,12.16,20.08,20.27,13.8,29.61,18.88,58.91,17.83,90.94-2.47,75.29-42.28,139.47-116.32,158.85-3.43.9-8.27-.36-9.45-2.3s-2.88-7.94-.63-10.46l15.31-17.13c7.78-12.31,10.42-25.94,11.08-40.47l-18.76,7.65c-17.31,7.06-52.35-31.3-59.15-64.83ZM263.86,341.45c3.81,3.49,8.38,9.17,14.6,7.3,15.99-4.8,20.43-20.62,29.76-18.04,13.62,3.76,13.21,48,1.09,72.32,40.73-28.07,62.25-72.6,65.84-120.84,2.16-28.97-.98-57.33-14.25-84.64l-6.53,12.47c-13.89,26.51-47.22,45.85-59.21,30.77-3.81-4.8-5.34-10.87-4.19-17.89l8.07-49.36.15-33.21c.2-43.74-40.17-93.77-83.77-114.27,8.05,34.51,1.46,82.76-18.7,113.03-16.53,24.83-25.01,51.27-28.39,81.09l-2.29,20.2c-.69,6.1-7.52,6.08-12.09,5.67-18.22-1.62-43.72-59.79-41.06-92.08-52.32,56.91-61.52,157.94-13.38,210.87l14.88,16.36c16.61,14.57,33.32,27.52,55.77,34.83-17.5-53.06-10.51-100.84,27.04-140.24,14.64-15.36,40.81-34.15,47.12-23.14,4.35,7.58-23.12,49.73,19.53,88.81Z"/>
    </svg>
  );
}

function IconDrop({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 443.47 443.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M278.66,432.13c-40.83,16.79-85.34,14.22-125.3-4.19-42.42-19.55-70.83-59.73-79.32-105.94-2.51-13.67-1.39-28.63-.29-42.47,2.88-36,17.87-66.91,35.52-97.83L204.03,15.66c3.29-5.77,7.22-11.38,11.8-12.58,6.52-1.7,16.31-1.31,19.81,4.82l51.16,89.57,47.48,86.61c17.67,32.24,32.47,64.87,35.81,102.03,5.79,64.44-30.96,121.16-91.43,146.03ZM305.4,386.66c53.58-47.64,49.11-115.65,16.43-174.42l-21.06-40.38L222.21,31.61l-90.21,159.18c-20.87,36.82-40.63,83.27-33.48,125.18,3.7,21.69,12.66,43.69,27.58,60.28,46.38,51.57,127.49,56.47,179.3,10.4Z"/>
      <path fill={color} d="M302.42,356.88c-18.34,22.2-41.53,26.51-46.29,14.37-1.08-2.75-1.87-9.27,1.63-11.42,37.28-17.23,51.55-58.69,35.64-96.67-2.49-5.94,1.04-13.44,5.73-15.05,15.62-5.37,22.95,20.2,24,44.96,1.01,23.9-5.45,45.35-20.7,63.81Z"/>
    </svg>
  );
}

function IconPray({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 443.47 443.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M402.77,442.17c-29.57-1.03-60.78-1.34-90.43.42-6.6.03-11.75-5.88-15.21-9.76l-15.52-17.39-61.02-61.65-66.48,67.2c-6.46,6.53-13.34,19.15-23.95,20.23-30.99,1.58-62.34,1.32-93.37.16-11.13-.85-20.29-15.1-20.29-24.82l.02-59.83c0-13.02,10.05-23.16,20.41-29.24l74.91-43.98,13.3-35.17c23.85-76.13,39.64-153.19,51-232.19,1.47-10.25,12.66-13.71,18.9-15.52,8.65-2.5,17.83,2.94,24.88,6.72,10.21-6.44,21.12-10.02,32.9-4.66,9.01,4.1,13.95,13.99,15.41,25.52,9.71,76.83,28.75,172.8,56.69,244.04,4.1,10.46,11.59,15.32,20.93,20.64l60.62,34.54c11.65,6.64,20.5,17.43,20.51,31.52l.02,55.5c0,12.48-10.62,27.66-24.22,27.72ZM208.8,213.31l-14.91-.53c-.84-4-2.31-11.59,1.38-13.32l13.34-6.26.25-160.15c.01-6.77-4.28-12.76-10.76-10.38-13.67,89.24-31.62,178.01-61.57,263.08-5.13,14.57-8.95,24.04-2.64,39.18,7.67,18.43,15.64,37.14,30.29,53.02l44.14-44.7.48-119.94ZM231.49,33.12l-1.14,160.09,16.93,5.45c4.15,1.33,4.51,13.22-.17,13.58l-14.73,1.13.66,114.22c.05,9.26,9.9,15.5,15.16,21.39,9.65,10.81,17.94,20.7,30.51,29.64,16.89-19.45,28.68-42.69,34.01-68.03,2.28-10.82-4.99-17.27-8.33-26.42-25.76-70.53-41.54-143-53.56-217.08-2.59-15.99-2.39-31.05-8.8-45.96-4.64.31-10.52,7.39-10.55,11.99ZM43.57,420.85c1.03,1.24,2.14,2.75,4.58,2.73l74.96-.7,25.67-27.58c-19.61-23.13-37.24-54.4-40.98-84.1l-56.19,33.21c-4.92,2.91-11.52,7.81-11.6,14.19l-.64,49.68c-.07,5.23,1.07,8.81,4.2,12.57ZM316.88,420.54c.92,1.08,1.6,3.29,4.46,3.23l75.62-1.79c3.51-.08,6.98-8.39,6.9-11.52l-1.25-53.61c-.22-9.59-14.44-14.3-21.84-18.59l-45.19-26.18c-6.67,30.66-19.69,59.2-40.53,82.78l21.82,25.68Z"/>
    </svg>
  );
}

function HabitIcon({ habit, size=20, color="currentColor" }) {
  if (habit === "workout")   return <IconFlex  size={size} color={color} />;
  if (habit === "protein")   return <IconSteak size={size} color={color} />;
  if (habit === "calories")  return <IconFlame size={size} color={color} />;
  if (habit === "water")     return <IconDrop  size={size} color={color} />;
  if (habit === "gratitude") return <IconPray  size={size} color={color} />;
  return null;
}

// ─── Workout schedule ────────────────────────────────────────────
const SCHED = {
  Monday:    { focus:"Arms & Chest", tag:"PUSH",  color:"#c9a23a", exercises:[
    { name:"Kneeling Push-Ups",       sets:3, reps:"10–12", tip:"Build clean form first" },
    { name:"Chair Dips",              sets:3, reps:"8–10",  tip:"Feet closer = easier" },
    { name:"Incline Push-Ups",        sets:3, reps:"10–15", tip:"Hands on counter or couch" },
    { name:"Backpack Bicep Curls",    sets:3, reps:"10–12", tip:"Fill pack with books" },
    { name:"Resistance Band Curls",   sets:2, reps:"12–15", tip:"Slow squeeze at top" },
  ]},
  Tuesday:   { focus:"Legs",         tag:"LOWER", color:"#8fa1f0", exercises:[
    { name:"Bodyweight Squats",       sets:3, reps:"15–20", tip:"Full depth, chest up" },
    { name:"Reverse Lunges",          sets:3, reps:"10/leg",tip:"Step back, knee near floor" },
    { name:"Glute Bridges",           sets:3, reps:"15",    tip:"Squeeze hard at top" },
    { name:"Step-Ups",                sets:3, reps:"10/leg",tip:"Stairs or sturdy chair" },
    { name:"Calf Raises",             sets:3, reps:"20",    tip:"Slow & controlled" },
  ]},
  Wednesday: { focus:"Rest Day",     tag:"REST",  color:"#686d75", exercises:[] },
  Thursday:  { focus:"Abs & Core",   tag:"CORE",  color:"#2e8dff", exercises:[
    { name:"Dead Bugs",               sets:3, reps:"8/side", tip:"Lower back flat" },
    { name:"Crunches",                sets:3, reps:"15–20",  tip:"Exhale at top" },
    { name:"Leg Raises",              sets:3, reps:"10–12",  tip:"Legs straight" },
    { name:"Plank",                   sets:3, reps:"25–30s", tip:"Hips level" },
    { name:"Penguins",                sets:2, reps:"20",     tip:"Side-to-side reach" },
  ]},
  Friday:    { focus:"Back",         tag:"PULL",  color:"#34c27b", exercises:[
    { name:"Supermans",               sets:3, reps:"10–12",  tip:"Hold 2s at top" },
    { name:"Backpack Bent-Over Rows", sets:3, reps:"10–12",  tip:"Hinge at hips" },
    { name:"Reverse Snow Angels",     sets:3, reps:"10",     tip:"Squeeze shoulder blades" },
    { name:"Doorway Isometric Pulls", sets:3, reps:"10–12",  tip:"Lean back, pull" },
    { name:"Pull-Up Negatives",       sets:2, reps:"5",      tip:"Lower slowly 3–5s" },
  ]},
  Saturday:  { focus:"Full Body",    tag:"TOTAL", color:"#e89a3c", exercises:[
    { name:"Kneeling Push-Ups",       sets:2, reps:"10",    tip:"Focus on form" },
    { name:"Bodyweight Squats",       sets:2, reps:"15",    tip:"Full depth" },
    { name:"Glute Bridges",           sets:2, reps:"12",    tip:"Squeeze at top" },
    { name:"Dead Bugs",               sets:2, reps:"8/side",tip:"Slow & deliberate" },
    { name:"Doorway Isometric Pulls", sets:2, reps:"10",    tip:"Back activation" },
  ]},
  Sunday:    { focus:"Rest Day",     tag:"REST",  color:"#686d75", exercises:[] },
};
const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ─── Storage ─────────────────────────────────────────────────────
const _m = {};
const ss = {
  get(k, fb) {
    if (_m[k] !== undefined) return _m[k];
    try {
      // Try localStorage first (persists across sessions), fallback to sessionStorage
      const v = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (v) { _m[k] = JSON.parse(v); return _m[k]; }
    } catch {}
    return fb;
  },
  set(k, v) {
    _m[k] = v;
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
  del(k) { delete _m[k]; try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch {} },
};
const todayStr  = () => new Date().toISOString().split("T")[0];
const todayName = () => ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];

// ─── SlimInput ───────────────────────────────────────────────────
function SlimInput({ value, onChange, color, t }) {
  const [ed, setEd] = useState(false);
  const [draft, setDraft] = useState("");
  const debounce = useRef(null);
  const commit = () => {
    if (debounce.current) clearTimeout(debounce.current);
    const n = parseInt(draft, 10);
    if (!isNaN(n)) onChange(Math.max(0, n));
    setEd(false);
  };
  const onDraftChange = (val) => {
    setDraft(val);
    if (debounce.current) clearTimeout(debounce.current);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0) debounce.current = setTimeout(() => onChange(Math.max(0, n)), 500);
  };
  const base = { flex:1, height:40, textAlign:"center", fontSize:22, fontWeight:700,
    color:t.text1, borderRadius:12, minWidth:0, fontFamily:"inherit" };
  return ed
    ? <input autoFocus type="number" value={draft}
        onChange={e => onDraftChange(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") { if (debounce.current) clearTimeout(debounce.current); setEd(false); } }}
        style={{ ...base, background:t.surface3, border:`1.5px solid ${color}`, outline:"none", padding:"0 8px" }} />
    : <button onClick={() => { setDraft(String(value)); setEd(true); }}
        style={{ ...base, background:t.surface2, border:`1.5px dashed ${t.controlStroke}`, cursor:"pointer", touchAction:"manipulation" }}>
        {value.toLocaleString()}
      </button>;
}

// ─── LogCard — display + slim stepper in one ────────────────────
function LogCard({ label, habitKey, val, set, max, suffix, step, color, max2, done, hint, t, n }) {
  const left = Math.max(0, max - val);
  const pct  = Math.min(val / max, 1);
  const card = {
    borderRadius:20, overflow:"hidden", marginBottom:10,
    background: done
      ? ("linear-gradient(180deg," + color + "14," + color + "08)")
      : ("linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")"),
    border: "1px solid " + (done ? color : t.hairline),
    boxShadow: t.shadow1 + ", " + t.hi,
  };
  return (
    <div style={card}>
      <div style={{ padding:"16px 16px 12px" }}>
        {n && <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>Habit {n}</div>}
        <div style={{ fontSize:13, fontWeight:600, color:t.text2, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}><HabitIcon habit={habitKey} size={16} color={color} />{label}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontSize:26, fontWeight:700, letterSpacing:"-0.02em", color: done ? color : t.text1 }}>{val.toLocaleString()}</span>
            <span style={{ fontSize:14, color:t.text3 }}>{suffix}</span>
            <span style={{ fontSize:14, color:t.text3 }}>/ {max.toLocaleString()}</span>
          </div>
          <div>
            <span style={{ fontSize:16, fontWeight:700, color: done ? color : t.text1 }}>{done ? "✓" : left.toLocaleString()}</span>
            <span style={{ fontSize:13, color:t.text3, marginLeft:4 }}>{done ? " goal hit" : "left"}</span>
          </div>
        </div>
        <div style={{ marginTop:10, height:6, borderRadius:999, background:t.hairline, overflow:"hidden" }}>
          <div style={{ height:"100%", width:(pct * 100) + "%", background: done ? color : color, borderRadius:999, transition:"width 0.4s ease" }} />
        </div>

      </div>
      <div style={{ height:1, background:t.hairline }} />
      <div style={{ padding:"10px 16px 14px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={() => set(v => Math.max(0, v - step))}
          style={{ width:40, height:40, borderRadius:12, border:"1px solid " + t.controlStroke,
            background:t.surface2, fontSize:20, fontWeight:600, color:t.text2,
            cursor:"pointer", touchAction:"manipulation", flexShrink:0, fontFamily:"inherit",
            boxShadow:t.hi }}>−</button>
        <SlimInput value={val} onChange={v => set(max2 ? Math.min(max2, v) : v)} color={color} t={t} />
        <button onClick={() => set(v => max2 ? Math.min(max2, v + step) : v + step)}
          style={{ width:40, height:40, borderRadius:12, border:"none",
            background:color, fontSize:20, fontWeight:600, color:t.bgDeep,
            cursor:"pointer", touchAction:"manipulation", flexShrink:0, fontFamily:"inherit" }}>+</button>
      </div>
    </div>
  );
}

// ─── ReadCard — display only (Today dashboard) ───────────────────
function ReadCard({ label, habitKey, val, max, suffix, color, done, t }) {
  const left = Math.max(0, max - val);
  const pct  = Math.min(val / max, 1);
  return (
    <div style={{ borderRadius:20, padding:"16px 16px 14px", marginBottom:10,
      background: "linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
      border: "1px solid " + (done ? color : t.hairline),
      boxShadow: t.shadow1 + ", " + t.hi }}>
      <div style={{ fontSize:13, fontWeight:600, color:t.text2, marginBottom:10 }}>{label}</div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
          <span style={{ fontSize:26, fontWeight:700, letterSpacing:"-0.02em", color: done ? color : t.text1 }}>{val.toLocaleString()}</span>
          <span style={{ fontSize:14, color:t.text3 }}>{suffix}</span>
          <span style={{ fontSize:14, color:t.text3 }}>/ {max.toLocaleString()}</span>
          <span style={{ display:"flex", alignItems:"center", marginLeft:2 }}>
            <HabitIcon habit={habitKey} size={18} color={color} />
          </span>
        </div>
        <div>
          <span style={{ fontSize:16, fontWeight:700, color: done ? color : t.text1 }}>{done ? "✓" : left.toLocaleString()}</span>
          <span style={{ fontSize:13, color:t.text3, marginLeft:4 }}>{done ? " goal hit" : "left"}</span>
        </div>
      </div>
      <div style={{ marginTop:10, height:6, borderRadius:999, background:t.hairline, overflow:"hidden" }}>
        <div style={{ height:"100%", width:(pct * 100) + "%", background: done ? ACC.green : color, borderRadius:999, transition:"width 0.4s ease" }} />
      </div>
    </div>
  );
}

// ─── HabitCard — workout / gratitude ────────────────────────────
function HabitCard({ n, icon, label, done, color, desc, action, t, children }) {
  return (
    <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
      background: done ? ("linear-gradient(180deg," + color + "14," + color + "08)") : ("linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")"),
      border: "1px solid " + (done ? color : t.hairline),
      boxShadow: t.shadow1 + ", " + t.hi }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
        <div style={{ width:42, height:42, borderRadius:"50%", flexShrink:0,
          background: done ? color : t.surface3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
          {done ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.bgDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : icon}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Habit {n}</div>
          <div style={{ fontSize:17, fontWeight:700, color: done ? color : t.text1 }}>{label}</div>
        </div>
        <div style={{ width:28, height:28, borderRadius:8, background: done ? color : t.surface2,
          border: "1px solid " + (done ? color : t.controlStroke), display:"flex", alignItems:"center", justifyContent:"center" }}>
          {done && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={t.bgDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
      </div>
      {desc && <div style={{ fontSize:13, color:t.text3, lineHeight:1.6, padding:"10px 12px",
        borderRadius:12, background:t.controlFill, border:"1px solid " + t.hairline, marginBottom:12 }}>{desc}</div>}
      {children}
      {action && <button onClick={action.fn} style={{ width:"100%", padding:"12px", borderRadius:14,
        border:"1px solid " + t.controlStroke, background:t.surface2, color:t.text1,
        fontSize:14, fontWeight:600, cursor:"pointer", touchAction:"manipulation", fontFamily:"inherit",
        boxShadow:t.shadow1 + ", " + t.hi }}>{action.label}</button>}
    </div>
  );
}

// ─── ExRow ───────────────────────────────────────────────────────
function ExRow({ ex, done, onToggle, color, t }) {
  const doneColor = ACC.green;
  return (
    <button onClick={onToggle} style={{ display:"flex", alignItems:"flex-start", gap:12, width:"100%",
      padding:"13px", borderRadius:14, border:"none", cursor:"pointer",
      background: done ? (doneColor + "18") : t.surface2,
      outline: "1.5px solid " + (done ? doneColor : t.hairline),
      transition:"all 0.15s", marginBottom:8, touchAction:"manipulation" }}>
      <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, marginTop:1,
        background: done ? doneColor : t.surface3, display:"flex", alignItems:"center", justifyContent:"center",
        color: done ? t.bgDeep : t.text3 }}>
        {done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      <div style={{ flex:1, textAlign:"left" }}>
        <div style={{ fontSize:14, fontWeight:600, color:t.text1, textDecoration: done ? "line-through" : "none", opacity: done ? 0.5 : 1 }}>{ex.name}</div>
        <div style={{ fontSize:12, color:t.text3, marginTop:2 }}>{ex.sets} sets × {ex.reps}</div>
        <div style={{ fontSize:11, color:t.text3, marginTop:1, fontStyle:"italic" }}>{ex.tip}</div>
      </div>
    </button>
  );
}


// ═══════════════════════════════════════════════════════════════
// ONBOARDING — matches Figma mdsEQ5Tax5FjMxGd3t5y54
// ═══════════════════════════════════════════════════════════════
const OB_BG      = "#f7f7fb";
const OB_INK     = "#1a1a1e";
const OB_MUTED   = "rgba(26,26,30,0.32)";
const OB_DIV     = "rgba(26,26,30,0.12)";
const OB_BTN_OFF = "#b7b7bb";
const OB_GOLD    = "#c9a23a";
const OB_FONT    = "-apple-system, BlinkMacSystemFont, \'SF Pro Display\', system-ui, sans-serif";
const WATER_OPTS = [
  { oz:64,  label:"1/2 gal \u00b7 64oz"  },
  { oz:96,  label:"3/4 gal \u00b7 96oz"  },
  { oz:128, label:"1 gal \u00b7 128oz \u2713" },
  { oz:160, label:"1.5 gal \u00b7 160oz" },
];
const OB_DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function ObPill({ total, current }) {
  const segW = Math.floor((118 - (total - 1) * 4) / total);
  return (
    <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)",
      width:130, height:34, borderRadius:17, background:OB_INK,
      display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width:segW, height:4, borderRadius:999,
          background: i <= current ? "#ffffff" : "rgba(255,255,255,0.25)",
          transition:"background 0.25s" }} />
      ))}
    </div>
  );
}

function ObBack({ onBack }) {
  return (
    <button onClick={onBack} style={{ position:"absolute", top:55, left:18,
      width:39, height:39, background:"none", border:"none",
      cursor:"pointer", touchAction:"manipulation", padding:0,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={OB_INK}
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
  );
}

function ObCta({ label, active, onClick }) {
  return (
    <div style={{ position:"absolute", bottom:60, left:18, right:18 }}>
      <button onClick={active ? onClick : undefined} style={{ width:"100%", height:50,
        borderRadius:6, border:"none",
        background: active ? OB_INK : OB_BTN_OFF,
        color:"#ffffff", fontSize:18, fontWeight:700,
        fontFamily:OB_FONT, cursor: active ? "pointer" : "default",
        touchAction:"manipulation", transition:"background 0.2s" }}>
        {label}
      </button>
    </div>
  );
}

function ObUnderline({ value, onChange, placeholder, type="text" }) {
  return (
    <div style={{ width:259, margin:"0 auto" }}>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width:"100%", background:"none", border:"none", outline:"none",
          fontSize:26, fontWeight:500, fontFamily:OB_FONT, paddingBottom:8,
          textAlign:"center", color: value ? OB_INK : OB_MUTED }} />
      <div style={{ height:1, background:OB_INK }} />
    </div>
  );
}

function ObSelectList({ opts, selected, onSelect, getKey, getLabel }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {opts.map(opt => {
        const key = getKey(opt);
        const sel = Array.isArray(selected) ? selected.includes(key) : selected === key;
        return (
          <button key={key} onClick={() => onSelect(opt)} style={{ width:"100%", height:54,
            borderRadius:12, border: sel ? "1px solid #2e8dff" : "1px solid " + OB_DIV,
            background: sel ? "#2e8dff14" : "#ffffff", color: sel ? "#2e8dff" : OB_INK,
            fontSize:16, fontWeight:600, fontFamily:OB_FONT,
            cursor:"pointer", touchAction:"manipulation",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0 16px", boxShadow: sel ? "none" : "0 1px 3px rgba(26,26,30,0.08)" }}>
            <span>{getLabel(opt)}</span>
            <div style={{ width:17, height:17, borderRadius:4, flexShrink:0,
              border: sel ? "none" : "1.5px solid " + OB_DIV,
              background: sel ? "#2e8dff" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              {sel && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ObS0({ onNext }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={0} />
      <div style={{ position:"absolute", top:317, left:"50%", transform:"translateX(-50%)",
        width:334, textAlign:"center" }}>
        <div style={{ fontSize:30, fontWeight:700, color:OB_INK, marginBottom:12,
          fontFamily:OB_FONT, letterSpacing:"-0.02em" }}>Daily Reps</div>
        <div style={{ fontSize:16, fontWeight:500, color:OB_INK, opacity:0.75,
          lineHeight:1.65, fontFamily:OB_FONT }}>
          "We are what we repeatedly do. Take control, build strength, discipline, and habits that make you your best for yourself and your family."
        </div>
      </div>
      <ObCta label="Get Started" active={true} onClick={onNext} />
    </div>
  );
}

function ObS1({ onNext, onBack }) {
  const features = [
    { t:"Workout / Movement",        s:"Plan out your workouts and time each session." },
    { t:"Daily Protein",             s:"Set and track your daily protein goal." },
    { t:"Personal Calorie Range",    s:"Set and track your personal calorie intake." },
    { t:"Drink Your Water",          s:"Set target and track your daily consumption." },
    { t:"5 Things You’re Grateful For", s:"Write down the 5 things you’re grateful for." },
    { t:"100-Day Tracker",           s:"Mark each day as you complete the day." },
  ];
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG,
      display:"flex", flexDirection:"column" }}>
      <ObPill total={9} current={1} />
      <ObBack onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch",
        padding:"80px 28px 130px" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:22, fontWeight:600, color:OB_INK, lineHeight:1.3,
            marginBottom:8, fontFamily:OB_FONT }}>
            100 Days. 5 Daily Habits. One New You.
          </div>
          <div style={{ fontSize:15, color:OB_INK, opacity:0.65, lineHeight:1.5, fontFamily:OB_FONT }}>
            This app is meant to help you keep track of your progress during your 100 days.
          </div>
        </div>
        {features.map((f, i) => (
          <div key={i} style={{ borderRadius:14, padding:"14px", background:"#ffffff",
            boxShadow:"0 2px 2px rgba(0,0,0,0.08)", marginBottom:6, height:69,
            display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ fontSize:14, fontWeight:700, color:OB_INK, marginBottom:2, fontFamily:OB_FONT }}>{f.t}</div>
            <div style={{ fontSize:13, color:"rgba(26,26,30,0.7)", fontFamily:OB_FONT, lineHeight:1.4 }}>{f.s}</div>
          </div>
        ))}
      </div>
      <ObCta label="Continue" active={true} onClick={onNext} />
    </div>
  );
}

function ObS2({ data, set, onNext, onBack }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={2} />
      <ObBack onBack={onBack} />
      <div style={{ position:"absolute", top:314, left:28, right:28, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Tell Us About Yourself</div>
        <div style={{ fontSize:16, fontWeight:500, color:OB_INK, opacity:0.7, fontFamily:OB_FONT }}>What is your name?</div>
      </div>
      <div style={{ position:"absolute", top:420, left:0, right:0 }}>
        <ObUnderline value={data.name} onChange={v => set({ ...data, name:v })} placeholder="Your name" />
      </div>
      <ObCta label="Continue" active={data.name.trim().length > 0} onClick={onNext} />
    </div>
  );
}

function ObS3({ data, set, onNext, onBack }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={3} />
      <ObBack onBack={onBack} />
      <div style={{ position:"absolute", top:314, left:28, right:28, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Set Your Start Date</div>
        <div style={{ fontSize:16, fontWeight:500, color:OB_INK, opacity:0.7, fontFamily:OB_FONT }}>When did you start?</div>
      </div>
      <div style={{ position:"absolute", top:380, left:0, right:0 }}>
        <div style={{ width:280, margin:"0 auto", position:"relative" }}>
          <div style={{ fontSize:26, fontWeight:500, fontFamily:OB_FONT, paddingBottom:8,
            textAlign:"center", color: data.startDate ? OB_INK : OB_MUTED, pointerEvents:"none" }}>
            {data.startDate ? new Date(data.startDate + "T00:00:00").toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "Select a date"}
          </div>
          <div style={{ height:1, background:OB_INK, marginBottom:0 }} />
          <input type="date" value={data.startDate}
            onChange={e => set({ ...data, startDate:e.target.value })}
            style={{ position:"absolute", inset:0, opacity:0, width:"100%", height:"100%",
              cursor:"pointer" }} />
        </div>
        <div style={{ textAlign:"center", marginTop:12 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6,
            fontSize:13, color:OB_INK, opacity:0.5, fontFamily:OB_FONT }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Tap to open calendar
          </div>
        </div>
      </div>
      <ObCta label="Continue" active={!!data.startDate} onClick={onNext} />
    </div>
  );
}

function ObS4({ data, set, onNext, onBack }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={4} />
      <ObBack onBack={onBack} />
      <div style={{ position:"absolute", top:314, left:28, right:28, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Set Your Goals</div>
        <div style={{ fontSize:15, fontWeight:500, color:OB_INK, opacity:0.7, lineHeight:1.5, fontFamily:OB_FONT }}>
          What is your Protein Goal?{" "}1g per pound of TARGET body weight recommended.
        </div>
      </div>
      <div style={{ position:"absolute", top:450, left:0, right:0 }}>
        <ObUnderline value={data.protein ? String(data.protein) : ""} type="number"
          onChange={v => set({ ...data, protein: parseInt(v)||0 })} placeholder="grams" />
      </div>
      <ObCta label="Continue" active={data.protein > 0} onClick={onNext} />
    </div>
  );
}

function ObS5({ data, set, onNext, onBack }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={5} />
      <ObBack onBack={onBack} />
      <div style={{ position:"absolute", top:314, left:28, right:28, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Set Your Goals</div>
        <div style={{ fontSize:15, fontWeight:500, color:OB_INK, opacity:0.7, lineHeight:1.5, fontFamily:OB_FONT }}>
          What is your Calories Goal?{" "}Be intentional, not perfect.
        </div>
      </div>
      <div style={{ position:"absolute", top:450, left:0, right:0 }}>
        <ObUnderline value={data.calories ? String(data.calories) : ""} type="number"
          onChange={v => set({ ...data, calories: parseInt(v)||0 })} placeholder="cal" />
      </div>
      <ObCta label="Continue" active={data.calories > 0} onClick={onNext} />
    </div>
  );
}

function ObS6({ data, set, onNext, onBack }) {
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG }}>
      <ObPill total={9} current={6} />
      <ObBack onBack={onBack} />
      <div style={{ position:"absolute", top:249, left:28, right:28 }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Set Your Goals</div>
          <div style={{ fontSize:15, fontWeight:500, color:OB_INK, opacity:0.7, lineHeight:1.5, fontFamily:OB_FONT }}>
            What is your Water Goal?{" "}1 gallon or more recommended.
          </div>
        </div>
        <ObSelectList opts={WATER_OPTS} selected={data.waterOz}
          onSelect={opt => set({ ...data, waterOz: opt.oz })}
          getKey={opt => opt.oz} getLabel={opt => opt.label} />
      </div>
      <ObCta label="Continue" active={data.waterOz > 0} onClick={onNext} />
    </div>
  );
}

function ObS7({ data, set, onNext, onBack }) {
  const toggle = (day) => {
    const cur = data.restDays;
    set({ ...data, restDays: cur.includes(day) ? cur.filter(d => d !== day) : [...cur, day] });
  };
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG,
      display:"flex", flexDirection:"column" }}>
      <ObPill total={9} current={7} />
      <ObBack onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"80px 28px 130px" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:22, fontWeight:600, color:OB_INK, marginBottom:8, fontFamily:OB_FONT }}>Set Rest Days</div>
          <div style={{ fontSize:15, fontWeight:500, color:OB_INK, opacity:0.65, lineHeight:1.6, fontFamily:OB_FONT }}>
            The challenge was built around workouts 5 days a week. Rest days don’t mean you’re sedentary — still move your body.
          </div>
        </div>
        <ObSelectList opts={OB_DAYS} selected={data.restDays}
          onSelect={day => toggle(day)} getKey={d => d} getLabel={d => d} />
      </div>
      <ObCta label="Continue" active={true} onClick={onNext} />
    </div>
  );
}

function ObS8({ data, onFinish, onBack }) {
  const waterLabel = WATER_OPTS.find(o => o.oz === data.waterOz)?.label || data.waterOz + "oz";
  const startDisplay = data.startDate
    ? new Date(data.startDate + "T00:00:00").toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })
    : "\u2014";
  const rows = [
    { label:"Name",         val: data.name },
    { label:"Start Date",   val: startDisplay },
    { label:"Protein Goal", val: data.protein + "g" },
    { label:"Calorie Goal", val: data.calories.toLocaleString() },
    { label:"Water Goal",   val: waterLabel },
  ];
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:OB_BG,
      display:"flex", flexDirection:"column" }}>
      <ObPill total={9} current={8} />
      <ObBack onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"80px 28px 130px" }}>
        <div style={{ fontSize:18, fontWeight:600, color:OB_INK, lineHeight:1.6,
          marginBottom:20, fontFamily:OB_FONT, padding:"0 18px" }}>
          We are in this together.<br/>God bless,
        </div>
        <div style={{ borderRadius:16, background:"#ffffff", border:"1px solid " + OB_DIV,
          padding:"8px 16px", marginBottom:12 }}>
          {rows.map((row, i) => (
            <div key={row.label}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"10px 0", fontFamily:OB_FONT }}>
                <span style={{ fontSize:14, fontWeight:500, color:OB_INK, opacity:0.6 }}>{row.label}</span>
                <span style={{ fontSize:14, fontWeight:600, color:OB_INK }}>{row.val}</span>
              </div>
              {i < rows.length - 1 && <div style={{ height:1, background:OB_DIV }} />}
            </div>
          ))}
        </div>
        <div style={{ borderRadius:16, background:"#ffffff", border:"1px solid " + OB_DIV, padding:"14px" }}>
          <div style={{ fontSize:14, fontWeight:500, color:OB_INK, lineHeight:1.7,
            fontFamily:OB_FONT, fontStyle:"italic", opacity:0.8 }}>
            "You are not just a goal setter. You are a goal getter. Become the person first. The results will follow."
          </div>
        </div>
      </div>
      <ObCta label="Start" active={true} onClick={onFinish} />
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState({
    name:"", startDate: new Date().toISOString().split("T")[0],
    protein:0, calories:0, waterOz:128, restDays:[],
  });
  const next   = () => setScreen(s => s + 1);
  const back   = () => setScreen(s => Math.max(0, s - 1));
  const finish = () => {
    try { localStorage.setItem("dr_profile", JSON.stringify(data)); } catch {}
    onComplete(data);
  };
  const screens = [
    <ObS0 onNext={next} />,
    <ObS1 onNext={next} onBack={back} />,
    <ObS2 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS3 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS4 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS5 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS6 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS7 data={data} set={setData} onNext={next} onBack={back} />,
    <ObS8 data={data} onFinish={finish} onBack={back} />,
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, fontFamily:OB_FONT,
      WebkitFontSmoothing:"antialiased" }}>
      <div style={{ maxWidth:430, margin:"0 auto", height:"100%", position:"relative", overflow:"hidden" }}>
        {screens[screen]}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [tab,      setTab]      = useState("today");
  const [isDark,   setIsDark]   = useState(() => ss.get("theme", false));
  const t = { ...(isDark ? DARK : LIGHT), ...ACC, bgDeep: isDark ? DARK.bgDeep : LIGHT.bgDeep };

  // ── Onboarding profile ───────────────────────────────────────
  const [profile, setProfile] = useState(() => {
    try { const p = localStorage.getItem("dr_profile"); return p ? JSON.parse(p) : null; } catch { return null; }
  });

  // ── Workout Timer ────────────────────────────────────────────
  const timerRef                  = useRef(null);
  const stripRef                  = useRef(null);
  const [wtRunning, setWtRunning] = useState(false);
  const [wtSecs,    setWtSecs]    = useState(0);
  const [wtDone,    setWtDone]    = useState(false);

  useEffect(() => ss.set("theme", isDark), [isDark]);

  const KEY = todayStr();
  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  // viewDate drives what day all tabs show — defaults to today
  const [viewDate, setViewDate] = useState(KEY);

  const [goalCal, setGoalCal] = useState(() => ss.get("goalCal", 2500));
  const [goalPro, setGoalPro] = useState(() => ss.get("goalPro", 185));
  const [goalWat, setGoalWat] = useState(() => ss.get("goalWat", 128));
  const CAL = goalCal, PRO = goalPro, WAT = goalWat;

  const [customSched,      setCustomSched]      = useState(() => ss.get("customSched", {}));
  const [repeatRestDays,   setRepeatRestDays]   = useState(() => ss.get("repeatRestDays", ["Wednesday","Sunday"]));
  const [oneTimeOverrides, setOneTimeOverrides] = useState(() => ss.get("oneTimeOverrides", {}));
  // oneTimeOverrides: { "2026-06-05": "rest" | "workout" }

  const isRestDay = (dayName, dateStr) => {
    // One-time override for this specific date takes priority
    if (oneTimeOverrides[dateStr] === "rest")    return true;
    if (oneTimeOverrides[dateStr] === "workout") return false;
    // Repeating rest day schedule
    return repeatRestDays.includes(dayName);
  };

  useEffect(() => ss.set("repeatRestDays",   repeatRestDays),   [repeatRestDays]);
  useEffect(() => ss.set("oneTimeOverrides", oneTimeOverrides), [oneTimeOverrides]);

  const getSched = (day, dateStr) => {
    const base    = SCHED[day];
    const rest    = isRestDay(day, dateStr || dateStrFor(day));
    // If marked as workout but base has no exercises, use customSched or empty placeholder
    const exercises = rest ? [] : (customSched[day] || base.exercises.length > 0 ? (customSched[day] || base.exercises) : []);
    const focus   = customSched[day + "_focus"] || (rest ? "Rest Day" : base.focus);
    const tag     = customSched[day + "_tag"]   || (rest ? "REST"     : base.tag);
    const color   = rest ? "#686d75" : base.color;
    return { ...base, focus, tag, color, exercises };
  };

  const [cal,  setCal]  = useState(() => ss.get("cal-"  + KEY, 0));
  const [pro,  setPro]  = useState(() => ss.get("pro-"  + KEY, 0));
  const [wat,  setWat]  = useState(() => ss.get("wat-"  + KEY, 0));
  const [grat, setGrat] = useState(() => ss.get("grat-" + KEY, false));
  const [exDone,   setExDone]   = useState(() => ss.get("ex-"   + KEY, {}));
  const [restDone, setRestDone] = useState(() => ss.get("rest-" + KEY, false));

  // Detect day change and reload daily values from storage
  const [lastKey, setLastKey] = useState(KEY);
  useEffect(() => {
    const currentKey = todayStr();
    if (currentKey !== lastKey) {
      setLastKey(currentKey);
      setCal(ss.get("cal-"  + currentKey, 0));
      setPro(ss.get("pro-"  + currentKey, 0));
      setWat(ss.get("wat-"  + currentKey, 0));
      setGrat(ss.get("grat-" + currentKey, false));
      setExDone(ss.get("ex-" + currentKey, {}));
      setRestDone(ss.get("rest-" + currentKey, false));
    }
    // Check every 60 seconds
    const interval = setInterval(() => {
      const k = todayStr();
      if (k !== lastKey) {
        setLastKey(k);
        setCal(ss.get("cal-"  + k, 0));
        setPro(ss.get("pro-"  + k, 0));
        setWat(ss.get("wat-"  + k, 0));
        setGrat(ss.get("grat-" + k, false));
        setExDone(ss.get("ex-" + k, {}));
        setRestDone(ss.get("rest-" + k, false));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastKey]);

  // Per-day log storage keyed by date string
  const dateStrFor = (dayName) => {
    const today = new Date();
    const todayIdx = today.getDay();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const targetIdx = days.indexOf(dayName);
    const diff = targetIdx - todayIdx;
    // Find the most recent occurrence (<=0 days ago)
    const offset = diff > 0 ? diff - 7 : diff;
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  const viewKey = viewDate; // viewDate is the single source of truth
  const [viewExDone,   setViewExDone]   = useState(() => ss.get("ex-"   + viewKey, {}));
  const [viewRestDone, setViewRestDone] = useState(() => ss.get("rest-" + viewKey, false));

  // Reload view exercise/rest state when viewDate changes
  useEffect(() => {
    setViewExDone(ss.get("ex-"   + viewDate, {}));
    setViewRestDone(ss.get("rest-" + viewDate, false));
  }, [viewDate]);

  const toggleViewEx = (name) => {
    const updated = { ...viewExDone, [name]: !viewExDone[name] };
    setViewExDone(updated);
    ss.set("ex-" + viewDate, updated);
    if (isViewingToday) setExDone(updated);
  };

  const toggleViewRest = () => {
    const updated = !viewRestDone;
    setViewRestDone(updated);
    ss.set("rest-" + viewDate, updated);
    if (isViewingToday) setRestDone(updated);
  };
  const [days100, setDays100] = useState(() => {
    const saved = ss.get("d100", null);
    const base  = {};
    for (let i = 1; i <= 18; i++) base[i] = 5;
    return saved ? { ...base, ...saved } : base;
  });
  // Challenge start date — persisted. Defaults to 19 days ago so day = 19 on first load.
  const [challengeStart] = useState(() => {
    const saved = ss.get("challengeStart", null) || profile?.startDate || null;
    if (saved) return saved;
    // No start date saved yet — default to 19 days ago (day 19) but DON'T persist it
    // so the user can set the real date via the edit drawer
    const d = new Date();
    d.setDate(d.getDate() - 18);
    return d.toISOString().split("T")[0];
  });

  const curDay = (() => {
    const start = new Date(challengeStart + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - start) / 86400000) + 1;
    return Math.min(Math.max(diff, 1), 100);
  })();
  const [phase, setPhase] = useState(() => ss.get("phase", 1));
  const [journal, setJournal] = useState(() => ss.get("journal", {}));
  const [journalDraft, setJournalDraft] = useState(() => ss.get("journal", {})[KEY] || "");

  useEffect(() => ss.set("goalCal",      goalCal),  [goalCal]);
  useEffect(() => ss.set("goalPro",      goalPro),  [goalPro]);
  useEffect(() => ss.set("goalWat",      goalWat),  [goalWat]);
  useEffect(() => ss.set("customSched",  customSched), [customSched]);
  useEffect(() => ss.set("cal-"  + KEY, cal),      [cal]);
  useEffect(() => ss.set("pro-"  + KEY, pro),      [pro]);
  useEffect(() => ss.set("wat-"  + KEY, wat),      [wat]);
  useEffect(() => ss.set("grat-" + KEY, grat),     [grat]);
  useEffect(() => ss.set("ex-"   + KEY, exDone),   [exDone]);
  useEffect(() => ss.set("rest-" + KEY, restDone), [restDone]);
  useEffect(() => ss.set("d100",        days100),  [days100]);
  useEffect(() => ss.set("journal",     journal),  [journal]);
  useEffect(() => ss.set("phase",        phase),    [phase]);
  useEffect(() => { ss.set("wt-"     + viewDate, wtSecs); }, [wtSecs, viewDate]);
  useEffect(() => { ss.set("wtDone-" + viewDate, wtDone); }, [wtDone, viewDate]);
  useEffect(() => {
    if (wtRunning) {
      timerRef.current = setInterval(() => setWtSecs(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [wtRunning]);

  // Load timer state for the viewed date
  useEffect(() => {
    setWtRunning(false);
    clearInterval(timerRef.current);
    setWtSecs(ss.get("wt-"     + viewDate, 0));
    setWtDone(ss.get("wtDone-" + viewDate, false));
  }, [viewDate]);

  // Auto-scroll day strip to center today's pill
  useEffect(() => {
    if (!stripRef.current) return;
    const container = stripRef.current;
    // Each day cell is 38px wide + 6px gap = 44px. Today pill is 48px wide.
    // Offset = sum of previous cells + padding
    const cellW = 44;
    const todayW = 54;
    const offset = (curDay - 1) * cellW + 20; // 20px left padding
    const center = offset - (container.clientWidth / 2) + (todayW / 2);
    container.scrollLeft = Math.max(0, center);
  }, [curDay]);


  // ── Edit modal state (all at top level — no hooks in callbacks) ──
  const [showEdit,     setShowEdit]     = useState(false);
  const [editDay,      setEditDay]      = useState(null);
  const [exList,       setExList]       = useState([]);
  const [draftFocus,   setDraftFocus]   = useState("");
  const [draftTag,     setDraftTag]     = useState("");
  const [draftCal,     setDraftCal]     = useState(String(goalCal));
  const [draftPro,     setDraftPro]     = useState(String(goalPro));
  const [draftWat,     setDraftWat]     = useState(String(goalWat));
  const [restModal,    setRestModal]    = useState(null);
  const [dayMenu,      setDayMenu]      = useState(null); // day string of open popover

  // ── Onboarding gate — after ALL hooks ───────────────────────
  if (!profile) {
    return (
      <Onboarding onComplete={p => {
        setProfile(p);
        setGoalCal(p.calories || 2500);
        setGoalPro(p.protein  || 185);
        setGoalWat(p.waterOz  || 128);
        if (p.startDate) ss.set("challengeStart", p.startDate);
      }} />
    );
  }

  const saveJournalEntry = () => {
    if (!journalDraft.trim()) return;
    setJournal(j => ({ ...j, [KEY]: journalDraft.trim() }));
  };

  const todayWO   = getSched(todayName());
  const todayIsRest = isRestDay(todayName(), KEY);
  const exKeys    = todayWO.exercises.map(e => e.name);
  const woDone    = todayIsRest ? restDone : (exKeys.length > 0 && exKeys.every(k => exDone[k]));
  const calDone   = cal >= CAL * 0.88 && cal <= CAL * 1.12;
  const proDone   = pro >= PRO;
  const watDone   = wat >= WAT;
  const hCount    = [woDone, proDone, calDone, watDone, grat].filter(Boolean).length;

  // viewDay and viewDateName derived from viewDate — single source of truth
  const viewDateName = (() => {
    const d = new Date(viewDate + "T12:00:00");
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];
  })();
  const viewDay = viewDateName;

  const wo        = getSched(viewDay);
  const woIsRest  = isRestDay(viewDay, viewKey);
  const vKeys     = wo.exercises.map(e => e.name);
  const vDone     = vKeys.filter(k => viewExDone[k]).length;
  const vAll      = vKeys.length > 0 && vDone === vKeys.length;
  const doneCount = Object.keys(days100).length;

  const markDay = () => {
    if (!Object.prototype.hasOwnProperty.call(days100, curDay))
      setDays100(p => ({ ...p, [curDay]: hCount }));
  };

  const TABS = [
    { id:"today",   label:"Today"   },
    { id:"workout", label:"Workout" },
    { id:"daily5",  label:"Daily 5" },
    { id:"journal", label:"Journal" },
  ];



  const openEdit    = ()    => { setDraftCal(String(goalCal)); setDraftPro(String(goalPro)); setDraftWat(String(goalWat)); setEditDay(null); setShowEdit(true); };
  const closeEdit   = ()    => { setShowEdit(false); setEditDay(null); setExList([]); };
  const openDay     = (day) => {
    const s = getSched(day);
    setExList((s.exercises || []).map(e => ({ ...e })));
    setDraftFocus(customSched[day + "_focus"] || s.focus || "");
    setDraftTag(customSched[day + "_tag"] || s.tag || "");
    setEditDay(day);
  };
  const backToGoals = ()    => { setEditDay(null); setExList([]); };
  const saveDay     = ()    => {
    const cleaned = exList.filter(e => e.name.trim());
    setCustomSched(s => ({ ...s, [editDay]: cleaned, [editDay + "_focus"]: draftFocus, [editDay + "_tag"]: draftTag }));
    backToGoals();
  };
  const resetDay    = (day) => { setCustomSched(s => { const n = { ...s }; delete n[day]; return n; }); };
  const updateEx    = (i, field, val) => setExList(l => l.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
  const removeEx    = (i)   => setExList(l => l.filter((_, idx) => idx !== i));
  const addEx       = ()    => setExList(l => [...l, { name:"", sets:3, reps:"10", tip:"" }]);
  const commitGoals = ()    => {
    const c = parseInt(draftCal); const p = parseInt(draftPro); const w = parseInt(draftWat);
    if (!isNaN(c) && c >= 500) setGoalCal(c);
    if (!isNaN(p) && p >= 10)  setGoalPro(p);
    if (!isNaN(w) && w >= 8)   setGoalWat(w);
  };

  const applyRestOverride = (scope) => {
    if (!restModal) return;
    const { day, dateStr, toRest } = restModal;
    if (scope === "once") {
      setOneTimeOverrides(o => ({ ...o, [dateStr]: toRest ? "rest" : "workout" }));
    } else {
      // Repeating change
      if (toRest) {
        setRepeatRestDays(r => r.includes(day) ? r : [...r, day]);
      } else {
        setRepeatRestDays(r => r.filter(d => d !== day));
      }
      // Also clear any one-time override that might be conflicting
      setOneTimeOverrides(o => {
        const n = { ...o };
        delete n[dateStr];
        return n;
      });
    }
    setRestModal(null);
  };


  const isViewingToday = viewDate === KEY;

  // Derived values for the viewed date
  const [pastCal,  setPastCal]  = useState(() => ss.get("cal-"  + viewDate, 0));
  const [pastPro,  setPastPro]  = useState(() => ss.get("pro-"  + viewDate, 0));
  const [pastWat,  setPastWat]  = useState(() => ss.get("wat-"  + viewDate, 0));
  const [pastGrat, setPastGrat] = useState(() => ss.get("grat-" + viewDate, false));

  // Reload past values when viewDate changes
  useEffect(() => {
    if (!isViewingToday) {
      setPastCal(ss.get("cal-"  + viewDate, 0));
      setPastPro(ss.get("pro-"  + viewDate, 0));
      setPastWat(ss.get("wat-"  + viewDate, 0));
      setPastGrat(ss.get("grat-" + viewDate, false));
    }
  }, [viewDate, isViewingToday]);

  // Setters that write to the correct date key
  const setViewCal = v => { ss.set("cal-"  + viewDate, v); isViewingToday ? setCal(v)  : setPastCal(v);  };
  const setViewPro = v => { ss.set("pro-"  + viewDate, v); isViewingToday ? setPro(v)  : setPastPro(v);  };
  const setViewWat = v => { ss.set("wat-"  + viewDate, v); isViewingToday ? setWat(v)  : setPastWat(v);  };
  const setViewGratToggle = () => {
    const next = isViewingToday ? !grat : !pastGrat;
    ss.set("grat-" + viewDate, next);
    isViewingToday ? setGrat(next) : setPastGrat(next);
  };

  const viewCal  = isViewingToday ? cal  : pastCal;
  const viewPro  = isViewingToday ? pro  : pastPro;
  const viewWat  = isViewingToday ? wat  : pastWat;
  const viewGrat = isViewingToday ? grat : pastGrat;
  const viewRest = isViewingToday ? restDone : (ss.get("rest-" + viewDate, false));


  // Get the most recent ISO date for a given day name (on or before today)
  const dateForWeekday = (dayName) => {
    const today = new Date(KEY + "T12:00:00");
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const targetIdx = days.indexOf(dayName);
    const todayIdx  = today.getDay();
    let offset = targetIdx - todayIdx;
    if (offset > 0) offset -= 7; // always go back, never forward
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  // Challenge day number → ISO date string
  const dateForChallengeDay = (d) => {
    const start = new Date(challengeStart + "T00:00:00");
    start.setDate(start.getDate() + d - 1);
    return start.toISOString().split("T")[0];
  };
  const hdr  = { background:t.bgDeep, padding:"20px 20px 0", position:"sticky", top:0, zIndex:20, borderBottom:"1px solid " + t.hairline };
  const body = { flex:1, overflowY:"scroll", WebkitOverflowScrolling:"touch", overscrollBehavior:"none", touchAction:"pan-y", padding:"16px 16px 100px", background:t.bg };

  // Day strip helpers
  const stripDays = (() => {
    const cur = curDay;
    const prev = [cur-3, cur-2, cur-1].filter(d => d >= 1);
    const next = [cur+1, cur+2, cur+3].filter(d => d <= 100);
    return { prev, cur, next };
  })();

  // SVG icon components from uploaded files
  const IconLightMode = ({ size=20, color="#99A0A9" }) => (
    <svg width={size} height={size} viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#lm-clip)">
        <mask id="lm-mask" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="135" height="135">
          <path d="M0 0H134.984V134.984H0V0Z" fill="white"/>
        </mask>
        <g mask="url(#lm-mask)">
          <path d="M28.1229 67.4912H11.25M123.736 67.4912H106.863M39.6528 39.6508L28.1229 28.121M106.863 106.861L95.3335 95.3316M39.6528 95.3316L28.1229 106.861M106.863 28.121L95.3335 39.6508M67.4932 106.861V123.734M67.4932 11.248V28.121" stroke={color} strokeWidth="8.43647" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <path d="M87.3776 87.3776C92.6515 82.1038 95.6143 74.951 95.6143 67.4927C95.6143 60.0344 92.6515 52.8815 87.3776 47.6077C82.1038 42.3339 74.951 39.3711 67.4927 39.3711C60.0344 39.3711 52.8815 42.3339 47.6077 47.6077C42.3339 52.8815 39.3711 60.0344 39.3711 67.4927C39.3711 74.951 42.3339 82.1038 47.6077 87.3776C52.8815 92.6515 60.0344 95.6143 67.4927 95.6143C74.951 95.6143 82.1038 92.6515 87.3776 87.3776Z" fill={color}/>
        <path d="M67.4799 45.0024C61.6898 45.0024 56.1369 47.3025 52.0427 51.3968C47.9485 55.491 45.6484 61.0439 45.6484 66.834C45.6484 72.6241 47.9485 78.177 52.0427 82.2712C56.1369 86.3654 61.6898 88.6655 67.4799 88.6655L67.4799 66.834L67.4799 45.0024Z" fill={isDark ? "#22242D" : "#ffffff"}/>
      </g>
      <defs><clipPath id="lm-clip"><rect width="134.984" height="134.984" fill="white"/></clipPath></defs>
    </svg>
  );

  const IconCalendar = ({ size=20, color="#99A0A9" }) => (
    <svg width={size} height={size} viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.9048 119.496H106.077C117.885 119.496 123.818 113.621 123.818 101.984V33C123.818 21.3625 117.885 15.4883 106.077 15.4883H28.9048C17.154 15.4883 11.1641 21.307 11.1641 33V101.986C11.1641 113.679 17.154 119.496 28.9048 119.496ZM28.1141 110.403C23.086 110.403 20.261 107.747 20.261 102.492V49.2197C20.261 44.0229 23.086 41.3111 28.1141 41.3111H106.812C111.838 41.3111 114.718 44.0229 114.718 49.2197V102.492C114.718 107.747 111.838 110.399 106.812 110.399L28.1141 110.403ZM56.4173 61.5924H59.7509C61.7275 61.5924 62.4072 61.026 62.4072 59.0494V55.7158C62.4072 53.7393 61.7299 53.1174 59.7509 53.1174H56.4173C54.4408 53.1174 53.8189 53.7393 53.8189 55.7158V59.0494C53.8189 61.026 54.4408 61.5924 56.4173 61.5924ZM75.2307 61.5924H78.5088C80.5408 61.5924 81.1627 61.026 81.1627 59.0494V55.7158C81.1627 53.7393 80.5408 53.1174 78.5064 53.1174H75.2307C73.2541 53.1174 72.5768 53.7393 72.5768 55.7158V59.0494C72.5768 61.026 73.2517 61.5924 75.2307 61.5924ZM93.9861 61.5924H97.3198C99.2963 61.5924 99.976 61.026 99.976 59.0494V55.7158C99.976 53.7393 99.2963 53.1174 97.3198 53.1174H93.9861C92.0096 53.1174 91.3323 53.7393 91.3323 55.7158V59.0494C91.3323 61.026 92.0096 61.5924 93.9861 61.5924ZM37.6618 80.0659H40.9954C42.972 80.0659 43.6517 79.4994 43.6517 77.5229V74.1893C43.6517 72.2127 42.972 71.6487 40.9954 71.6487H37.6618C35.6853 71.6487 35.008 72.2127 35.008 74.1893V77.5229C35.008 79.4994 35.6829 80.0659 37.6618 80.0659ZM56.4173 80.0659H59.7509C61.7275 80.0659 62.4072 79.4994 62.4072 77.5229V74.1893C62.4072 72.2127 61.7299 71.6487 59.7509 71.6487H56.4173C54.4408 71.6487 53.8189 72.2127 53.8189 74.1893V77.5229C53.8189 79.4994 54.4408 80.0659 56.4173 80.0659ZM75.2307 80.0659H78.5088C80.5408 80.0659 81.1627 79.4994 81.1627 77.5229V74.1893C81.1627 72.2127 80.5408 71.6487 78.5064 71.6487H75.2307C73.2541 71.6487 72.5768 72.2127 72.5768 74.1893V77.5229C72.5768 79.4994 73.2517 80.0659 75.2307 80.0659ZM93.9861 80.0659H97.3198C99.2963 80.0659 99.976 79.4994 99.976 77.5229V74.1893C99.976 72.2127 99.2963 71.6487 97.3198 71.6487H93.9861C92.0096 71.6487 91.3323 72.2127 91.3323 74.1893V77.5229C91.3323 79.4994 92.0096 80.0659 93.9861 80.0659ZM37.6618 98.5948H40.9954C42.972 98.5948 43.6517 97.9729 43.6517 95.9964V92.6627C43.6517 90.6862 42.972 90.1222 40.9954 90.1222H37.6618C35.6853 90.1222 35.008 90.6862 35.008 92.6627V95.9964C35.008 97.9729 35.6829 98.5948 37.6618 98.5948ZM56.4173 98.5948H59.7509C61.7275 98.5948 62.4072 97.9729 62.4072 95.9964V92.6627C62.4072 90.6862 61.7299 90.1222 59.7509 90.1222H56.4173C54.4408 90.1222 53.8189 90.6862 53.8189 92.6627V95.9964C53.8189 97.9729 54.4408 98.5948 56.4173 98.5948ZM75.2307 98.5948H78.5088C80.5408 98.5948 81.1627 97.9729 81.1627 95.9964V92.6627C81.1627 90.6862 80.5408 90.1222 78.5064 90.1222H75.2307C73.2541 90.1222 72.5768 90.6862 72.5768 92.6627V95.9964C72.5768 97.9729 73.2517 98.5948 75.2307 98.5948Z" fill={color}/>
    </svg>
  );

  const IconDots = ({ size=20, color="#99A0A9" }) => (
    <svg width={size} height={size} viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M75.9272 67.4931C75.9272 69.1617 75.4324 70.7928 74.5054 72.1802C73.5784 73.5675 72.2608 74.6489 70.7192 75.2874C69.1777 75.9259 67.4814 76.093 65.8448 75.7675C64.2083 75.442 62.7051 74.6385 61.5252 73.4586C60.3454 72.2787 59.5419 70.7755 59.2163 69.139C58.8908 67.5025 59.0579 65.8062 59.6964 64.2646C60.335 62.7231 61.4163 61.4055 62.8037 60.4784C64.191 59.5514 65.8221 59.0566 67.4907 59.0566C69.7282 59.0566 71.8741 59.9455 73.4562 61.5276C75.0383 63.1098 75.9272 65.2556 75.9272 67.4931ZM31.6357 59.0566C29.9671 59.0566 28.336 59.5514 26.9486 60.4784C25.5613 61.4055 24.4799 62.7231 23.8414 64.2646C23.2029 65.8062 23.0358 67.5025 23.3613 69.139C23.6869 70.7755 24.4903 72.2787 25.6702 73.4586C26.8501 74.6385 28.3533 75.442 29.9898 75.7675C31.6263 76.093 33.3226 75.9259 34.8642 75.2874C36.4058 74.6489 37.7234 73.5675 38.6504 72.1802C39.5774 70.7928 40.0722 69.1617 40.0722 67.4931C40.0722 65.2556 39.1833 63.1098 37.6012 61.5276C36.019 59.9455 33.8732 59.0566 31.6357 59.0566ZM103.346 59.0566C101.677 59.0566 100.046 59.5514 98.6587 60.4784C97.2713 61.4055 96.19 62.7231 95.5515 64.2646C94.9129 65.8062 94.7458 67.5025 95.0714 69.139C95.3969 70.7755 96.2004 72.2787 97.3803 73.4586C98.5601 74.6385 100.063 75.442 101.7 75.7675C103.336 76.093 105.033 75.9259 106.574 75.2874C108.116 74.6489 109.433 73.5675 110.36 72.1802C111.287 70.7928 111.782 69.1617 111.782 67.4931C111.782 65.2556 110.893 63.1098 109.311 61.5276C107.729 59.9455 105.583 59.0566 103.346 59.0566Z" fill={color}/>
    </svg>
  );

  return (
    <div style={{ fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif", WebkitFontSmoothing:"antialiased", height:"100vh", overflow:"hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: inherit; -webkit-tap-highlight-color: transparent; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={{ maxWidth:430, margin:"0 auto", height:"100%", display:"flex", flexDirection:"column", background:t.bg }}>

        {/* ── Header ── */}
        <div style={hdr}>

          {/* Row 1: Title + Icon pill */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <div style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.025em", color:t.text1, lineHeight:1 }}>Daily Reps</div>
              <div style={{ fontSize:11, color:t.info, fontWeight:600, letterSpacing:"0.08em", marginTop:4, textTransform:"uppercase" }}>{`100 Day Challenge • Phase ${phase}`}</div>
            </div>

            {/* Icon pill — dark bg + light icons in dark mode; white bg + dark icons in light mode */}
            {(() => {
              const pillBg      = isDark ? "#22242d" : "#ffffff";
              const pillBorder  = isDark ? "#393a43" : "rgba(0,0,0,0.10)";
              const pillShadow  = isDark ? "none" : "0 2px 8px rgba(0,0,0,0.10)";
              const iconColor   = isDark ? "#99A0A9" : "#22242d";
              return (
                <div style={{ display:"flex", alignItems:"center", gap:16,
                  background:pillBg, border:"1px solid " + pillBorder,
                  borderRadius:46, padding:"10px 18px", boxShadow:pillShadow }}>
                  <button onClick={() => setIsDark(d => !d)}
                    style={{ background:"none", border:"none", cursor:"pointer", padding:0,
                      display:"flex", alignItems:"center", justifyContent:"center", touchAction:"manipulation" }}>
                    <IconLightMode size={22} color={iconColor} />
                  </button>
                  <button onClick={() => setTab("100days")}
                    style={{ background:"none", border:"none", cursor:"pointer", padding:0,
                      display:"flex", alignItems:"center", justifyContent:"center", touchAction:"manipulation" }}>
                    <IconCalendar size={22} color={iconColor} />
                  </button>
                  <button onClick={openEdit}
                    style={{ background:"none", border:"none", cursor:"pointer", padding:0,
                      display:"flex", alignItems:"center", justifyContent:"center", touchAction:"manipulation" }}>
                    <IconDots size={22} color={iconColor} />
                  </button>
                </div>
              );
            })()}
          </div>

          {/* Row 2: Scrollable day strip — all 100 days */}
          <div ref={stripRef} style={{ overflowX:"auto", WebkitOverflowScrolling:"touch",
            scrollbarWidth:"none", msOverflowStyle:"none",
            margin:"0 -20px", padding:"0 20px", marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:6,
              width:"max-content", paddingRight:20 }}>
              {Array.from({ length: 100 }, (_, i) => i + 1).map(d => {
                const dateStr  = dateForChallengeDay(d);
                const isToday  = d === curDay;
                const isSel    = isToday ? isViewingToday : viewDate === dateStr;
                const isFuture = d > curDay;
                const done     = Object.prototype.hasOwnProperty.call(days100, d);
                if (isToday) return (
                  <div key={d}
                    onClick={() => setViewDate(KEY)}
                    style={{ display:"flex", flexDirection:"column", alignItems:"center",
                      gap:4, cursor:"pointer", touchAction:"manipulation", flexShrink:0 }}>
                    <div style={{ fontSize:10, fontWeight:500, color:t.text3 }}>Today</div>
                    <div style={{ width:48, height:72, borderRadius:18,
                      background: isSel ? t.info : "transparent",
                      border: isSel ? "none" : "2px solid " + t.text3,
                      display:"flex", flexDirection:"column", alignItems:"center",
                      justifyContent:"center", gap:1 }}>
                      <span style={{ fontSize:10, fontWeight: isSel ? 700 : 400,
                        color: isSel ? "#ffffff" : t.text3 }}>D{d}</span>
                      <span style={{ fontSize:26, fontWeight: isSel ? 700 : 400,
                        color: isSel ? "#ffffff" : t.text3,
                        letterSpacing:"-0.02em", lineHeight:1 }}>{d}</span>
                    </div>
                  </div>
                );
                return (
                  <div key={d}
                    onClick={() => { if (!isFuture) setViewDate(dateStr); }}
                    style={{ display:"flex", flexDirection:"column", alignItems:"center",
                      gap:4, cursor: isFuture ? "default" : "pointer",
                      touchAction:"manipulation", flexShrink:0,
                      opacity: isFuture ? 0.3 : 1 }}>
                    <div style={{ fontSize:10, fontWeight:500,
                      color: isSel && !isToday ? t.info : t.text3 }}>D{d}</div>
                    <div style={{ width:38, height:38, borderRadius:"50%",
                      background: done ? t.green : "transparent",
                      border: isSel && !isToday ? "2px solid " + t.info
                        : done ? "none"
                        : "2px solid " + t.text3,
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {done && <span style={{ color:"#fff", fontSize:17, lineHeight:1 }}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Viewing past day banner — all tabs */}
          {!isViewingToday && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"8px 12px", margin:"6px 0 2px",
              background:t.info, borderRadius:10 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#ffffff" }}>
                Viewing {viewDateName} · D{curDay - Math.round((new Date(KEY + "T12:00:00") - new Date(viewDate + "T12:00:00")) / 86400000)}
              </div>
              <button onClick={() => setViewDate(KEY)}
                style={{ fontSize:11, fontWeight:700, color:t.info, background:"#ffffff",
                  border:"none", borderRadius:8, padding:"5px 12px",
                  cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                Back to Today
              </button>
            </div>
          )}

          {/* Row 3: Tab bar */}
          <div style={{ display:"flex", gap:2 }}>
            {TABS.map(tab2 => (
              <button key={tab2.id} onClick={() => setTab(tab2.id)}
                style={{ flex:1, padding:"12px 4px", border:"none", background:"transparent",
                  color: tab === tab2.id ? t.text1 : t.text3,
                  fontSize:14, fontWeight:600,
                  borderBottom: "2px solid " + (tab === tab2.id ? t.info : "transparent"),
                  cursor:"pointer", touchAction:"manipulation", transition:"all 0.15s" }}>
                {tab2.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={body}>

          {/* ════════ TODAY ════════ */}
          {tab === "today" && (
            <div>


              {/* Nutrition read-only cards */}
              <ReadCard label="Calories" habitKey="calories" val={viewCal} max={CAL} suffix="cal" color={t.danger} done={viewCal >= CAL * 0.88 && viewCal <= CAL * 1.12}
                t={t} />
              <ReadCard label="Protein"  habitKey="protein" val={viewPro} max={PRO} suffix="g"   color={t.periwinkle} done={viewPro >= PRO}
                t={t} />
              <ReadCard label="Water"    habitKey="water" val={viewWat} max={WAT} suffix="oz"  color={t.info} done={viewWat >= WAT}
                t={t} />

              <button onClick={() => setTab("daily5")}
                style={{ width:"100%", background:"none", border:"none", color:t.info,
                  fontSize:13, fontWeight:600, cursor:"pointer", padding:"8px 0 4px", fontFamily:"inherit", touchAction:"manipulation" }}>
                Log nutrition & habits in Daily 5 →
              </button>

              {/* Daily 5 summary */}
              <div style={{ borderRadius:20, padding:"18px", marginTop:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.text2, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>The Daily 5</div>
                {[
                  { icon:<HabitIcon habit="workout"   size={16} color={woDone  ? t.bgDeep : t.text2} />, label:"Workout",  done:woDone,  note: todayIsRest ? "Rest day" : wtDone ? (vDone + "/" + exKeys.length + " · " + fmtTime(wtSecs)) : (vDone + "/" + exKeys.length + " exercises") },
                  { icon:<HabitIcon habit="protein"   size={16} color={(viewPro>=PRO) ? t.bgDeep : t.text2} />, label:"Protein",  done:viewPro>=PRO, note:viewPro + "/" + PRO + "g" },
                  { icon:<HabitIcon habit="calories"  size={16} color={(viewCal>=CAL*.88&&viewCal<=CAL*1.12) ? t.bgDeep : t.text2} />, label:"Calories", done:viewCal>=CAL*.88&&viewCal<=CAL*1.12, note:viewCal + "/" + CAL + " cal" },
                  { icon:<HabitIcon habit="water"     size={16} color={(viewWat>=WAT) ? t.bgDeep : t.text2} />, label:"Water",    done:viewWat>=WAT, note:viewWat + "/" + WAT + "oz" },
                  { icon:<HabitIcon habit="gratitude" size={16} color={viewGrat ? t.bgDeep : t.text2} />, label:"Gratitude", done:viewGrat, note: viewGrat ? "Done" : "Not yet" },
                ].map(h => (
                  <div key={h.label} style={{ display:"flex", alignItems:"center", gap:12, paddingBottom:10, marginBottom:10, borderBottom:"1px solid " + t.hairline + (h.label === "Gratitude" ? "; border:none; margin:0; padding:0" : "") }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background: h.done ? t.green : t.surface3,
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {h.done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.bgDeep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : h.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <span style={{ fontSize:14, fontWeight:600, color: h.done ? t.green : t.text1 }}>{h.label}</span>
                    </div>
                    <span style={{ fontSize:12, color: h.done ? t.green : t.text3 }}>{h.note}</span>
                  </div>
                ))}
                {hCount === 5 && (
                  <div style={{ marginTop:12, padding:"12px 16px", borderRadius:14, background:t.green + "18", border:"1px solid " + t.green, textAlign:"center" }}>
                    <div style={{ fontSize:16, fontWeight:700, color:t.green }}>Perfect Day — 5/5 🎉</div>
                  </div>
                )}
                {hCount === 5 && (
                  <button onClick={markDay} style={{ marginTop:12, width:"100%", padding:"13px", borderRadius:14,
                    border:"none", background:t.info, color:t.bgDeep, fontSize:15, fontWeight:700,
                    cursor:"pointer", touchAction:"manipulation", fontFamily:"inherit" }}>
                    Mark Day {curDay} Complete
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ════════ WORKOUT ════════ */}
          {tab === "workout" && (
            <div>
              {/* Day selector */}
              <div style={{ borderRadius:20, padding:"12px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ display:"flex", gap:5, overflowX:"scroll", WebkitOverflowScrolling:"touch", touchAction:"pan-x" }}>
                  {DAYS.map((d, i) => {
                    const dateStr  = dateForWeekday(d);
                    const sel      = viewDay === d;
                    const isToday  = d === todayName();
                    const isRD     = isRestDay(d, dateStr);
                    return (
                      <button key={d} onClick={() => setViewDate(dateStr)}
                        style={{ flexShrink:0, minWidth:42, padding:"9px 6px", borderRadius:10,
                          border: sel ? "1px solid " + t.info : "1px solid " + t.hairline,
                          background: sel ? t.info + "15" : t.controlFill,
                          color: sel ? t.info : isRD ? t.text3 : t.text2,
                          fontSize:11, fontWeight: sel ? 700 : 600,
                          cursor:"pointer", touchAction:"manipulation", textAlign:"center" }}>
                        <div>{SHORT[i]}</div>
                        {isToday && <div style={{ width:4, height:4, borderRadius:"50%",
                          background: sel ? t.info : t.text3, margin:"3px auto 0" }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Workout card */}
              <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div>
                    <div style={{ fontSize:22, fontWeight:700, color:t.text1, letterSpacing:"-0.022em" }}>{viewDay}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                      <span style={{ padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700,
                        background:wo.color + "20", color:wo.color, letterSpacing:"0.06em", textTransform:"uppercase" }}>{wo.tag}</span>
                      <span style={{ fontSize:13, color:t.text2 }}>{wo.focus}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                    {!woIsRest && (
                      <div style={{ padding:"5px 12px", borderRadius:10,
                        background: vAll ? t.green + "20" : t.surface2,
                        color: vAll ? t.green : t.text3,
                        fontSize:12, fontWeight:700, border:"1px solid " + (vAll ? t.green : t.hairline) }}>
                        {vDone}/{vKeys.length}
                      </div>
                    )}
                    <button onClick={() => setRestModal({ day: viewDay, dateStr: viewKey, toRest: !woIsRest })}
                      style={{ padding:"5px 12px", borderRadius:10, fontSize:11, fontWeight:600,
                        border:"1px solid " + t.hairlineStrong, background:t.surface2,
                        color:t.text3, cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                      {woIsRest ? "Set as Workout Day" : "Set as Rest Day"}
                    </button>
                  </div>
                </div>

                {woIsRest ? (
                  <div style={{ textAlign:"center", padding:"24px 0 8px" }}>
                    <div style={{ fontSize:44, marginBottom:10 }}>🛌</div>
                    <div style={{ fontSize:19, fontWeight:600, color:t.text2 }}>Rest Day</div>
                    <div style={{ fontSize:13, color:t.text3, marginTop:8, marginBottom:20, lineHeight:1.6 }}>Recover. Hydrate. Still hit the Daily 5.</div>
                    <button onClick={toggleViewRest}
                      style={{ width:"100%", padding:"14px", borderRadius:14,
                        border:"1px solid " + (viewRestDone ? t.green : t.controlStroke),
                        background: viewRestDone ? t.green + "20" : t.surface2,
                        color: viewRestDone ? t.green : t.text1,
                        fontSize:15, fontWeight:600, cursor:"pointer", touchAction:"manipulation", fontFamily:"inherit" }}>
                      {viewRestDone ? "✓ Rest Day Logged" : "Log Rest Day + Movement"}
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* ── Workout Timer ── */}
                    {(() => {
                      const goalHit = wtSecs >= 1200;
                      const pct     = Math.min(wtSecs / 1200, 1);
                      const over    = wtSecs > 1200 ? wtSecs - 1200 : 0;
                      return (
                        <div style={{ borderRadius:20, overflow:"hidden", marginBottom:14,
                          background: `linear-gradient(180deg,${t.surface1Top},${t.surface1})`,
                          border:`1px solid ${goalHit && !wtDone ? ACC.gold+"50" : t.hairline}`,
                          boxShadow:t.shadow1+", "+t.hi }}>
                          <div style={{ padding:"14px 16px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <div>
                              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:t.text3, marginBottom:2 }}>Workout Timer</div>
                              <div style={{ fontSize:11, color: goalHit && wtRunning ? ACC.green : t.text3 }}>
                                {wtDone ? `Session logged · ${fmtTime(wtSecs)}`
                                  : goalHit && wtRunning ? `Goal hit! +${fmtTime(over)} and counting`
                                  : goalHit && !wtRunning ? "Goal hit — ready to finish"
                                  : wtRunning ? "Timer running — keep pushing"
                                  : wtSecs > 0 ? "Paused — tap to resume"
                                  : "Tap start when you\'re ready"}
                              </div>
                            </div>
                            {wtSecs > 0 && !wtDone && (
                              <button onClick={() => { setWtRunning(false); setWtSecs(0); setWtDone(false); }}
                                style={{ background:"none", border:"none", color:t.text3, fontSize:11,
                                  fontWeight:600, cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                                Reset
                              </button>
                            )}
                          </div>
                          <div style={{ textAlign:"center", padding:"4px 16px 10px" }}>
                            <div style={{ fontSize:52, fontWeight:700, letterSpacing:"-0.04em", lineHeight:1,
                              fontVariantNumeric:"tabular-nums",
                              color: wtDone ? ACC.green : goalHit ? ACC.green : wtRunning ? t.text1 : t.text2,
                              transition:"color 0.3s" }}>
                              {fmtTime(wtSecs)}
                            </div>
                            <div style={{ fontSize:11, color:t.text3, marginTop:4 }}>
                              {wtDone ? "Complete" : "Goal: 20:00"}
                            </div>
                          </div>
                          <div style={{ margin:"0 16px 12px", height:5, borderRadius:999, background:t.hairline, overflow:"hidden" }}>
                            <div style={{ height:"100%", width:(pct*100)+"%", borderRadius:999, transition:"width 0.6s ease",
                              background: ACC.green }} />
                          </div>
                          {!wtDone ? (
                            <div style={{ padding:"0 14px 14px", display:"flex", gap:8 }}>
                              <button onClick={() => wtRunning ? setWtRunning(false) : setWtRunning(true)}
                                style={{ flex:1, padding:"12px", borderRadius:14, border:"none",
                                  background: wtRunning ? t.surface3 : goalHit ? `radial-gradient(120% 120% at 30% 20%,#e3c155,#c9a23a 55%,#8f7220)` : ACC.green,
                                  color: wtRunning ? t.text1 : goalHit ? "#1a1000" : t.bgDeep,
                                  fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation",
                                  boxShadow: wtRunning ? "none" : goalHit ? "0 3px 12px rgba(201,162,58,0.35)" : "0 3px 12px rgba(52,194,123,0.3)" }}>
                                {wtRunning ? "⏸  Pause" : wtSecs === 0 ? "▶  Start Workout" : "▶  Resume"}
                              </button>
                              {wtSecs > 0 && (
                                <button onClick={() => { setWtRunning(false); setWtDone(true); }}
                                  style={{ padding:"12px 16px", borderRadius:14,
                                    border:`1px solid ${t.hairlineStrong}`, background:t.surface2,
                                    color:t.text2, fontSize:14, fontWeight:600,
                                    cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                                  Finish
                                </button>
                              )}
                            </div>
                          ) : (
                            <div style={{ padding:"0 14px 14px" }}>
                              <div style={{ padding:"11px 14px", borderRadius:14,
                                background: ACC.green + "12",
                                display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <div>
                                  <div style={{ fontSize:13, fontWeight:700, color:ACC.green }}>
                                    {wtSecs >= 1200 ? "🏆 20-min goal crushed" : `Session complete · ${fmtTime(wtSecs)}`}
                                  </div>
                                  <div style={{ fontSize:11, color:t.text3, marginTop:2 }}>
                                    Keep stacking those daily wins
                                  </div>
                                </div>
                                <button onClick={() => { setWtRunning(false); setWtSecs(0); setWtDone(false); }}
                                  style={{ background:"none", border:"none", color:t.text3, fontSize:11,
                                    fontWeight:600, cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                                  New
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    {wo.exercises.map(ex => (
                      <ExRow key={ex.name} ex={ex}
                        done={!!viewExDone[ex.name]}
                        onToggle={() => toggleViewEx(ex.name)}
                        color={wo.color} t={t} />
                    ))}
                    {(
                      <div style={{ marginTop:4, padding:"13px 14px", borderRadius:14,
                        background: vAll ? t.green + "18" : t.info + "10",
                        border:"1px solid " + (vAll ? t.green : t.info + "40"),
                        display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:34, height:34, borderRadius:10, background: vAll ? t.green : t.info,
                          display:"flex", alignItems:"center", justifyContent:"center", color:t.bgDeep, fontWeight:700, fontSize:13 }}>
                          {vDone}/{vKeys.length}
                        </div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color: vAll ? t.green : t.text1 }}>
                            {vAll ? "Workout complete! 💪" : (vKeys.length - vDone) + " exercises left"}
                          </div>
                          <div style={{ fontSize:12, color:t.text3, marginTop:2 }}>
                            {vAll ? "Workout habit auto-checked" : "Tap each exercise to check off"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ borderRadius:20, padding:"16px 18px",
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:11, color:t.info, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{["Phase 1 — Beginner","Phase 2 — Intermediate","Phase 3 — Advanced","Phase 4 — Pro"][phase-1]}</div>
                <div style={{ fontSize:13, color:t.text2, lineHeight:1.7 }}>
                  2 extra reps on your final set for 2 workouts in a row = ready for Phase 2. Try slower lowering, pause reps, or a heavier backpack first.
                </div>
              </div>
            </div>
          )}

          {/* ════════ DAILY 5 ════════ */}
          {tab === "daily5" && (
            <div>
              {/* Summary header */}
              <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:13, color:t.text2, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Today's Progress</div>
                <div style={{ fontSize:34, fontWeight:700, color:t.text1, letterSpacing:"-0.022em", lineHeight:1 }}>
                  {hCount}<span style={{ fontSize:20, color:t.text3 }}>/5</span>
                </div>
                <div style={{ marginTop:10, height:6, borderRadius:999, background:t.surface3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:((hCount / 5) * 100) + "%",
                    background: hCount === 5 ? t.green : t.info, borderRadius:999, transition:"width 0.4s ease" }} />
                </div>
                <div style={{ fontSize:12, color: hCount === 5 ? t.green : t.text3, marginTop:6 }}>
                  {hCount === 5 ? "Perfect day — keep stacking wins!" : (5 - hCount) + " habits left"}
                </div>
              </div>

              {/* Habit 1 — Workout */}
              <HabitCard n={1} icon={<HabitIcon habit="workout" size={20} color={woDone ? t.bgDeep : t.text3} />} label="Workout" done={woDone} color={t.info}
                action={{ label:"Go to Workout →", fn:() => setTab("workout") }} t={t}>
                {wtDone && (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"10px 12px", borderRadius:12, marginBottom:12,
                    background: t.info + "12" }}>
                    <div style={{ fontSize:13, fontWeight:600, color: t.info }}>
                      ⏱ Session time: {fmtTime(wtSecs)}
                    </div>
                    <div style={{ fontSize:11, color: t.info, fontWeight:600 }}>
                      {wtSecs <= 1200 ? "Under 20 min ✓" : "Over 20 min"}
                    </div>
                  </div>
                )}
              </HabitCard>

              {/* Habit 2 — Protein */}
              <LogCard n={2} label="Protein" habitKey="protein" val={viewPro} set={setViewPro} max={PRO} suffix="g" step={5}
                color={t.periwinkle} done={proDone}
                hint={proDone ? "Protein goal hit" : (PRO - pro) + "g left — shake, chicken, eggs"} t={t} />

              {/* Habit 3 — Calories */}
              <LogCard n={3} label="Calories" habitKey="calories" val={viewCal} set={setViewCal} max={CAL} suffix="cal" step={50}
                color={t.danger} done={calDone}
                hint={calDone ? "In your bulk range — great day" : Math.max(0, CAL - cal) + " cal to go"} t={t} />

              {/* Habit 4 — Water */}
              <LogCard n={4} label="Water" habitKey="water" val={viewWat} set={setViewWat} max={WAT} suffix="oz" step={8} max2={200}
                color={t.info} done={watDone}
                t={t} />

              {/* Habit 5 — Gratitude */}
              <HabitCard n={5} icon={<HabitIcon habit="gratitude" size={20} color={grat ? t.bgDeep : t.green} />} label="Gratitude" done={grat} color={t.green} t={t}>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
                  {[1,2,3,4,5].map(n => (
                    <input key={n} type="text"
                      placeholder={n + ". I'm grateful for..."}
                      defaultValue={ss.get("grat-line-" + KEY + "-" + n, "") || ""}
                      onChange={e => ss.set("grat-line-" + KEY + "-" + n, e.target.value)}
                      style={{ width:"100%", padding:"10px 14px", borderRadius:12,
                        border:"1px solid " + t.controlStroke, fontSize:14, color:t.text1,
                        background:t.surface2, outline:"none", fontFamily:"inherit" }} />
                  ))}
                </div>
                <button onClick={() => setViewGratToggle()} style={{ width:"100%", padding:"13px", borderRadius:14,
                  border:"1px solid " + (grat ? t.green : t.controlStroke),
                  background: grat ? t.green + "20" : t.surface2, color: grat ? t.green : t.text1,
                  fontSize:15, fontWeight:600, cursor:"pointer", touchAction:"manipulation", fontFamily:"inherit" }}>
                  {grat ? "✓ Gratitude Done" : "Mark Gratitude Complete"}
                </button>
              </HabitCard>

              {/* Skye quote */}
              <div style={{ borderRadius:20, padding:"20px", textAlign:"center", marginTop:4,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:13, color:t.info, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Keep Your Mind Right</div>
                <div style={{ fontSize:13, color:t.text2, lineHeight:1.8 }}>
                  "Perception is reality. Choose to live in a perception, attitude, and reality that is grateful and happy."
                </div>
                <div style={{ fontSize:12, color:t.info, fontWeight:600, marginTop:10 }}>— Skye, Daily Reps</div>
              </div>
            </div>
          )}

          {/* ════════ 100 DAYS ════════ */}
          {tab === "100days" && (
            <div>
              {/* Summary */}
              <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:13, color:t.text2, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Challenge Progress</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                  <div>
                    <div style={{ fontSize:34, fontWeight:700, color:t.text1, letterSpacing:"-0.022em", lineHeight:1 }}>
                      {doneCount}<span style={{ fontSize:17, color:t.text3 }}>/100</span>
                    </div>
                    <div style={{ fontSize:12, color:t.text3, marginTop:4 }}>days logged</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:26, fontWeight:700, color:t.info, letterSpacing:"-0.02em" }}>Day {curDay}</div>
                    <div style={{ fontSize:11, color:t.info, fontWeight:600 }}>current</div>
                  </div>
                </div>
                <div style={{ marginTop:14, height:6, borderRadius:999, background:t.surface3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:Math.round((doneCount/100)*100) + "%", background:t.info, borderRadius:999, transition:"width 0.5s ease" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:10, color:t.text3, fontWeight:600 }}>
                  <span>DAY 1</span>
                  <span style={{ color:t.info }}>{Math.round((doneCount/100)*100)}% DONE</span>
                  <span>DAY 100</span>
                </div>
              </div>

              {/* Current day display — auto-calculated from start date */}
              <div style={{ borderRadius:20, padding:"16px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:12, color:t.text3, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Current Day</div>
                  <div style={{ fontSize:11, color:t.text3 }}>Started {challengeStart}</div>
                </div>
                <div style={{ fontSize:28, fontWeight:700, color:t.info, letterSpacing:"-0.02em", marginTop:6 }}>Day {curDay} of 100</div>
              </div>

              {/* Grid */}
              <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:16, fontWeight:700, color:t.text1, marginBottom:14 }}>100 Day Grid</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:5 }}>
                  {Array.from({ length:100 }, (_, i) => {
                    const n      = i + 1;
                    const has    = Object.prototype.hasOwnProperty.call(days100, n);
                    const score  = has ? days100[n] : null;
                    const isCur  = n === curDay;
                    const isMile = [25,50,75,100].includes(n);
                    const bg     = has ? (score === 5 ? t.green : score >= 3 ? ACC.gold : t.text3) : isCur ? t.surface3 : t.surface2;
                    return (
                      <div key={n} onClick={() => n === curDay && markDay()}
                        title={"Day " + n + (has ? " · " + score + "/5" : "")}
                        style={{ aspectRatio:"1", borderRadius:6,
                          background:bg,
                          border:"1.5px solid " + (isCur ? t.info : isMile ? t.hairlineStrong : "transparent"),
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:8, fontWeight:700,
                          color: has ? t.bgDeep : isCur ? t.info : t.text3,
                          cursor: n === curDay ? "pointer" : "default", transition:"all 0.15s" }}>
                        {has ? (score === 5 ? "★" : score) : isMile ? "D" + n : n}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display:"flex", gap:12, marginTop:12, flexWrap:"wrap" }}>
                  {[{ color:t.green, label:"5/5" }, { color:ACC.gold, label:"3–4/5" }, { color:t.text3, label:"1–2/5" }, { color:t.surface3, label:"Today" }]
                    .map(({ color, label }) => (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:t.text3 }}>
                        <div style={{ width:10, height:10, borderRadius:3, background:color }} />{label}
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ borderRadius:20, padding:"20px", textAlign:"center",
                background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                <div style={{ fontSize:16, fontWeight:700, color:t.info, marginBottom:10 }}>Don't Break the Chain</div>
                <div style={{ fontSize:13, color:t.text2, lineHeight:1.8 }}>
                  You only fail if you quit. Miss a day — don't miss two. Little by little, a little becomes a lot.
                </div>
              </div>
            </div>
          )}

          {/* ════════ JOURNAL ════════ */}
          {tab === "journal" && (() => {
            const todayEntry = journal[KEY];
            const pastEntries = Object.entries(journal)
              .filter(([d]) => d !== KEY)
              .sort(([a], [b]) => b.localeCompare(a));
            const fmtDate = (d) => {
              const dt = new Date(d + "T12:00:00");
              return dt.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
            };
            return (
              <div>
                {/* Today's entry */}
                <div style={{ borderRadius:20, padding:"18px", marginBottom:10,
                  background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                  border:"1px solid " + (todayEntry ? t.green : t.hairline),
                  boxShadow:t.shadow1 + ", " + t.hi }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                    <div>
                      <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>Today</div>
                      <div style={{ fontSize:17, fontWeight:700, color:t.text1 }}>Daily Log</div>
                    </div>
                    {todayEntry && (
                      <div style={{ fontSize:11, fontWeight:700, color:t.green, background:t.green + "18",
                        borderRadius:20, padding:"4px 10px", border:"1px solid " + t.green + "40" }}>✓ Saved</div>
                    )}
                  </div>
                  <textarea
                    value={journalDraft}
                    onChange={e => setJournalDraft(e.target.value)}
                    placeholder={"How's the day going? Energy levels, mindset, wins, anything on your mind…"}
                    rows={6}
                    style={{ width:"100%", padding:"14px", borderRadius:14,
                      border:"1px solid " + (journalDraft ? t.hairlineStrong : t.controlStroke),
                      background:t.surface2, color:t.text1, fontSize:14, lineHeight:1.7,
                      resize:"none", outline:"none", fontFamily:"inherit",
                      caretColor:t.green }} />
                  <button
                    onClick={saveJournalEntry}
                    disabled={!journalDraft.trim()}
                    style={{ width:"100%", marginTop:10, padding:"13px", borderRadius:14,
                      border:"1px solid " + (journalDraft.trim() ? t.green : t.controlStroke),
                      background: journalDraft.trim() ? t.green + "20" : t.surface2,
                      color: journalDraft.trim() ? t.green : t.text3,
                      fontSize:15, fontWeight:600, cursor: journalDraft.trim() ? "pointer" : "default",
                      touchAction:"manipulation", fontFamily:"inherit", transition:"all 0.2s" }}>
                    {todayEntry ? "Update Entry" : "Save Entry"}
                  </button>
                </div>

                {/* Past entries */}
                {pastEntries.length > 0 && (
                  <div>
                    <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em",
                      textTransform:"uppercase", margin:"18px 4px 10px" }}>Past Entries</div>
                    {pastEntries.map(([date, text]) => (
                      <div key={date} style={{ borderRadius:20, padding:"18px", marginBottom:10,
                        background:"linear-gradient(180deg," + t.surface1Top + "," + t.surface1 + ")",
                        border:"1px solid " + t.hairline, boxShadow:t.shadow1 + ", " + t.hi }}>
                        <div style={{ fontSize:12, fontWeight:700, color:t.info, marginBottom:8,
                          letterSpacing:"0.02em" }}>{fmtDate(date)}</div>
                        <div style={{ fontSize:14, color:t.text2, lineHeight:1.75,
                          whiteSpace:"pre-wrap" }}>{text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {pastEntries.length === 0 && !todayEntry && (
                  <div style={{ textAlign:"center", padding:"32px 20px", color:t.text3, fontSize:13, lineHeight:1.7 }}>
                    Your entries will show up here.<br/>Start writing above — even a few words counts.
                  </div>
                )}
              </div>
            );
          })()}

          {/* ════════ REST DAY CONFIRM MODAL ════════ */}
          {restModal && (
            <>
              {/* Backdrop — unconditional close, no e.target check needed */}
              <div style={{ position:"fixed", inset:0, zIndex:200,
                background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}
                onClick={() => setRestModal(null)}
                onTouchEnd={() => setRestModal(null)} />
              {/* Card — sits above backdrop, pointer-events isolated */}
              <div style={{ position:"fixed", inset:0, zIndex:201, display:"flex", alignItems:"center",
                justifyContent:"center", padding:"0 20px", pointerEvents:"none" }}>
              <div style={{ width:"100%", maxWidth:390, background:t.surface1,
                borderRadius:24, border:"1px solid " + t.hairlineStrong, overflow:"hidden",
                pointerEvents:"auto" }}>

                {/* Header */}
                <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid " + t.hairline }}>
                  <div style={{ fontSize:18, fontWeight:700, color:t.text1, marginBottom:4 }}>
                    {restModal.toRest ? "Set as Rest Day" : "Set as Workout Day"}
                  </div>
                  <div style={{ fontSize:13, color:t.text3, lineHeight:1.6 }}>
                    {restModal.toRest
                      ? `Change ${restModal.day} to a rest day. Does this apply just this once, or every ${restModal.day}?`
                      : `Switch ${restModal.day} back to a workout day. Just this once, or every ${restModal.day}?`}
                  </div>
                </div>

                {/* Options */}
                <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
                  <button onClick={() => applyRestOverride("once")}
                    style={{ width:"100%", padding:"14px 16px", borderRadius:14, textAlign:"left",
                      border:"1px solid " + t.hairlineStrong, background:t.surface2,
                      cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                    <div style={{ fontSize:15, fontWeight:600, color:t.text1 }}>This instance only</div>
                    <div style={{ fontSize:12, color:t.text3, marginTop:2 }}>
                      Just {restModal.dateStr} — next {restModal.day} stays as normal
                    </div>
                  </button>

                  <button onClick={() => applyRestOverride("repeat")}
                    style={{ width:"100%", padding:"14px 16px", borderRadius:14, textAlign:"left",
                      border:"1px solid " + t.hairlineStrong, background:t.surface2,
                      cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                    <div style={{ fontSize:15, fontWeight:600, color:t.text1 }}>Every {restModal.day}</div>
                    <div style={{ fontSize:12, color:t.text3, marginTop:2 }}>
                      Updates your repeating schedule going forward
                    </div>
                  </button>

                  <button onClick={() => setRestModal(null)}
                    style={{ width:"100%", padding:"12px", borderRadius:14,
                      border:"none", background:"transparent",
                      color:t.text3, fontSize:14, cursor:"pointer", fontFamily:"inherit", touchAction:"manipulation" }}>
                    Cancel
                  </button>
                </div>
              </div>
              </div>
            </>
          )}

          {/* ════════ EDIT MODAL ════════ */}
          {showEdit && (
            <>
              {/* Backdrop — unconditional close */}
              <div style={{ position:"fixed", inset:0, zIndex:100,
                background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
                onClick={closeEdit} />
              {/* Sheet — pinned to bottom, pointer-events isolated */}
              <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:101,
                display:"flex", justifyContent:"center", pointerEvents:"none" }}>
              <div style={{ width:"100%", maxWidth:430,
                background:t.surface1, borderRadius:"24px 24px 0 0",
                border:"1px solid " + t.hairlineStrong, maxHeight:"88vh", display:"flex", flexDirection:"column",
                pointerEvents:"auto" }}>

                {/* Modal header */}
                <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid " + t.hairline,
                  display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                  {editDay ? (
                    <button onClick={backToGoals} style={{ background:t.surface2, border:"1px solid " + t.hairline,
                      borderRadius:10, padding:"6px 12px", color:t.text2, fontSize:13,
                      cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
                  ) : (
                    <div style={{ fontSize:17, fontWeight:700, color:t.text1 }}>Edit</div>
                  )}
                  {editDay && (
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>{editDay}</div>
                      <div style={{ display:"flex", gap:8 }}>
                        <input value={draftFocus} onChange={e => setDraftFocus(e.target.value)}
                          placeholder="Focus (e.g. Arms)"
                          style={{ flex:1, padding:"6px 10px", borderRadius:8, border:"1px solid " + t.hairlineStrong,
                            background:t.surface2, color:t.text1, fontSize:14, fontWeight:600,
                            outline:"none", fontFamily:"inherit" }} />
                        <input value={draftTag} onChange={e => setDraftTag(e.target.value.toUpperCase())}
                          placeholder="TAG"
                          style={{ width:72, padding:"6px 10px", borderRadius:8, border:"1px solid " + t.hairlineStrong,
                            background:t.surface2, color:t.text1, fontSize:12, fontWeight:700,
                            outline:"none", fontFamily:"inherit", textTransform:"uppercase" }} />
                      </div>
                    </div>
                  )}
                  <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                    {editDay && customSched[editDay] && (
                      <button onClick={() => { resetDay(editDay); backToGoals(); }}
                        style={{ background:"transparent", border:"1px solid " + t.danger + "60",
                          borderRadius:10, padding:"6px 12px", color:t.danger, fontSize:12,
                          cursor:"pointer", fontFamily:"inherit" }}>Reset</button>
                    )}
                    <button onClick={closeEdit}
                      style={{ width:32, height:32, borderRadius:10, border:"1px solid " + t.hairline,
                        background:t.surface2, color:t.text2, fontSize:18, cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" }}>×</button>
                  </div>
                </div>

                {/* Modal body */}
                <div style={{ overflowY:"scroll", WebkitOverflowScrolling:"touch", touchAction:"pan-y", padding:"16px 20px 32px", flex:1 }}
                  >

                  {/* ── Goals view ── */}
                  {!editDay && (() => {
                    const goalInp = { padding:"10px 12px", borderRadius:10, textAlign:"center",
                      border:"1px solid " + t.hairlineStrong, background:t.surface2,
                      color:t.text1, fontSize:16, fontWeight:700, outline:"none",
                      fontFamily:"inherit", width:80 };
                    const row = (label, icon, color, draft, setDraft, unit) => (
                      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0",
                        borderBottom:"1px solid " + t.hairline }}>
                        <div style={{ width:34, height:34, borderRadius:10, background:t.surface2,
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {icon}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:t.text1 }}>{label}</div>
                          <div style={{ fontSize:11, color:t.text3 }}>{unit}</div>
                        </div>
                        <input type="number" value={draft}
                          onChange={e => setDraft(e.target.value)}
                          style={goalInp} />
                      </div>
                    );
                    return (
                      <div>
                        <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em",
                          textTransform:"uppercase", marginBottom:10 }}>Training Phase</div>
                        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                          {[1,2,3,4].map(p => (
                            <button key={p} onClick={() => setPhase(p)} style={{
                              flex:1, padding:"10px 4px", borderRadius:12, fontFamily:"inherit",
                              border:"1px solid " + (phase === p ? t.info : t.hairline),
                              background: phase === p ? t.info + "15" : t.surface2,
                              color: phase === p ? t.info : t.text2,
                              fontSize:13, fontWeight:700, cursor:"pointer", touchAction:"manipulation" }}>
                              <div style={{ fontSize:15, fontWeight:700 }}>P{p}</div>
                              <div style={{ fontSize:10, marginTop:2, opacity:0.8 }}>
                                {["Beginner","Intermediate","Advanced","Pro"][p-1]}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em",
                          textTransform:"uppercase", marginBottom:10 }}>Daily Goals</div>
                        {row("Calories", <IconFlame size={16} color={t.danger} />,     t.danger,     draftCal, setDraftCal, "calories / day")}
                        {row("Protein",  <IconSteak size={16} color={t.periwinkle} />, t.periwinkle, draftPro, setDraftPro, "grams / day")}
                        {row("Water",    <IconDrop  size={16} color={t.info} />,       t.info,       draftWat, setDraftWat, "oz / day")}

                        <button onClick={commitGoals}
                          style={{ width:"100%", marginTop:14, padding:"13px", borderRadius:14,
                            border:"none", background:t.green, color:"#000",
                            fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                          Save Goals
                        </button>

                        <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em",
                          textTransform:"uppercase", margin:"20px 0 10px" }}>Challenge</div>
                        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0",
                          borderBottom:"1px solid " + t.hairline }}>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13, fontWeight:600, color:t.text1 }}>Start Date</div>
                            <div style={{ fontSize:11, color:t.text3 }}>Day 1 of your 100-day challenge</div>
                          </div>
                          <input type="date" defaultValue={challengeStart}
                            onChange={e => { if (e.target.value) ss.set("challengeStart", e.target.value); }}
                            onBlur={e => { if (e.target.value) { ss.set("challengeStart", e.target.value); closeEdit(); window.location.reload(); }}}
                            style={{ padding:"8px 10px", borderRadius:10,
                              border:"1px solid " + t.hairlineStrong, background:t.surface2,
                              color:t.text1, fontSize:13, outline:"none", fontFamily:"inherit" }} />
                        </div>

                        <div style={{ fontSize:11, color:t.text3, fontWeight:700, letterSpacing:"0.08em",
                          textTransform:"uppercase", margin:"20px 0 10px" }}>Workouts</div>
                        {DAYS.map(day => {
                          const s        = getSched(day);
                          const isRest   = isRestDay(day, dateStrFor(day));
                          const isCustom = !!customSched[day];
                          const dateStr  = dateStrFor(day);
                          const menuOpen = dayMenu === day;
                          return (
                            <div key={day}>
                              <div style={{ display:"flex", alignItems:"center", gap:10,
                                padding:"11px 0", borderBottom: menuOpen ? "none" : "1px solid " + t.hairline }}>
                                <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0,
                                  background: isRest ? t.text3 : s.color }} />
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:14, fontWeight:600, color:t.text1 }}>{day}</div>
                                  <div style={{ fontSize:12, color:t.text3, marginTop:1 }}>
                                    {isRest ? "Rest Day" : s.exercises.length + " exercises · " + s.focus}
                                    {isCustom && <span style={{ color:t.gold, marginLeft:6, fontSize:11 }}>✎</span>}
                                  </div>
                                </div>
                                <button data-daymenu="true" onClick={e => { e.stopPropagation(); setDayMenu(d => d === day ? null : day); }}
                                  style={{ width:32, height:32, borderRadius:10, border:"1px solid " + (menuOpen ? t.info : t.hairline),
                                    background: menuOpen ? t.info + "15" : t.surface2,
                                    cursor:"pointer", fontFamily:"inherit", flexShrink:0,
                                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"3px" }}>
                                  <span style={{ display:"block", width:3, height:3, borderRadius:"50%", background: menuOpen ? t.info : t.text2 }} />
                                  <span style={{ display:"block", width:3, height:3, borderRadius:"50%", background: menuOpen ? t.info : t.text2 }} />
                                  <span style={{ display:"block", width:3, height:3, borderRadius:"50%", background: menuOpen ? t.info : t.text2 }} />
                                </button>
                              </div>
                              {menuOpen && (<div onClick={e => e.stopPropagation()}
                                  style={{ marginBottom:8, borderRadius:12, overflow:"hidden",
                                    border:"1px solid " + t.hairlineStrong, background:t.surface2,
                                    boxShadow:t.shadow2 }}>
                                  <button onClick={() => { openDay(day); setDayMenu(null); }}
                                    style={{ display:"flex", alignItems:"center", gap:10, width:"100%",
                                      padding:"13px 16px", textAlign:"left", background:"transparent",
                                      border:"none", borderBottom:"1px solid " + t.hairline,
                                      color:t.text1, fontSize:14, fontWeight:500,
                                      cursor:"pointer", fontFamily:"inherit" }}>
                                    ✏️ Edit exercises
                                  </button>
                                  <button onClick={() => { setRestModal({ day, dateStr, toRest: !isRest }); setDayMenu(null); }}
                                    style={{ display:"flex", alignItems:"center", gap:10, width:"100%",
                                      padding:"13px 16px", textAlign:"left", background:"transparent",
                                      border:"none", color: isRest ? t.info : t.text2,
                                      fontSize:14, fontWeight:500,
                                      cursor:"pointer", fontFamily:"inherit" }}>
                                    {isRest ? "🏋️ Set as workout day" : "🛌 Set as rest day"}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* ── Day editor ── */}
                  {editDay && (
                    <div>
                      {exList.map((ex, i) => (
                        <div key={i} style={{ background:t.surface2, borderRadius:14, padding:"12px",
                          marginBottom:8, border:"1px solid " + t.hairline }}>
                          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                            <input placeholder="Exercise name" value={ex.name}
                              onChange={e => updateEx(i, "name", e.target.value)}
                              style={{ flex:1, padding:"10px 12px", borderRadius:10,
                                border:"1px solid " + t.hairlineStrong, background:t.surface1,
                                color:t.text1, fontSize:14, outline:"none", fontFamily:"inherit" }} />
                            <button onClick={() => removeEx(i)}
                              style={{ flexShrink:0, width:36, height:36, borderRadius:10,
                                border:"1px solid " + t.danger + "50", background:"transparent",
                                color:t.danger, fontSize:18, cursor:"pointer",
                                display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                            <div>
                              <div style={{ fontSize:11, color:t.text3, marginBottom:4, fontWeight:600,
                                textTransform:"uppercase", letterSpacing:"0.06em" }}>Sets</div>
                              <input type="number" min="1" value={ex.sets}
                                onChange={e => updateEx(i, "sets", parseInt(e.target.value)||1)}
                                style={{ width:"100%", padding:"10px 12px", borderRadius:10,
                                  border:"1px solid " + t.hairlineStrong, background:t.surface1,
                                  color:t.text1, fontSize:14, outline:"none", fontFamily:"inherit" }} />
                            </div>
                            <div>
                              <div style={{ fontSize:11, color:t.text3, marginBottom:4, fontWeight:600,
                                textTransform:"uppercase", letterSpacing:"0.06em" }}>Reps / Time</div>
                              <input placeholder="e.g. 12 or 30s" value={ex.reps}
                                onChange={e => updateEx(i, "reps", e.target.value)}
                                style={{ width:"100%", padding:"10px 12px", borderRadius:10,
                                  border:"1px solid " + t.hairlineStrong, background:t.surface1,
                                  color:t.text1, fontSize:14, outline:"none", fontFamily:"inherit" }} />
                            </div>
                          </div>
                          <div style={{ fontSize:11, color:t.text3, marginBottom:4, fontWeight:600,
                            textTransform:"uppercase", letterSpacing:"0.06em" }}>Tip (optional)</div>
                          <input placeholder="Coaching cue..." value={ex.tip}
                            onChange={e => updateEx(i, "tip", e.target.value)}
                            style={{ width:"100%", padding:"10px 12px", borderRadius:10,
                              border:"1px solid " + t.hairlineStrong, background:t.surface1,
                              color:t.text1, fontSize:14, outline:"none", fontFamily:"inherit" }} />
                        </div>
                      ))}

                      <button onClick={addEx}
                        style={{ width:"100%", padding:"11px", borderRadius:12, marginBottom:10,
                          border:"1px dashed " + t.hairlineStrong, background:"transparent",
                          color:t.text3, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                        + Add Exercise
                      </button>
                      <button onClick={saveDay}
                        style={{ width:"100%", padding:"13px", borderRadius:14,
                          border:"none", background:t.green, color:"#000",
                          fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                        Save Workout
                      </button>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </>
          )}

        </div>

        {/* Safe area */}
        <div style={{ height:16, background:t.bg }} />
      </div>
    </div>
  );
}
