import { Octokit } from "@octokit/rest"

export async function getSHA(octokit: Octokit, path: string): Promise<string | undefined> {
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
