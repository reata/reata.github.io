/**
 * Data point annotations for the "PyPI download trend" line chart on the dashboard.
 *
 * Every entry names the day the event happened. The chart looks that day up in
 * whatever window it is drawing and puts the marker on the point it finds, so
 * the annotation survives every window: the daily ones have the exact day, and
 * the weekly ones the long windows use put it on the week containing it.
 *
 * These only make sense for the "overall" dimension (with_mirrors /
 * without_mirrors), so the chart hides all annotations as soon as another
 * dimension is selected.
 */
export interface DownloadTrendAnnotation {
  /** The day the event happened, YYYY-MM-DD */
  date: string;
  /** Short title explaining why the value went up or down that day */
  title: string;
  /** Optional external URL, opened when the annotation is clicked */
  link?: string;
  /** Marker colour only: "up" (default, green) or "down" (red) */
  direction?: "up" | "down";
  /** Optional label position: top (default) | bottom | left | right */
  position?: "top" | "bottom" | "left" | "right";
}

const downloadTrendAnnotations: DownloadTrendAnnotation[] = [
  {
    // 2026-08-25 is the first full day after PyPI stopped counting metadata
    // requests, so the drop here is a change in counting, not in usage.
    // https://blog.pypi.org/posts/2026-08-31-download-counts/
    date: "2026-08-25",
    title: "PyPI 不再统计元数据请求",
    link: "https://blog.pypi.org/posts/2026-08-31-download-counts/",
    direction: "down",
    position: "bottom",
  },
];

export default downloadTrendAnnotations;
