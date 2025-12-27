import { atomWithStorage } from "jotai/utils";
import type { SuitabilityFormValues } from "./schema";

export const suitabilityAtom = atomWithStorage<Partial<SuitabilityFormValues>>(
  "suitability-data",
  {},
);
