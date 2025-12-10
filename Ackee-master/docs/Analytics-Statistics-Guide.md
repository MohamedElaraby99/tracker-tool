# FikraTracker Analytics & Statistics Guide

This comprehensive guide explains all the analytics data FikraTracker collects and how to integrate detailed tracking on your website.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Integration](#quick-integration)
3. [Basic vs Detailed Tracking](#basic-vs-detailed-tracking)
4. [Page Views](#page-views)
5. [Devices](#devices)
6. [Browsers](#browsers)
7. [Operating Systems](#operating-systems)
8. [Screen Sizes](#screen-sizes)
9. [Languages](#languages)
10. [Pages](#pages)
11. [Referrers](#referrers)
12. [Durations](#durations)
13. [Active Visitors](#active-visitors)
14. [Querying Statistics via API](#querying-statistics-via-api)
15. [Complete Integration Examples](#complete-integration-examples)

---

## Overview

FikraTracker collects various statistics about your website visitors:

| Category | Data Collected |
|----------|----------------|
| **Page Views** | Total visits, unique visits, daily/monthly/yearly |
| **Devices** | iPhone, Galaxy, iPad, Desktop, etc. |
| **Browsers** | Chrome, Firefox, Safari, Edge, etc. |
| **Operating Systems** | Windows, macOS, iOS, Android, Linux |
| **Screen Sizes** | Screen resolution, browser window size |
| **Languages** | Visitor's browser language (en, ar, fr, etc.) |
| **Pages** | Which pages were visited |
| **Referrers** | Where visitors came from |
| **Durations** | How long visitors stayed |
| **Active Visitors** | Real-time visitor count |

---

## Quick Integration

### Step 1: Add Script to Your Website

Add this to every page you want to track (in `<head>` or before `</body>`):

```html
<script async src="https://YOUR_FIKRATRACKER_SERVER/tracker.js" 
        data-fikra-server="https://YOUR_FIKRATRACKER_SERVER" 
        data-fikra-domain-id="YOUR_DOMAIN_ID">
</script>
```

### Step 2: Enable Detailed Tracking (For All Statistics)

For **basic tracking** (page views only), use the simple script above.

For **detailed tracking** (devices, browsers, OS, screen sizes), use manual initialization:

```html
<script src="https://YOUR_FIKRATRACKER_SERVER/tracker.js"></script>
<script>
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER', {
        detailed: true,           // ⭐ Enable detailed tracking
        ignoreLocalhost: true,
        ignoreOwnVisits: true
    });
    
    tracker.record('YOUR_DOMAIN_ID');
</script>
```

---

## Basic vs Detailed Tracking

### Basic Tracking

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: false  // Default
});
```

**Collects:**
- ✅ Page URL (siteLocation)
- ✅ Referrer (siteReferrer)
- ✅ Traffic source (source parameter)

### Detailed Tracking

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // Enable all statistics
});
```

**Collects (in addition to basic):**
- ✅ Browser language
- ✅ Screen width/height
- ✅ Screen color depth
- ✅ Device name
- ✅ Device manufacturer
- ✅ Operating system name/version
- ✅ Browser name/version
- ✅ Browser window width/height

> **Privacy Note**: Detailed tracking collects more visitor information. Consider informing users in your privacy policy.

---

## Page Views

Page views track how many times pages on your website are visited.

### What's Tracked

| Metric | Description |
|--------|-------------|
| **Total Views** | All page views (including repeat visits) |
| **Unique Views** | Only unique visitors |
| **Views Today** | Today's page views |
| **Views Month** | This month's page views |
| **Views Year** | This year's page views |
| **Average Views** | Average daily views |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER');

// Track page view (happens automatically on page load)
tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        facts {
            viewsToday
            viewsMonth
            viewsYear
            averageViews
        }
        statistics {
            views(interval: DAILY, type: UNIQUE) {
                id
                count
            }
        }
    }
}
```

---

## Devices

Track what physical devices visitors use.

### What's Tracked

| Data | Example Values |
|------|----------------|
| **Device Name** | iPhone 14, Galaxy S23, iPad Pro, Pixel 7 |
| **Device Manufacturer** | Apple, Samsung, Google, Xiaomi, Huawei |

### Integration

```javascript
// Detailed tracking required for devices
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // ⭐ Required
});

tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            # With device model
            devices(sorting: TOP, type: WITH_MODEL) {
                id      # "iPhone 14 Pro"
                count   # 1250
            }
            
            # Without model (grouped)
            devices(sorting: TOP, type: NO_MODEL) {
                id      # "iPhone"
                count   # 3500
            }
        }
    }
}
```

### Example Output

```
📱 Top Devices
─────────────────────────
iPhone 14 Pro      28%
Galaxy S23 Ultra   15%
iPhone 13          12%
Desktop            20%
iPad Pro           10%
Others             15%
```

---

## Browsers

Track what browsers visitors use.

### What's Tracked

| Data | Example Values |
|------|----------------|
| **Browser Name** | Chrome, Firefox, Safari, Edge, Opera |
| **Browser Version** | Chrome 119, Safari 17.1, Firefox 120 |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // ⭐ Required
});

tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            # With version
            browsers(sorting: TOP, type: WITH_VERSION) {
                id      # "Chrome 119"
                count   # 2500
            }
            
            # Without version
            browsers(sorting: TOP, type: NO_VERSION) {
                id      # "Chrome"
                count   # 5000
            }
        }
    }
}
```

### Example Output

```
🌐 Top Browsers
─────────────────────────
Chrome         65%
Safari         18%
Firefox        10%
Edge            5%
Others          2%
```

---

## Operating Systems

Track what operating systems visitors use.

### What's Tracked

| Data | Example Values |
|------|----------------|
| **OS Name** | Windows, macOS, iOS, Android, Linux |
| **OS Version** | Windows 11, macOS 14, iOS 17, Android 14 |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // ⭐ Required
});

tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            # With version
            systems(sorting: TOP, type: WITH_VERSION) {
                id      # "Windows 11"
                count   # 3000
            }
            
            # Without version
            systems(sorting: TOP, type: NO_VERSION) {
                id      # "Windows"
                count   # 4500
            }
        }
    }
}
```

### Example Output

```
💻 Operating Systems
─────────────────────────
Windows        45%
iOS            25%
Android        15%
macOS          12%
Linux           3%
```

---

## Screen Sizes

Track screen and browser window resolutions.

### What's Tracked

| Data | Description | Example |
|------|-------------|---------|
| **Screen Resolution** | Physical screen size | 1920x1080, 2560x1440 |
| **Browser Resolution** | Browser window size | 1800x900, 1400x800 |
| **Color Depth** | Screen color depth | 24-bit, 32-bit |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // ⭐ Required
});

tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            # Screen resolution
            sizes(sorting: TOP, type: SCREEN_RESOLUTION) {
                id      # "1920x1080"
                count   # 2000
            }
            
            # Browser window size
            sizes(sorting: TOP, type: BROWSER_RESOLUTION) {
                id      # "1800x900"
                count   # 1500
            }
        }
    }
}
```

