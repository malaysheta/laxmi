# Authentication Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/shree-laxmi-finance
# Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/shree-laxmi-finance

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Setup Steps

### 1. MongoDB Setup
- Install MongoDB locally or use MongoDB Atlas
- Create a database named `shree-laxmi-finance`
- Update the `MONGODB_URI` in your `.env.local` file

### 2. NextAuth Secret
Generate a secure secret key:
```bash
openssl rand -base64 32
```
Or use any long, random string.

### 3. Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

### 4. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 5. Run the Development Server
```bash
npm run dev
# or
pnpm dev
```

## Fixed Issues

✅ **TypeScript Errors**: Fixed MongoDB connection type issues in `lib/mongodb.ts`
✅ **Authentication Flow**: Sign-in and sign-up pages are properly configured
✅ **Session Management**: NextAuth is properly set up with session provider

## Testing Authentication

1. Visit `http://localhost:3000`
2. Click "Sign Up" or "Sign In" buttons
3. Create an account or sign in with existing credentials
4. Test Google OAuth (if configured)

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` is correct
   - Verify network connectivity

2. **NextAuth Errors**
   - Ensure `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your development URL
   - Verify Google OAuth credentials (if using)

3. **Environment Variables Not Loading**
   - Restart your development server after adding `.env.local`
   - Ensure file is in project root
   - Check for typos in variable names

### Error Messages:
- "Please define the MONGODB_URI environment variable" → Add MongoDB connection string
- "Invalid email or password" → Check user credentials or database connection
- "Google sign-in failed" → Verify Google OAuth configuration

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Regularly rotate your secrets
- Use HTTPS in production 