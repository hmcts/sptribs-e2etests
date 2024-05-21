import axios from "axios";

const githubToken = process.env.GITHUB_TOKEN;
const owner = "hmcts";
const repo = "sptribs-e2etests";
const branch = "nightly-dev";

const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`;

const headers = {
  Authorization: `token ${githubToken}`,
  Accept: "application/vnd.github.v3+json",
};

async function checkBranchExists(): Promise<boolean | void> {
  try {
    const response = await axios.get(githubApiUrl, { headers });
    if (response.status === 200) {
      console.log(`Branch ${branch} exists.`);
      return true;
    }
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      console.log(`Branch ${branch} does not exist.`);
      return false;
    } else {
      console.error("Error checking if branch exists:", error);
      throw error;
    }
  }
}

async function deleteBranch(): Promise<void> {
  try {
    const response = await axios.delete(githubApiUrl, { headers });
    if (response.status === 204) {
      console.log(`Branch ${branch} deleted successfully.`);
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
}

async function main(): Promise<void> {
  const branchExists = await checkBranchExists();
  if (branchExists) {
    await deleteBranch();
  }
}

main().catch((error) => console.error("Unexpected error:", error));
