import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer({ settings }: { settings: any }) {
  return (
    <footer className="bg-charcoal text-beige border-t border-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest text-gold mb-4 block">
              {settings?.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logo_url} alt="Lamsa Logo" className="h-12 object-contain brightness-0 invert opacity-80" />
              ) : (
                'LAMSA'
              )}
            </Link>
            <p className="text-sm text-beige/70 leading-relaxed">
              Premium women's unstitched clothing. Discover elegance and quality in every thread.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 tracking-wider text-gold">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collections/new-arrivals" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 tracking-wider text-gold">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping-policy" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-beige/70 hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 tracking-wider text-gold">Get in Touch</h4>
            <ul className="space-y-3 mb-6">
              {settings?.contact_email && (
                <li className="flex items-center space-x-3 text-sm text-beige/70">
                  <Mail className="h-4 w-4 text-gold" />
                  <span>{settings.contact_email}</span>
                </li>
              )}
              {settings?.phone_number && (
                <li className="flex items-center space-x-3 text-sm text-beige/70">
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{settings.phone_number}</span>
                </li>
              )}
              {settings?.whatsapp_number && (
                <li className="flex items-center space-x-3 text-sm text-beige/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>{settings.whatsapp_number}</span>
                </li>
              )}
            </ul>
            
            <div className="flex space-x-4">
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="text-beige hover:text-gold transition-colors p-2 bg-beige/5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="text-beige hover:text-gold transition-colors p-2 bg-beige/5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-beige/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-beige/50">
            &copy; {new Date().getFullYear()} Lamsa. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            {/* Payment methods placeholder */}
            <p className="text-xs text-beige/50">Secure checkout</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
