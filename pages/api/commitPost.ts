import { Octokit } from "@octokit/rest"
import { Base64 } from "js-base64"
import { NextApiRequest, NextApiResponse } from "next";
import { GenerateSlug } from "../../lib/GenerateSlug";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  const path = "posts/" + GenerateSlug(req.body.title) + ".json";
  const sha = await getSHA(octokit, path);

  const post = {
    title: req.body.title,
    content: req.body.content,
    excerpt: req.body.excerpt,
    date: new Date().toString(),
  }
  const content = Base64.encode(JSON.stringify(post))

  const commit_type = sha ? "Update" : "Create";
  const message = commit_type + " post: " + post.title;

  return octokit.rest.repos.createOrUpdateFileContents({
    owner: "rprend",
    repo: "blog",
    path,
    message,
    content,
    sha
  })
}