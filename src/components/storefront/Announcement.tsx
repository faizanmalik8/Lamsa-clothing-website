export default function Announcement({ text }: { text: string }) {
  return (
    <div className="bg-charcoal text-beige text-xs sm:text-sm text-center py-2 px-4 font-medium tracking-wider">
      {text}
    </div>
  )
}
