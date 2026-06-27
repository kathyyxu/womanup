const REPO_OWNER = 'kathyyxu';
const REPO_NAME = 'womanup';
const FILE_PATH = 'data/wishes.json';
const BRANCH = 'main';
const ENCODED_FILE_PATH = FILE_PATH.split('/').map(encodeURIComponent).join('/');

function sendJson(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'womanup-wishes',
  };
}

async function readGitHubWishes() {
  if (!process.env.GITHUB_TOKEN) {
    return { wishes: { '01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0 }, sha: null };
  }

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${ENCODED_FILE_PATH}?ref=${BRANCH}`;
  const response = await fetch(url, { headers: githubHeaders() });

  if (response.status === 404) {
    const empty = { '01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0 };
    return { wishes: empty, sha: null };
  }

  if (!response.ok) {
    throw new Error(`GitHub read failed: ${response.status}`);
  }

  const file = await response.json();
  const json = JSON.parse(Buffer.from(file.content || '', 'base64').toString('utf8') || '{}');
  return { wishes: { ...{ '01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0 }, ...json }, sha: file.sha };
}

async function writeGitHubWishes(wishes, sha) {
  if (!process.env.GITHUB_TOKEN) return false;

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${ENCODED_FILE_PATH}`;
  const body = {
    message: 'Update wish counts',
    branch: BRANCH,
    content: Buffer.from(JSON.stringify(wishes, null, 2)).toString('base64'),
    ...(sha ? { sha } : {}),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`GitHub write failed: ${response.status}`);
  }

  return true;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { wishes } = await readGitHubWishes();
      return sendJson(res, 200, wishes);
    }

    if (req.method === 'POST') {
      const { num } = req.body || {};
      if (!num || !/^\d{2}$/.test(num)) {
        return sendJson(res, 400, { error: 'Invalid course num' });
      }

      const { wishes, sha } = await readGitHubWishes();
      wishes[num] = (wishes[num] || 0) + 1;

      await writeGitHubWishes(wishes, sha);
      return sendJson(res, 200, wishes);
    }

    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return sendJson(res, 500, { error: 'Server error' });
  }
}
