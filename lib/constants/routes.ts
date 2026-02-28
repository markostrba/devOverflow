const ROUTES = {
  HOME: "/",
  COLLECTIONS: "/collections",
  FIND_JOBS: "/find-jobs",
  TAGS: "/tags",
  COMMUNITIES: "/communities",
  ASK_A_QUESTION: "/ask-a-question",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
};

export const SIDEBAR_LINKS = [
  { route: ROUTES.HOME, label: "Home", icon: "home-icon" },
  { route: ROUTES.COLLECTIONS, label: "Collections", icon: "folder-icon" },
  { route: ROUTES.FIND_JOBS, label: "Find Jobs", icon: "briefcase-icon" },
  { route: ROUTES.TAGS, label: "Tags", icon: "tag-icon" },
  { route: ROUTES.COMMUNITIES, label: "Communities", icon: "users-icon" },
  {
    route: ROUTES.ASK_A_QUESTION,
    label: "Ask a Question",
    icon: "question-icon",
  },
];

export const AUTH_LINKS = [
  { route: ROUTES.SIGN_IN, label: "Sign In" },
  { route: ROUTES.SIGN_UP, label: "Sign Up" },
];

export default ROUTES;
