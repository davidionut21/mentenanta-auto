# Sistem de gestiune a mentenantei auto

The application manages the maintenance history of a vehicle.
It allows users to keep track of completed and pending maintenance operations.

## Data model

| Field | Type | Notes |
|---|---|---|
| operation | text | required, max 100 chars |
| completed | boolean | completed or pending, default false |
| type | fixed values | Maintenance, Repair, Inspection |
| category | relation | Engine, Brakes, Tires, Electrical |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:

1. Engine oil change, completed, Maintenance
2. Front brake pad replacement, pending, Repair
3. Tire pressure check, pending, Inspection

## How to run

Open `index.html` in a browser. No build step, no server.

## AI usage

| Tool | Used for |
|---|---|
| ChatGPT | Project theme definition, README structure and Stage 1 guidance |

Details per stage: see the `ai-log/` folder.

## Status

- [ ] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript