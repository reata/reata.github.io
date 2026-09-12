/**
 * Data point annotations for the "PyPI download trend" line chart on the dashboard.
 *
 * Every entry points at one data point that already exists in the chart data,
 * using the raw coordinates of that point:
 *   x = the `name` field of the point (date in MM-DD, as rendered on the X axis)
 *   y = the downloads value of that point
 *
 * These coordinates only make sense for the "overall" dimension
 * (with_mirrors / without_mirrors), so the chart hides all annotations as soon
 * as another dimension is selected.
 */
export interface DownloadTrendAnnotation {
  /** X coordinate: the `name` of the data point on the chart, i.e. MM-DD */
  x: string;
  /** Y coordinate: the downloads value of that data point */
  y: number;
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
    x: "08-25",
    y: 35591,
    title: "PyPI 不再统计元数据请求",
    link: "https://blog.pypi.org/posts/2026-08-31-download-counts/",
    direction: "down",
    position: "bottom",
  },
];

export default downloadTrendAnnotations;
