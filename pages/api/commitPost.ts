import { Octokit } from "@octokit/rest"
import { Base64 } from "js-base64"

async function getSHA(octokit: Octokit, path: string): Promise<string | undefined> {
  const result = await octokit.repos.getContent({
    owner: "rprend",
    repo: "blog",
    path,
  }).catch((e) => {
    if (e.status === 404) {
      return undefined;
    }
    throw e;
  });

  let sha: string | undefined;
  if (!Array.isArray(result?.data)) {
    sha = result?.data?.sha;
  }

  return sha;
}


export default async function handler(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
  console.log(req.body)
  res.status(200).json({ name: 'John Doe' })

  const path = "posts/test-post2.json"
  const sha = await getSHA(octokit, path);
  const content = Base64.encode(JSON.stringify(req.body))

  const result = octokit.rest.repos.createOrUpdateFileContents({
    owner: "rprend",
    repo: "blog",
    path,
    message: "Create test.json",
    content,
    sha
  })

  return result


}