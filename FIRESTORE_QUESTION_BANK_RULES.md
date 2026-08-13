# Firestore Question Bank Security Rules Architecture

> **Note:** This document outlines the intended Firestore Security Rules architecture for Quiz Master's Central Question Bank, Assessment Blueprints, Question Reports, and Item Analytics system. These rules are designed for future Firebase deployment and represent security guidelines. *Do not claim these rules are currently live on Firebase Production.*

---

## Intended Firestore Path Structure

```
/questionBank/{questionId}
/assessmentBlueprints/{blueprintId}
/questionReports/{reportId}
/questionAnalytics/{questionId}
```

---

## Intended Security Rules Definition

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
             (request.auth.token.admin == true ||
              request.auth.token.role == 'admin');
    }

    function isContentAuthor() {
      return isAuthenticated() &&
             (isAdmin() || request.auth.token.role == 'content_author');
    }

    // 1. QUESTION BANK SECURITY
    match /questionBank/{questionId} {
      // Students can read ONLY published questions
      allow read: if isAdmin() ||
                     isContentAuthor() ||
                     (isAuthenticated() && resource.data.status == 'published');

      // Draft & Review creation by Content Authors or Admin
      allow create: if isContentAuthor() &&
                       request.resource.data.status in ['draft', 'in_review'] &&
                       request.resource.data.createdBy == request.auth.token.email;

      // Updating question status or published version requires Admin or Authorized Reviewer
      allow update: if isAdmin() ||
                       (isContentAuthor() &&
                        resource.data.status in ['draft', 'changes_requested'] &&
                        request.resource.data.status in ['draft', 'in_review']);

      // Archiving or permanent deletion requires Admin
      allow delete: if isAdmin();
    }

    // 2. ASSESSMENT BLUEPRINTS
    match /assessmentBlueprints/{blueprintId} {
      // Students can read published blueprints
      allow read: if isAuthenticated() &&
                     (isAdmin() || resource.data.status == 'published');

      // Only Admin can create, modify, or publish assessment blueprints
      allow write: if isAdmin();
    }

    // 3. QUESTION REPORTS
    match /questionReports/{reportId} {
      // Admin can read all reports; Students can read their own reports
      allow read: if isAdmin() ||
                     (isAuthenticated() && resource.data.submittedBy == request.auth.token.email);

      // Authenticated students can submit question reports on published questions
      allow create: if isAuthenticated() &&
                       request.resource.data.submittedBy == request.auth.token.email &&
                       request.resource.data.status == 'open';

      // Only Admin can resolve, dismiss, or update report review notes
      allow update, delete: if isAdmin();
    }

    // 4. QUESTION ANALYTICS
    match /questionAnalytics/{questionId} {
      // Only Admin can read or flag item analytics
      allow read, write: if isAdmin();
    }
  }
}
```

---

## Core Security & Audit Principles

1. **Student Safe Answer Obfuscation:**
   - In production exam modes, answer keys are stripped at the backend proxy API level so students do not receive correct answer keys before submitting their attempt.

2. **Audit & Version History:**
   - Edits to published questions must increment `version` and record `changeNote`, `updatedAt`, and `reviewedBy` user credentials.

3. **Report Guarding:**
   - Students cannot modify answer keys or trigger automatic question updates via report submissions. All reports require Admin verification.
