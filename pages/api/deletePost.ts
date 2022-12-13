import { Octokit } from "@octokit/rest";
import { NextApiRequest, NextApiResponse } from "next";
import { GenerateSlug } from "../../lib/GenerateSlug";
import { getSHA } from "../../lib/getSHA";
import { unstable_getServerSession } from "next-auth/next";
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
    res.send("Stay away from my blog!");
    return;
  }

  // Delete the post using the Octokit API
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  if (!req.body.title) {
    res.statusCode = 400;
    res.send("Title is required");
    return;
  }

  const path = "posts/" + GenerateSlug(req.body.title) + ".json";
  const sha = await getSHA(octokit, path);

  if (!sha) {
    res.statusCode = 400;
    res.send("Cant delete a post that doesn't exist");
    return;
  }

  const result = await octokit.rest.repos.deleteFile({
    owner: "rprend",
    repo: "blog",
    path,
    message: "Delete post: " + req.body.title,
    sha
  })


  res.end(JSON.stringify(result.data));
}