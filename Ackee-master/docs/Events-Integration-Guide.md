# FikraTracker Events Integration Guide

This comprehensive guide explains how to track custom events using FikraTracker. Events allow you to track button clicks, form submissions, purchases, downloads, and any other user interactions on your website.

---

## Table of Contents

1. [What Are Events?](#what-are-events)
2. [Creating Events in Dashboard](#creating-events-in-dashboard)
3. [Event Types](#event-types)
4. [Basic Event Tracking](#basic-event-tracking)
5. [Event Tracking Examples](#event-tracking-examples)
6. [Advanced Event Tracking](#advanced-event-tracking)
7. [E-commerce Events](#e-commerce-events)
8. [Form Events](#form-events)
9. [Engagement Events](#engagement-events)
10. [Updating Events](#updating-events)
11. [Complete jQuery Integration](#complete-jquery-integration)
12. [API Reference](#api-reference)
13. [Best Practices](#best-practices)

---

## What Are Events?

Events in FikraTracker allow you to track specific user actions beyond page views. Unlike page views which are tracked automatically, events are custom interactions you define.

### Use Cases

| Category | Examples |
|----------|----------|
| **Buttons** | CTA clicks, Download buttons, Share buttons |
| **Forms** | Newsletter signups, Contact submissions, Registration |
| **E-commerce** | Add to cart, Purchases, Checkout steps |
| **Engagement** | Scroll depth, Time on page, Video plays |
| **Navigation** | Menu clicks, Search queries, Filter usage |

---

## Creating Events in Dashboard

### Step 1: Access Settings

1. Log in to your FikraTracker dashboard
2. Click on **Settings** (gear icon)
3. Navigate to the **Events** section

### Step 2: Create New Event

1. Click **"New event"**
2. Enter a descriptive **Title** (e.g., "Newsletter Signups", "Button Clicks")
3. Select the **Event Type** (see below)
4. Click **Create**

### Step 3: Get Event ID

After creating the event:
- Click on the event to see its **Event ID**
- Copy this ID - you'll need it for tracking

Example Event ID:
```
1b6e20cb-7c7d-48ca-8cb6-958a55d7a9e3
```

---

## Event Types

Choose the type based on how you want to visualize the data:

### Chart Types

| Type | Description | Best For |
|------|-------------|----------|
| **Chart with total sums** | Bar chart showing total values per day/month/year | Counting occurrences (clicks, signups) |
| **Chart with average values** | Bar chart showing average values per day/month/year | Measuring averages (ratings, scores) |

### List Types

| Type | Description | Best For |
|------|-------------|----------|
| **List with total sums** | List showing total values per action key | Comparing different actions |
| **List with average values** | List showing average values per action key | Comparing averages across actions |

> **Tip**: Use **Chart with total sums** for most tracking scenarios. Use **List** types when you have multiple different action keys.

---

## Basic Event Tracking

### Setup

First, include the FikraTracker script:

```html
<script src="https://YOUR_FIKRATRACKER_SERVER/tracker.js"></script>
```

### Initialize Tracker

```javascript
// Create tracker instance
var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER', {
    detailed: false,
    ignoreLocalhost: true,
    ignoreOwnVisits: true
});
```

### Track an Event

```javascript
tracker.action('YOUR_EVENT_ID', {
    key: 'Action Name',
    value: 1
});
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventId` | String | The Event ID from FikraTracker dashboard |
| `key` | String | Name/description of the action |
| `value` | Number | Numeric value (count, price, score, etc.) |

---

## Event Tracking Examples

### Button Click Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Track any button click
    $('#my-button').on('click', function() {
        tracker.action('BUTTON_EVENT_ID', {
            key: 'Primary CTA Clicked',
            value: 1
        });
    });
    
    // Track multiple buttons with data attributes
    $('[data-track-button]').on('click', function() {
        var buttonName = $(this).data('track-button');
        tracker.action('BUTTON_EVENT_ID', {
            key: buttonName,
            value: 1
        });
    });
});
```

**HTML:**
```html
<button data-track-button="Sign Up Button">Sign Up</button>
<button data-track-button="Learn More Button">Learn More</button>
<button data-track-button="Contact Us Button">Contact Us</button>
```

### Link Click Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Track outbound links
    $('a[href^="http"]').not('[href*="' + window.location.host + '"]').on('click', function() {
        var linkUrl = $(this).attr('href');
        tracker.action('LINK_EVENT_ID', {
            key: 'Outbound Link: ' + linkUrl,
            value: 1
        });
    });
    
    // Track download links
    $('a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"]').on('click', function() {
        var fileName = $(this).attr('href').split('/').pop();
        tracker.action('DOWNLOAD_EVENT_ID', {
            key: 'Download: ' + fileName,
            value: 1
        });
    });
});
```

### Navigation Menu Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Track navigation menu clicks
    $('.nav-menu a').on('click', function() {
        var menuItem = $(this).text().trim();
        tracker.action('NAV_EVENT_ID', {
            key: 'Menu: ' + menuItem,
            value: 1
        });
    });
    
    // Track hamburger menu toggle (mobile)
    $('.hamburger-menu').on('click', function() {
        tracker.action('NAV_EVENT_ID', {
            key: 'Mobile Menu Toggled',
            value: 1
        });
    });
});
```

---

## Advanced Event Tracking

### Track with Callback

Get the action ID after tracking:

```javascript
tracker.action('EVENT_ID', {
    key: 'Action Name',
    value: 1
}, function(actionId) {
    console.log('Action tracked with ID:', actionId);
    // You can use this ID to update the action later
});
```

### Conditional Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Only track for logged-in users
    if (window.userIsLoggedIn) {
        tracker.action('LOGGED_USER_EVENT_ID', {
            key: 'Logged User Page View',
            value: 1
        });
    }
    
    // Only track on specific pages
    if (window.location.pathname.includes('/product/')) {
        tracker.action('PRODUCT_VIEW_EVENT_ID', {
            key: 'Product Page Viewed',
            value: 1
        });
    }
});
```

### Throttled Event Tracking

Prevent duplicate events:

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var trackedActions = {};
    
    function trackOnce(eventId, key, value) {
        var uniqueKey = eventId + '_' + key;
        if (!trackedActions[uniqueKey]) {
            tracker.action(eventId, { key: key, value: value });
            trackedActions[uniqueKey] = true;
        }
    }
    
    // This will only track once per page load
    $('#cta-button').on('click', function() {
        trackOnce('EVENT_ID', 'CTA Clicked', 1);
    });
});
```

---

## E-commerce Events

### Product View

```javascript
// When product page loads
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    var productName = $('#product-name').text();
    var productPrice = parseFloat($('#product-price').data('value'));
    
    tracker.action('PRODUCT_VIEW_EVENT_ID', {
        key: 'Viewed: ' + productName,
        value: productPrice
    });
});
```

### Add to Cart

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    $('.add-to-cart').on('click', function() {
        var $product = $(this).closest('.product');
        var productName = $product.find('.product-name').text();
        var productPrice = parseFloat($product.find('.product-price').data('value'));
        var quantity = parseInt($product.find('.quantity').val()) || 1;
        
        tracker.action('ADD_TO_CART_EVENT_ID', {
            key: 'Added: ' + productName,
            value: productPrice * quantity
        });
    });
});
```

### Checkout Steps

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Step 1: Cart Review
    if (window.location.pathname === '/cart') {
        tracker.action('CHECKOUT_EVENT_ID', {
            key: 'Step 1: Cart Review',
            value: 1
        });
    }
    
    // Step 2: Shipping Info
    if (window.location.pathname === '/checkout/shipping') {
        tracker.action('CHECKOUT_EVENT_ID', {
            key: 'Step 2: Shipping Info',
            value: 1
        });
    }
    
    // Step 3: Payment
    if (window.location.pathname === '/checkout/payment') {
        tracker.action('CHECKOUT_EVENT_ID', {
            key: 'Step 3: Payment',
            value: 1
        });
    }
    
    // Step 4: Confirmation
    if (window.location.pathname === '/checkout/confirmation') {
        var orderTotal = parseFloat($('#order-total').data('value'));
        tracker.action('CHECKOUT_EVENT_ID', {
            key: 'Step 4: Purchase Complete',
            value: orderTotal
        });
    }
});
```

### Purchase Completed

```javascript
// On order confirmation page
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    var orderTotal = parseFloat($('#order-total').text().replace('$', ''));
    var itemCount = parseInt($('#item-count').text());
    
    // Track the purchase value
    tracker.action('PURCHASE_EVENT_ID', {
        key: 'Purchase Completed',
        value: orderTotal
    });
    
    // Track items purchased
    tracker.action('ITEMS_EVENT_ID', {
        key: 'Items Purchased',
        value: itemCount
    });
});
```

---

## Form Events

### Newsletter Signup

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    $('#newsletter-form').on('submit', function(e) {
        tracker.action('NEWSLETTER_EVENT_ID', {
            key: 'Newsletter Subscription',
            value: 1
        });
    });
});
```

### Contact Form

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    $('#contact-form').on('submit', function(e) {
        var subject = $('#subject').val();
        
        tracker.action('CONTACT_EVENT_ID', {
            key: 'Contact Form: ' + subject,
            value: 1
        });
    });
});
```

### Registration Form

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var actionId = null;
    
    // Track when user starts filling the form
    $('#registration-form input').first().on('focus', function() {
        if (!actionId) {
            tracker.action('REGISTRATION_EVENT_ID', {
                key: 'Registration Started',
                value: 1
            }, function(id) {
                actionId = id;
            });
        }
    });
    
    // Track successful submission
    $('#registration-form').on('submit', function(e) {
        tracker.action('REGISTRATION_EVENT_ID', {
            key: 'Registration Completed',
            value: 1
        });
    });
});
```

