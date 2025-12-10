# Systemd

This guide shows you how to configure FikraTracker with systemd. We assume that your FikraTracker is located and installed in `/opt/FikraTracker`.

## 1. Make FikraTracker executable

Make the `index.js` executable with `chmod +x /opt/FikraTracker/src/index.js`.

## 2. Create the service

Create a file named `FikraTracker.service` in `/etc/systemd/system/`.
 
```
[Unit]
Description=FikraTracker

[Service]
ExecStart=/opt/FikraTracker/src/index.js
Restart=always
User=nobody
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/opt/FikraTracker

[Install]
WantedBy=multi-user.target
```

# 3. Start the service

Start the service with `systemctl start FikraTracker.service` and check if everything is up and running with `systemctl status FikraTracker.service`.

# 4. Enable the service

Enable the service on boot with `systemctl enable FikraTracker.service`.
