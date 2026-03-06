#!/usr/bin/env python3
"""create_github_repo.py

Create a new GitHub repository and push the scaffold. Reads GITHUB_TOKEN from env.

Usage:
  Set GITHUB_TOKEN in your environment (export on Mac/Linux; setx on Windows session)
  python create_github_repo.py --org <org-or-user> --repo <repo-name>

This script intentionally reads the token from the environment and does NOT
accept tokens pasted into chat. Run it locally where you control secrets.
"""
import os
import sys
import argparse
import subprocess
import json
from urllib import request, parse

API = 'https://api.github.com'


def create_repo(org, repo_name, private=True):
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print('GITHUB_TOKEN not found in environment. Export it before running.')
        sys.exit(1)

    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }

    data = json.dumps({
        'name': repo_name,
        'private': private,
        'auto_init': False
    }).encode('utf-8')

    if org:
        url = f'{API}/orgs/{org}/repos'
    else:
        url = f'{API}/user/repos'

    req = request.Request(url, data=data, headers=headers, method='POST')
    try:
        with request.urlopen(req) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            print('Created repo:', result.get('full_name'))
            return result
    except Exception as e:
        print('Failed to create repo:', e)
        sys.exit(1)


def git_init_and_push(repo_url, branch='master'):
    # Initialize git in the current workspace, add files, commit, and push
    cmds = [
        ['git', 'init', '-b', branch],
        ['git', 'add', '.'],
        ['git', 'commit', '-m', 'Initial scaffold for agent-pm skill'],
        ['git', 'remote', 'add', 'origin', repo_url],
        ['git', 'push', '-u', 'origin', branch]
    ]
    for cmd in cmds:
        print('Running:', ' '.join(cmd))
        subprocess.check_call(cmd)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--org', help='GitHub org or user owner (optional)', default=None)
    parser.add_argument('--repo', help='Repository name', required=True)
    parser.add_argument('--private', action='store_true', help='Create private repo')
    args = parser.parse_args()

    result = create_repo(args.org, args.repo, private=args.private)
    ssh_url = result.get('ssh_url') or result.get('clone_url')
    if not ssh_url:
        print('No repo URL returned; exiting')
        sys.exit(1)

    print('Pushing scaffold to repo...')
    git_init_and_push(ssh_url, branch='master')
    print('Done. Please add repository secrets (e.g., GITHUB_TOKEN) and enable Actions as needed.')


if __name__ == '__main__':
    main()