### Form Field Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var fieldsFocused = {};
    
    // Track which form fields users interact with
    $('form input, form textarea, form select').on('focus', function() {
        var fieldName = $(this).attr('name') || $(this).attr('id');
        
        if (!fieldsFocused[fieldName]) {
            tracker.action('FORM_FIELD_EVENT_ID', {
                key: 'Field: ' + fieldName,
                value: 1
            });
            fieldsFocused[fieldName] = true;
        }
    });
});
```

---

## Engagement Events

### Scroll Depth Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var milestones = { 25: false, 50: false, 75: false, 100: false };
    
    $(window).on('scroll', function() {
        var scrollPercent = Math.round(
            ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100
        );
        
        $.each(milestones, function(milestone, tracked) {
            if (!tracked && scrollPercent >= milestone) {
                tracker.action('SCROLL_EVENT_ID', {
                    key: 'Scrolled ' + milestone + '%',
                    value: milestone
                });
                milestones[milestone] = true;
            }
        });
    });
});
```

### Time on Page Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // Track 30 seconds
    setTimeout(function() {
        tracker.action('ENGAGEMENT_EVENT_ID', {
            key: '30 Seconds on Page',
            value: 30
        });
    }, 30000);
    
    // Track 1 minute
    setTimeout(function() {
        tracker.action('ENGAGEMENT_EVENT_ID', {
            key: '1 Minute on Page',
            value: 60
        });
    }, 60000);
    
    // Track 3 minutes
    setTimeout(function() {
        tracker.action('ENGAGEMENT_EVENT_ID', {
            key: '3 Minutes on Page',
            value: 180
        });
    }, 180000);
});
```

### Video Play Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    // HTML5 Video
    $('video').on('play', function() {
        var videoTitle = $(this).data('title') || 'Unknown Video';
        tracker.action('VIDEO_EVENT_ID', {
            key: 'Video Played: ' + videoTitle,
            value: 1
        });
    });
    
    $('video').on('ended', function() {
        var videoTitle = $(this).data('title') || 'Unknown Video';
        tracker.action('VIDEO_EVENT_ID', {
            key: 'Video Completed: ' + videoTitle,
            value: 1
        });
    });
});
```

