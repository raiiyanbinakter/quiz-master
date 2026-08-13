# Routine Intelligence - Firestore Security Rules

The following Firestore rules govern access to user routine profiles, study plans, study sessions, topic performance summaries, and admin-managed syllabus blueprints.

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // User Routine Profiles & Study Plans
    match /users/{userId}/routineProfile/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/studyPlans/{planId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/studySessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/topicPerformance/{topicId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Admin-managed Approved Routine Blueprints (Public Read, Admin Write)
    match /routineBlueprints/{blueprintId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

*Note: This rule snippet is provided for reference and forward compatibility.*
