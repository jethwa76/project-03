# Entity relationship diagram

```mermaid
erDiagram
  USER ||--o{ REFRESH_TOKEN : owns
  USER ||--o{ RECORD : owns
  USER ||--o{ FILE_ASSET : uploads
  USER ||--o{ NOTIFICATION : receives
  USER ||--o{ ACTIVITY : produces
  USER ||--o{ PASSWORD_RESET : requests
  USER ||--o{ EMAIL_VERIFICATION : verifies
  RECORD ||--o{ FILE_ASSET : contains
```

All user and record deletions are soft deletes. Refresh sessions, notifications, activities, reset tokens, verification tokens, and file records use database cascades where their parent is permanently removed.
