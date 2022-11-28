import { Octokit } from "@octokit/rest"

export default async function handler(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
  console.log(req.body)
  res.status(200).json({ name: 'John Doe' })
}