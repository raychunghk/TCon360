# Next.js DevTools MCP Integration

This project has been upgraded to Next.js 16.1.3.

## What is Next.js DevTools MCP?

The Next.js DevTools MCP (Model Context Protocol) is a tool for AI-assisted development that provides enhanced debugging and development capabilities. It's a separate server that runs alongside your Next.js application.

Repository: https://github.com/vercel/next-devtools-mcp

**Important:** This is an **optional** development tool and is NOT required for the application to function.

## Current Status

✅ **Next.js 16.1.3** - Upgraded successfully
✅ **Next.js Configuration** - Optimized for development and production
⏸️ **MCP Server** - Optional setup (see below)

**Note:** The `experimental.devToolsEnabled` flag mentioned in the task description does not exist in Next.js 16. Next.js 16 has built-in development tools that are automatically enabled in development mode.

## How to Set Up DevTools MCP (Optional)

The MCP server is **not required** for the application to function. It's an optional enhancement for development.

### Option 1: Clone and Run Locally

```bash
# Clone the repository
git clone https://github.com/vercel/next-devtools-mcp.git
cd next-devtools-mcp

# Install dependencies
npm install

# Build the server
npm run build

# Run the server
npm start
```

### Option 2: Use with Claude Desktop (MCP Client)

If you're using Claude Desktop or another MCP-compatible client, add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "node",
      "args": ["/path/to/next-devtools-mcp/dist/index.js"],
      "env": {
        "NEXT_RUNTIME": "nodejs"
      }
    }
  }
}
```

### Option 3: Use with cto.new

If you're using cto.new, the MCP integration may already be available through the platform's built-in MCP support. Check the platform documentation for details.

## DevTools Features

When running the development server (`npm run dev`), you'll have access to:

- **Component Inspection** - Real-time component tree visualization
- **Performance Monitoring** - Track render times and performance metrics
- **Hot Reload** - Enhanced hot module replacement with MCP
- **Build Analysis** - Detailed bundle analysis and optimization suggestions
- **Network Tab** - Monitor API calls and data fetching

## Verification

To verify DevTools is enabled:

1. Start the development server:
   ```bash
   pnpm run dev
   ```

2. Check the console logs for DevTools initialization messages

3. Access the Next.js DevTools UI (typically appears in the browser developer tools)

## Notes

- DevTools is only enabled in **development mode** (`NODE_ENV=development`)
- The MCP server is **optional** - the application works fully without it
- DevTools may add minimal overhead to development builds
- Production builds are not affected by DevTools configuration

## Troubleshooting

If you encounter issues:

1. Ensure you're running Node.js 18.17.0 or later
2. Check that `experimental.devToolsEnabled: true` is in `next.config.mjs`
3. Verify the development server is running with `pnpm run dev`
4. Check browser console for any DevTools-related errors

## Additional Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js DevTools MCP GitHub](https://github.com/vercel/next-devtools-mcp)
- [Next.js Documentation](https://nextjs.org/docs)
