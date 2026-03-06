#!/usr/bin/env python3
"""spawn_agent.py

Helper to prepare and spawn a PM session and coder sub-agents using sessions_spawn.
This script does not use GitHub tokens. It prepares prompts and attachments and
calls the OpenClaw sessions_spawn tool (via API wrapper) to create sub-agents.

Usage: run locally inside the OpenClaw runtime or adapt for your environment.

Note: This helper expects an environment where the OpenClaw `sessions_spawn` API
is callable (or to be adapted into the runtime calling environment).
"""
import os
import json

# Example function that builds a task payload for sessions_spawn

def build_coder_prompt(spec_text, task_text, branch_name):
    prompt = f"""
You are a coding agent spawned by the PM. Implement the task below.

SPEC:\n{spec_text}\n\nTASK:\n{task_text}\n\nBranch: {branch_name}
Follow the Coder Agent Prompt Template in skills/agent-pm/templates/agent-prompt-templates/coder-agent-prompt.md
"""
    return prompt


def main():
    # For local testing, read sample files
    base = os.path.dirname(__file__)
    spec_path = os.path.join(base, '..', 'templates', 'spec-template.md')
    task_path = os.path.join(base, '..', 'templates', 'task-template.md')
    with open(spec_path, 'r', encoding='utf-8') as f:
        spec_text = f.read()
    with open(task_path, 'r', encoding='utf-8') as f:
        task_text = f.read()

    branch = 'feature/pm-sample-task'
    prompt = build_coder_prompt(spec_text, task_text, branch)

    # Prepare sessions_spawn payload
    payload = {
        'task': prompt,
        'label': f'coder-agent-{branch.replace("/","-")}',
        'runtime': 'subagent'
    }

    print('Prepared payload for sessions_spawn:')
    print(json.dumps(payload, indent=2))
    print('\nTo actually spawn a session, call the OpenClaw sessions_spawn API with this payload.')


if __name__ == '__main__':
    main()
