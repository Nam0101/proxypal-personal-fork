import { createSignal } from "solid-js";
import { openUrl } from "@tauri-apps/plugin-opener";

interface OpenCodeKitBannerProps {
  onDismiss?: () => void;
}

export function OpenCodeKitBanner(props: OpenCodeKitBannerProps) {
  const [dismissed, setDismissed] = createSignal(false);

  const handleDismiss = () => {
    setDismissed(true);
    props.onDismiss?.();
  };

  const handleVisit = async () => {
    try {
      await openUrl("https://opencodekit.xyz/");
    } catch (error) {
      console.error("Failed to open URL:", error);
      // Fallback to window.open
      window.open("https://opencodekit.xyz/", "_blank");
    }
  };

  if (dismissed()) return null;

  return (
    <div class="relative rounded-xl overflow-hidden shadow-xl">
      {/* Background - dark professional theme */}
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Green accent line at top - OpenCodeKit brand color #10B981 */}
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />

      {/* Content */}
      <div class="relative px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
        {/* Left: Logo and Text */}
        <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* OpenCodeKit Logo */}
          <div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center">
            <img
              src="/logos/opencodekit.svg"
              alt="OpenCodeKit"
              class="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
          </div>

          {/* Text Content */}
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-sm sm:text-base font-bold text-white">
                OpenCodeKit
              </h3>
              <span class="inline-block px-2 py-0.5 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                PRO CONFIG
              </span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300 line-clamp-2">
              Production-ready configuration for OpenCode. Get the best AI
              coding experience.
            </p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleVisit}
            class="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 text-xs sm:text-sm whitespace-nowrap"
          >
            Learn More
          </button>
          <button
            onClick={handleDismiss}
            class="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
            title="Dismiss"
            aria-label="Dismiss banner"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
