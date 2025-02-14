import { existsSync } from 'node:fs';
import { resolve } from 'path';

const requiredFolders = ['abi', 'model', 'utils'];
const notBuilt = requiredFolders.reduce<string[]>((folders, currentFolder) => {
  const built = existsSync(resolve(__dirname, `../lib/${currentFolder}`));
  if (!built) {
    folders.push(currentFolder);
  }
  return folders;
}, []);
if (notBuilt.length > 0) {
  const folders = notBuilt.join(', ');
  const error = `The build output of indexer should have the following folders: ${folders}`;
  throw new Error(error);
}

const disallowedFolders = ['apps', 'packages', 'services'];
const shouldNotHaveBeenBuilt = disallowedFolders.reduce<string[]>(
  (folders, currentFolder) => {
    const built = existsSync(resolve(__dirname, `../lib/${currentFolder}`));
    if (built) {
      folders.push(currentFolder);
    }
    return folders;
  },
  []
);

if (shouldNotHaveBeenBuilt.length > 0) {
  const folders = shouldNotHaveBeenBuilt.join(', ');
  const error = `The build output of indexer should not have the following folders: ${folders}\n\nCheck the imports within indexer.`;
  throw new Error(error);
}
