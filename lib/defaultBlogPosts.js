/**
 * Default Technical Blog Articles for Anand Kumar's Portfolio
 */

export const defaultBlogPosts = [
  {
    "_id": "post-flutter-1",
    "title": "Mastering 60FPS Cross-Platform Apps with Flutter & Clean Architecture",
    "slug": "mastering-cross-platform-apps-with-flutter",
    "excerpt": "Deep-dive into Flutter rendering engine, RepaintBoundaries, Bloc/Riverpod state management, and native platform channels for production iOS & Android apps.",
    "content": "Building fluid 60FPS to 120FPS mobile applications requires a profound understanding of Flutter's three trees: the Widget Tree, Element Tree, and RenderObject Tree.\n\nIn this deep-dive, we break down the architectural patterns and rendering optimizations required to engineer enterprise-grade cross-platform apps:\n\n### 1. The Rendering Pipeline: Skia & Impeller\nFlutter bypasses the traditional OEM platform widgets by rendering directly to its own canvas using the Impeller engine on iOS and Skia/Impeller on Android. \nTo avoid UI thread jank:\n- Keep the build() method pure and computationally lightweight.\n- Isolate expensive computational operations using Dart compute() or background Worker Isolates.\n- Wrap heavy animations in RepaintBoundary to prevent cascade repaints across the entire widget subtree.\n\n### 2. Predictable State Management with BLoC & Riverpod\nIn enterprise Flutter apps, UI must be completely separated from business logic:\n- BLoC (Business Logic Component): Employs reactive streams to convert UI events into deterministic states, ensuring strict auditability.\n- Riverpod: Offers compile-safe, testable dependency injection with granular rebuild subscriptions that minimize unnecessary widget redraws.\n\n### 3. Native Platform Interoperability\nWhen hardware-accelerated capabilities (biometrics, secure enclaves, background telemetry, or camera pipelines) are required, MethodChannels and Pigeon provide type-safe bidirectional serialization between Dart and Kotlin/Swift.\n\n### Conclusion\nFlutter provides unmatched developer velocity without sacrificing the high-performance bar demanded by modern smartphone users. By mastering the Element tree and reactive state, you build apps that feel indistinguishable from hand-crafted native code.",
    "coverImage": "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop",
    "tags": [
      "Flutter",
      "Dart",
      "Mobile",
      "Architecture",
      "iOS",
      "Android"
    ],
    "createdAt": "2024-04-02T10:00:00.000Z",
    "published": true
  },
  {
    "_id": "post-1",
    "title": "Architecting Scalable Web Applications with Next.js & MongoDB",
    "slug": "architecting-scalable-web-applications",
    "excerpt": "Key strategies for structuring full-stack web applications with Next.js App Router, server actions, connection pooling, and MongoDB indexing.",
    "content": "Modern web engineering demands both blazing-fast initial load times and resilient, low-latency backend architectures. Combining Next.js 14 App Router with MongoDB Atlas provides a battle-tested stack.\n\n### 1. App Router & Server Components\nReact Server Components (RSC) fundamentally redefine how full-stack applications manage data fetching:\n- Zero-bundle-size dependencies on the client.\n- Streaming SSR with React Suspense for instant Above-the-Fold rendering.\n- Native fetch request deduplication and ISR caching.\n\n### 2. Efficient MongoDB Connection Caching\nIn serverless environments (such as Vercel Edge and AWS Lambda), instantiating a new database connection on every incoming request quickly exhausts the connection pool. Caching the Mongoose connection in a global variable guarantees single-instance reuse across warm serverless invocations.\n\n### 3. Compound Indexing & Query Optimization\nNever query without proper indexes in production:\n- Use compound indexes tailored to query filter patterns.\n- Leverage projection to only retrieve needed fields (lean() mode).\n- Utilize the MongoDB Aggregation Pipeline for complex analytics.",
    "coverImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    "tags": [
      "Next.js",
      "React",
      "MongoDB",
      "Architecture",
      "Full-Stack"
    ],
    "createdAt": "2024-03-15T10:00:00.000Z",
    "published": true
  },
  {
    "_id": "post-2",
    "title": "Mastering Fluid Micro-Interactions with Framer Motion & Tailwind",
    "slug": "fluid-micro-interactions-framer-motion",
    "excerpt": "Learn how to elevate UI design with physics-based springs, gesture tracking, layout animations, and glassmorphism without compromising on 60fps performance.",
    "content": "User interfaces that respond naturally to user gestures foster immediate trust and delight. Rather than rigid duration-based bezier curves, physics-based springs replicate natural momentum and friction.\n\n### 1. Spring Physics vs. Duration Curves\nSpring animations dynamically preserve velocity when interrupted. With Framer Motion:\n- Adjust stiffness and damping to craft snappy, responsive interactions.\n- Avoid animating costly layout properties (width, height, margin) and prioritize GPU-composited transforms (transform, opacity, scale).\n\n### 2. Layout Transitions with layoutId\nShared layout animations enable seamless state switching—such as sliding navigation pills or expanding card drawers—with a single line of declarative code.\n\n### 3. Accessible Motion\nAlways honor the user's system preferences by respecting prefers-reduced-motion to ensure accessibility for all users.",
    "coverImage": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    "tags": [
      "UI/UX",
      "Framer Motion",
      "Tailwind CSS",
      "Design",
      "Animation"
    ],
    "createdAt": "2024-02-28T10:00:00.000Z",
    "published": true
  },
  {
    "_id": "post-3",
    "title": "Building AI-Powered Dashboards: From Concept to Production",
    "slug": "building-ai-powered-dashboards",
    "excerpt": "How to design and deploy AI-driven financial analytics tools with real-time charts, intelligent budgeting, and automated reporting.",
    "content": "Intelligent dashboards go beyond static data visualization by turning raw numerical streams into predictive, actionable guidance.\n\n### 1. Real-Time Streaming & WebSockets\nFinancial analytics require sub-second state updates. Pairing Next.js with reactive event streams allows live metric charts to animate dynamically as new transactions arrive.\n\n### 2. LLM Summarization & Anomaly Detection\nIntegrating fine-tuned language models directly into client dashboards empowers users to ask natural questions like \"How does my spending this week compare to last month?\" and receive concise, analytical summaries with visual chart annotations.\n\n### 3. Resilient Client-Side Caching\nEmploying optimistic UI updates alongside offline caching (IndexedDB/React Query) ensures the application remains responsive even under unstable network conditions.",
    "coverImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    "tags": [
      "AI",
      "Analytics",
      "Fintech",
      "Full-Stack"
    ],
    "createdAt": "2024-01-20T10:00:00.000Z",
    "published": true
  }
];

export const fallbackPostsMap = defaultBlogPosts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {});
