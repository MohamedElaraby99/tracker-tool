# FikraTracker jQuery Integration Guide

This comprehensive guide explains how to integrate FikraTracker tracking into your website using jQuery to track users across all pages.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Basic Setup](#basic-setup)
3. [Quick Start](#quick-start)
4. [Advanced Configuration](#advanced-configuration)
5. [Tracking Page Views](#tracking-page-views)
6. [Tracking Custom Events](#tracking-custom-events)
7. [Single Page Application (SPA) Support](#single-page-application-spa-support)
8. [Complete jQuery Examples](#complete-jquery-examples)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **FikraTracker server running** (e.g., `https://analytics.yoursite.com`)
- ✅ **Domain ID** from your FikraTracker dashboard
- ✅ **jQuery** loaded on your website
- ✅ **CORS headers** configured properly on your FikraTracker server

> [!TIP]
> Get your Domain ID from the FikraTracker dashboard: Go to **Settings** → **Domains** → Click on your domain to see the ID.

---

## Basic Setup

### Step 1: Include the FikraTracker Tracker Script

Add the FikraTracker tracker script to your HTML `<head>` section **after jQuery**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    
    <!-- jQuery (required first) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- FikraTracker Tracker Script -->
    <script async src="https://YOUR_FikraTracker_SERVER/tracker.js" data-fikraTracker-server="https://YOUR_FikraTracker_SERVER" data-fikraTracker-domain-id="YOUR_DOMAIN_ID"></script>
</head>
<body>
    <!-- Your content -->
</body>
</html>
```

### Step 2: Replace Placeholders

Replace these values with your actual configuration:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `YOUR_FikraTracker_SERVER` | Your FikraTracker server URL | `https://analytics.example.com` |
| `YOUR_DOMAIN_ID` | Your domain ID from FikraTracker dashboard | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |

---

## Quick Start

### Method 1: Auto-Detection (Simplest)

Add this single line to your HTML and FikraTracker will automatically start tracking:

```html
<script async src="https://YOUR_FikraTracker_SERVER/tracker.js" 
        data-fikraTracker-server="https://YOUR_FikraTracker_SERVER" 
        data-fikraTracker-domain-id="YOUR_DOMAIN_ID">
</script>
```

### Method 2: Manual Initialization with jQuery

For more control, initialize the tracker manually:

```html
<script src="https://YOUR_FikraTracker_SERVER/tracker.js"></script>
<script>
$(document).ready(function() {
    // Create FikraTracker tracker instance
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
        detailed: true,           // Enable detailed tracking
        ignoreLocalhost: true,    // Don't track localhost visits
        ignoreOwnVisits: true     // Ignore visits from site owner
    });
    
    // Start recording page views
    tracker.record('YOUR_DOMAIN_ID');
});
</script>
```

---

## Advanced Configuration

### Configuration Options

```javascript
var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
    detailed: true,           // Collect detailed device/browser info
    ignoreLocalhost: true,    // Skip tracking on localhost
    ignoreOwnVisits: true     // Ignore own visits (using cookies)
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `detailed` | Boolean | `false` | Enables collection of screen size, browser, OS, language, etc. |
| `ignoreLocalhost` | Boolean | `true` | Prevents tracking on localhost/127.0.0.1 |
| `ignoreOwnVisits` | Boolean | `true` | Uses a cookie to ignore your own visits |

### Detailed Mode Data

When `detailed: true`, FikraTracker collects:

- 🌐 **Site Info**: URL, Referrer, Language
- 📱 **Device Info**: Screen size, Color depth
- 💻 **Browser Info**: Name, Version, Window size
- 🖥️ **System Info**: OS Name, OS Version
- 📍 **Manufacturer**: Device manufacturer

> [!IMPORTANT]
> When using `detailed: true`, consider adding a privacy notice to your website as it collects more user information.

---

## Tracking Page Views

### Basic Page View Tracking

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    // Track the current page
    var recording = tracker.record('YOUR_DOMAIN_ID');
    
    // To stop tracking (optional)
    // recording.stop();
});
```

### Custom Attributes

You can pass custom attributes to the record function:

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
        detailed: true
    });
    
    // Track with custom attributes
    var attributes = FikraTrackerTracker.attributes(true);  // true = detailed mode
    tracker.record('YOUR_DOMAIN_ID', attributes);
});
```

### Callback on Record

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    tracker.record('YOUR_DOMAIN_ID', FikraTrackerTracker.attributes(), function(recordId) {
        console.log('Tracking started! Record ID:', recordId);
    });
});
```

---

## Tracking Custom Events

### Creating Events in FikraTracker

1. Go to your FikraTracker dashboard
2. Navigate to **Settings** → **Events**
3. Create a new event and note the **Event ID**

### Event Types

| Type | Description |
|------|-------------|
| **Chart with total sums** | Shows total values per day/month/year |
| **Chart with average values** | Shows average values per day/month/year |
| **List with total sums** | Shows total values per action key |
| **List with average values** | Shows average values per action key |

### Tracking Button Clicks

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    // Track newsletter signup button
    $('#newsletter-btn').on('click', function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Newsletter Signup',
            value: 1
        });
    });
    
    // Track download button
    $('#download-btn').on('click', function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'File Download',
            value: 1
        });
    });
    
    // Track purchase with value
    $('#buy-btn').on('click', function() {
        var price = parseFloat($('#price').text());
        tracker.action('YOUR_EVENT_ID', {
            key: 'Purchase',
            value: price
        });
    });
});
```

### Tracking Form Submissions

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    $('#contact-form').on('submit', function(e) {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Contact Form Submitted',
            value: 1
        });
    });
    
    // Track form field interactions
    $('input, textarea').on('focus', function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Form Field: ' + $(this).attr('name'),
            value: 1
        });
    });
});
```

