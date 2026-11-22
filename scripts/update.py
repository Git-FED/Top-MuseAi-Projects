#!/usr/bin/env python3
"""Update hook placeholder for the daily catalog refresh.

The production workflow can replace data/projects.json with the output of a
GitHub Search API query, then commit only when the generated data changes.
The checked-in JSON remains the deterministic offline source for the UI.
"""
from pathlib import Path
import json

DATA = Path(__file__).parents[1] / 'data' / 'projects.json'

def main():
    payload = json.loads(DATA.read_text())
    print(f"Catalog contains {len(payload['projects'])} projects; {payload['gitFedProjects']} Git-FED entries.")
    print('Search/update integration is intentionally left credential-free for local use.')

if __name__ == '__main__':
    main()
