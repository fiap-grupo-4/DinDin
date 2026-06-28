interface ProfilePictureProps {
  profileName: string;
  kind: "primary" | "secondary";
}

export function ProfilePicture({ profileName, kind }: ProfilePictureProps) {
  const profileKinds: Record<ProfilePictureProps["kind"], string> = {
    primary: "bg-brand-600 text-brand-100",
    secondary: "bg-brand-100 text-brand-600",
  };

  return (
    <div
      className={`w-fit rounded-full md:px-4 md:py-2 px-3 py-1 ${profileKinds[kind]}`}
    >
      {profileName[0].toUpperCase()}
    </div>
  );
}
