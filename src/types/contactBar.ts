
export type SocialLink = {
    icon: React.ReactNode;
    url: string;
    label: string;
};

export type ContactInfo = {
    type: 'location' | 'email' | 'phone';
    icon: React.ReactNode;
    content: string;
    href: string;
    ariaLabel: string;
};

export type NavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};