# Google OAuth Debug Guide

## Current Status ✅
Your Google OAuth credentials are properly configured:
- ✅ **GOOGLE_CLIENT_ID**: Set and valid format
- ✅ **GOOGLE_CLIENT_SECRET**: Set and valid format
- ✅ **NEXTAUTH_URL**: Set to `http://localhost:3000`
- ✅ **Google Provider**: Loaded and available
- ✅ **Redirect URI**: `http://localhost:3000/api/auth/callback/google`

## The Issue 🔍
Since your credentials are set but Google OAuth is not working, the problem is likely in the **Google Cloud Console configuration**.

## Step-by-Step Fix

### 1. **Enable Google+ API** (Most Common Issue)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **"APIs & Services" > "Library"**
4. Search for **"Google+ API"** or **"Google Identity"**
5. Click on it and click **"Enable"**
6. If you see "Google+ API" is deprecated, enable **"Google Identity"** instead

### 2. **Configure OAuth Consent Screen**

1. Go to **"APIs & Services" > "OAuth consent screen"**
2. Choose **"External"** user type (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: "Shree Laxmi Financial Services"
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click **"Save and Continue"**
5. On **"Scopes"** page, click **"Save and Continue"**
6. On **"Test users"** page, add your email as a test user
7. Click **"Save and Continue"**

### 3. **Add Redirect URI to OAuth Credentials**

1. Go to **"APIs & Services" > "Credentials"**
2. Click on your OAuth 2.0 Client ID
3. In **"Authorized redirect URIs"**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Click **"Save"**

### 4. **Publish OAuth Consent Screen** (Important!)

1. Go to **"APIs & Services" > "OAuth consent screen"**
2. Click **"PUBLISH APP"** button
3. Confirm the action

**Note**: If your app is in "Testing" mode, only test users can sign in. To allow all users, you need to publish the app.

## Testing After Fix

### 1. **Test in Browser**
1. Go to `http://localhost:3000/auth/signin`
2. Click "Continue with Google"
3. You should be redirected to Google's consent screen
4. After authorization, you'll be redirected back to your app

### 2. **Test with Debug Page**
1. Go to `http://localhost:3000/debug`
2. Click "Test Google Sign In"
3. Check the result

### 3. **Check Console Logs**
Look for these messages in your browser console:
- ✅ `🌐 Attempting Google sign in...`
- ✅ `✅ Google sign-in successful`

## Common Error Messages and Solutions

### Error: "redirect_uri_mismatch"
**Solution**: Add the exact redirect URI to Google Cloud Console:
```
http://localhost:3000/api/auth/callback/google
```

### Error: "access_denied"
**Solution**: 
1. Add your email as a test user in OAuth consent screen
2. Make sure the app is published or you're a test user

### Error: "invalid_client"
**Solution**: 
1. Double-check your Client ID and Client Secret
2. Make sure they're from the correct project

### Error: "OAuthSignin"
**Solution**: 
1. Enable Google+ API or Google Identity API
2. Configure OAuth consent screen
3. Publish the app

## Quick Checklist

- [ ] Google+ API or Google Identity API enabled
- [ ] OAuth consent screen configured
- [ ] Redirect URI added: `http://localhost:3000/api/auth/callback/google`
- [ ] App published (or you're a test user)
- [ ] Your email added as test user (if in testing mode)
- [ ] Development server restarted after environment changes

## If Still Not Working

1. **Check Google Cloud Console Activity**:
   - Go to "APIs & Services" > "Dashboard"
   - Look for any error messages or warnings

2. **Check OAuth Consent Screen Status**:
   - Make sure it's not in "Draft" mode
   - Verify test users are added

3. **Verify API Quotas**:
   - Check if you've hit any API limits
   - Look for quota exceeded errors

4. **Test with Different Browser**:
   - Try incognito/private mode
   - Clear browser cookies and cache

## Support

If you're still having issues after following this guide:
1. Check the browser console for specific error messages
2. Look at the Google Cloud Console for any warnings
3. Verify all steps in the checklist above
4. Test with the debug page at `/debug` 