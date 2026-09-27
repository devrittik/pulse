"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  LoaderCircle,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";

export function VideoPlayer({
  src,
  title,
  poster,
}: {
  src: string;
  title: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    let hls: Hls | undefined;
    setLoading(true);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false));
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return;
        setLoading(false);
        toast.error("The stream could not be loaded. Try another source.");
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls?.startLoad();
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR)
          hls?.recoverMediaError();
        else hls?.destroy();
      });
    } else {
      setLoading(false);
      toast.error("HLS playback is not supported in this browser.");
    }

    return () => hls?.destroy();
  }, [src]);

  const toggle = () => {
    const video = ref.current;
    if (!video || loading) return;
    video.paused ? void video.play() : video.pause();
  };

  return (
    <div className="group relative aspect-video max-h-[calc(100svh-6rem)] w-full overflow-hidden rounded-none bg-black shadow-2xl sm:rounded-xl">
      <video
        ref={ref}
        className="size-full object-contain"
        poster={poster}
        playsInline
        onLoadStart={() => setLoading(true)}
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setLoading(false)}
        aria-label={title}
      />

      {loading && (
        <div
          className="pointer-events-none absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-[2px]"
          role="status"
          aria-label="Loading stream"
        >
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full border border-white/10 bg-background/70 shadow-glow">
              <LoaderCircle className="size-8 animate-spin text-accent" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-white/80">
              Loading stream
            </p>
          </div>
        </div>
      )}

      <button
        onClick={toggle}
        className="absolute inset-0 grid place-items-center"
        aria-label={playing ? "Pause" : "Play"}
      >
        {!playing && !loading && (
          <span className="grid size-20 place-items-center rounded-full bg-accent/90 text-white shadow-glow">
            <Play className="size-8 fill-current" />
          </span>
        )}
      </button>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
        <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause /> : <Play />}
        </button>
        <button
          onClick={() => {
            if (ref.current) {
              ref.current.muted = !muted;
              setMuted(!muted);
            }
          }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
        <div className="flex-1" />
        <button
          onClick={() => void ref.current?.requestFullscreen()}
          aria-label="Fullscreen"
        >
          <Maximize />
        </button>
      </div>
    </div>
  );
}
