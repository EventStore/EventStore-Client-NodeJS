import {promisify} from 'util';
import assert from 'assert';
import {resolve} from 'path';
import semver from 'semver';
import {exec as execCallback} from 'child_process';
import {writeFile, readFile} from 'fs/promises';

const exec = promisify(execCallback);

async function updatePackageVersion(packagePath, currentVersion, releaseType) {
    const packageFile = resolve(packagePath, 'package.json');
    const packageJson = JSON.parse(await readFile(packageFile, 'utf-8'));

    packageJson.version = semver.inc(currentVersion, releaseType);

    await writeFile(packageFile, JSON.stringify(packageJson, null, 2) + '\n');
}

async function main() {
    const releaseType = process.env.RELEASE_TYPE;
    assert.match(releaseType, /^(patch|minor|major)$/, 'Invalid RELEASE_TYPE');

    const packages = JSON.parse((await exec('pnpm ls -r --only-projects --json')).stdout);

    for (let {name, path, version, private: isPrivate} of packages) {
        if (isPrivate && name !== 'kurrent-node-client-repository') continue;
        await updatePackageVersion(path, version, releaseType);
    }
}

main().catch(error => {
    console.error('Error updating package versions:', error);
    process.exit(1);
});