### Example Output

```
📐 Screen Sizes
─────────────────────────
1920x1080      35%
1366x768       20%
2560x1440      15%
390x844        12%  (Mobile)
1536x864        8%
Others         10%
```

---

## Languages

Track what language visitors use.

### What's Tracked

| Data | Example Values |
|------|----------------|
| **Language Code** | en, ar, fr, de, es, zh |
| **Full Locale** | en-US, ar-EG, fr-FR |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER', {
    detailed: true  // ⭐ Required
});

tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            languages(sorting: TOP) {
                id      # "en"
                count   # 5000
            }
        }
    }
}
```

### Example Output

```
🌍 Languages
─────────────────────────
en (English)   60%
ar (Arabic)    20%
fr (French)     8%
de (German)     5%
es (Spanish)    4%
Others          3%
```

---

## Pages

Track which pages visitors view.

### What's Tracked

| Data | Description |
|------|-------------|
| **Page URL** | Full URL of visited pages |
| **Page Path** | Path portion of URL |

### Integration

```javascript
// No detailed tracking required for pages
var tracker = fikraTracker.create('https://YOUR_SERVER');
tracker.record('YOUR_DOMAIN_ID');
```

### Query via API

```graphql
query {
    domains {
        statistics {
            pages(sorting: TOP) {
                id      # "/products/iphone"
                count   # 1500
            }
        }
    }
}
```

### Example Output

```
📄 Top Pages
─────────────────────────
/                      30%
/products              25%
/about                 15%
/contact               10%
/blog                  10%
Others                 10%
```

---

## Referrers

Track where visitors come from.

### What's Tracked

| Data | Description | Example |
|------|-------------|---------|
| **Referrer URL** | Full referrer URL | https://google.com/search?q=... |
| **Referrer Domain** | Just the domain | google.com |
| **Source Parameter** | UTM source | ?source=newsletter |

### Types

| Type | Description |
|------|-------------|
| **WITH_SOURCE** | Groups by source parameter if available |
| **NO_SOURCE** | Only referrer URLs |

### Integration

```javascript
// Works with basic tracking
var tracker = fikraTracker.create('https://YOUR_SERVER');
tracker.record('YOUR_DOMAIN_ID');