### Tracking Time on Page

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    // Track users who stayed for 30 seconds
    setTimeout(function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Engaged User (30s)',
            value: 1
        });
    }, 30000);
    
    // Track users who stayed for 1 minute
    setTimeout(function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Highly Engaged (1min)',
            value: 1
        });
    }, 60000);
});
```

### Tracking Scroll Depth

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    var scrollMilestones = {25: false, 50: false, 75: false, 100: false};
    
    $(window).on('scroll', function() {
        var scrollPercent = Math.round(
            ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100
        );
        
        $.each(scrollMilestones, function(milestone, tracked) {
            if (!tracked && scrollPercent >= milestone) {
                tracker.action('YOUR_EVENT_ID', {
                    key: 'Scroll Depth ' + milestone + '%',
                    value: 1
                });
                scrollMilestones[milestone] = true;
            }
        });
    });
});
```

### Updating Actions

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    var actionId;
    
    // Start a multi-step process
    $('#start-checkout').on('click', function() {
        tracker.action('YOUR_EVENT_ID', {
            key: 'Checkout Started',
            value: 1
        }, function(id) {
            actionId = id;
        });
    });
    
    // User cancelled - reset the action
    $('#cancel-checkout').on('click', function() {
        if (actionId) {
            tracker.updateAction(actionId, {
                key: 'Checkout Cancelled',
                value: null  // Resets the value
            });
        }
    });
});
```

---

## Single Page Application (SPA) Support

### Track Route Changes

For SPAs where the page doesn't reload on navigation:

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
        detailed: true
    });
    
    var currentRecording = null;
    
    function trackPageView() {
        // Stop previous recording
        if (currentRecording) {
            currentRecording.stop();
        }
        
        // Start new recording
        currentRecording = tracker.record('YOUR_DOMAIN_ID');
    }
    
    // Initial page load
    trackPageView();
    
    // Track on hash changes
    $(window).on('hashchange', function() {
        trackPageView();
    });
    
    // Track on history changes (for pushState)
    $(window).on('popstate', function() {
        trackPageView();
    });
    
    // Override pushState to track SPA navigation
    var originalPushState = history.pushState;
    history.pushState = function() {
        originalPushState.apply(history, arguments);
        trackPageView();
    };
});
```

