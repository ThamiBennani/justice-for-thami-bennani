# Source materials

Place original research and family-provided material here. Keep the original files unchanged; edited, translated, compressed, or redacted versions should go in `publication-ready/`.

## Folders

- `articles/` - Saved articles, PDFs, scans, and web-page exports.
- `photos/` - Photos supporting the cause, includes description as title of the image, use as accurate.
- `videos/` - Interviews, broadcasts, social clips, and original footage.
- `audio/` - Recordings, radio segments, and voice notes.
- `court-records/` - Judgments, filings, police records, and other official documents.
- `social-media/` - Screenshots and exported public posts with their original URLs.
- `notes-and-transcripts/` - md file containing videos and articles links, please transcribe and analyse, use as applicable, use this as a source of information along side other relevant sources.
- `publication-ready/` - Reviewed, cleared, redacted, or edited copies approved for the website.

## Naming files

Use descriptive names that sort consistently:

```text
YYYY-MM-DD_source_short-description_language.ext
```

Examples:

```text
2022-01-28_bbc-arabic_case-report_ar.pdf
2023-07-12_madar21_trial-judgment_ar.html
2007-03-14_family_thami-portrait_original.jpg
```

Use `unknown-date` when the date cannot yet be established. Do not rename a file if doing so would remove important original metadata; record a clear title in `manifest.csv` instead.

## Recording provenance

Add one row to `manifest.csv` for every item. At minimum, record:

1. The original source or person who provided it.
2. The original URL, when available.
3. Publication or recording date.
4. Language.
5. Whether publication permission has been confirmed.
6. Whether the facts and identity of people shown have been reviewed.

## Safety and publication rights

- Do not add passwords, identity documents, private addresses, phone numbers, or unrelated personal data.
- Mark graphic, sensitive, or potentially defamatory material in the manifest; do not place it in `publication-ready/` without review.
- Record written permission for family photographs and privately supplied media.
- Public availability does not automatically grant permission to republish a photo or video.
- Preserve unedited originals. Redact only a copy in `publication-ready/`.
- Court claims and allegations must be attributed precisely and checked against the latest available proceedings.

Large media files are excluded from Git by default. They remain available locally for analysis without being accidentally published to GitHub.