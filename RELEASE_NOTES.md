# Meeting Busy 0.4.4

Fixes missed Microsoft Teams calls when Teams exposes its window buttons but keeps its embedded meeting controls inaccessible.

- Meeting Busy now requests Teams' WebView accessibility tree before scanning. Once Teams exposes its controls, Automatic mode can detect the call on a subsequent check without restarting Teams or leaving the meeting.
- Updated the README with the cause and recovery behavior. The app and all browser-extension packages are version 0.4.4 (app build 22).

Observed live on Apple Silicon with macOS 26.6.2 and Teams 26289.204.5281.6363: before the accessibility requests, Teams exposed 40 elements, six window controls, and no meeting match. After the requests, the diagnostic found 267 elements, 32 controls, and an active Teams call; the running app logged the meeting in Automatic mode. This verifies recovery for that call, not the full meeting and sharing lifecycle.

Validation: 66 Swift tests, 24 browser-extension tests, and native-host/Safari-handler integration checks passed. The app, browser host, and Safari extension build for both Apple Silicon and Intel; packaged signatures and release checksums were verified.

Includes the earlier 0.4.x Safari pairing, indicator hide options, and Accessibility permission-prompt fixes. Live Safari meeting and own-sharing checks remain outstanding; Intel runtime behavior and older Safari versions have not been verified. See MANUAL_TESTS.md.

This is an ad hoc signed preview and is not notarized. After updating, macOS may require Accessibility approval again; repair permission only if the app reports access denied. Safari temporary extensions need pairing again after an app update.
