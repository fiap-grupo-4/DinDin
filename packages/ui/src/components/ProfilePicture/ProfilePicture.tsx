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
    <div className={`w-fit rounded-full px-4 py-2 ${profileKinds[kind]}`}>
      {profileName[0].toUpperCase()}
    </div>
  );
}