### Track AJAX-Loaded Content

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    var currentRecording = null;
    
    // Track when new content is loaded via AJAX
    $(document).ajaxComplete(function(event, xhr, settings) {
        // Only track navigation requests, not API calls
        if (settings.url.includes('/page/') || settings.url.includes('/view/')) {
            if (currentRecording) {
                currentRecording.stop();
            }
            currentRecording = tracker.record('YOUR_DOMAIN_ID');
        }
    });
});
```

---

## Complete jQuery Examples

### Example 1: Complete Website Tracking Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://YOUR_FikraTracker_SERVER/tracker.js"></script>
</head>
<body>
    <header>
        <nav>
            <a href="/" class="nav-link">Home</a>
            <a href="/about" class="nav-link">About</a>
            <a href="/contact" class="nav-link">Contact</a>
        </nav>
    </header>
    
    <main>
        <button id="cta-button">Sign Up Now</button>
        <form id="newsletter-form">
            <input type="email" name="email" placeholder="Enter your email">
            <button type="submit">Subscribe</button>
        </form>
    </main>

    <script>
    $(document).ready(function() {
        // Initialize FikraTracker Tracker
        var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
            detailed: true,
            ignoreLocalhost: true,
            ignoreOwnVisits: true
        });
        
        // ========================================
        // PAGE VIEW TRACKING
        // ========================================
        var pageRecording = tracker.record('YOUR_DOMAIN_ID');
        
        // ========================================
        // NAVIGATION CLICK TRACKING
        // ========================================
        $('.nav-link').on('click', function() {
            var linkText = $(this).text();
            tracker.action('NAV_EVENT_ID', {
                key: 'Navigation: ' + linkText,
                value: 1
            });
        });
        
        // ========================================
        // CTA BUTTON TRACKING
        // ========================================
        $('#cta-button').on('click', function() {
            tracker.action('CTA_EVENT_ID', {
                key: 'CTA Button Clicked',
                value: 1
            });
        });
        
        // ========================================
        // FORM SUBMISSION TRACKING
        // ========================================
        $('#newsletter-form').on('submit', function(e) {
            tracker.action('FORM_EVENT_ID', {
                key: 'Newsletter Subscription',
                value: 1
            });
        });
        
        // ========================================
        // ENGAGEMENT TRACKING
        // ========================================
        
        // Track 30 second engagement
        setTimeout(function() {
            tracker.action('ENGAGEMENT_EVENT_ID', {
                key: '30 Second Visitor',
                value: 1
            });
        }, 30000);
        
        // Track scroll depth
        var scrollTracked = false;
        $(window).on('scroll', function() {
            var scrollPercent = Math.round(
                ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100
            );
            
            if (!scrollTracked && scrollPercent >= 50) {
                tracker.action('ENGAGEMENT_EVENT_ID', {
                    key: 'Scrolled 50%',
                    value: 1
                });
                scrollTracked = true;
            }
        });
        
        // ========================================
        // PAGE UNLOAD - Stop Recording
        // ========================================
        $(window).on('beforeunload', function() {
            if (pageRecording) {
                pageRecording.stop();
            }
        });
    });
    </script>
</body>
</html>
```

### Example 2: E-commerce Tracking

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER', {
        detailed: true
    });
    
    // Track page view
    tracker.record('YOUR_DOMAIN_ID');
    
    // Track product views
    $('.product-card').on('click', function() {
        var productName = $(this).data('product-name');
        var productPrice = $(this).data('product-price');
        
        tracker.action('PRODUCT_EVENT_ID', {
            key: 'Product Viewed: ' + productName,
            value: parseFloat(productPrice)
        });
    });
    
    // Track add to cart
    $('.add-to-cart').on('click', function() {
        var productName = $(this).closest('.product-card').data('product-name');
        var productPrice = $(this).closest('.product-card').data('product-price');
        
        tracker.action('CART_EVENT_ID', {
            key: 'Added to Cart: ' + productName,
            value: parseFloat(productPrice)
        });
    });
    
    // Track checkout steps
    $('.checkout-step').on('click', function() {
        var stepNumber = $(this).data('step');
        var stepName = $(this).data('step-name');
        
        tracker.action('CHECKOUT_EVENT_ID', {
            key: 'Checkout Step ' + stepNumber + ': ' + stepName,
            value: 1
        });
    });
    
    // Track completed purchase
    $('#complete-purchase').on('click', function() {
        var orderTotal = parseFloat($('#order-total').text());
        
        tracker.action('PURCHASE_EVENT_ID', {
            key: 'Purchase Completed',
            value: orderTotal
        });
    });
});
```

### Example 3: Global Tracking Module (Reusable)

Create a reusable tracking module (`FikraTracker-tracking.js`):

```javascript
/**
 * FikraTracker Tracking Module
 * Usage: Include this file after jQuery and FikraTracker-tracker.js
 */
