export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-20 bg-muted animate-pulse rounded-lg" />
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-muted animate-pulse rounded-lg" />
      <div className="h-80 bg-muted animate-pulse rounded-lg" />
    </div>
  )
}
