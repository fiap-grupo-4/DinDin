interface ProfilePictureProps {
  profileName: string;
}

export function ProfilePicture({ profileName }: ProfilePictureProps) {
  return (
    <div className="bg-brand-600 text-brand-100 w-fit rounded-full px-4 py-2">
      {profileName[0].toUpperCase()}
    </div>
  );
}
