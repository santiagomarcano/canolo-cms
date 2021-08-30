import { db } from "utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { PageModule } from "interfaces/declarations";

interface Field {
  name: string;
  alias: string;
  type: string;
}

interface Schema {
  name: string;
  fields: Array<Field>;
}

interface Page {
  name: string;
  modules: Array<PageModule>;
}

function capitalize(string: string): string {
  return string[0] + string.toLowerCase().slice(1, string.length);
}

export async function createSchema(schema: Schema) {
  try {
    const modules = collection(db, "modules");
    const schemaAsObject: any = {};
    for (let field of schema.fields) {
      schemaAsObject[field.name] = {
        type: field.type,
        alias: field.alias,
      };
    }
    console.log(modules);
    const capitalized = capitalize(schema.name);
    await setDoc(doc(modules, capitalized), schemaAsObject);
  } catch (err) {
    alert(err);
  }
}

export async function createPage(page: Page) {
  try {
    const pages = collection(db, "pages");
    // const schemaAsObject = {};
    // for (let field of schema.fields) {
    //   schemaAsObject[field.name] = field.type;
    // }
    const cleanPage = {
      name: page.name,
      modules: page.modules.map(({ component, props }) => ({
        component,
        props,
      })),
    };
    console.log(page);
    await setDoc(doc(pages, page.name), cleanPage);
    // await pages.doc(page.name).set(cleanPage);
    alert("Page created!");
  } catch (err) {
    alert(err);
  }
}
