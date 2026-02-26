"use client";

import { Video, Mic, LayoutGrid, MonitorPlay, Save, Plus, FileQuestion, Type, List, Link as LinkIcon, UploadCloud, PlayCircle, X, Check, FileCheck, Trash2, Square } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

type Question = {
    id: number;
    type: "typable" | "multichoice";
    text: string;
    options?: string[];
    correctAnswer?: string;
};

type Lesson = {
    id: number;
    title: string;
    type: "video" | "quiz";
    videoSource?: string;
    videoUrl?: string;
    audioUrl?: string;
    questions?: Question[];
};

function extractYouTubeId(url: string): string | null {
    if (!url) return null;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

export default function CourseStudio() {
    const { t } = useLanguage();
    const [lessons, setLessons] = useState<Lesson[]>([
        {
            id: 1, title: "Introduction to Luxury Closing", type: "video",
            videoSource: "youtube", videoUrl: "https://www.youtube.com/watch?v=tO01J-M3g0U"
        },
        {
            id: 2, title: "Off-Plan Sales Masterclass", type: "video",
            videoSource: "youtube", videoUrl: "https://www.youtube.com/watch?v=gG22XNhtnoY"
        },
        {
            id: 3, title: "Module 1 Assessment", type: "quiz",
            questions: [
                { id: 101, type: "multichoice", text: "What is the primary factor high-net-worth investors consider?", options: ["Marble finishes", "Community & capital appreciation", "Discount percentage", "Handover date"], correctAnswer: "Community & capital appreciation" },
                { id: 102, type: "multichoice", text: "Which Dubai area has the highest ROI for off-plan in 2026?", options: ["Dubai Marina", "Business Bay", "Dubai Hills Estate", "JVC"], correctAnswer: "Dubai Hills Estate" },
                { id: 103, type: "typable", text: "Name the regulatory body governing Dubai real estate.", correctAnswer: "RERA" },
            ]
        },
        {
            id: 4, title: "Client Psychology Deep Dive", type: "video",
            videoSource: "youtube", videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
        },
        {
            id: 5, title: "Final Certification Quiz", type: "quiz",
            questions: [
                { id: 201, type: "multichoice", text: "What document must be provided to off-plan buyers under RERA regulations?", options: ["SPA (Sale Purchase Agreement)", "MOU only", "Verbal agreement", "Email confirmation"], correctAnswer: "SPA (Sale Purchase Agreement)" },
                { id: 202, type: "multichoice", text: "The ideal follow-up timeline for a luxury lead is:", options: ["Same day", "Within 24 hours", "Within 1 week", "No rush"], correctAnswer: "Within 24 hours" },
            ]
        }
    ]);
    const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
    const [saved, setSaved] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const videoUploadRef = useRef<HTMLInputElement>(null);
    const audioUploadRef = useRef<HTMLInputElement>(null);

    const waveHeights = useMemo(() => {
        const h: number[] = []; let s = 42;
        for (let i = 0; i < 50; i++) { s = (s * 16807) % 2147483647; h.push((s % 60) + 10); }
        return h;
    }, []);
    const recordingDurations = useMemo(() => {
        const d: number[] = []; let s = 123;
        for (let i = 0; i < 50; i++) { s = (s * 16807) % 2147483647; d.push(0.5 + (s % 500) / 1000); }
        return d;
    }, []);

    const activeLesson = lessons.find(l => l.id === selectedLessonId);

    const addLesson = (type: "video" | "quiz") => {
        const nl: Lesson = { id: Date.now(), title: `New ${type === 'video' ? 'Lesson' : 'Quiz'}`, type, ...(type === 'quiz' ? { questions: [] } : { videoSource: "youtube", videoUrl: "" }) };
        setLessons([...lessons, nl]); setSelectedLessonId(nl.id);
    };
    const updateActiveLesson = (u: Partial<Lesson>) => setLessons(lessons.map(l => l.id === selectedLessonId ? { ...l, ...u } : l));
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const addQuestion = (type: "typable" | "multichoice") => {
        if (activeLesson?.type !== "quiz") return;
        const nq: Question = { id: Date.now(), type, text: "", options: type === "multichoice" ? ["Option 1", "Option 2"] : undefined };
        updateActiveLesson({ questions: [...(activeLesson.questions || []), nq] });
    };
    const updateQuestion = (qId: number, u: Partial<Question>) => {
        if (activeLesson?.type !== "quiz" || !activeLesson.questions) return;
        updateActiveLesson({ questions: activeLesson.questions.map(q => q.id === qId ? { ...q, ...u } : q) });
    };
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) updateActiveLesson({ videoUrl: URL.createObjectURL(e.target.files[0]) }); };
    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) updateActiveLesson({ audioUrl: URL.createObjectURL(e.target.files[0]) }); };
    const toggleRecord = () => { if (isRecording) { setIsRecording(false); updateActiveLesson({ audioUrl: "recorded_audio.wav" }); } else setIsRecording(true); };
    const deleteLesson = (e: React.MouseEvent, id: number) => { e.stopPropagation(); setLessons(lessons.filter(l => l.id !== id)); if (selectedLessonId === id) setSelectedLessonId(lessons.find(l => l.id !== id)?.id || 0); };

    const ytId = activeLesson?.type === "video" && activeLesson.videoSource !== "local" ? extractYouTubeId(activeLesson.videoUrl || "") : null;

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("Course Studio")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("Record, edit, assemble training materials, and build quizzes.")}</p>
                </div>
                <button onClick={handleSave} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {saved ? (
                            <motion.div key="saved" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2"><FileCheck className="w-4 h-4" /> {t("Saved!")}</motion.div>
                        ) : (
                            <motion.div key="save" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2"><Save className="w-4 h-4" /> {t("Save Draft")}</motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    {activeLesson ? (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    {activeLesson.type === 'video' ? <Video className="text-violet-500 w-5 h-5" /> : <FileQuestion className="text-violet-500 w-5 h-5" />}
                                    <input type="text" value={activeLesson.title} onChange={(e) => updateActiveLesson({ title: e.target.value })} className="text-xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white w-full focus:ring-0 p-0" placeholder={t("Enter lesson title...")} />
                                </div>
                            </div>

                            {activeLesson.type === "video" ? (
                                <>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <MonitorPlay className="w-5 h-5 text-violet-500" />
                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Video Source")}</h2>
                                            </div>
                                            <div className="flex gap-2">
                                                {["local", "youtube", "drive", "github"].map(src => (
                                                    <button key={src} onClick={() => updateActiveLesson({ videoSource: src })} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${activeLesson.videoSource === src ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-white/10'}`}>{src}</button>
                                                ))}
                                            </div>
                                        </div>

                                        {activeLesson.videoSource === "local" ? (
                                            <div className="w-full aspect-video bg-slate-50 dark:bg-black/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-violet-500/50 transition-colors cursor-pointer group relative overflow-hidden" onClick={() => !activeLesson.videoUrl && videoUploadRef.current?.click()}>
                                                <input type="file" accept="video/*" className="hidden" ref={videoUploadRef} onChange={handleVideoUpload} />
                                                {activeLesson.videoUrl ? (
                                                    <>
                                                        <video src={activeLesson.videoUrl} className="w-full h-full object-cover bg-black" controls />
                                                        <button onClick={(e) => { e.stopPropagation(); updateActiveLesson({ videoUrl: "" }); }} className="absolute top-4 right-4 bg-rose-500/80 text-white p-2 rounded-lg hover:bg-rose-600 transition-colors backdrop-blur-md z-10" title="Remove video"><Trash2 className="w-4 h-4" /></button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors"><UploadCloud className="w-8 h-8 text-slate-400 dark:text-zinc-500 group-hover:text-violet-500" /></div>
                                                        <div className="text-center"><p className="text-slate-700 dark:text-zinc-300 font-medium">{t("Click to upload or drag files")}</p><p className="text-sm text-slate-500 dark:text-zinc-500">{t("MP4, WebM up to 2GB")}</p></div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <LinkIcon className="w-5 h-5 text-slate-400 shrink-0" />
                                                    <input type="text" placeholder={`Paste ${activeLesson.videoSource} video link here...`} value={activeLesson.videoUrl} onChange={(e) => updateActiveLesson({ videoUrl: e.target.value })} className="w-full bg-white dark:bg-black border border-slate-300 dark:border-white/20 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                                                </div>
                                                {ytId ? (
                                                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}?rel=0`} title={activeLesson.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="bg-black" />
                                                    </div>
                                                ) : activeLesson.videoUrl ? (
                                                    <div className="px-4 py-3 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg flex items-center gap-2">
                                                        <LinkIcon className="w-4 h-4" /> Link saved. Paste a valid YouTube URL to see preview.
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>

                                    {/* Voiceover */}
                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3"><Mic className="w-5 h-5 text-violet-500" /><h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Voiceover & Audio Option")}</h2></div>
                                            <div className="flex items-center gap-2">
                                                <input type="file" accept="audio/*" className="hidden" ref={audioUploadRef} onChange={handleAudioUpload} />
                                                <button onClick={() => audioUploadRef.current?.click()} className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><UploadCloud className="w-4 h-4" /> {t("Upload Audio")}</button>
                                                <button onClick={toggleRecord} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isRecording ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20'}`}>{isRecording ? <Square className="w-3 h-3 fill-current" /> : <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}{isRecording ? t("Stop") : t("Record")}</button>
                                            </div>
                                        </div>
                                        <div className="h-28 bg-slate-50 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden">
                                            {isRecording && (<div className="absolute inset-0 flex items-center px-4 gap-1 opacity-60">{[...Array(50)].map((_, i) => (<motion.div key={i} animate={{ height: ['20%', '100%', '20%'] }} transition={{ duration: recordingDurations[i], repeat: Infinity, ease: "easeInOut" }} className="flex-1 bg-rose-500 rounded-full" />))}</div>)}
                                            {!isRecording && activeLesson.audioUrl && (<div className="absolute inset-0 flex items-center justify-between px-6 bg-violet-500/10 backdrop-blur-sm"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-md"><PlayCircle className="w-5 h-5 ml-0.5" /></div><div><p className="text-sm font-bold text-slate-900 dark:text-white">Voiceover Track</p><p className="text-xs text-slate-500 dark:text-zinc-400">Ready to play</p></div></div><button onClick={() => updateActiveLesson({ audioUrl: "" })} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors" title="Remove audio"><Trash2 className="w-4 h-4" /></button></div>)}
                                            {!isRecording && !activeLesson.audioUrl && (<><div className="absolute inset-0 flex items-center px-4 gap-1 opacity-20">{[...Array(50)].map((_, i) => (<div key={i} className="flex-1 bg-violet-500 rounded-full" style={{ height: `${waveHeights[i]}%` }} />))}</div><p className="text-slate-500 dark:text-zinc-500 text-sm font-medium z-10 bg-white/50 dark:bg-black/50 px-3 py-1 rounded backdrop-blur-sm">{t("Audio timeline (Optional)")}</p></>)}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Quiz Editor */
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3"><FileQuestion className="w-5 h-5 text-emerald-500" /><h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Questions Manager")}</h2></div>
                                        <div className="flex gap-2">
                                            <button onClick={() => addQuestion("multichoice")} className="px-3 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><List className="w-4 h-4" /> {t("Multi-Choice")}</button>
                                            <button onClick={() => addQuestion("typable")} className="px-3 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><Type className="w-4 h-4" /> {t("Typable")}</button>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        {!activeLesson.questions?.length && (<div className="text-center py-10 bg-slate-50 dark:bg-black/30 rounded-xl border border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-zinc-500 font-medium">{t("No questions added yet.")}</div>)}
                                        {activeLesson.questions?.map((q, idx) => (
                                            <div key={q.id} className="p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20">
                                                <div className="flex gap-3 mb-3">
                                                    <span className="bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 font-bold w-6 h-6 flex items-center justify-center rounded shrink-0">{idx + 1}</span>
                                                    <input type="text" placeholder={t("Enter question text...")} value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })} className="w-full bg-transparent text-slate-900 dark:text-white border-b border-slate-300 dark:border-white/20 focus:border-violet-500 outline-none pb-1 font-medium" />
                                                </div>
                                                <div className="pl-9 space-y-2">
                                                    {q.type === "multichoice" ? (
                                                        <>
                                                            {q.options?.map((opt, oIdx) => (
                                                                <div key={oIdx} className="flex items-center gap-2">
                                                                    <div className={`w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center ${q.correctAnswer === opt ? 'bg-emerald-500 border-emerald-500' : ''}`}>{q.correctAnswer === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}</div>
                                                                    <input type="text" value={opt} onChange={(e) => { const no = [...(q.options || [])]; no[oIdx] = e.target.value; updateQuestion(q.id, { options: no }); }} className="flex-1 bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-md text-sm text-slate-700 dark:text-zinc-300 outline-none focus:border-violet-500" />
                                                                    <button onClick={() => updateQuestion(q.id, { correctAnswer: opt })} className="text-xs font-medium text-slate-500 hover:text-emerald-500 transition-colors">{t("Mark Correct")}</button>
                                                                </div>
                                                            ))}
                                                            <button onClick={() => updateQuestion(q.id, { options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`] })} className="text-xs text-violet-600 dark:text-violet-400 font-medium hover:underline flex items-center gap-1 mt-2"><Plus className="w-3 h-3" /> {t("Add Option")}</button>
                                                        </>
                                                    ) : (
                                                        <div>
                                                            <textarea placeholder="Exact typable answer to validate against..." value={q.correctAnswer || ""} onChange={(e) => updateQuestion(q.id, { correctAnswer: e.target.value })} className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-zinc-300 outline-none focus:border-violet-500 min-h-[60px]" />
                                                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">{t("Users will type their answer. It will be verified against what you enter above.")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-slate-900/50">
                            <p className="text-slate-500 dark:text-zinc-500 font-medium">{t("Select a lesson or quiz from the structure panel to edit.")}</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6"><LayoutGrid className="w-5 h-5 text-violet-500" /><h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Module Structure")}</h2></div>
                        <div className="space-y-3">
                            {lessons.map((item) => (
                                <motion.div layout key={item.id} onClick={() => setSelectedLessonId(item.id)} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all shadow-sm ${selectedLessonId === item.id ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-400 dark:border-violet-500/50' : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}>
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${selectedLessonId === item.id ? 'bg-violet-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-zinc-400'}`}>{item.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileQuestion className="w-4 h-4" />}</div>
                                        <div className="truncate">
                                            <div className={`text-sm font-semibold truncate ${selectedLessonId === item.id ? 'text-violet-900 dark:text-violet-100' : 'text-slate-700 dark:text-zinc-200'}`}>{item.title}</div>
                                            <div className={`text-xs ${selectedLessonId === item.id ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-zinc-500'}`}>{item.type === 'video' ? t('Video Lesson') : t('Interactive Quiz')}</div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => deleteLesson(e, item.id)} title="Delete lesson" className={`p-2 rounded-lg transition-colors ${selectedLessonId === item.id ? 'hover:bg-violet-100 dark:hover:bg-violet-800/50 text-rose-500' : 'hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 dark:text-zinc-600 hover:text-rose-500'}`}><Trash2 className="w-4 h-4" /></button>
                                </motion.div>
                            ))}
                            <div className="pt-4 flex gap-2">
                                <button onClick={() => addLesson("video")} className="flex-1 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><Video className="w-4 h-4" /> {t("Add Video")}</button>
                                <button onClick={() => addLesson("quiz")} className="flex-1 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><FileQuestion className="w-4 h-4" /> {t("Add Quiz")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
