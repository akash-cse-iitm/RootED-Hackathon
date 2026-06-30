"use client";

import { useEffect, useState } from "react";
import { Award, Flame, Star } from "lucide-react";

type ProgressState = {
  xp: number;
  streak: number;
  badges: string[];
};

function getStorageKey(userId: string) {
  return `rooted-gapfinder-progress:${userId}`;
}

export function DashboardProgressWidget({ userId }: { userId: string }) {
  const [progress, setProgress] = useState<ProgressState>({
    xp: 0,
    streak: 0,
    badges: []
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(getStorageKey(userId));
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as ProgressState;
    setProgress(parsed);
  }, [userId]);

  return (
    <section className="mt-8 rounded-[2rem] border border-line bg-ink p-6 text-white shadow-card">
      <p className="text-sm uppercase tracking-[0.24em] text-white/65">
        Learner momentum
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/8 p-4">
          <div className="flex items-center gap-2 text-gold">
            <Star className="h-4 w-4" />
            XP
          </div>
          <p className="mt-2 text-2xl font-semibold">{progress.xp}</p>
        </div>
        <div className="rounded-2xl bg-white/8 p-4">
          <div className="flex items-center gap-2 text-gold">
            <Flame className="h-4 w-4" />
            Daily streak
          </div>
          <p className="mt-2 text-2xl font-semibold">{progress.streak} day(s)</p>
        </div>
        <div className="rounded-2xl bg-white/8 p-4">
          <div className="flex items-center gap-2 text-gold">
            <Award className="h-4 w-4" />
            Badges
          </div>
          <p className="mt-2 text-sm leading-6 text-white/80">
            {progress.badges.length > 0
              ? progress.badges.join(" · ")
              : "Complete a roadmap step to unlock your first badge."}
          </p>
        </div>
      </div>
    </section>
  );
}

