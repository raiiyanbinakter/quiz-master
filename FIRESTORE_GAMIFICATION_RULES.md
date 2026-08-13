# Firestore Security Rules for Quiz Master Gamification Foundation

> **Note**: These are the intended security rules for the Quiz Master Gamification architecture. They represent the data access policies designed to secure user data and game state. These rules are documented here for deployment setup and security auditing.

## Collection & Document Paths

1. **User Game Profile**: `/users/{uid}/gameProfile/main`
2. **User Topic Mastery**: `/users/{uid}/topicMastery/{topicId}`
3. **User Achievements**: `/users/{uid}/achievements/{achievementId}`
4. **User Study Sessions**: `/users/{uid}/studySessions/{sessionId}`
5. **Competition Blueprints** (Admin managed): `/competitionBlueprints/{blueprintId}`
6. **Game Seasons** (Admin managed): `/gameSeasons/{seasonId}`
7. **Achievement Definitions** (Admin managed): `/achievementDefinitions/{achievementId}`

## Security Rules Specification

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() && request.auth.token.admin == true;
    }

    // 1. User Game Profile, Topic Mastery, Achievements, and Study Sessions
    match /users/{userId} {
      match /gameProfile/{docId} {
        allow read, write: if isOwner(userId);
      }
      match /topicMastery/{topicId} {
        allow read, write: if isOwner(userId);
      }
      match /achievements/{achievementId} {
        allow read, write: if isOwner(userId);
      }
      match /studySessions/{sessionId} {
        allow read, write: if isOwner(userId);
      }
    }

    // 2. Competition Blueprints (Public read if published, Admin write)
    match /competitionBlueprints/{blueprintId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // 3. Game Seasons (Public read, Admin write)
    match /gameSeasons/{seasonId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // 4. Achievement Definitions (Public read, Admin write)
    match /achievementDefinitions/{achievementId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```