var FikraTrackerTracking = (function($) {
    'use strict';
    
    var config = {
        server: 'https://YOUR_FikraTracker_SERVER',
        domainId: 'YOUR_DOMAIN_ID',
        events: {
            navigation: 'NAV_EVENT_ID',
            cta: 'CTA_EVENT_ID',
            form: 'FORM_EVENT_ID',
            engagement: 'ENGAGEMENT_EVENT_ID',
            ecommerce: 'ECOMMERCE_EVENT_ID'
        },
        options: {
            detailed: true,
            ignoreLocalhost: true,
            ignoreOwnVisits: true
        }
    };
    
    var tracker = null;
    var currentRecording = null;
    var engaged30s = false;
    var engaged60s = false;
    var scrollMilestones = {25: false, 50: false, 75: false, 100: false};
    
    function init(customConfig) {
        // Merge custom config
        if (customConfig) {
            $.extend(true, config, customConfig);
        }
        
        // Create tracker instance
        tracker = FikraTrackerTracker.create(config.server, config.options);
        
        // Start page recording
        trackPageView();
        
        // Setup automatic tracking
        setupEngagementTracking();
        setupScrollTracking();
        
        console.log('FikraTracker Tracking initialized');
    }
    
    function trackPageView() {
        if (currentRecording) {
            currentRecording.stop();
        }
        currentRecording = tracker.record(config.domainId);
    }
    
    function trackEvent(eventType, key, value) {
        if (!tracker) {
            console.warn('Tracker not initialized');
            return;
        }
        
        var eventId = config.events[eventType];
        if (!eventId) {
            console.warn('Unknown event type:', eventType);
            return;
        }
        
        tracker.action(eventId, {
            key: key,
            value: value || 1
        });
    }
    
    function trackClick(selector, eventType, keyPrefix) {
        $(document).on('click', selector, function() {
            var elementText = $(this).text().trim() || $(this).attr('title') || 'Unknown';
            trackEvent(eventType, keyPrefix + ': ' + elementText, 1);
        });
    }
    
    function trackFormSubmit(selector, eventType, key) {
        $(document).on('submit', selector, function() {
            trackEvent(eventType, key, 1);
        });
    }
    
    function setupEngagementTracking() {
        // 30 second engagement
        setTimeout(function() {
            if (!engaged30s) {
                engaged30s = true;
                trackEvent('engagement', 'Engaged 30 seconds', 1);
            }
        }, 30000);
        
        // 60 second engagement
        setTimeout(function() {
            if (!engaged60s) {
                engaged60s = true;
                trackEvent('engagement', 'Engaged 60 seconds', 1);
            }
        }, 60000);
    }
    
    function setupScrollTracking() {
        $(window).on('scroll', function() {
            var scrollPercent = Math.round(
                ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100
            );
            
            $.each(scrollMilestones, function(milestone, tracked) {
                if (!tracked && scrollPercent >= milestone) {
                    trackEvent('engagement', 'Scroll Depth ' + milestone + '%', 1);
                    scrollMilestones[milestone] = true;
                }
            });
        });
    }
    
    function handleSPANavigation() {
        // Re-track page view and reset engagement metrics
        trackPageView();
        engaged30s = false;
        engaged60s = false;
        scrollMilestones = {25: false, 50: false, 75: false, 100: false};
    }
    
    // Public API
    return {
        init: init,
        trackPageView: trackPageView,
        trackEvent: trackEvent,
        trackClick: trackClick,
        trackFormSubmit: trackFormSubmit,
        handleSPANavigation: handleSPANavigation
    };
    
})(jQuery);

// Auto-initialize on document ready
$(document).ready(function() {
    FikraTrackerTracking.init();
});
```

**Usage:**

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://YOUR_FikraTracker_SERVER/tracker.js"></script>
<script src="FikraTracker-tracking.js"></script>
<script>
$(document).ready(function() {
    // Optional: Initialize with custom config
    FikraTrackerTracking.init({
        server: 'https://analytics.mysite.com',
        domainId: 'my-domain-id'
    });
    
    // Track specific elements
    FikraTrackerTracking.trackClick('.nav-link', 'navigation', 'Nav Click');
    FikraTrackerTracking.trackClick('.cta-button', 'cta', 'CTA Click');
    FikraTrackerTracking.trackFormSubmit('#contact-form', 'form', 'Contact Form');
    
    // Manual event tracking
    $('#special-button').on('click', function() {
        FikraTrackerTracking.trackEvent('cta', 'Special Button Clicked', 1);
    });
});
</script>
```

