import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Repeat,
  Volume2,
  VolumeX,
} from 'lucide-react';

import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  0: {
    title: 'AI Command Center',
    filePath: 'src/components/video/video_scenes/Scene1.tsx',
  },
  1: {
    title: 'Specialist Agents',
    filePath: 'src/components/video/video_scenes/Scene2.tsx',
  },
  2: {
    title: 'Live Visibility',
    filePath: 'src/components/video/video_scenes/Scene3.tsx',
  },
  3: {
    title: 'Open CLAW',
    filePath: 'src/components/video/video_scenes/Scene4.tsx',
  },
  4: {
    title: 'Manufacturing Impact',
    filePath: 'src/components/video/video_scenes/Scene5.tsx',
  },
};

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;

  window.parent.postMessage(
    {
      type: 'REPLIT_VIDEO_SCENE_SELECTED',
      payload: {
        sceneIndex: index,
        sceneCount: sceneKeys.length,
        sceneTitle: details.title || key,
        filePath: details.filePath,
        lineNumber: 1,
      },
    },
    '*',
  );
}

export default function VideoWithControls() {
  const isIframed =
    typeof window !== 'undefined' && window.self !== window.top;
  const {
    sceneKeys,
    activeIndex,
    locked,
    paused,
    mountKey,
    tick,
    durations,
    activeDuration,
    activeStartTime,
    totalDuration,
    onSceneChange,
    jumpTo,
    toggleLock,
    togglePause,
  } = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);

  useEffect(() => {
    if (!paused) return;
    const runningAnimations = document
      .getAnimations()
      .filter((animation) => animation.playState === 'running');
    runningAnimations.forEach((animation) => animation.pause());
    return () => runningAnimations.forEach((animation) => animation.play());
  }, [paused]);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      if (sensorRef.current && !sensorRef.current.contains(event.target as Node)) {
        setTapPinned(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [collapsed, tapPinned]);

  const handleJumpTo = useCallback(
    (index: number) => {
      jumpTo(index);
      announceSceneSelection(index, sceneKeys);
    },
    [jumpTo, sceneKeys],
  );
  const handlePointerEnter = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
    },
    [collapsed],
  );
  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      if (!value) {
        setHovering(false);
        setTapPinned(false);
      }
      return !value;
    });
  }, []);

  if (!isIframed) return <VideoTemplate />;

  return (
    <div className="relative h-screen w-full">
      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop
        muted={muted}
        paused={paused}
        onSceneChange={onSceneChange}
      />
      <div
        ref={sensorRef}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="flex-1 w-full" aria-hidden="true" />
        <div
          className={`flex items-center gap-3 bg-black/55 px-5 py-4 backdrop-blur-sm transition-all duration-200 ${
            !collapsed || hovering || tapPinned
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-full opacity-0'
          }`}
          aria-hidden={collapsed && !hovering && !tapPinned}
        >
          <button
            type="button"
            onClick={togglePause}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title={paused ? 'Play' : 'Pause'}
            aria-label={paused ? 'Play' : 'Pause'}
          >
            {paused ? <Play className="h-8 w-8" /> : <Pause className="h-8 w-8" />}
          </button>
          <button
            type="button"
            onClick={toggleLock}
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg transition-colors ${
              locked
                ? 'bg-white/15 text-white hover:bg-white/25'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
            aria-label={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
            aria-pressed={locked}
          >
            <Repeat className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title={muted ? 'Unmute' : 'Mute'}
            aria-label={muted ? 'Unmute' : 'Mute'}
            aria-pressed={muted}
          >
            {muted ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
          </button>
          <div className="w-px self-stretch bg-white/15" aria-hidden="true" />
          <PlaybackStatus
            sceneKeys={sceneKeys}
            activeIndex={activeIndex}
            activeDuration={activeDuration}
            activeStartTime={activeStartTime}
            totalDuration={totalDuration}
            tick={tick}
            paused={paused}
            onJumpTo={handleJumpTo}
          />
          <button
            type="button"
            onClick={handleToggleCollapsed}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title={collapsed ? 'Show controls' : 'Hide controls'}
            aria-label={collapsed ? 'Show controls' : 'Hide controls'}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronUp className="h-10 w-10" /> : <ChevronDown className="h-10 w-10" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaybackStatus({
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  paused,
  onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + performance.now() - startedAt);
    }, 60);
    return () => {
      window.clearInterval(interval);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [paused, tick]);

  const progress =
    activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(
    totalDuration,
    activeStartTime + Math.min(elapsed, activeDuration),
  );

  return (
    <>
      <div className="flex flex-1 items-center gap-1.5">
        {sceneKeys.map((key, index) => (
          <button
            type="button"
            key={key}
            onClick={() => onJumpTo(index)}
            className="relative h-3 min-h-3 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/20 transition-all hover:h-4 hover:bg-white/25"
            aria-label={`Jump to scene ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white/90 transition-[width] duration-100"
              style={{ width: `${index === activeIndex ? progress * 100 : 0}%` }}
            />
          </button>
        ))}
      </div>
      <div className="shrink-0 font-mono text-xl tabular-nums text-white/60">
        {activeIndex + 1}/{sceneKeys.length}
      </div>
      <div
        className="min-w-[11ch] shrink-0 text-right font-mono text-xl tabular-nums text-white/80"
        role="timer"
        aria-label={`Playback time ${formatPlaybackTime(totalElapsed)} of ${formatPlaybackTime(totalDuration)}`}
      >
        {formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}
      </div>
    </>
  );
}

function formatPlaybackTime(durationMs: number): string {
  const seconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}