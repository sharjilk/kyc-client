import {
  Gauge,
  User,
  ArrowRight,
  ChartPie,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  dashboard: Gauge,
  user: User,
  arrowRight: ArrowRight,
  report: ChartPie,
};
