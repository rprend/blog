import { Octokit } from "@octokit/rest";
import { NextApiRequest, NextApiResponse } from "next";
import { GenerateSlug } from "../../lib/GenerateSlug";
import { getSHA } from "./getSHA";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Delete the post using the Octokit API
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  const path = "posts/" + GenerateSlug(req.body.title) + ".json";
  const sha = await getSHA(octokit, path);

  const result = await octokit.rest.repos.deleteFile({
    owner: "rprend",
    repo: "blog",
    path,
    message: "Delete post: " + req.body.title,
    sha
  })


  res.end(JSON.stringify(result.data));
}