---

## API Reference

### `FikraTrackerTracker.create(serverUrl, options)`

Creates a new tracker instance.

| Parameter | Type | Description |
|-----------|------|-------------|
| `serverUrl` | String | Your FikraTracker server URL |
| `options` | Object | Configuration options |

**Returns:** Tracker instance

### `tracker.record(domainId, attributes, callback)`

Starts tracking page views.

| Parameter | Type | Description |
|-----------|------|-------------|
| `domainId` | String | Your domain ID from FikraTracker |
| `attributes` | Object | Optional custom attributes |
| `callback` | Function | Optional callback with recordId |

**Returns:** Recording object with `stop()` method

### `tracker.action(eventId, input, callback)`

Tracks a custom event/action.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventId` | String | Event ID from FikraTracker settings |
| `input` | Object | `{ key: String, value: Number }` |
| `callback` | Function | Optional callback with actionId |

### `tracker.updateAction(actionId, input)`

Updates an existing action.

| Parameter | Type | Description |
|-----------|------|-------------|
| `actionId` | String | Action ID from previous action |
| `input` | Object | `{ key: String, value: Number|null }` |

### `FikraTrackerTracker.attributes(detailed)`

Returns page/device attributes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `detailed` | Boolean | Include detailed device info |

**Returns:** Attributes object

---

## Troubleshooting

### Common Issues

#### 1. Tracker Not Working

```javascript
// Check if FikraTrackerTracker is loaded
if (typeof FikraTrackerTracker === 'undefined') {
    console.error('FikraTracker tracker not loaded!');
}
```

**Solutions:**
- Ensure the tracker script is loaded before your code
- Check the Network tab for 404 errors
- Verify your FikraTracker server URL is correct

#### 2. CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
- Configure CORS headers on your FikraTracker server
- Set `FikraTracker_ALLOW_ORIGIN` environment variable
- Ensure your domain is in the allowed origins list

#### 3. Not Tracking on Localhost

This is expected behavior when `ignoreLocalhost: true` (default).

```javascript
// To track on localhost (for testing)
var tracker = FikraTrackerTracker.create('https://YOUR_SERVER', {
    ignoreLocalhost: false
});
```

#### 4. Own Visits Not Counted

This is expected behavior when `ignoreOwnVisits: true` (default).

```javascript
// To count your own visits (for testing)
var tracker = FikraTrackerTracker.create('https://YOUR_SERVER', {
    ignoreOwnVisits: false
});
```

#### 5. Events Not Appearing

- Wait a few minutes for data to appear in the dashboard
- Verify the Event ID is correct
- Check browser console for errors
- Ensure the click/submit event is firing

### Debug Mode

```javascript
$(document).ready(function() {
    var tracker = FikraTrackerTracker.create('https://YOUR_FikraTracker_SERVER');
    
    // Debug wrapper
    var originalRecord = tracker.record.bind(tracker);
    tracker.record = function(domainId, attrs, callback) {
        console.log('📊 Recording page view:', {
            domainId: domainId,
            url: window.location.href
        });
        return originalRecord(domainId, attrs, function(recordId) {
            console.log('✅ Record created:', recordId);
            if (callback) callback(recordId);
        });
    };
    
    var originalAction = tracker.action.bind(tracker);
    tracker.action = function(eventId, input, callback) {
        console.log('📊 Tracking action:', {
            eventId: eventId,
            key: input.key,
            value: input.value
        });
        return originalAction(eventId, input, function(actionId) {
            console.log('✅ Action created:', actionId);
            if (callback) callback(actionId);
        });
    };
    
    // Use tracker as normal
    tracker.record('YOUR_DOMAIN_ID');
});
```

---

## Security Considerations

> [!CAUTION]
> - Never expose sensitive data in event keys or values
> - Use HTTPS for your FikraTracker server
> - Configure CORS to only allow your domains
> - Consider user consent for detailed tracking mode

---
