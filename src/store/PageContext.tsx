import { PageModule } from "interfaces/declarations";
import React, { useContext, createContext, useReducer } from "react";
import { ReactElement } from "react";

interface Action {
  type: string;
  payload: any;
}

interface State {
  name: string;
  modules: Array<{}>;
}

interface Module {
  component: string;
  props: any;
  images: Array<{ path: Array<string>, images: Array<File>, name: string }>,
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "PAGE_NAME": {
      const { value } = action.payload;
      const next = { ...state };
      next.name = value;
      return next;
    }
    case "MODULE": {
      const { index, value } = action.payload;
      const next = [...state.modules];
      next[index] = { component: value, props: {}, images: [] };
      return {
        ...state,
        modules: next,
      };
    }
    case "REMOVE_MODULE": {
      if (state.modules.length > 1) {
        const { index } = action.payload;
        return {
          ...state,
          modules: state.modules.filter((_: Module, i: number) => i !== index),
        };
      }
      return state;
    }
    case "ADD_MODULE": {
      return {
        ...state,
        modules: [...state.modules, ""],
      };
    }
    case "MODULE_PROP": {
      const { index, name, value, key } = action.payload;
      const next: Array<Module | PageModule> = [...state.modules];
      // Be careful
      if (key) {
        next[index] = {
          ...next[index],
          props: {
            ...next[index]?.props,
            [name]: {
              ...next[index]?.props[name],
              [key]: value,
            },
          },
        };
      } else {
        next[index] = {
          ...next[index],
          props: {
            ...next[index]?.props,
            [name]: value,
          },
        };
      }
      return {
        ...state,
        modules: next,
      };
    }
    case "MODULE_PROP_IMAGE": {
      const { index, name, value, key, images, module } = action.payload;
      const next: Array<Module> = [...state.modules];
      // Be careful
      next[index] = {
        ...next[index],
        props: {
          ...next[index]?.props,
          [name]: {
            ...next[index]?.props[name],
            [key]: value,
          },
        },
        images: {
          ...next[index]?.images,
          [`${module}/props/${name}/${key}`]: images
        }
      };
      return {
        ...state,
        modules: next,
      };
    }
  }
};

const PageContext = createContext({});

const Provider = ({
  children,
  value,
}: {
  children: ReactElement;
  value: any;
}): ReactElement => {
  return (
    <PageContext.Provider value={useReducer(reducer, value)}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = (): any => useContext(PageContext);

export { Provider as PageProvider, usePage };
