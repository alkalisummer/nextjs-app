import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

//node 명령을 호출한 현재 작업경로 + /posts
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // posts 폴더 안에 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // 파일명에서 확장자 제거
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName); //파일경로
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    //md 파일의 데이터 추출
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  // posts 폴더 안에 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);

  //markdown 데이터 -> html 데이터로 변환
  const processedContent = await remark().use(remarkHtml).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