### Search Tracking

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    
    $('#search-form').on('submit', function(e) {
        var searchQuery = $('#search-input').val();
        
        tracker.action('SEARCH_EVENT_ID', {
            key: 'Search: ' + searchQuery,
            value: 1
        });
    });
});
```

---

## Updating Events

You can update a previously tracked action. This is useful for multi-step processes where you want to track progress or reversals.

### Example: Cancellable Action

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var addToCartActionId = null;
    
    // Track add to cart
    $('#add-to-cart').on('click', function() {
        tracker.action('CART_EVENT_ID', {
            key: 'Added to Cart',
            value: 1
        }, function(actionId) {
            addToCartActionId = actionId;
        });
    });
    
    // User removes from cart - update the action
    $('#remove-from-cart').on('click', function() {
        if (addToCartActionId) {
            tracker.updateAction(addToCartActionId, {
                key: 'Removed from Cart',
                value: null  // Setting to null resets the value
            });
        }
    });
});
```

### Example: Multi-Step Wizard

```javascript
$(document).ready(function() {
    var tracker = fikraTracker.create('https://YOUR_FIKRATRACKER_SERVER');
    var wizardActionId = null;
    
    // Start wizard - Step 1
    $('#start-wizard').on('click', function() {
        tracker.action('WIZARD_EVENT_ID', {
            key: 'Wizard Step 1',
            value: 1
        }, function(actionId) {
            wizardActionId = actionId;
        });
    });
    
    // Go to Step 2
    $('#wizard-step-2').on('click', function() {
        if (wizardActionId) {
            tracker.updateAction(wizardActionId, {
                key: 'Wizard Step 2',
                value: 2
            });
        }
    });
    
    // Complete wizard
    $('#complete-wizard').on('click', function() {
        if (wizardActionId) {
            tracker.updateAction(wizardActionId, {
                key: 'Wizard Completed',
                value: 3
            });
        }
    });
    
    // Cancel wizard
    $('#cancel-wizard').on('click', function() {
        if (wizardActionId) {
            tracker.updateAction(wizardActionId, {
                key: 'Wizard Cancelled',
                value: null
            });
        }
    });
});
```

