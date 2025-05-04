# Background and Motivation

The OG (Open Graph) image generation for the application and blog is not working as expected. This feature is important for social sharing and SEO, as it provides rich previews on platforms like Twitter and Facebook. The goal is to diagnose and resolve the issue so that OG images are generated and displayed correctly for all relevant pages.

# Key Challenges and Analysis
- The OG image route was not properly rendering content, showing only "OG Test" instead of proper content.
- Blog post OG images needed proper styling and layout to display post metadata effectively.
- Default OG image wasn't displaying any content.
- We needed a way to preview and test OG images during development.

# High-level Task Breakdown

- [x] 1. Fix the default OG image implementation to display proper content instead of just "OG Test".
- [x] 2. Update the blog post OG image to display title, subtitle, date, and reading time with improved styling.
- [x] 3. Create a preview page for testing different OG image configurations.
- [x] 4. Update page metadata to use the custom OG image route with proper parameters.
- [x] 5. Add sample cover images for testing OG images with background images.
- [ ] 6. Test OG image display on social platforms using their debuggers.
- [ ] 7. Ensure OG images load correctly in production.

# Project Status Board

- [x] 1. Fix default OG image
- [x] 2. Improve blog post OG image
- [x] 3. Create OG image preview page
- [x] 4. Update page metadata
- [x] 5. Add sample cover image options
- [ ] 6. Test on social platforms
- [ ] 7. Confirm production deployment

# Current Status / Progress Tracking

- Fixed default OG image to show proper site information with styling matching the site's aesthetic.
- Improved blog post OG image with better layout, styling, and support for cover images.
- Created a preview page at /og-preview (available in development mode) for testing OG images.
- Updated all page metadata to use the new OG image endpoint with appropriate parameters.
- Added sample cover images for easier testing.

# Executor's Feedback or Assistance Requests

- Please test the OG image preview page at http://localhost:3000/og-preview to confirm all functionality works.
- Verify both blog post and default OG images display properly.
- Test with different cover images and parameters to ensure the OG images render correctly.
- After confirming locally, please deploy to test in production environment.

# Lessons

- Always create a preview component when implementing OG images to make testing easier.
- Use local URLs during development for faster previewing rather than remote URLs.
- When debugging OG images, test with multiple parameter combinations.
- Add a refresh button to force-reload images during testing.
- For blog posts, consider adding the cover image as a background with an overlay for better visual appeal.
- Make the OG image accessible via navigation in development mode for easier testing.

# OG Image Generation System

## Important Note

**You must have the development server running** in a separate terminal when using these commands:
```bash
# First terminal: start the development server
npm run dev

# Second terminal: run the OG image generation commands
npm run generate-og
```

## Fixed Issues

1. **Empty Reply from Server** - Fixed by:
   - Adding error handling and fallbacks in the API routes
   - Setting a longer timeout (maxDuration = 10) in the OG image API
   - Adding comprehensive error handling in the generation script

2. **Connection Issues** - Fixed by:
   - Using multiple download methods (curl with --fail flag and Node.js HTTP)
   - Adding a retry mechanism with exponential backoff
   - Providing a --no-curl option for systems without curl

3. **Failed Generation** - Fixed by:
   - Implementing a fallback system that tries multiple endpoints:
     1. Main OG image endpoint
     2. Test endpoint for basic images
     3. Simple endpoint with just text
     4. Copy of the default image as a last resort

4. **Empty Mapping File** - Fixed by:
   - Ensuring at least the default image is always included
   - Verifying image existence and size before proceeding
   - Validating the generated mapping file

## Available Commands

```bash
# Normal generation using curl - will create sample data if no blog posts exist
npm run generate-og

# Generation without using curl - for systems without curl installed
npm run generate-og:no-curl

# Generate test images with additional test scenarios
npm run generate-og:test

# Build the site with OG images
npm run build:with-og
```

## Additional Options

```bash
# Force regeneration of all images
npm run generate-og -- --force

# Limit to only N posts
npm run generate-og -- --limit=5

# Combine options
npm run generate-og -- --force --limit=10 --no-curl
```

## Debugging

If you're experiencing issues:

1. Make sure your Next.js dev server is running
2. Check the OG image API routes for errors
3. Try visiting http://localhost:3000/api/og in your browser
4. Check the error summary in the script output
5. Make sure the Edge runtime is properly configured

## Implementation Details

1. Static pre-generated images in public/static/og
2. Hashed filenames based on post content for caching
3. Mapping file (og-mapping.json) for looking up images by post slug
4. Utilities to use these images in metadata (getOGImageUrl)
5. Special preview page at /og-static-preview 