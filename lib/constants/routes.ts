import { BriefcaseIcon } from "@/components/ui/briefcase-icon";
import { CircleHelpIcon } from "@/components/ui/circle-help";
import { FolderHeartIcon } from "@/components/ui/folder-heart";
import { HomeIcon } from "@/components/ui/home";
import { TagsIcon } from "@/components/ui/tags-icon";
import { UsersIcon } from "@/components/ui/users";

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
  { route: ROUTES.HOME, label: "Home", icon: HomeIcon },
  { route: ROUTES.COLLECTIONS, label: "Collections", icon: FolderHeartIcon },
  { route: ROUTES.FIND_JOBS, label: "Find Jobs", icon: BriefcaseIcon },
  { route: ROUTES.TAGS, label: "Tags", icon: TagsIcon },
  { route: ROUTES.COMMUNITIES, label: "Communities", icon: UsersIcon },
  {
    route: ROUTES.ASK_A_QUESTION,
    label: "Ask a Question",
    icon: CircleHelpIcon,
  },
];

export const AUTH_LINKS = [
  { route: ROUTES.SIGN_IN, label: "Sign In" },
  { route: ROUTES.SIGN_UP, label: "Sign Up" },
];

export default ROUTES;