---

## Complete jQuery Integration

Here's a complete, production-ready event tracking module:

```javascript
/**
 * FikraTracker Events Module
 * Include after jQuery and fikratracker/tracker.js
 */
var FikraEvents = (function($) {
    'use strict';
    
    // Configuration
    var config = {
        server: 'https://YOUR_FIKRATRACKER_SERVER',
        events: {
            buttons: 'YOUR_BUTTON_EVENT_ID',
            forms: 'YOUR_FORM_EVENT_ID',
            engagement: 'YOUR_ENGAGEMENT_EVENT_ID',
            ecommerce: 'YOUR_ECOMMERCE_EVENT_ID',
            navigation: 'YOUR_NAV_EVENT_ID'
        }
    };
    
    var tracker = null;
    var trackedActions = {};
    var scrollMilestones = { 25: false, 50: false, 75: false, 100: false };
    
    // Initialize
    function init(customConfig) {
        if (customConfig) {
            $.extend(true, config, customConfig);
        }
        
        tracker = fikraTracker.create(config.server);
        
        setupButtonTracking();
        setupFormTracking();
        setupEngagementTracking();
        setupScrollTracking();
        
        console.log('FikraEvents initialized');
    }
    
    // Track once per session
    function trackOnce(eventId, key, value) {
        var uniqueKey = eventId + '_' + key;
        if (!trackedActions[uniqueKey]) {
            tracker.action(eventId, { key: key, value: value || 1 });
            trackedActions[uniqueKey] = true;
            return true;
        }
        return false;
    }
    
    // Track event
    function track(eventType, key, value, callback) {
        var eventId = config.events[eventType];
        if (!eventId) {
            console.warn('Unknown event type:', eventType);
            return;
        }
        tracker.action(eventId, { key: key, value: value || 1 }, callback);
    }
    
    // Button tracking
    function setupButtonTracking() {
        $(document).on('click', '[data-track-click]', function() {
            var clickName = $(this).data('track-click');
            track('buttons', clickName, 1);
        });
    }
    
    // Form tracking
    function setupFormTracking() {
        $(document).on('submit', '[data-track-form]', function() {
            var formName = $(this).data('track-form');
            track('forms', formName + ' Submitted', 1);
        });
    }
    
    // Engagement tracking
    function setupEngagementTracking() {
        // 30 second engagement
        setTimeout(function() {
            trackOnce(config.events.engagement, 'Engaged 30s', 30);
        }, 30000);
        
        // 60 second engagement
        setTimeout(function() {
            trackOnce(config.events.engagement, 'Engaged 60s', 60);
        }, 60000);
    }
    
    // Scroll tracking
    function setupScrollTracking() {
        $(window).on('scroll', function() {
            var scrollPercent = Math.round(
                ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100
            );
            
            $.each(scrollMilestones, function(milestone, tracked) {
                if (!tracked && scrollPercent >= milestone) {
                    track('engagement', 'Scroll ' + milestone + '%', milestone);
                    scrollMilestones[milestone] = true;
                }
            });
        });
    }
    
    // Public API
    return {
        init: init,
        track: track,
        trackOnce: trackOnce
    };
    
})(jQuery);

// Auto-initialize
$(document).ready(function() {
    FikraEvents.init({
        server: 'https://YOUR_FIKRATRACKER_SERVER',
        events: {
            buttons: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            forms: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            engagement: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            ecommerce: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            navigation: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        }
    });
});
```

