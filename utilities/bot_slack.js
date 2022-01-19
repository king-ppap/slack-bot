import fs from 'fs/promises';
import path from 'path';

async function readAllFiles(app, type, pathA) {
  try {
    const modules = [];
    pathA = `${path.resolve()}/${pathA}`;
    console.log(`⚡️ Start reading files from "${pathA}"`);
    const files = await fs.readdir(pathA);
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
      console.log("Couldn't find modules.");
      process.exit(1);
    }

    await new Promise((resolve, rejects) => {
      jsfile.forEach(async (value, index, array) => {
        let props = await import(`${pathA}/${value}`);

        try {
          if (!props.default) {
            throw new Error('Please use export default');
          }
          props = props.default;

          if (!props.help) {
            throw new Error('Please provide "help: { name: string, description: string}"');
          }

          if (!(props.help.name && props.help.id && props.help.description)) {
            throw new Error('Please provide "id", "name" and "description"')
          }

          if (!(props.handler)) {
            throw new Error('Please provide handler')
          }
        } catch (error) {
          console.log(`  ❌ ${value} not load. ${error.message}`);
          return;
        }

        console.log(`  ✅ ${value} loaded!`);
        modules.push(props);
        if (index === array.length - 1) resolve();
      })
    });

    await new Promise(
      (resolve, rejects) =>
        modules.forEach(async (value, index, array) => {
          if (type === "action")
            app.action(value.help.id, value.handler);
          else if (type === "shortcut")
            app.shortcut(value.help.id, value.handler);

          if (index === array.length - 1) resolve();
        })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { readAllFiles };
