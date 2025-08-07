# Google OAuth Setup Guide

## Current Status
❌ **Google OAuth is currently disabled** because the required credentials are not configured.

## Why Google OAuth is Not Working

The Google authentication is not working because:
1. **Missing Environment Variables**: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are not set
2. **Provider Not Loaded**: Since credentials are missing, the Google provider is not added to NextAuth

## How to Enable Google OAuth

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or select existing)
   - Click on the project dropdown at the top
   - Click "New Project"
   - Name it something like "Shree Laxmi Financial Services"
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click on it and click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Name: "Shree Laxmi Web Client"

5. **Configure Authorized Redirect URIs**
   - Add these URLs:
     ```
     http://localhost:3000/api/auth/callback/google
     http://localhost:3001/api/auth/callback/google
     ```
   - For production, add your domain:
     ```
     https://yourdomain.com/api/auth/callback/google
     ```

6. **Get Your Credentials**
   - After creating, you'll get:
     - **Client ID**: A long string ending with `.apps.googleusercontent.com`
     - **Client Secret**: A shorter string

### Step 2: Add Environment Variables

Create or update your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random-at-least-32-characters

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/shree-laxmi-finance

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Development Settings
NODE_ENV=development
```

### Step 3: Restart Development Server

After adding the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test Google OAuth

1. **Visit the signin page**: `http://localhost:3000/auth/signin`
2. **Click "Continue with Google"**
3. **You should be redirected to Google's consent screen**
4. **After authorization, you'll be redirected back to your app**

## Troubleshooting Google OAuth

### Issue: "OAuthSignin" Error
**Cause**: Google OAuth credentials not configured
**Solution**: Follow the setup guide above

### Issue: "redirect_uri_mismatch" Error
**Cause**: Redirect URI in Google Console doesn't match your app URL
**Solution**: 
1. Check your `NEXTAUTH_URL` environment variable
2. Update authorized redirect URIs in Google Console
3. Make sure the URL matches exactly (including http/https, port, etc.)

### Issue: "invalid_client" Error
**Cause**: Incorrect Client ID or Client Secret
**Solution**:
1. Double-check your environment variables
2. Make sure there are no extra spaces or characters
3. Verify the credentials in Google Console

### Issue: Google Consent Screen Not Appearing
**Cause**: API not enabled or credentials not properly configured
**Solution**:
1. Ensure Google+ API is enabled
2. Check that OAuth consent screen is configured
3. Verify credentials are correct

## Security Best Practices

### 1. **Never Commit Credentials**
- Keep `.env.local` in your `.gitignore`
- Never share your Client Secret publicly

### 2. **Use Different Credentials for Production**
- Create separate OAuth credentials for production
- Use different redirect URIs for each environment

### 3. **Restrict OAuth Consent Screen**
- Add only necessary scopes
- Limit access to your organization if possible

### 4. **Monitor Usage**
- Check Google Cloud Console for usage statistics
- Monitor for any suspicious activity

## Production Deployment

### 1. **Update Redirect URIs**
Add your production domain to authorized redirect URIs:
```
https://yourdomain.com/api/auth/callback/google
```

### 2. **Update Environment Variables**
Set production environment variables:
```env
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
```

### 3. **Update OAuth Consent Screen**
- Add your production domain to authorized domains
- Update privacy policy and terms of service URLs

## Testing Checklist

- [ ] Google OAuth credentials created
- [ ] Environment variables set correctly
- [ ] Development server restarted
- [ ] Google sign-in button works
- [ ] User can complete Google OAuth flow
- [ ] User is redirected back to app
- [ ] User session is created successfully
- [ ] User data is saved to database

## Support

If you're still having issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Ensure Google Cloud Console is configured correctly
4. Check that the redirect URIs match exactly 