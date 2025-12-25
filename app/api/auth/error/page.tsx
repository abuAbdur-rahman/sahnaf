// app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  AlertTriangle,
  ShieldAlert,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from "react";

function ErrorDetails() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorDetails = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return {
          title: "Configuration Error",
          description: "There is a problem with the server configuration.",
          icon: AlertTriangle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "AccessDenied":
        return {
          title: "Access Denied",
          description:
            "You do not have permission to sign in. Only authorized accounts can access the admin dashboard.",
          icon: ShieldAlert,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "Verification":
        return {
          title: "Verification Failed",
          description:
            "The verification token has expired or has already been used.",
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "OAuthSignin":
        return {
          title: "OAuth Sign In Error",
          description:
            "There was an error while trying to authenticate with Google.",
          icon: AlertTriangle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "OAuthCallback":
        return {
          title: "OAuth Callback Error",
          description:
            "An error occurred during the authentication callback process.",
          icon: AlertTriangle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "OAuthCreateAccount":
        return {
          title: "Account Creation Failed",
          description:
            "Could not create an account with the provided OAuth credentials.",
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "EmailCreateAccount":
        return {
          title: "Email Account Creation Failed",
          description:
            "Could not create an account with the provided email address.",
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "Callback":
        return {
          title: "Callback Error",
          description: "An error occurred during the authentication callback.",
          icon: AlertTriangle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "OAuthAccountNotLinked":
        return {
          title: "Account Not Linked",
          description:
            "This email is already associated with another account. Please use a different email or sign in method.",
          icon: ShieldAlert,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "SessionRequired":
        return {
          title: "Session Required",
          description: "You must be signed in to access this page.",
          icon: ShieldAlert,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "Default":
      default:
        return {
          title: "Authentication Error",
          description:
            "An unexpected error occurred during authentication. Please try again.",
          icon: AlertTriangle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const errorDetails = getErrorDetails(error);
  const ErrorIcon = errorDetails.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sahnaf Global Tech
          </h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1 pb-4">
            <div
              className={`w-14 h-14 rounded-full ${errorDetails.bgColor} flex items-center justify-center mx-auto mb-4`}
            >
              <ErrorIcon className={`h-7 w-7 ${errorDetails.color}`} />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {errorDetails.title}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {errorDetails.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            <Alert
              className={`${errorDetails.borderColor} ${errorDetails.bgColor}`}
            >
              <ErrorIcon className={`h-4 w-4 ${errorDetails.color}`} />
              <AlertTitle className={errorDetails.color}>
                What happened?
              </AlertTitle>
              <AlertDescription className="text-gray-700">
                {error === "AccessDenied" ? (
                  <>
                    Your account is not authorized to access the admin
                    dashboard. If you believe this is an error, please contact
                    the administrator.
                  </>
                ) : (
                  <>
                    Something went wrong during the authentication process. This
                    could be a temporary issue.
                  </>
                )}
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link href="/auth/signin" className="block">
                <Button className="w-full h-11" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button variant="outline" className="w-full h-11" size="lg">
                  Go to Home
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-gray-600 pt-4 border-t space-y-2">
              <p className="font-medium">Need Help?</p>
              <p className="text-xs text-gray-500">
                If you continue to experience issues, please contact support or
                try again later.
              </p>
              {error === "AccessDenied" && (
                <p className="text-xs text-gray-500 font-medium mt-3">
                  Admin Email:{" "}
                  <span className="text-emerald-600">
                    {process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
                      "admin@sahnafglobaltech.com"}
                  </span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Support */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Having trouble? Contact us on WhatsApp
          </p>
          <a
            href="https://wa.me/2347068288647?text=I need help with admin access"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorDetails />
    </Suspense>
  );
}
