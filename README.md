# NewCareers

like NuCareers but newer

This is the enhanced version by Graham Wren, based on
work by Graham Wren and Jonathan Tseng.

Enhancements:

- [x] User file upload now available
- [x] Job description now supports markdown
- [x] Application row now shows user's name
- [x] API client migrated to fetch from ajax
- [ ] UI displays errors


## Primary Enhancement

__Proposal:__ File Upload

Our current solution to resumes in that users are able to add
a cover letter to their profile by formatting it in Markdown.
Since Markdown is a simple formatting language which is very
common it should be very easy for users to understand.
Additionally, by only allowing Markdown formatting this normalizes
everyone's cover letter styling to only what is possible with
Markdown which beings the focus of the cover letter or resume
back to content.

Despite the reasonably effective nature of Markdown resumes,
many of our users will have resumes already created as PDF
files which they will want to use rather than having to
recreate. To support this I plan to add file upload as a feature
to our platform.
