export const getCurrentDateISO = (): string => {
    return new Date().toISOString().split("T")[0];
  };
  