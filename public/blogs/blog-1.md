# Error Handling Rules

### Missing Timestamp
- Render as `'—'`
- Exclude from first/lastTs logic

### Missing chain/side
- Default to `'—'` but still show tx

### Negative spend values (legacy logs)
- Always stored as **absolute** (bot must fix)

### Invalid or partial logs
- Still included in txs[]
- Excluded from ROI/spend calculations if missing required fields

### SELL/ROLLOVER first
- Orientation must be set by writer before insert

### CSV Parsing Issues
- Parser handles BOM, missing fields, irregular quotes
