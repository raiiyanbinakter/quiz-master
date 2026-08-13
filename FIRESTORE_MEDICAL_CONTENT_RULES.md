# Firestore Access Rules for Medical Content Collections

*Note: These access rules are prepared for deployment in the future. They are not currently deployed.*

## Intended Schema Collections

1. `/medicalContent/questionBanks/{id}`
2. `/medicalContent/pastQuestionSets/{id}`
3. `/medicalContent/subjectTests/{id}`
4. `/medicalContent/mockTests/{id}`

## Intended Security Rules Definition

```playground
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() && request.auth.token.email == "rayanbinakter@gmail.com";
    }

    // Medical Content Collections
    match /medicalContent/{contentType}/{documentId} {
      // Students can read published content
      allow read: if isAuthenticated() && (
        resource == null || resource.data.isPublished == true || isAdmin()
      );

      // Only Admin can write / publish content
      allow write, create, update, delete: if isAdmin();
    }
  }
}
```

## Record Field Contracts

### Past Question Set (`pastQuestionSets`)
```json
{
  "id": "med_past_2023_bio",
  "subject": "biology",
  "year": "2022-2023",
  "title": "মেডিকেল ভর্তি পরীক্ষা ২০২২-২৩ - জীববিজ্ঞান",
  "sourceUrl": "https://example.gov.bd/official-question",
  "sourceTitle": "স্বাস্থ্য শিক্ষা অধিদপ্তর অফিশিয়াল প্রশ্ন",
  "sourceStatus": "verified",
  "questionIds": ["q1", "q2"],
  "isPublished": true
}
```

### Mock Test (`mockTests`)
```json
{
  "id": "med_mock_01",
  "title": "মেডিকেল পূর্ণাঙ্গ মডেল টেস্ট - ০১",
  "route": "medical",
  "questionIds": ["q1", "q2", "q3"],
  "timeLimitMinutes": 60,
  "sourceStatus": "verified",
  "coverageDescription": "জীববিজ্ঞান, রসায়ন, পদার্থবিজ্ঞান, ইংরেজি ও জিকে ভিত্তিক পূর্ণাঙ্গ টেস্ট",
  "isPublished": true
}
```