**Usage with data attributes:**

```html
<!-- Button tracking -->
<button data-track-click="Sign Up CTA">Sign Up</button>
<button data-track-click="Download PDF">Download</button>

<!-- Form tracking -->
<form data-track-form="Contact Form">
    <input type="text" name="name">
    <button type="submit">Submit</button>
</form>

<!-- Manual tracking -->
<script>
$('#special-action').on('click', function() {
    FikraEvents.track('ecommerce', 'Added Premium Item', 99.99);
});
</script>
```

---

## API Reference

### `tracker.action(eventId, input, callback)`

Track a custom event.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `eventId` | String | Yes | Event ID from FikraTracker dashboard |
| `input.key` | String | Yes | Action name/description |
| `input.value` | Number | Yes | Numeric value |
| `callback` | Function | No | Called with `actionId` after tracking |

### `tracker.updateAction(actionId, input)`

Update a previously tracked action.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `actionId` | String | Yes | Action ID from previous `tracker.action()` |
| `input.key` | String | Yes | New action name |
| `input.value` | Number/null | Yes | New value, or `null` to reset |

---

## Best Practices

### ✅ Do

- **Use descriptive keys**: `"Newsletter Signup"` not `"click"`
- **Group related actions**: Use same Event ID for related actions
- **Track meaningful values**: Prices, counts, durations
- **Prevent duplicates**: Track once per session when appropriate
- **Test thoroughly**: Verify events appear in dashboard

### ❌ Don't

- **Don't track sensitive data**: No emails, passwords, personal info
- **Don't over-track**: Focus on meaningful actions
- **Don't use generic keys**: `"button1"` tells you nothing
- **Don't forget error handling**: Wrap tracking in try-catch if needed

### Privacy Considerations

> **Important**: Events can contain behavioral data. Consider:
> - Adding consent mechanisms before tracking
> - Not tracking on sensitive pages
> - Being transparent in your privacy policy

---

## Troubleshooting

### Events Not Appearing

1. **Check Event ID**: Verify it matches the dashboard
2. **Check Console**: Look for JavaScript errors
3. **Wait a moment**: Events may take a few seconds to appear
4. **Check CORS**: Ensure `FIKRA_ALLOW_ORIGIN` includes your domain

### Debug Mode

```javascript
// Add this before tracking to see what's being sent
var originalAction = tracker.action.bind(tracker);
tracker.action = function(eventId, input, callback) {
    console.log('📊 Tracking event:', {
        eventId: eventId,
        key: input.key,
        value: input.value
    });
    return originalAction(eventId, input, callback);
};
```

---

## Need Help?

- 📚 [FikraTracker Documentation](./README.md)
- 🔮 [GraphQL API Reference](./API.md)
- 📦 [jQuery Integration Guide](./jQuery-Integration-Guide.md)

---

*Documentation Version: 1.0 | Last Updated: December 2024*
