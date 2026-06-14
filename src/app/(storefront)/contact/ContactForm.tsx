'use client'

import { toast } from 'sonner'

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent successfully! We will get back to you soon.")
    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
        <input type="text" id="name" className="w-full border-charcoal/20 p-3 focus:outline-none focus:ring-1 focus:ring-gold bg-white" placeholder="Jane Doe" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">Email Address</label>
        <input type="email" id="email" className="w-full border-charcoal/20 p-3 focus:outline-none focus:ring-1 focus:ring-gold bg-white" placeholder="jane@example.com" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">Message</label>
        <textarea id="message" rows={4} className="w-full border-charcoal/20 p-3 focus:outline-none focus:ring-1 focus:ring-gold bg-white" placeholder="How can we help you?" required></textarea>
      </div>
      <button type="submit" className="w-full bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-4 mt-4">
        Send Message
      </button>
    </form>
  )
}
