export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-20 bg-muted animate-pulse rounded-lg" />
      <div className="h-12 bg-muted animate-pulse rounded-lg w-64" />
      <div className="space-y-4">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    </div>
  )
}
