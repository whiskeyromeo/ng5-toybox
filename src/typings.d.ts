/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


declare var UIRoute: UI_Route;
interface UI_Route {
  name?: string;
  path?: string;
  component?: any;
  children?: UI_Route[],
  redirectTo?: string
}