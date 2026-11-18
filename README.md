# Say It — American English Speaking Coach

A mobile-friendly speaking practice app built with vanilla HTML, CSS, and JavaScript. No build step or external speech service is required.

## Run it

Open `index.html` in a modern browser, or serve this directory with any static web server. Microphone access requires a secure context: use `localhost` while developing or HTTPS when hosted.

## Speech features

- Phrase playback uses the browser's built-in `SpeechSynthesis` API with `en-US` voice selection and normal/slow playback.
- Speaking practice and roleplay use the browser's built-in `SpeechRecognition` API (`webkitSpeechRecognition` fallback), configured for `en-US`.
- Speech recognition availability varies by browser. Chrome and Edge generally provide the broadest support; browsers without recognition show a friendly notice.
- Speech audio is handled by the browser. The app does not send audio to an app-owned backend.

## Progress

Daily streaks, completed phrases, and the word bank are saved in localStorage on the current device.
