// import fs from 'fs';
// import path from "path";

export function GenerateSlug(title: string): string {
  // const postsDirectory = path.join(process.cwd(), 'posts');
  // let fileNames = fs.readdirSync(postsDirectory);
  // fileNames = fileNames.map(fileName => {
  //   return fileName.replace(/\.json$/, '');
  // })

  // Replace spaces with dashes and remove non-alphanumeric characters
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
  // if (slug in fileNames) {
  //   let i = 1;
  //   while (slug + i in fileNames) {
  //     i++;
  //   }
  //   slug += i;
  // }

  return slug;
}
