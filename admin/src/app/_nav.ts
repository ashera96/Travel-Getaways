interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: false,
    name: "Actions"
  },
  {
    name: "Users",
    url: "/base/users",
    icon: "icon-puzzle"
  },
  {
    name: "Posts",
    url: "/base/posts",
    icon: "icon-cursor"
  },
  {
    name: "Messages",
    url: "/base/messages",
    icon: "icon-envelope-open"
  },
  {
    name: "Widgets",
    url: "/widgets",
    icon: "icon-calculator",
    badge: {
      variant: "info",
      text: "NEW"
    }
  },
  {
    divider: true
  }
];
