# Supabase Schema (Simplified)

## Table: markets
| Column | Type | Description |
|--------|------|-------------|
| market_slug | text | Primary identifier (e.g., `lakers-vs-warriors`) |
| market_title | text | Display title |
| category | text | e.g. `sports` |
| sub_category | text | e.g. `basketball` |
| resolution_expected_date | text | yyyy-mm-dd |
| position_status | text | OPEN or CLOSED |
| created_at | timestamp | Auto |

---

### Execution Type Logic

#### BUY
- Increases spend
- Increases shares
- Contributes to combos
- Contributes to ROI averages

#### SELL
- Does not affect spend
- Does not create combos
- Adds to `realizedExtra`

#### ROLLOVER
- Sale proceeds → usd_left
- Hedge buy → usd_right
- Shares unchanged
- Spend unchanged
- Profit included in `realizedExtra`

