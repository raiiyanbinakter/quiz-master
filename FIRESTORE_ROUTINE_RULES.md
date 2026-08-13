# Firestore Security Rules for Routine Control Center

To protect routine templates, events, and student personal routine data in Firebase Firestore, deploy the following rules to your Firebase console under **Firestore Database > Rules**.

> **Note:** These rules must be manually published to your Firebase Console or deployed using the Firebase CLI (`firebase deploy --only firestore:rules`). They are provided here for setup and audit purposes.

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if the requesting user is an admin
    function isAdmin() {
      return request.auth != null && 
        (request.auth.token.admin == true || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }

    // Helper function to check if user owns the document
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    // ==========================================
    // 1. ROUTINE TEMPLATES (/routineTemplates/{templateId})
    // ==========================================
    match /routineTemplates/{templateId} {
      // Students can read published templates; Admins can read all templates
      allow read: if request.auth != null && (resource.data.isPublished == true || isAdmin());
      // Only Admins can create, update, or delete templates
      allow create, update, delete: if isAdmin();
    }

    // ==========================================
    // 2. ROUTINE EVENTS (/routineEvents/{eventId})
    // ==========================================
    match /routineEvents/{eventId} {
      // Students can read published events; Admins can read all events
      allow read: if request.auth != null && (resource.data.isPublished == true || isAdmin());
      // Only Admins can create, update, or delete events
      allow create, update, delete: if isAdmin();
    }

    // ==========================================
    // 3. STUDENT ROUTINE PROFILE & STUDY PLANS (/users/{uid}/...)
    // ==========================================
    match /users/{userId} {
      
      // Routine Profile (/users/{userId}/routineProfile/main)
      match /routineProfile/{profileId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      // Personal Study Plans (/users/{userId}/studyPlans/{planId})
      match /studyPlans/{planId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      // Personal Study Sessions (/users/{userId}/studySessions/{sessionId})
      match /studySessions/{sessionId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      // Event Enrollments (/users/{userId}/routineEventEnrollments/{eventId})
      match /routineEventEnrollments/{eventId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }
    }
  }
}
```
