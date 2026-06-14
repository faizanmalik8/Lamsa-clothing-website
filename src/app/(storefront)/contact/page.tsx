import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from './ContactForm'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single()

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Contact Us</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
        <p className="mt-6 text-charcoal/70">We would love to hear from you. Reach out to us for any queries.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-white p-8 border border-charcoal/10 shadow-sm">
          <h2 className="font-serif text-2xl mb-8 text-charcoal">Get in Touch</h2>
          
          <div className="space-y-6">
            {settings?.phone_number && (
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-charcoal">Phone Number</h3>
                  <p className="text-charcoal/70 mt-1">{settings.phone_number}</p>
                  <p className="text-sm text-charcoal/50 mt-1">Monday to Saturday, 9am - 6pm</p>
                </div>
              </div>
            )}
            
            {settings?.whatsapp_number && (
              <div className="flex items-start space-x-4">
                <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-charcoal">WhatsApp</h3>
                  <p className="text-charcoal/70 mt-1">{settings.whatsapp_number}</p>
                  <p className="text-sm text-charcoal/50 mt-1">Chat with us instantly</p>
                </div>
              </div>
            )}
            
            {settings?.contact_email && (
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-charcoal">Email Address</h3>
                  <p className="text-charcoal/70 mt-1">{settings.contact_email}</p>
                  <p className="text-sm text-charcoal/50 mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>
            )}
            

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-beige-dark/20 p-8 border border-charcoal/10">
          <h2 className="font-serif text-2xl mb-8 text-charcoal">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
