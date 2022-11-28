import fs from 'fs';
import path from 'path';

export interface Post {
  title: string;
  content: string;
  date: string;
  slug: string;
}

export function readPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.json$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { title, date, content, excerpt } = JSON.parse(fileContents);
    return {
      slug,
      title,
      date,
      content,
      excerpt,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })

}