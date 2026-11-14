import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'clustered-ui-ruv182ed',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_q7o84MUmY7XJKj-f0sIzDtzHZfVeG4zI',
  authRequired: false,
  auth: { mode: 'managed' },
})
