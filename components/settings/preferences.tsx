"use client";

import { useEffect, useState } from "react";
import {
  RowsList,
  SectionTitle,
  Segmented,
  SettingRow,
  SubHeading,
  Toggle,
} from "@/components/settings/ui";

const PREFS_KEY = "peony.preferences";

interface Prefs {
  colorMode: string;
  reduceMotion: string;
  narration: boolean;
  soundEffects: boolean;
  streakReminders: boolean;
  streakAlerts: boolean;
  leagueReminders: boolean;
  leagueAlerts: boolean;
}

const DEFAULTS: Prefs = {
  colorMode: "Light",
  reduceMotion: "Auto",
  narration: false,
  soundEffects: false,
  streakReminders: true,
  streakAlerts: true,
  leagueReminders: true,
  leagueAlerts: true,
};

function load(): Prefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function save(prefs: Prefs) {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

export default function Preferences() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    const id = window.setTimeout(() => setPrefs(load()), 0);
    return () => window.clearTimeout(id);
  }, []);

  const set = (patch: Partial<Prefs>) =>
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });

  return (
    <div>
      <SectionTitle>Appearance</SectionTitle>
      <div className="mt-4">
        <RowsList>
          <SettingRow label="Choose your preferred color mode">
            <Segmented
              options={["Auto", "Light", "Dark"]}
              value={prefs.colorMode}
              onChange={(colorMode) => set({ colorMode })}
            />
          </SettingRow>
          <SettingRow label="Reduce motion">
            <Segmented
              options={["On", "Off", "Auto"]}
              value={prefs.reduceMotion}
              onChange={(reduceMotion) => set({ reduceMotion })}
            />
          </SettingRow>
        </RowsList>
      </div>

      <div className="mt-10">
        <SectionTitle>Sounds</SectionTitle>
        <div className="mt-4">
          <RowsList>
            <SettingRow label="Enable Koji narration in lessons">
              <Toggle
                checked={prefs.narration}
                onChange={(narration) => set({ narration })}
              />
            </SettingRow>
            <SettingRow label="Enable sound effects in lessons">
              <Toggle
                checked={prefs.soundEffects}
                onChange={(soundEffects) => set({ soundEffects })}
              />
            </SettingRow>
          </RowsList>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Email notifications</SectionTitle>

        <SubHeading>Streaks</SubHeading>
        <div className="mt-3">
          <RowsList>
            <SettingRow label="Reminders (during the day)">
              <Toggle
                checked={prefs.streakReminders}
                onChange={(streakReminders) => set({ streakReminders })}
              />
            </SettingRow>
            <SettingRow label="Alerts (warnings when your streak is about to expire)">
              <Toggle
                checked={prefs.streakAlerts}
                onChange={(streakAlerts) => set({ streakAlerts })}
              />
            </SettingRow>
          </RowsList>
        </div>

        <SubHeading>Leagues</SubHeading>
        <div className="mt-3">
          <RowsList>
            <SettingRow label="Reminders (throughout the week)">
              <Toggle
                checked={prefs.leagueReminders}
                onChange={(leagueReminders) => set({ leagueReminders })}
              />
            </SettingRow>
            <SettingRow label="Alerts (sent when Leagues are closing, or you&apos;re at risk of demotion)">
              <Toggle
                checked={prefs.leagueAlerts}
                onChange={(leagueAlerts) => set({ leagueAlerts })}
              />
            </SettingRow>
          </RowsList>
        </div>
      </div>
    </div>
  );
}
