import fs from 'fs';
import path from 'path';

export function GenerateSlug(title: string): string {
  const postsDirectory = path.join(process.cwd(), 'posts');
  let fileNames = fs.readdirSync(postsDirectory);
  fileNames = fileNames.map(fileName => {
    return fileName.replace(/\.json$/, '');
  })

  let slug = title.toLowerCase().replace(/ /g, '-');
  // if (slug in fileNames) {
  //   let i = 1;
  //   while (slug + i in fileNames) {
  //     i++;
  //   }
  //   slug += i;
  // }

  return slug;
}
