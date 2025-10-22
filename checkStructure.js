const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'jsconfig.json',
  'next.config.js',
  'tailwind.config.js',
  '.env.local',
  
  // App
  'app/globals.css',
  'app/layout.jsx',
  'app/page.jsx',
  
  // Components
  'components/Navbar.jsx',
  'components/Hero.jsx',
  'components/About.jsx',
  'components/Skills.jsx',
  'components/Projects.jsx',
  'components/Achievements.jsx',
  'components/Timeline.jsx',
  'components/Blog.jsx',
  'components/Contact.jsx',
  'components/GlassCard.jsx',
  'components/ThemeToggle.jsx',
  'components/SocialFloating.jsx',
  
  // Admin Components
  'components/AdminDashboard/ProjectsManager.jsx',
  'components/AdminDashboard/SkillsManager.jsx',
  'components/AdminDashboard/AboutManager.jsx',
  'components/AdminDashboard/AchievementsManager.jsx',
  
  // Lib
  'lib/mongodb.js',
  'lib/auth.js',
  'lib/utils.js',
  
  // Models
  'models/User.js',
  'models/Project.js',
  'models/Skill.js',
  'models/About.js',
  'models/Achievement.js',
  'models/Education.js',
  'models/Social.js',
  'models/Blog.js',
  
  // API Routes
  'app/api/auth/login/route.js',
  'app/api/projects/route.js',
  'app/api/skills/route.js',
  'app/api/about/route.js',
  'app/api/contact/route.js',
  'app/api/achievements/route.js',
  'app/api/education/route.js',
  'app/api/social/route.js',
  'app/api/blog/route.js',
  'app/api/setup/route.js',
];

console.log('🔍 Checking project structure...\n');

let missing = [];
let found = [];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    found.push(file);
    console.log(`✅ ${file}`);
  } else {
    missing.push(file);
    console.log(`❌ MISSING: ${file}`);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅ Found: ${found.length} files`);
console.log(`❌ Missing: ${missing.length} files`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (missing.length > 0) {
  console.log('Missing files:\n');
  missing.forEach(file => console.log(`  - ${file}`));
  console.log('\n⚠️  Please create the missing files.');
} else {
  console.log('🎉 All required files are present!\n');
}