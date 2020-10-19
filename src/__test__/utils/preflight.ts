import { exec as ex } from "child_process";
import { promisify } from "util";
import { dockerImages } from "./dockerImages";

const exec = promisify(ex);

const checkFor = async (dependancy: string) => {
  try {
    await exec(`${dependancy} -v`);
  } catch (error) {
    console.error(`
Missing dependancy: ${dependancy}

Tests require docker and docker-compose to run. 
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
    console.error(
      "\x1b[1mMake sure you are logged in to docker with github.\x1b[22m"
    );
    console.error(
      "Please see https://github.com/EventStore/EventStore-Client-NodeJS#run-tests for more details."
    );
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
  await checkFor("docker");
  await checkFor("docker-compose");
  await pullImages();
};
