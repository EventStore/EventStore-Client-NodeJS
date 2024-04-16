import { exec as ex } from "child_process";
import { promisify } from "util";
import { config as loadDotEnv } from "dotenv";

import { dockerImages } from "./dockerImages";

const exec = promisify(ex);

const checkFor = async (dependancy: string) => {
  try {
    await exec(`${dependancy} -v`);
  } catch (error) {
    console.error(`
Missing dependancy: ${dependancy}

Tests require docker and docker compose V2 to run. 
Please see https://github.com/EventStore/EventStore-Client-NodeJS#run-tests for more details.
`);
    process.exit(1);
  }
};

const pullImage = async (image: string) => {
  try {
    const { stdout } = await exec(`docker image ls ${image} -q`);
    if (stdout.length) return;
    console.log(`Pulling ${image}...`);
    await exec(`docker pull ${image}`);
  } catch (error) {
    console.error(`\x1b[1m\x1b[91mFailed to pull ${image}\x1b[39m\x1b[22m`);
    process.exit(1);
  }
};

const pullImages = async () => {
  console.log("");
  for (const image of Object.values<string>(dockerImages)) {
    await pullImage(image);
  }
};

module.exports = async () => {
  loadDotEnv();
  await checkFor("docker");
  await checkFor("docker compose");
  await pullImages();
};
