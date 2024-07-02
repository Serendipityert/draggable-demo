import { LocationQueryRaw, RouteRecordName } from "vue-router";

export interface TRouterInfo {
  path?: string;
  query?: LocationQueryRaw;
  routeIdx?: number;
  title?: string;
  name?: RouteRecordName;
  isAlive?: boolean;
  isHome?: boolean;
  meta?: any;
  redirect?: string;
  component?: any;
  children?: TRouterInfo[];
}
