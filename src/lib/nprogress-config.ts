import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.1,
});

export const startProgress = () => {
  NProgress.start();
};

export const stopProgress = () => {
  NProgress.done();
};
