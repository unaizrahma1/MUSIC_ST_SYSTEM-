# GitHub Codespaces WebSocket Fix

## Problem
When running the React app in GitHub Codespaces, you may encounter WebSocket connection errors:
```
WebSocket connection to 'wss://cuddly-space-sniffle-5gr7p7qrq5gw2vrjw-3000.app.github.dev:3000/ws' failed
```

## Solution

The issue occurs because webpack-dev-server tries to connect to the WebSocket with an incorrect port configuration in the Codespaces environment.

### Files Created/Modified:

1. **client/.env.development** - Environment variables for development
2. **client/src/setupProxy.js** - Proxy configuration for API requests

### How to Fix:

1. **Stop the current development server** (if running) by pressing `Ctrl+C`

2. **Clear the React cache**:
   ```bash
   cd client
   rm -rf node_modules/.cache
   ```

3. **Restart the development server**:
   ```bash
   npm start
   ```

4. **If the issue persists**, set the following environment variables in your Codespaces terminal:
   ```bash
   export WDS_SOCKET_PORT=
   export DANGEROUSLY_DISABLE_HOST_CHECK=true
   ```

   Then restart the server:
   ```bash
   npm start
   ```

### Alternative Solution (if above doesn't work):

Create a `.env` file in the `client` directory with:
```bash
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_PORT=
WDS_SOCKET_PATH=/ws
REACT_APP_API_URL=http://localhost:5000
```

### For Production:

When running in GitHub Codespaces for production builds, you may need to:

1. Update the backend URL in your API configuration
2. Ensure CORS is properly configured on your backend server

### Testing the Fix:

1. Open your browser developer console (F12)
2. Check the Network tab for WebSocket connections
3. The WebSocket should connect successfully without the duplicate port issue
4. Hot Module Replacement (HMR) should work correctly

## Root Cause

GitHub Codespaces uses a proxy to forward ports. The webpack-dev-server's WebSocket client was including the port number in the URL path, causing a malformed WebSocket URL. By setting `WDS_SOCKET_PORT=` (empty), we tell webpack-dev-server to use the default port handling, which works correctly with Codespaces' proxy.
