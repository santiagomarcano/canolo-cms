import { db } from "utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { PageModule } from "interfaces/declarations";

interface Field {
  name: string;
  alias: string;
  type: string;
  order?: number;
  options?: Array<string>;
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
  categories?: Array<string>;
}

function capitalize(string: string): string {
  return string[0].toUpperCase() + string.toLowerCase().slice(1, string.length);
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
      if (field.options) {
        schemaAsObject[field.name].options = field.options;
      }
    }
    schemaAsObject.meta = {
      name: schema.name,
      alias: capitalize(schema.alias),
    };
    await setDoc(id ? doc(modules, id) : doc(modules), schemaAsObject);
  } catch (err) {
    alert(err);
  }
}

export async function createCategories(categories: Array<string>) {
  const col = collection(db, "categories");
  try {
    const valuesDoc = doc(col, "value");
    await setDoc(valuesDoc, { categories });
  } catch (err) {
    alert(err);
  }
}

export async function createCollection({
  structure,
  id,
}: {
  structure: Page;
  id: string | null;
}) {
  try {
    const collections = collection(db, "collections");
    const collectionRef = id ? doc(collections, id) : doc(collections);
    const formattedCollection = {
      name: structure.name,
      lastUpdate: new Date().toISOString(),
      modules: structure.modules.map(({ component, props }) => ({
        component,
        props: {},
        visibility: 1,
      })),
    };
    await setDoc(collectionRef, formattedCollection);
  } catch (err) {
    alert(err);
  }
}

export async function createPage({
  page,
  id,
}: {
  page: Page;
  id: string | null;
}) {
  try {
    const pages = collection(db, "pages");
    const pageRef = id ? doc(pages, id) : doc(pages);
    const formattedPage = {
      name: page.name,
      state: page.state,
      lastUpdate: new Date().toISOString(),
      modules: page.modules.map(({ component, props, visibility }) => ({
        component,
        visibility,
        props,
      })),
    };
    await setDoc(pageRef, formattedPage);
  } catch (err) {
    alert(err);
  }
}

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export async function createCollectionPage({
  page,
  id,
  collectionId,
}: {
  page: Page;
  id: string | null;
  collectionId: string;
}) {
  try {
    const pages = collection(db, collectionId);
    const pageRef = id ? doc(pages, id) : doc(pages);
    const formattedPage = {
      name: page.name,
      state: page.state,
      slug: slugify(page.name),
      categories: page.categories,
      lastUpdate: new Date().toISOString(),
      modules: page.modules.map(({ component, props, visibility }) => ({
        component,
        visibility,
        props,
      })),
    };
    await setDoc(pageRef, formattedPage);
  } catch (err) {
    alert(err);
  }
}
