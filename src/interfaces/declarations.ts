export interface onClose {
  (): void;
}

export interface Field {
  name: string;
  alias: string;
  type: string;
}

export interface Module {
  name: string;
  fields: Array<Field>;
  id?: string | number;
  data?: any;
}

export interface PageModule {
  component: string;
  props: {};
}
