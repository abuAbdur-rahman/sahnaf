Files included in this single paste (drop into your project):

- `app/admin/page.tsx` — Admin dashboard (client) using shadcn components
- `components/ImageKitUploader.tsx` — Reusable uploader that uses ImageKit client SDK
- `components/admin/ProductModal.tsx` — Product dialog (uses uploader)
- `components/admin/SolarModal.tsx` — Solar project dialog (uses uploader)
- `app/api/upload-auth/route.ts` — Server route to return ImageKit upload auth (app router)
- `types/index.ts` — Shared TypeScript types
- `lib/fetcher.ts` — small fetch helpers

Environment variables required (add to .env.local):

```
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Install dependencies:

```bash
npm i @imagekit/next lucide-react react-hook-form zod @hookform/resolvers
# install shadcn/ui per their docs (if not installed already)
# npx shadcn-ui@latest init
```