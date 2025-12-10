# FikraTracker Permanent Tokens Guide

This guide explains how to create and use Permanent Tokens for API authentication in FikraTracker.

---

## Table of Contents

1. [What Are Permanent Tokens?](#what-are-permanent-tokens)
2. [Regular vs Permanent Tokens](#regular-vs-permanent-tokens)
3. [When to Use Permanent Tokens](#when-to-use-permanent-tokens)
4. [Creating Permanent Tokens](#creating-permanent-tokens)
5. [Using Permanent Tokens](#using-permanent-tokens)
6. [API Examples](#api-examples)
7. [Integration Examples](#integration-examples)
8. [Managing Tokens](#managing-tokens)
9. [Security Best Practices](#security-best-practices)
10. [Troubleshooting](#troubleshooting)

---

## What Are Permanent Tokens?

Permanent Tokens are **non-expiring authentication tokens** that allow you to access the FikraTracker GraphQL API without the need to repeatedly log in.

### Key Features

- ✅ **Never expire** - Valid until manually deleted
- ✅ **API access** - Full access to query analytics data
- ✅ **Scriptable** - Perfect for automated tasks
- ✅ **Trackable** - Each token has a title for identification

---

## Regular vs Permanent Tokens

| Feature | Regular Token | Permanent Token |
|---------|--------------|-----------------|
| **How to create** | Login with username/password | Created in Settings |
| **Expiration** | 1 day (or `FIKRA_TTL` value) | **Never expires** |
| **Auto-renewal** | Renewed on each request | Not needed |
| **Use case** | Browser/Dashboard login | Scripts, APIs, Integrations |
| **Visibility** | Not visible after login | Stored in database |
| **Security** | Session-based | Token-based |

---

## When to Use Permanent Tokens

### ✅ Use Permanent Tokens For:

| Use Case | Description |
|----------|-------------|
| **Automated Reports** | Cron jobs that fetch analytics weekly/monthly |
| **Custom Dashboards** | Build your own dashboard using the API |
| **CLI Tools** | Command-line tools for analytics |
| **Mobile Widgets** | iOS/Android widgets showing stats |
| **Slack/Discord Bots** | Bots that post analytics updates |
| **Data Pipelines** | ETL processes exporting analytics |
| **Third-Party Integrations** | Connect with other tools |

### ❌ Don't Use Permanent Tokens For:

- **Browser login** - Use regular login instead
- **Testing** - Use regular tokens during development
- **Sharing** - Never share tokens between users/apps

---

## Creating Permanent Tokens

### Method 1: Via Dashboard (Recommended)

1. **Log in** to FikraTracker dashboard
2. Click **Settings** (gear icon) in the navigation
3. Scroll to **"Permanent Tokens"** section
4. Click **"New permanent token"**
5. Enter a **descriptive title** (e.g., "Weekly Report Script", "iOS Widget")
6. Click **Create**
7. **Copy the Token ID immediately**

> **Important**: The token ID is only shown once. Store it securely!

### Method 2: Via GraphQL API

**Step 1:** First, get a regular token by logging in:

```graphql
mutation createToken($input: CreateTokenInput!) {
    createToken(input: $input) {
        payload {
            id
        }
    }
}
```

**Variables:**
```json
{
    "input": {
        "username": "your_username",
        "password": "your_password"
    }
}
```

**Step 2:** Create a permanent token using the regular token in the Authorization header:

```graphql
mutation createPermanentToken($input: CreatePermanentTokenInput!) {
    createPermanentToken(input: $input) {
        payload {
            id
            title
        }
    }
}
```

**Variables:**
```json
{
    "input": {
        "title": "My Automated Script"
    }
}
```

**cURL Example:**
```bash
curl -X POST https://YOUR_FIKRATRACKER_SERVER/api \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_REGULAR_TOKEN" \
  -d '{
    "query": "mutation createPermanentToken($input: CreatePermanentTokenInput!) { createPermanentToken(input: $input) { payload { id title } } }",
    "variables": {
      "input": {
        "title": "My Script Token"
      }
    }
  }'
```

---

## Using Permanent Tokens

### Authentication Header

Add the permanent token to the `Authorization` header:

```
Authorization: Bearer YOUR_PERMANENT_TOKEN_ID
```

### JavaScript Example

```javascript
const FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER';
const PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID';

async function fetchAnalytics(query, variables = {}) {
    const response = await fetch(`${FIKRA_SERVER}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERMANENT_TOKEN}`
        },
        body: JSON.stringify({ query, variables })
    });
    
    const data = await response.json();
    
    if (data.errors) {
        throw new Error(data.errors[0].message);
    }
    
    return data.data;
}

// Usage
fetchAnalytics(`
    query {
        domains {
            id
            title
            facts {
                viewsToday
                viewsMonth
            }
        }
    }
`).then(data => {
    console.log('Analytics:', data.domains);
});
```

### Node.js Example

```javascript
const https = require('https');

const FIKRA_SERVER = 'YOUR_FIKRATRACKER_SERVER';
const PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID';

function fetchDomains() {
    return new Promise((resolve, reject) => {
        const query = JSON.stringify({
            query: `
                query {
                    domains {
                        id
                        title
                        facts {
                            viewsToday
                            viewsMonth
                            viewsYear
                        }
                    }
                }
            `
        });

        const options = {
            hostname: FIKRA_SERVER,
            path: '/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PERMANENT_TOKEN}`,
                'Content-Length': query.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });

        req.on('error', reject);
        req.write(query);
        req.end();
    });
}

// Usage
fetchDomains().then(result => {
    console.log('Domains:', result.data.domains);
});
```

### Python Example

```python
import requests

FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER'
PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID'

def fetch_analytics(query, variables=None):
    response = requests.post(
        f'{FIKRA_SERVER}/api',
        json={
            'query': query,
            'variables': variables or {}
        },
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {PERMANENT_TOKEN}'
        }
    )
    
    data = response.json()
    
    if 'errors' in data:
        raise Exception(data['errors'][0]['message'])
    
    return data['data']

# Fetch all domains
result = fetch_analytics('''
    query {
        domains {
            id
            title
            facts {
                viewsToday
                viewsMonth
            }
        }
    }
''')

for domain in result['domains']:
    print(f"{domain['title']}: {domain['facts']['viewsToday']} views today")
```

### cURL Example

```bash
curl -X POST https://YOUR_FIKRATRACKER_SERVER/api \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PERMANENT_TOKEN_ID" \
  -d '{
    "query": "query { domains { id title facts { viewsToday viewsMonth } } }"
  }'
```

---

## API Examples

### Get All Domains

```graphql
query {
    domains {
        id
        title
        facts {
            activeVisitors
            averageViews
            averageDuration
            viewsToday
            viewsMonth
            viewsYear
        }
    }
}
```

### Get Specific Domain

```graphql
query getDomain($id: ID!) {
    domain(id: $id) {
        id
        title
        facts {
            viewsToday
            viewsMonth
        }
        statistics {
            views(interval: DAILY, type: UNIQUE) {
                id
                count
            }
            pages(sorting: TOP) {
                id
                count
            }
        }
    }
}
```

### Get Events

```graphql
query {
    events {
        id
        title
        statistics {
            chart(interval: DAILY, type: TOTAL) {
                id
                count
            }
            list(sorting: TOP, type: TOTAL) {
                id
                count
            }
        }
    }
}
```

### Get Domain Statistics

```graphql
query getDomainStats($id: ID!) {
    domain(id: $id) {
        statistics {
            views(interval: MONTHLY, type: UNIQUE) {
                id
                count
            }
            browsers(sorting: TOP, type: WITH_VERSION) {
                id
                count
            }
            devices(sorting: TOP, type: WITH_MODEL) {
                id
                count
            }
            systems(sorting: TOP, type: WITH_VERSION) {
                id
                count
            }
            pages(sorting: TOP) {
                id
                count
            }
            referrers(sorting: TOP, type: WITH_SOURCE) {
                id
                count
            }
        }
    }
}
```

---

## Integration Examples

### Weekly Email Report (Node.js)

```javascript
const nodemailer = require('nodemailer');

const FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER';
const PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID';

async function getWeeklyStats() {
    const response = await fetch(`${FIKRA_SERVER}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERMANENT_TOKEN}`
        },
        body: JSON.stringify({
            query: `
                query {
                    domains {
                        title
                        facts {
                            viewsMonth
                            averageViews
                            averageDuration
                        }
                    }
                }
            `
        })
    });
    
    return (await response.json()).data.domains;
}

