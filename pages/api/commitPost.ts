import { Octokit } from "@octokit/rest"
import { Base64 } from "js-base64"
import { NextApiRequest, NextApiResponse } from "next";
import { getSHA } from "../../lib/getSHA";
import { GenerateSlug } from "../../lib/GenerateSlug";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.send("Method not allowed");
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.statusCode = 401;
    res.send("Unauthorized");
    return;
  }

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

  const result = await octokit.rest.repos.createOrUpdateFileContents({
    owner: "rprend",
    repo: "blog",
    path,
    message,
    content,
    sha
  })

  res.end(JSON.stringify(result.data));
}