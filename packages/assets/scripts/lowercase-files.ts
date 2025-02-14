// https://gist.github.com/kqlambert/fb7c09428f53f2b87841
import { glob } from 'glob';
import { renameSync } from 'node:fs';
import path from 'path';

const filesFolder = process.argv[2];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
glob(`${filesFolder}/*.*`, (_err, files) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  files.forEach((file) => {
    const filename = path.basename(file);
    renameSync(
      file,
      `${filesFolder}/${filename.toLowerCase().replace(/ /g, '-')}`
    );
  });
});
