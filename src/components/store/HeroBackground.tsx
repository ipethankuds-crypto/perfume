import { useEffect, useRef, useState } from "react";

const videoId = "gZxQaZn7tv0";
type BackgroundPlayer = {
  unloadModule: (module: string) => void;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
};
type PlayerEvent = { target: BackgroundPlayer };
type YouTubeApi = {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    playerVars: Record<string, string | number>;
    events: Record<string, (event: PlayerEvent) => void>;
  }) => BackgroundPlayer;
};
type YouTubeWindow = Window & {
  YT?: YouTubeApi;
  onYouTubeIframeAPIReady?: () => void;
};

let apiPromise: Promise<YouTubeApi> | undefined;
function loadYouTubeApi() {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
      const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
      youtubeWindow.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve(youtubeWindow.YT!);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        script.remove();
        reject(new Error("YouTube player could not load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export function HeroBackground() {
  const [allowMotion, setAllowMotion] = useState(false);
  const videoContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setAllowMotion(!preference.matches);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!allowMotion) return;
    let cancelled = false;
    let player: BackgroundPlayer | undefined;
    const hideCaptions = ({ target }: PlayerEvent) => {
      target.unloadModule("captions");
    };
    void loadYouTubeApi().then((api) => {
      if (cancelled || !videoContainer.current) return;
      // YouTube owns this child; React only owns its surrounding container.
      const host = document.createElement("div");
      videoContainer.current.appendChild(host);
      player = new api.Player(host, {
        videoId,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: videoId,
          controls: 0, playsinline: 1, disablekb: 1, rel: 0,
          cc_load_policy: 0, origin: window.location.origin,
        },
        events: { onReady: hideCaptions, onApiChange: hideCaptions },
      });
      const iframe = player.getIframe();
      iframe.className = "hero-youtube-frame";
      iframe.title = "Dior Homme, The New Parfum background video";
      iframe.tabIndex = -1;
      iframe.allow = "autoplay; encrypted-media";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
    }).catch(() => {
      // Keep the plain dark background if the external player is unavailable.
    });
    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [allowMotion]);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#191919]" />
      {allowMotion && (
        <div ref={videoContainer} className="hero-youtube-container pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden="true" />
      )}
    </>
  );
}
