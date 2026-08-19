/*
 * The app talks to `window.storage`, which exists inside Claude artifacts but
 * not in a browser. This provides the same four methods on top of localStorage,
 * so PatternLadder.jsx runs unmodified in both places.
 *
 * Your progress lives in localStorage under the key "algo-lms-v2" — it is on
 * this machine only, and clearing site data will erase it. Use the Export
 * progress button on the Plan tab to keep a backup.
 */
const PREFIX = "pl:";

function ensure() {
  if (typeof window === "undefined") return;
  if (window.storage) return; // running inside a Claude artifact already

  window.storage = {
    async get(key) {
      const v = localStorage.getItem(PREFIX + key);
      if (v === null) throw new Error("Key not found: " + key);
      return { key, value: v, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX + prefix)) keys.push(k.slice(PREFIX.length));
      }
      return { keys, prefix, shared: false };
    },
  };
}

ensure();