// To track source parameter, add to your URLs:
// https://yoursite.com/page?source=newsletter
// https://yoursite.com/page?source=twitter
```

### Query via API

```graphql
query {
    domains {
        statistics {
            referrers(sorting: TOP, type: WITH_SOURCE) {
                id      # "google.com" or "Newsletter"
                count   # 2000
            }
        }
    }
}
```

### Example Output

```
🔗 Top Referrers
─────────────────────────
Google             40%
Direct             25%
Twitter            15%
Newsletter         10%
Facebook            5%
Others              5%
```

---

## Durations

Track how long visitors stay on your site.

### What's Tracked

| Metric | Description |
|--------|-------------|
| **Visit Duration** | Time spent on page/site |
| **Average Duration** | Average time across all visits |

### Integration

```javascript
var tracker = fikraTracker.create('https://YOUR_SERVER');

// Duration tracking is automatic
// The tracker sends updates every 15 seconds
var recording = tracker.record('YOUR_DOMAIN_ID');

// Stop tracking when user leaves
window.addEventListener('beforeunload', function() {
    recording.stop();
});
```

### Query via API

```graphql
query {
    domains {
        facts {
            averageDuration  # In milliseconds
        }
        statistics {
            durations(interval: DAILY) {
                id      # Date
                count   # Average duration
            }
        }
    }
}
```

---

## Active Visitors

Track real-time visitor count.

### What's Tracked

| Metric | Description |
|--------|-------------|
| **Active Visitors** | Visitors active in the last 15 seconds |

### Query via API

```graphql
query {
    domains {
        facts {
            activeVisitors
        }
    }
}
```

### Real-Time Dashboard Example

```javascript
async function updateActiveVisitors() {
    const response = await fetch('https://YOUR_SERVER/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({
            query: `
                query {
                    domains {
                        title
                        facts {
                            activeVisitors
                        }
                    }
                }
            `
        })
    });
    
    const { data } = await response.json();
    
    data.domains.forEach(domain => {
        console.log(`${domain.title}: ${domain.facts.activeVisitors} active`);
    });
}

