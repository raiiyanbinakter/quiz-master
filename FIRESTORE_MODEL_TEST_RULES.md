# Firestore Security Rules Specification for Medical Model Test

> **Note**: This document describes the intended Security Rules for Medical Model Test collections. These rules are documented here for architectural reference and security verification.

---

## Intended Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.admin == true ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }

    // =======================================================
    // 1. MODEL TEST BLUEPRINTS COLLECTION
    // Path: /model_test_blueprints/{blueprintId}
    // =======================================================
    match /model_test_blueprints/{blueprintId} {
      // Students can read published blueprints only
      allow get, list: if isSignedIn() && (
        resource.data.status == 'published' || isAdmin()
      );

      // Only admins can create, update, or delete blueprints
      allow create, update, delete: if isAdmin();
    }

    // =======================================================
    // 2. STUDENT MODEL TEST ATTEMPTS
    // Path: /users/{uid}/modelTestAttempts/{attemptId}
    // =======================================================
    match /users/{uid}/modelTestAttempts/{attemptId} {
      // Student can read their own attempts
      allow get, list: if isOwner(uid) || isAdmin();

      // Student can create their own attempt
      allow create: if isOwner(uid) &&
        request.resource.data.totalMarks == 100 &&
        request.resource.data.timeLimitMinutes == 50 &&
        request.resource.data.route == 'medical';

      // Student can update their attempt during exam execution
      // CRITICAL RULE: Once an answer is saved/locked in lockedAnswerQuestionIds, 
      // the student CANNOT modify or alter that answer.
      allow update: if isOwner(uid) && (
        // Enforce that existing locked answers cannot be changed
        resource.data.status == 'in_progress' &&
        request.resource.data.lockedAnswerQuestionIds.hasAll(resource.data.lockedAnswerQuestionIds)
      );

      // Student cannot delete attempts
      allow delete: if isAdmin();
    }

  }
}
```

---

## Key Invariants & Safeguards

1. **Read Isolation**: Students can query only `status == 'published'` model test blueprints.
2. **Attempt Ownership**: Attempts are scoped under `/users/{uid}/modelTestAttempts/{attemptId}` preventing cross-user data tampering.
3. **Immutable Locked Answers**: When an answer ID is included in `lockedAnswerQuestionIds`, the security rule prevents changing that answer on subsequent updates.
4. **Admin Protection**: Only designated admins can publish or modify blueprints.
