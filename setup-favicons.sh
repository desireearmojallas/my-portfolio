#!/bin/bash

# Favicon Setup Helper Script
# This script helps you set up the two favicon versions needed for background-aware switching

echo "🎨 Background-Aware Favicon Setup"
echo "=================================="
echo ""
echo "📋 Current public folder contents:"
ls -lh public/*.png public/*.svg 2>/dev/null || echo "No favicon files found"
echo ""
echo "✅ Required files:"
echo "   • /public/favicon-black.png - Black/dark version for light backgrounds"
echo "   • /public/favicon-white.png - White/light version for dark backgrounds"
echo ""
echo "📝 Steps to create your favicons:"
echo ""
echo "1. You currently have: public/des-favicon.png"
echo "   - Open this file in an image editor (Photoshop, Figma, Canva, etc.)"
echo ""
echo "2. Create BLACK version:"
echo "   - Make the icon black or dark colored"
echo "   - Keep transparent background"
echo "   - Save as: public/favicon-black.png"
echo "   - Recommended size: 32x32px or 48x48px"
echo ""
echo "3. Create WHITE version:"
echo "   - Make the icon white or light colored"
echo "   - Keep transparent background"
echo "   - Save as: public/favicon-white.png"
echo "   - Recommended size: 32x32px or 48x48px"
echo ""
echo "4. Verify files exist:"
echo "   Run this script again to check"
echo ""
echo "🖼️  Design Tips:"
echo "   • Use transparent background"
echo "   • High contrast for visibility"
echo "   • Simple, recognizable design at small size"
echo "   • Test in browser at 16x16px and 32x32px"
echo ""
echo "🧪 Testing:"
echo "   • Run: npm run dev"
echo "   • Open DevTools Console"
echo "   • Look for: 'Favicon updated: brightness=X, using /favicon-Y.png'"
echo "   • Scroll or resize window to trigger updates"
echo ""

# Check if files exist
if [ -f "public/favicon-black.png" ] && [ -f "public/favicon-white.png" ]; then
    echo "✅ SUCCESS! Both favicon files are present:"
    echo "   $(ls -lh public/favicon-black.png)"
    echo "   $(ls -lh public/favicon-white.png)"
    echo ""
    echo "🚀 You're all set! Run 'npm run dev' to test the favicon switching."
else
    echo "⚠️  Missing favicon files. Please create them as described above."
    echo ""
    if [ ! -f "public/favicon-black.png" ]; then
        echo "   ❌ Missing: public/favicon-black.png"
    else
        echo "   ✅ Found: public/favicon-black.png"
    fi
    if [ ! -f "public/favicon-white.png" ]; then
        echo "   ❌ Missing: public/favicon-white.png"
    else
        echo "   ✅ Found: public/favicon-white.png"
    fi
fi

echo ""
echo "📚 For more details, see: FAVICON_SWITCHER_GUIDE.md"
