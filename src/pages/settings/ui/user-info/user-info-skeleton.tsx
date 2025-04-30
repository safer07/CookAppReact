export default function UserInfoSkeleton(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="skeleton size-10 rounded-full" />
      <div className="space-y-1.5">
        <div className="skeleton h-1.5 w-24 rounded-full" />
        <div className="skeleton h-1.5 w-12 rounded-full" />
      </div>
    </div>
  )
}
