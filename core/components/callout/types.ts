import React from "react"
import { CSS } from "@/stitches.config"

export type CalloutVariant = "info" | "danger" | "warning";

export interface CalloutProps {
  children: React.ReactNode;
  label?: React.ReactNode | string;
  variant: CalloutVariant;
  css?: CSS;
}