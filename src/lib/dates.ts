
import { z } from "astro/zod";

export const dateText = z
  .union([z.date().transform((date) => date.toISOString().slice(0, 10)), z.string()])
  .refine((text) => /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/.test(text), {
    message: "Give a date as 2025-09-01, or 2025-09 if the day is not known.",
  });

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parts(text: string): { year: number; month: number; day?: number } {
  const [year, month, day] = text.split("-").map(Number);
  return { year, month, day };
}

export function moment(text: string, { start = false } = {}): number {
  const { year, month, day } = parts(text);
  return Date.UTC(year, month - 1, day ?? (start ? 1 : 15));
}

export function monthAndYear(text: string): string {
  const { year, month } = parts(text);
  return `${MONTHS[month - 1]} ${year}`;
}

export function dayMonthAndYear(text: string): string {
  const { day } = parts(text);
  return day ? `${day} ${monthAndYear(text)}` : monthAndYear(text);
}

const LONG = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const dateInFull = (text: string) => LONG.format(moment(text));

export const monthName = (index: number) => MONTHS[index];
