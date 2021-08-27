export interface onClose {
  (): void;
}

export interface Field {
  name: string;
  type: string;
}

export interface Module {
  name: string;
  fields: Array<Field>;
  id?: string | number;
}

export interface PageModule {
  component: string;
  props: {};
}
