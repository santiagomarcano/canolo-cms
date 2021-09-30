export interface onClose {
  (): void;
}

export interface Field {
  name: string;
  alias: string;
  type: string;
  order: number;
}

export interface Module {
  name: string;
  fields: Array<Field>;
  id?: string | number;
  data?: any;
  meta: {
    name: string;
    alias: string;
  };
}

export interface PageModule {
  id: string;
  name: string;
  component: string;
  visibility: string | number;
  props: {};
}
