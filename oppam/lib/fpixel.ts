export const FB_PIXEL_ID = "1283860547013976";

export const pageview = () => {
  if (typeof window !== "undefined" && (window as unknown as { fbq: Function }).fbq) {
    (window as unknown as { fbq: Function }).fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/facebook-pixel/reference/
export const event = (name: string, options = {}) => {
  if (typeof window !== "undefined" && (window as unknown as { fbq: Function }).fbq) {
    (window as unknown as { fbq: Function }).fbq("track", name, options);
  }
};