async function sendWeeklyReport() {
    const domains = await getWeeklyStats();
    
    let report = '# Weekly Analytics Report\n\n';
    
    for (const domain of domains) {
        report += `## ${domain.title}\n`;
        report += `- Monthly Views: ${domain.facts.viewsMonth}\n`;
        report += `- Average Views: ${domain.facts.averageViews}\n`;
        report += `- Avg Duration: ${domain.facts.averageDuration}ms\n\n`;
    }
    
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
        // Your email config
    });
    
    await transporter.sendMail({
        from: 'analytics@yoursite.com',
        to: 'you@yoursite.com',
        subject: 'Weekly Analytics Report',
        text: report
    });
}

// Run weekly with cron
sendWeeklyReport();
```

### Slack Bot Integration

```javascript
const FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER';
const PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID';
const SLACK_WEBHOOK = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';

async function postDailyStatsToSlack() {
    // Fetch stats
    const response = await fetch(`${FIKRA_SERVER}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERMANENT_TOKEN}`
        },
        body: JSON.stringify({
            query: `
                query {
                    domains {
                        title
                        facts {
                            viewsToday
                            activeVisitors
                        }
                    }
                }
            `
        })
    });
    
    const { data } = await response.json();
    
    // Build Slack message
    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '📊 Daily Analytics Report'
            }
        }
    ];
    
    for (const domain of data.domains) {
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${domain.title}*\n👀 Views today: ${domain.facts.viewsToday}\n🟢 Active visitors: ${domain.facts.activeVisitors}`
            }
        });
    }
    
    // Post to Slack
    await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks })
    });
}

postDailyStatsToSlack();
```

### iOS Widget (Scriptable App)

```javascript
// Scriptable iOS Widget
const FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER';
const PERMANENT_TOKEN = 'YOUR_PERMANENT_TOKEN_ID';

async function fetchStats() {
    const req = new Request(`${FIKRA_SERVER}/api`);
    req.method = 'POST';
    req.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERMANENT_TOKEN}`
    };
    req.body = JSON.stringify({
        query: `
            query {
                domains {
                    title
                    facts {
                        viewsToday
                        activeVisitors
                    }
                }
            }
        `
    });
    
    const response = await req.loadJSON();
    return response.data.domains[0];
}

