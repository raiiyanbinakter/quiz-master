# Firebase Storage Security Rules for Question Media

## Storage Path Architecture

Question images and diagrams are organized into a strict hierarchical path:
```
question-media/{route}/{subject}/{paper}/{chapterId}/{sourceSet}/{topicId}/{questionId}/{filename}
```

### Path Parameters:
- `route`: `academic` | `medical` | `varsity` | `engineering`
- `subject`: `physics` | `chemistry` | `biology` | `higher_math` | `english` | `gk`
- `paper`: `first` | `second` | `not_applicable`
- `chapterId`: Sanitized slug of the chapter (e.g., `phys1_c2`, `vector`)
- `sourceSet`: Teacher / Source set key (e.g., `ishak`, `topon`, `hazari`, `past_year`, `general`)
- `topicId`: Sanitized slug of the topic (e.g., `dot_cross_product`, `general`)
- `questionId`: Unique question identifier (e.g., `q_1700000000000`)
- `filename`: Image file name (e.g., `diagram_1700000000000.png`)

---

## Production Security Rules (`storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function to check if the requester is the authorized admin
    function isAdmin() {
      return request.auth != null && (
        request.auth.token.email == 'rayanbinakter@gmail.com' ||
        request.auth.token.admin == true
      );
    }

    // Helper function to validate question image file upload
    function isValidQuestionImage() {
      return request.resource.size <= 5 * 1024 * 1024 // 5 MB max
        && request.resource.contentType.matches('image/(png|jpeg|jpg|webp)');
    }

    // Question Media Path Rules
    match /question-media/{route}/{subject}/{paper}/{chapterId}/{sourceSet}/{topicId}/{questionId}/{filename} {
      // Students and authenticated users can view/read images
      allow read: if true;

      // Only authorized admin can upload question images
      allow create: if isAdmin() && isValidQuestionImage();

      // Only authorized admin can update or delete question images
      allow update: if isAdmin() && isValidQuestionImage();
      allow delete: if isAdmin();
    }

    // Default deny for all other storage paths
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Metadata Schema (`QuestionMediaItem`)

When an image is uploaded and attached to a question, it is stored in the `media` array of `QuestionItem`:

```typescript
interface QuestionMediaItem {
  id: string;                         // e.g. "media_1700000000000_abc"
  type: 'diagram' | 'formula_image' | 'chart' | 'generic_image';
  storagePath: string;                // e.g. "question-media/medical/physics/first/phys1_c2/ishak/dot_product/q_123/diagram.png"
  url: string;                        // Download URL or local preview URL
  altText?: string;                   // "চিত্রের সংক্ষিপ্ত বর্ণনা" for accessibility
  fileName?: string;                  // Original file name (e.g. "circuit.png")
  fileSize?: number;                  // File size in bytes
  uploadedBy?: string;                // "rayanbinakter@gmail.com"
  uploadedAt?: string;                // ISO timestamp
}
```
