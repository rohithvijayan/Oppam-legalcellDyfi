export const GA_TRACKING_ID = "G-CNX95QRRDK";

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as unknown as { gtag: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value?: number }) => {
  if (typeof window !== "undefined" && (window as unknown as { gtag: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
