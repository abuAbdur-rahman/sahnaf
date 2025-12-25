import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getHours } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(value));
};

export const isAuthorized = (email: string) => {
  if (!process.env.ADMIN_EMAILS) return false;
  const emails = process.env.ADMIN_EMAILS?.split(",");
  return emails?.includes(email);
};

/**
 * Checks if a shop is open based on 10:00 to 22:00 hours
 */
export const isShopOpen = (): boolean => {
  const currentHour = getHours(new Date());
  return currentHour >= 10 && currentHour < 22;
};

export const formatPrice = (price: number | string) => {
  const num = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(num)) return "0";

  return new Intl.NumberFormat("en-NG").format(num);
};

// Usage:
// formatPrice(1000)      -> "1,000"
// formatPrice("1500000") -> "1,500,000"
