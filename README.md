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

- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript

## Stage 1 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S1-R1 | README: description, fields, sample data, how to run | [README.md] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/README.md?plain=1#L1-L25 | Read the README |
| S1-R2 | AI usage section | [README.md] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/README.md?plain=1#L26-L33 | Read the AI usage section |
| S1-R3 | AI log for Stage 1 | [ai-log/etapa-01.md] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/ai-log/etapa-01.md?plain=1#L1-L36 | Read the AI log |
| S1-R4 | Header, form, fixed-value select and 3 cards | [index.html] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/index.html#L1-L96 | Open the page |
| S1-R5 | Finished card looks different | [style.css] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L167-L170 | Check the completed card |
| S1-R6 | 2 columns on desktop, 1 column under 700px | [Desktop Grid] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L49-L58, [Responsive media query] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L188-L196 | Resize the page below 700px |
| S1-R7 | Visible focus and readable dark theme | [Focus styles] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L183-L186, [Dark theme] https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L198-L211 | Use Tab and test dark mode |
| S1-R8 | Stage 1 commit pushed | [Stage 1 commit] https://github.com/davidionut21/mentenanta-auto/commit/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc | Check commit history |