import { 
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiCsharp, SiPhp, SiRuby, SiGo, SiRust, SiSwift, SiKotlin,
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNextdotjs, SiNuxtdotjs, SiGatsby,
  SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiFlask, SiFastapi, SiSpring, SiLaravel,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiSqlite, SiFirebase, SiSupabase,
  SiAmazonaws, SiMicrosoftazure, SiGooglecloud, SiVercel, SiNetlify, SiHeroku,
  SiDocker, SiKubernetes, SiJenkins, SiGithubactions, SiTerraform,
  SiHtml5, SiCss3, SiSass, SiTailwindcss, SiBootstrap,
  SiGit, SiGithub, SiGitlab, SiBitbucket, SiLinux, SiUbuntu, SiWindows, SiMacos,
  SiVisualstudiocode, SiIntellijidea, SiSublimetext, SiAtom,
  SiFigma, SiSketch, SiAdobexd, SiCanva, SiBlender, SiUnity,
  SiTensorflow, SiPytorch, SiOpencv, SiJupyter, SiAnaconda,
  SiWordpress, SiShopify, SiWix, SiSquarespace
} from 'react-icons/si';
import { 
  FaCode, FaDatabase, FaServer, FaCloud, FaTools, FaPalette, FaBrain, FaShoppingCart,
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava, FaPhp, FaLaravel,
  FaWordpress, FaShopify, FaAws, FaDocker, FaGitAlt, FaLinux, FaWindows, FaApple
} from 'react-icons/fa';

export const getLanguageIcon = (language) => {
  const lang = language.toLowerCase().trim();
  
  const iconMap = {
    // Programming Languages
    'javascript': SiJavascript,
    'js': SiJavascript,
    'typescript': SiTypescript,
    'ts': SiTypescript,
    'python': SiPython,
    'py': SiPython,
    'java': FaJava, // Changed from SiJava to FaJava
    'c++': SiCplusplus,
    'cpp': SiCplusplus,
    'c#': SiCsharp,
    'csharp': SiCsharp,
    'php': SiPhp,
    'ruby': SiRuby,
    'go': SiGo,
    'golang': SiGo,
    'rust': SiRust,
    'swift': SiSwift,
    'kotlin': SiKotlin,
    
    // Frontend Frameworks
    'react': SiReact,
    'reactjs': SiReact,
    'vue': SiVuedotjs,
    'vuejs': SiVuedotjs,
    'angular': SiAngular,
    'svelte': SiSvelte,
    'next': SiNextdotjs,
    'nextjs': SiNextdotjs,
    'nuxt': SiNuxtdotjs,
    'nuxtjs': SiNuxtdotjs,
    'gatsby': SiGatsby,
    
    // Backend Frameworks
    'node': SiNodedotjs,
    'nodejs': SiNodedotjs,
    'express': SiExpress,
    'expressjs': SiExpress,
    'nestjs': SiNestjs,
    'django': SiDjango,
    'flask': SiFlask,
    'fastapi': SiFastapi,
    'spring': SiSpring,
    'laravel': SiLaravel,
    
    // Databases
    'mongodb': SiMongodb,
    'mongo': SiMongodb,
    'postgresql': SiPostgresql,
    'postgres': SiPostgresql,
    'mysql': SiMysql,
    'redis': SiRedis,
    'sqlite': SiSqlite,
    'firebase': SiFirebase,
    'supabase': SiSupabase,
    
    // Cloud & DevOps
    'aws': SiAmazonaws,
    'azure': SiMicrosoftazure,
    'gcp': SiGooglecloud,
    'vercel': SiVercel,
    'netlify': SiNetlify,
    'heroku': SiHeroku,
    'docker': SiDocker,
    'kubernetes': SiKubernetes,
    'k8s': SiKubernetes,
    'jenkins': SiJenkins,
    'github actions': SiGithubactions,
    'terraform': SiTerraform,
    
    // Web Technologies
    'html': SiHtml5,
    'html5': SiHtml5,
    'css': SiCss3,
    'css3': SiCss3,
    'sass': SiSass,
    'scss': SiSass,
    'tailwind': SiTailwindcss,
    'tailwindcss': SiTailwindcss,
    'bootstrap': SiBootstrap,
    'material-ui': SiReact, // Changed from SiMaterialui - using React icon as fallback
    'mui': SiReact, // Changed from SiMaterialui - using React icon as fallback
    
    // Tools & Platforms
    'git': SiGit,
    'github': SiGithub,
    'gitlab': SiGitlab,
    'bitbucket': SiBitbucket,
    'linux': SiLinux,
    'ubuntu': SiUbuntu,
    'windows': SiWindows,
    'macos': SiMacos,
    'vscode': SiVisualstudiocode,
    'intellij': SiIntellijidea,
    'sublime': SiSublimetext,
    'atom': SiAtom,
    
    // Design Tools
    'figma': SiFigma,
    'sketch': SiSketch,
    'xd': SiAdobexd,
    'canva': SiCanva,
    'blender': SiBlender,
    'unity': SiUnity,
    
    // AI/ML
    'tensorflow': SiTensorflow,
    'pytorch': SiPytorch,
    'opencv': SiOpencv,
    'jupyter': SiJupyter,
    'anaconda': SiAnaconda,
    
    // CMS & E-commerce
    'wordpress': SiWordpress,
    'shopify': SiShopify,
    'wix': SiWix,
    'squarespace': SiSquarespace,
  };
  
  return iconMap[lang] || FaCode;
};

export const getCategoryIcon = (category) => {
  const categoryMap = {
    'frontend': FaReact,
    'backend': FaServer,
    'database': FaDatabase,
    'cloud': FaCloud,
    'devops': FaTools,
    'design': FaPalette,
    'ai': FaBrain,
    'ecommerce': FaShoppingCart,
    'mobile': FaCode,
    'web': FaCode,
    'desktop': FaCode,
  };
  
  return categoryMap[category.toLowerCase()] || FaCode;
};

export const getSkillColor = (skill) => {
  const colorMap = {
    'javascript': '#F7DF1E',
    'typescript': '#3178C6',
    'python': '#3776AB',
    'java': '#007396',
    'react': '#61DAFB',
    'vue': '#4FC08D',
    'angular': '#DD0031',
    'node': '#339933',
    'express': '#000000',
    'mongodb': '#47A248',
    'postgresql': '#336791',
    'aws': '#FF9900',
    'docker': '#2496ED',
    'kubernetes': '#326CE5',
    'git': '#F05032',
    'html': '#E34F26',
    'css': '#1572B6',
    'sass': '#CC6699',
    'tailwind': '#06B6D4',
    'bootstrap': '#7952B3',
    'php': '#777BB4',
    'laravel': '#FF2D20',
    'django': '#092E20',
    'flask': '#000000',
    'mysql': '#4479A1',
    'redis': '#DC382D',
    'firebase': '#FFCA28',
    'figma': '#F24E1E',
    'photoshop': '#31A8FF',
    'mui': '#007FFF',
    'material-ui': '#007FFF',
  };
  
  return colorMap[skill.toLowerCase()] || '#6366F1';
};