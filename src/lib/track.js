// Fire a GoatCounter event when a worked-solution PDF is downloaded.
// GoatCounter's count.js attaches `window.goatcounter` once it loads; we guard
// against it being blocked or still loading, and never let analytics break a
// download. Events show on the dashboard as `download-<paper id>` rows.
// (GoatCounter ignores localhost by design, so events only register on the live
// site — pastpaperdome.in.)
export function trackDownload(paper) {
  try {
    window.goatcounter?.count?.({
      path: `download-${paper.id}`,
      title: `Download ${paper.id}`,
      event: true,
    })
  } catch {
    /* no-op: analytics must never interfere with the download */
  }
}