// Update every 15 seconds
setInterval(updateActiveVisitors, 15000);
```

---

## Querying Statistics via API

### Full Statistics Query

```graphql
query getDomainStats($id: ID!) {
    domain(id: $id) {
        title
        
        facts {
            activeVisitors
            averageViews
            averageDuration
            viewsToday
            viewsMonth
            viewsYear
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
            
            referrers(sorting: TOP, type: WITH_SOURCE) {
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
            
            sizes(sorting: TOP, type: SCREEN_RESOLUTION) {
                id
                count
            }
            
            languages(sorting: TOP) {
                id
                count
            }
            
            durations(interval: DAILY) {
                id
                count
            }
        }
    }
}
```

---

## Complete Integration Examples

### HTML Website (Full Tracking)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
    
    <!-- FikraTracker - Full Detailed Tracking -->
    <script src="https://YOUR_FIKRATRACKER_SERVER/tracker.js"></script>
    <script>
        (function() {
            // Create tracker with detailed tracking enabled
            var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER', {
                detailed: true,
                ignoreLocalhost: true,
                ignoreOwnVisits: true
            });
            
            // Start recording
            var recording = tracker.record('YOUR_DOMAIN_ID');
            
            // Stop recording when user leaves
            window.addEventListener('beforeunload', function() {
                recording.stop();
            });
        })();
    </script>
</head>
<body>
    <h1>Welcome to My Website</h1>
</body>
</html>
```

### jQuery Website (Full Tracking + Events)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://YOUR_FIKRATRACKER_SERVER/tracker.js"></script>
</head>
<body>
    <button id="cta-button">Sign Up</button>
    <form id="newsletter-form">
        <input type="email" placeholder="Email">
        <button type="submit">Subscribe</button>
    </form>

    <script>
    $(document).ready(function() {
        // ==========================================
        // TRACKER SETUP (Detailed Tracking Enabled)
        // ==========================================
        var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER', {
            detailed: true,           // Track devices, browsers, OS, etc.
            ignoreLocalhost: true,
            ignoreOwnVisits: true
        });
        
        // ==========================================
        // PAGE VIEW TRACKING
        // ==========================================
        var recording = tracker.record('YOUR_DOMAIN_ID');
        
        // ==========================================
        // EVENT TRACKING
        // ==========================================
        
        // Track button clicks
        $('#cta-button').on('click', function() {
            tracker.action('YOUR_BUTTON_EVENT_ID', {
                key: 'CTA Button Clicked',
                value: 1
            });
        });
        
        // Track form submissions
        $('#newsletter-form').on('submit', function() {
            tracker.action('YOUR_FORM_EVENT_ID', {
                key: 'Newsletter Subscription',
                value: 1
            });
        });
        
        // ==========================================
        // CLEANUP
        // ==========================================
        $(window).on('beforeunload', function() {
            recording.stop();
        });
    });
    </script>
</body>
</html>
```

### React/Next.js Application

```jsx
// components/FikraTracker.js
import { useEffect } from 'react';

const FIKRA_SERVER = 'https://YOUR_FIKRATRACKER_SERVER';
const DOMAIN_ID = 'YOUR_DOMAIN_ID';

export default function FikraTracker() {
    useEffect(() => {
        // Load tracker script
        const script = document.createElement('script');
        script.src = `${FIKRA_SERVER}/tracker.js`;
        script.async = true;
        
        script.onload = () => {
            // Initialize tracker
            const tracker = window.fikraTracker.create(FIKRA_SERVER, {
                detailed: true,
                ignoreLocalhost: true,
                ignoreOwnVisits: true
            });
            
            // Start recording
            const recording = tracker.record(DOMAIN_ID);
            
            // Cleanup on unmount
            return () => {
                recording.stop();
            };
        };
        
        document.head.appendChild(script);
        
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    
    return null;
}

// Usage in _app.js or layout
// <FikraTracker />
```

---

## Summary

| Statistic | Requires Detailed | Description |
|-----------|-------------------|-------------|
| Page Views | ❌ | Total and unique visits |
| Pages | ❌ | Which pages were visited |
| Referrers | ❌ | Where visitors came from |
| Durations | ❌ | Time spent on site |
| **Devices** | ✅ | Physical devices used |
| **Browsers** | ✅ | Browser name/version |
| **Systems** | ✅ | Operating system |
| **Sizes** | ✅ | Screen resolution |
| **Languages** | ✅ | Browser language |

**To collect all statistics, use:**
```javascript
fikraTracker.create('https://YOUR_SERVER', { detailed: true })
```

---

*Documentation Version: 1.0 | Last Updated: December 2024*