async function createWidget() {
    const stats = await fetchStats();
    
    let widget = new ListWidget();
    widget.backgroundColor = new Color('#1a1a2e');
    
    let title = widget.addText('📊 ' + stats.title);
    title.textColor = Color.white();
    title.font = Font.boldSystemFont(14);
    
    widget.addSpacer(8);
    
    let views = widget.addText(`👀 ${stats.facts.viewsToday} views today`);
    views.textColor = new Color('#4cc9f0');
    views.font = Font.systemFont(12);
    
    let active = widget.addText(`🟢 ${stats.facts.activeVisitors} active`);
    active.textColor = new Color('#80ed99');
    active.font = Font.systemFont(12);
    
    return widget;
}

let widget = await createWidget();
Script.setWidget(widget);
widget.presentSmall();
Script.complete();
```

---

## Managing Tokens

### List All Permanent Tokens

```graphql
query {
    permanentTokens {
        id
        title
        created
    }
}
```

### Delete a Permanent Token

Via Dashboard:
1. Go to **Settings** → **Permanent Tokens**
2. Click on the token
3. Click **Delete**

Via API:
```graphql
mutation deletePermanentToken($id: ID!) {
    deletePermanentToken(id: $id) {
        success
    }
}
```

---

## Security Best Practices

### ✅ Do

| Practice | Description |
|----------|-------------|
| **Use descriptive titles** | Know what each token is for |
| **Store securely** | Use environment variables or secret managers |
| **Limit access** | Only create tokens when needed |
| **Audit regularly** | Review and delete unused tokens |
| **Use separate tokens** | One token per integration/script |

### ❌ Don't

| Practice | Why |
|----------|-----|
| **Hardcode tokens** | They'll be exposed in code/Git |
| **Share tokens** | Each user/service should have its own |
| **Reuse tokens** | Makes it hard to revoke access |
| **Log tokens** | Could be exposed in log files |

### Environment Variables Example

```bash
# .env file (add to .gitignore!)
FIKRA_TOKEN=your_permanent_token_id
FIKRA_SERVER=https://your-fikratracker-server.com
```

```javascript
// Load from environment
require('dotenv').config();

const FIKRA_SERVER = process.env.FIKRA_SERVER;
const PERMANENT_TOKEN = process.env.FIKRA_TOKEN;
```

---

## Troubleshooting

### "Token not found" Error

- Verify the token ID is correct
- Check if the token was deleted
- Ensure no extra spaces in the header

### "Unauthorized" Error

- Verify the Authorization header format: `Bearer TOKEN_ID`
- Check if the token is still valid
- Ensure you're using a permanent token (not regular)

### CORS Errors

- Permanent tokens work best server-side
- For browser use, configure `FIKRA_ALLOW_ORIGIN`

### Debug Request

```javascript
// Debug mode
async function debugFetch(query) {
    console.log('Request:', {
        server: FIKRA_SERVER,
        token: PERMANENT_TOKEN.substring(0, 8) + '...'
    });
    
    try {
        const response = await fetch(`${FIKRA_SERVER}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PERMANENT_TOKEN}`
            },
            body: JSON.stringify({ query })
        });
        
        console.log('Status:', response.status);
        
        const data = await response.json();
        
        if (data.errors) {
            console.error('GraphQL Errors:', data.errors);
        }
        
        return data;
    } catch (error) {
        console.error('Network Error:', error);
        throw error;
    }
}
```

---

## Summary

| Topic | Key Point |
|-------|-----------|
| **What** | Non-expiring API authentication tokens |
| **When** | Automated scripts, integrations, widgets |
| **How** | Create in Settings, use in Authorization header |
| **Security** | Store securely, one token per service |

---

*Documentation Version: 1.0 | Last Updated: December 2024*
