# Meeting Busy 0.4.5

Reliability and cleanup release following a code review. No new features.

- Detection: the Swift detector now uses the same declared Teams/Zoom phrase lists the browser extension mirrors, and a parity test fails if a mirrored list goes unused.
- Browser extension: a tab that was forgotten but keeps its page (same-document navigation) now reconnects and reports again.
- Safari bridge: the local listener rebuilds itself after a failure with exponential backoff (1–60 s) instead of staying down.
- Accessibility scans run on a dedicated queue, and Zoom's menu walk counts toward its per-app deadline.
- The status menu is built when opened rather than on every 2-second poll.
- The Safari extension folder is created with owner-only permissions, and the pairing prompt wording is clearer.
- CI now also builds the release package (universal binaries, extension ZIPs, native host test, signature check).

Includes the 0.4.4 Teams accessibility fix and earlier 0.4.x Safari pairing, indicator hide options, and Accessibility permission-prompt fixes. App and all browser-extension packages are version 0.4.5 (app build 23).

This is an ad hoc signed build and is not notarized. After updating, macOS may require Accessibility approval again; repair permission only if the app reports access denied. Safari temporary extensions need pairing again after an app update. Live Safari meeting and own-sharing checks, Intel runtime behavior, and older Safari versions have not been verified. See MANUAL_TESTS.md.
