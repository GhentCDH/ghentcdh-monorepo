---
Toast
---

# Notifications

Notifications are used to inform the user about the status of an action or process. They can be used to provide feedback on successful actions, errors, or other important information.

A notification disappears after a few seconds, or can be closed by the user.


```ts
NotificationService.success("This is a success message");
```

Add the notifications component to your app, then the notifications will be displayed automatically.
```vue
import Notifications from "@ghentcdh/ui";
```

```vue
<Notifications/>
```

<script setup>
import {
NotificationMessage, IconEnum, Btn, NotificationService, Notifications
} from "@ghentcdh/ui";

const toast = IconEnum;

const open = (type) => {
  switch (type) {
    case 'success':
      NotificationService.success("This is a success message");
      break;
    case 'error':
      NotificationService.error("This is an error message");
      break;
    case 'info':
      NotificationService.info("This is an info message");
      break;
    case 'warning':
      NotificationService.warning("This is a warning message");
      break;
    default:
      NotificationService.info("This is a default message");
  }
};
</script>

## NotificationService
<Btn @click="open('success')">Open success</Btn><br />
<Btn @click="open('error')">Open error</Btn><br />
<Btn @click="open('info')">Open info</Btn><br />
<Btn @click="open('warning')">Open warning</Btn><br />

<Notifications/>
# Example layouts

## Success
<NotificationMessage message="success" type="success" />
## Error
<NotificationMessage message="error" type="error" />
## Info
<NotificationMessage message="info" type="info" />
## Warning
<NotificationMessage message="warning" type="warning" />
