#!/bin/bash

# Create placeholder images for Sarala Yoga website
# These are SVG placeholders that you should replace with real photos

echo "Creating placeholder images..."

# Function to create SVG placeholder
create_placeholder() {
  local file=$1
  local width=$2
  local height=$3
  local text=$4
  local color=$5
  
  cat > "$file" << EOF
<svg width="$width" height="$height" viewBox="0 0 $width $height" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="$width" height="$height" fill="$color"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff">
    $text
  </text>
  <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" 
        font-family="Arial, sans-serif" font-size="12" fill="#e5e7eb">
    ${width}x${height} - Replace with real photo
  </text>
</svg>
EOF
}

# Hero images
create_placeholder "src/assets/images/hero-yoga.jpg" 800 1000 "Hero Yoga Image" "#0ea5e9"
create_placeholder "src/assets/images/sarala-profile.jpg" 400 400 "Sarala Profile Photo" "#c026d3"
create_placeholder "src/assets/images/sarala-hero.jpg" 600 400 "Sarala Hero Image" "#0ea5e9"
create_placeholder "src/assets/images/yoga-journey.jpg" 800 600 "Yoga Journey" "#0ea5e9"

# Gallery images - Studio
create_placeholder "src/assets/images/gallery/studio-main.jpg" 400 300 "Main Studio" "#0ea5e9"
create_placeholder "src/assets/images/gallery/studio-main-full.jpg" 1200 900 "Main Studio (Full)" "#0ea5e9"
create_placeholder "src/assets/images/gallery/studio-corner.jpg" 400 300 "Meditation Corner" "#c026d3"
create_placeholder "src/assets/images/gallery/studio-corner-full.jpg" 1200 900 "Meditation Corner (Full)" "#c026d3"
create_placeholder "src/assets/images/gallery/studio-entrance.jpg" 400 300 "Studio Entrance" "#0ea5e9"
create_placeholder "src/assets/images/gallery/studio-entrance-full.jpg" 1200 900 "Studio Entrance (Full)" "#0ea5e9"
create_placeholder "src/assets/images/gallery/studio-props.jpg" 400 300 "Yoga Props" "#f59e0b"
create_placeholder "src/assets/images/gallery/studio-props-full.jpg" 1200 900 "Yoga Props (Full)" "#f59e0b"

# Gallery images - Classes
create_placeholder "src/assets/images/gallery/group-class.jpg" 400 300 "Group Class" "#10b981"
create_placeholder "src/assets/images/gallery/group-class-full.jpg" 1200 900 "Group Class (Full)" "#10b981"
create_placeholder "src/assets/images/gallery/online-class.jpg" 400 300 "Online Class" "#0ea5e9"
create_placeholder "src/assets/images/gallery/online-class-full.jpg" 1200 900 "Online Class (Full)" "#0ea5e9"
create_placeholder "src/assets/images/gallery/beginner-class.jpg" 400 300 "Beginner Class" "#8b5cf6"
create_placeholder "src/assets/images/gallery/beginner-class-full.jpg" 1200 900 "Beginner Class (Full)" "#8b5cf6"
create_placeholder "src/assets/images/gallery/senior-class.jpg" 400 300 "Senior Yoga" "#f59e0b"
create_placeholder "src/assets/images/gallery/senior-class-full.jpg" 1200 900 "Senior Yoga (Full)" "#f59e0b"
create_placeholder "src/assets/images/gallery/prenatal-class.jpg" 400 300 "Prenatal Yoga" "#ec4899"
create_placeholder "src/assets/images/gallery/prenatal-class-full.jpg" 1200 900 "Prenatal Yoga (Full)" "#ec4899"

# Gallery images - Personal
create_placeholder "src/assets/images/gallery/personal-training.jpg" 400 300 "Personal Training" "#c026d3"
create_placeholder "src/assets/images/gallery/personal-training-full.jpg" 1200 900 "Personal Training (Full)" "#c026d3"
create_placeholder "src/assets/images/gallery/home-visit.jpg" 400 300 "Home Visit" "#0ea5e9"
create_placeholder "src/assets/images/gallery/home-visit-full.jpg" 1200 900 "Home Visit (Full)" "#0ea5e9"

# Gallery images - Meditation
create_placeholder "src/assets/images/gallery/meditation-session.jpg" 400 300 "Meditation" "#8b5cf6"
create_placeholder "src/assets/images/gallery/meditation-session-full.jpg" 1200 900 "Meditation (Full)" "#8b5cf6"
create_placeholder "src/assets/images/gallery/morning-meditation.jpg" 400 300 "Morning Meditation" "#f59e0b"
create_placeholder "src/assets/images/gallery/morning-meditation-full.jpg" 1200 900 "Morning Meditation (Full)" "#f59e0b"
create_placeholder "src/assets/images/gallery/breathing-exercise.jpg" 400 300 "Pranayama" "#10b981"
create_placeholder "src/assets/images/gallery/breathing-exercise-full.jpg" 1200 900 "Pranayama (Full)" "#10b981"

# Blog images
create_placeholder "src/assets/images/blog/featured-post.jpg" 800 450 "Featured Blog Post" "#0ea5e9"
create_placeholder "src/assets/images/blog/yoga-beginners.jpg" 400 225 "Yoga for Beginners" "#8b5cf6"
create_placeholder "src/assets/images/blog/stress-relief.jpg" 400 225 "Stress Relief" "#10b981"
create_placeholder "src/assets/images/blog/senior-yoga.jpg" 400 225 "Senior Yoga" "#f59e0b"
create_placeholder "src/assets/images/blog/morning-routine.jpg" 400 225 "Morning Routine" "#0ea5e9"
create_placeholder "src/assets/images/blog/prenatal-yoga.jpg" 400 225 "Prenatal Yoga" "#ec4899"
create_placeholder "src/assets/images/blog/meditation-benefits.jpg" 400 225 "Meditation Benefits" "#c026d3"

echo "✅ All placeholder images created!"
echo ""
echo "📁 Images created in:"
echo "  - src/assets/images/"
echo "  - src/assets/images/gallery/"
echo "  - src/assets/images/blog/"
echo ""
echo "⚠️  IMPORTANT: These are placeholder images!"
echo "Replace them with real photos from:"
echo "  - Unsplash.com"
echo "  - Pexels.com"
echo "  - Your own photos"
echo ""
echo "🎨 Colors used:"
echo "  Blue (#0ea5e9) - Primary/Calm"
echo "  Purple (#c026d3) - Accent/Spiritual"
echo "  Green (#10b981) - Growth/Nature"
echo "  Orange (#f59e0b) - Energy/Warmth"
echo "  Pink (#ec4899) - Feminine/Caring"
