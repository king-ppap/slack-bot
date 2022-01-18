import fs from 'fs/promises';
import path from 'path';

async function readActionFiles(pathA) {
  try {
    const actions = [];
    pathA = `${path.resolve()}/${pathA}`;
    console.log(`🟦 Start reading action files from "${pathA}"`);
    const files = await fs.readdir(pathA);
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
      console.log("Couldn't find actions.");
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

          if (!(props.help.name && props.help.description)) {
            throw new Error('Please provide "name" and "description"')
          }

          if (!(props.handler)) {
            throw new Error('Please provide handler')
          }
        } catch (error) {
          console.log(`❌ ${value} not load. ${error.message}`);
          return;
        }

        console.log(`✅ ${value} loaded!`);
        actions.push(props);
        if (index === array.length - 1) resolve();
      })
    });

    return actions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default readActionFiles;
