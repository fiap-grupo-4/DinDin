export const FONT_FAMILY_VAR = "--font-lato" as const;

export const TYPE_SCALE_VARS = [
  "--text-body-sm",
  "--text-body-md",
  "--text-body-lg",
  "--text-heading-xs",
  "--text-heading-sm",
  "--text-heading-md",
  "--text-heading-lg",
  "--text-heading-xl",
] as const;

export const LINE_HEIGHT_VARS = [
  "--leading-body",
  "--leading-heading",
] as const;

export const TYPOGRAPHY_SAMPLE_ROWS = [
  {
    label: "Body sm",
    fontSize: "--text-body-sm",
    lineHeight: "--leading-body",
  },
  {
    label: "Body md",
    fontSize: "--text-body-md",
    lineHeight: "--leading-body",
  },
  {
    label: "Body lg",
    fontSize: "--text-body-lg",
    lineHeight: "--leading-body",
  },
  {
    label: "Heading xs",
    fontSize: "--text-heading-xs",
    lineHeight: "--leading-heading",
  },
  {
    label: "Heading sm",
    fontSize: "--text-heading-sm",
    lineHeight: "--leading-heading",
  },
  {
    label: "Heading md",
    fontSize: "--text-heading-md",
    lineHeight: "--leading-heading",
  },
  {
    label: "Heading lg",
    fontSize: "--text-heading-lg",
    lineHeight: "--leading-heading",
  },
  {
    label: "Heading xl",
    fontSize: "--text-heading-xl",
    lineHeight: "--leading-heading",
  },
] as const;
