# Login Troubleshooting Guide

## Issues Found and Fixed

### 1. **NEXTAUTH_URL Mismatch** ✅ FIXED
- **Problem**: Auth config was using port 3001 but server runs on 3000
- **Solution**: Updated `lib/auth.ts` to use port 3000 as default

### 2. **Missing Environment Variables** ⚠️ NEEDS ATTENTION
- **Problem**: NEXTAUTH_SECRET and other variables not set
- **Solution**: Create `.env.local` file with:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random-at-least-32-characters
MONGODB_URI=mongodb://localhost:27017/shree-laxmi-finance
NODE_ENV=development
```

### 3. **Database Connection** ✅ WORKING
- **Status**: MongoDB connection is working
- **Test**: `/api/test-db` endpoint returns success

### 4. **Enhanced Debugging** ✅ ADDED
- **Added**: Comprehensive logging in auth configuration
- **Added**: Debug page at `/debug` for testing
- **Added**: Test user creation endpoint
- **Added**: Google OAuth status checking and testing

## How to Test Login

### 1. **Use the Debug Page**
Visit: `http://localhost:3000/debug`
- Test database connection
- Test login with test credentials
- Check session status

### 2. **Test Credentials**
- **Email**: `test@example.com`
- **Password**: `password123`

### 3. **Manual Testing**
1. Go to `http://localhost:3000/auth/signin`
2. Enter test credentials
3. Check browser console for detailed logs

## Common Issues and Solutions

### Issue: "Invalid email or password"
**Possible Causes:**
1. User doesn't exist in database
2. Password is incorrect
3. Database connection failed

**Solutions:**
1. Check if test user exists: Visit `/api/test-login`
2. Verify database connection: Visit `/api/test-db`
3. Check browser console for detailed error logs

### Issue: Session not persisting
**Possible Causes:**
1. NEXTAUTH_SECRET not set
2. NEXTAUTH_URL mismatch
3. Cookie issues

**Solutions:**
1. Set proper NEXTAUTH_SECRET in `.env.local`
2. Ensure NEXTAUTH_URL matches your app URL
3. Check browser cookies

### Issue: Google login not working
**Possible Causes:**
1. Google OAuth credentials not set
2. Redirect URI mismatch
3. Google+ API not enabled
4. OAuth consent screen not configured

**Solutions:**
1. Follow the complete setup guide in `GOOGLE_OAUTH_SETUP.md`
2. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env.local`
3. Configure Google OAuth redirect URI in Google Cloud Console
4. Enable Google+ API in Google Cloud Console
5. Configure OAuth consent screen

## Environment Setup

### Required Environment Variables
Create a `.env.local` file in your project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random-at-least-32-characters

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/shree-laxmi-finance

# Google OAuth (Optional - see GOOGLE_OAUTH_SETUP.md for setup guide)
# GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Development Settings
NODE_ENV=development
```

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Ensure MongoDB is running on port 27017
3. Database will be created automatically

## Debug Tools Added

### 1. Debug Page (`/debug`)
- Test database connection
- Test login functionality
- Check session status
- View environment information

### 2. Test Endpoints
- `/api/test-db` - Test database connection
- `/api/test-login` - Create test user

### 3. Enhanced Logging
- Detailed authentication logs in console
- Step-by-step debugging information

## Next Steps

1. **Create `.env.local`** with the required environment variables
2. **Restart the development server** after adding environment variables
3. **Test login** using the debug page or signin page
4. **Check browser console** for detailed logs
5. **Verify session persistence** after successful login

## Support

If login is still not working after following this guide:
1. Check the debug page for specific error messages
2. Review browser console logs
3. Verify MongoDB is running
4. Ensure all environment variables are set correctly 