import { db } from "utils/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { PageModule } from "interfaces/declarations";

interface Field {
  name: string;
  alias: string;
  type: string;
  order?: number;
}

interface Schema {
  name: string;
  alias: string;
  fields: Array<Field>;
}

interface Page {
  name: string;
  state: string | boolean;
  lastUpdate: string;
  modules: Array<PageModule>;
}

function capitalize(string: string): string {
  return string[0] + string.toLowerCase().slice(1, string.length);
}

const refreshPublished = async () => {
  const updates = collection(db, "updates");
  await setDoc(doc(updates, "publish"), { date: new Date().toISOString() });
};

export async function triggerBuild(message: string) {
  const confirmation = window.confirm(message);
  if (confirmation) {
    await refreshPublished();
  }
}

export async function createSchema(schema: Schema, id: any) {
  try {
    const modules = collection(db, "modules");
    const schemaAsObject: any = {};
    for (let field of schema.fields) {
      schemaAsObject[field.name] = {
        type: field.type,
        alias: field.alias,
        order: field.order,
      };
    }
    console.log(modules);
    schemaAsObject.meta = {
      name: capitalize(schema.name),
      alias: capitalize(schema.alias),
    };
    await setDoc(id ? doc(modules, id) : doc(modules), schemaAsObject);
  } catch (err) {
    alert(err);
  }
}

export async function createPage({
  page,
  isEdit,
}: {
  page: Page;
  isEdit: boolean;
}) {
  try {
    const pages = collection(db, "pages");
    const pageRef = doc(pages, page.name);
    if (isEdit) {
      await deleteDoc(pageRef);
    }
    const cleanPage = {
      name: page.name,
      state: page.state,
      lastUpdate: new Date().toISOString(),
      modules: page.modules.map(({ component, props, visibility }) => ({
        component,
        visibility,
        props,
      })),
    };
    await setDoc(pageRef, cleanPage);
  } catch (err) {
    alert(err);
  }
}
