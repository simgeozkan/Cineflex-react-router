import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect, lazy, Suspense } from "react";

const FirebaseAuthInitializer = lazy(() =>
  import('./components/FirebaseAuthInitializer').then(module => ({ default: module.FirebaseAuthInitializer }))
);

const GoogleAuth = lazy(() =>
  import('./components/GoogleAuth').then(module => ({ default: module.GoogleAuth }))
);

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  const { currentUser, loading, error } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0">
        <h1 className="text-2xl font-bold text-gray-800">My App</h1>
        <Suspense fallback={<div className="w-48 h-10 bg-gray-200 rounded-md animate-pulse" />}>
          <GoogleAuth />
        </Suspense>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {currentUser ? <Outlet /> : <LoginPage />}
      </main>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg text-gray-600">Please sign in using the button in the header.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ClientOnly>
        <Suspense fallback={null}>
          <FirebaseAuthInitializer />
        </Suspense>
      </ClientOnly>
      <AppContent />
    </AuthProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
