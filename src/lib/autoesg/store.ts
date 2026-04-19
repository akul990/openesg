"use client";

import type { AutoESGStore } from "./types";

const KEY = "autoesg_data";

export function saveStore(data: AutoESGStore): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage full — fail silently
  }
}

export function loadStore(): AutoESGStore | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AutoESGStore) : null;
  } catch {
    return null;
  }
}

export function clearStore(): void {
  localStorage.removeItem(KEY);
}
