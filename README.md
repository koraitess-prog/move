# MOTION ATLAS — Five-second Motion Imprint

An explicit camera activation starts a movement-sensitive interaction:

**CAMERA → MOVEMENT → 5-SECOND CAPTURE → FROZEN TEMPORAL IMPRINT → LOCAL SAVE → START AGAIN**

The hidden webcam supplies the existing MediaPipe person mask. Actual observed contours form delicate white/grey traces on pure black. Early traces have fixed low opacity (0.10), later traces higher opacity (up to 0.85). Their chronological intensity stays in the final still image; there is no conventional fading trail, skeleton, mesh, body fill or displayed video.

The body drawing now uses actual webcam-image luminance, person-only contrast normalization, edge-preserving smoothing and multiple isoluminance contours. The silhouette only masks the background; the previous nested silhouette insets are disabled in the application. These image-derived paths accumulate with the existing timeline and remain in the saved PNG and normalized trace data. See [image topography, calibration and validation](docs/image-topography.md). Brightness contours describe visible shading/texture, not true anatomical depth.

The active drawing contains **internal image contours only**, with no enclosing silhouette stroke. The minimal default now uses **8 levels** and stronger fragment filtering, with **at most six visible movement states**. Lines are thinner and lighter. The original timestamps, first/latest positions and all stored observations remain intact, with maximum-light compositing and controlled final-pose emphasis. See [minimal linework changes and verification](docs/minimal-linework.md) and the [preceding refinement/checkpoint](docs/internal-temporal-refinement.md).

For one live figure and developer-only density/contrast/smoothing controls, open **http://localhost:5173/?tune=1&live=1**. Capture is explicitly paused in that calibration mode. The panel's link transfers the chosen values to the normal five-second capture. The default `/` interaction is unchanged and production builds have no tuning panel.

## Start locally

Node.js 22.18+ and npm:

```sh
cd motion-atlas
npm ci
npm run dev
```

Open **http://localhost:5173/** in normal Chrome. Select ENABLE CAMERA and manually allow permission. Stand with your body visible, then move an arm or shift position. Capture starts automatically and lasts 5000 ms. No manual recording button is needed. At completion the camera is released, the artwork freezes, and a successful local save reveals START AGAIN. That button clears only the active experience and returns to movement detection. Saved results are preserved.

## Local results

Each completed PNG and its timestamped normalized contour data are stored under a unique UUID in browser-local IndexedDB (`motion-atlas-artworks`, store `artworks`). A committed transaction is required before reporting success. Failed saves keep the artwork visible and offer RETRY SAVE.

This is storage inside the current browser/profile at this localhost origin, not automatic file downloads. Clearing browser site data or using a different browser/port affects access to saved results. No archive interface or upload is implemented. No camera image, video or audio is saved.

## Architecture and reference

[Complete interaction, timing, movement thresholds, persistence and manual verification](docs/five-second-interaction.md).

- `src/capture.ts`: capture lifecycle, exact 5000 ms acceptance deadline, accepted contour snapshots, temporal opacity settings.
- `src/motion.ts`: silhouette area signatures, confidence deadband and meaningful-change measurement.
- `src/motion-imprint.ts`: chronological contour replay into a retained black raster and PNG encoding.
- `src/rendering.ts`: independent live/recorded display, fit, mirror, DPR and resize.
- `src/archive.ts`: portable still-image records and IndexedDB storage, without archive UI.
- `src/main.ts`: explicit camera action, automatic triggering, deadline timer, freeze/save/restart and failure feedback.
- Existing camera/video/vision/segmentation/contour/scheduler modules remain unchanged.

The approved outline/feedback approach adapts MIT-licensed MoCat Effects Lab; [source analysis and exact reuse](docs/motion-imprint.md), [full MIT notice](public/licenses/MOCAT-LICENSE.txt). No new dependency or model was added. `?view=pose&debug=1` preserves the developer-only pose/diagnostic comparison separately from the default interaction.

## Verification

```sh
npm run check
```

Lint, **87 automated tests**, strict TypeScript checking and production build pass. Actual Canvas/IndexedDB checks at `/qa/final-interaction-check.html` exercise **28 checks**, using labelled image-field fixtures. `/qa/topographic-check.html` compares curve counts for the new 8-band preset and the earlier 18-band preset on the same actual photograph and MediaPipe mask, plus frozen PNG and stored image-derived geometry. Historical inset/bitmap QA pages remain separate from the current application.

**The agent has not performed a physical webcam test.** In Chrome, verify that stillness waits, movement starts a five-second countdown, early/middle/late traces differ in brightness, the image freezes and saves, the camera releases, and START AGAIN clears the active image without deleting earlier results. Segmentation quality, small-motion sensitivity and real-camera performance still need your review.

The 5000 ms data window is exact; browser scheduling can delay its final screen update. Missing observations are omitted without pausing the clock. Disabling the camera, hiding the page or a pipeline failure cancels an incomplete capture. No further effect or archive development is included.

Verified pre-refinement checkpoint: `c6d3081`. Recovery checkpoints `c0234aa` and `312a57e` remain preserved. Nothing is pushed or deployed.

[Stationary trace fix, cause, coordinate policy and verification](docs/stationary-traces.md).

[Independent temporal sampling: more movement impressions with unchanged sparse spatial contours](docs/temporal-sampling.md).

[Clearer chronological intensity and fixed key-pose emphasis](docs/temporal-hierarchy.md).

[Capture-trigger repair: continuous slow inference, internal limb motion and close crops](docs/capture-trigger-repair.md).
