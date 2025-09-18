export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light bg-gradient-to-r from-black via-gray-700 to-gray-900 bg-clip-text text-transparent leading-[1.4] tracking-tight">
            designstudio
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Column 1 - Services */}
          <div className="space-y-4 sm:space-y-6">
            <FooterLink href="#" text="How It Works" />
            <FooterLink href="#" text="Design Process" />
            <FooterLink href="#" text="AI Technology" />
          </div>

          {/* Column 2 - Account */}
          <div className="space-y-4 sm:space-y-6">
            <FooterLink href="#" text="Member Login" />
            <FooterLink href="#" text="Our Story" />
            <div className="flex items-center gap-3">
              <span className="text-black font-light">›</span>
              <a
                href="#"
                className="font-inter text-black hover:text-gray-600 transition-colors font-light text-sm tracking-wide"
              >
                Join the Team
              </a>
              <span className="text-gray-500 text-xs font-light tracking-wide">We're hiring!</span>
            </div>
            <FooterLink href="#" text="Design Labs" />
          </div>

          {/* Column 3 - Services */}
          <div className="space-y-4 sm:space-y-6">
            <FooterLink href="#" text="For Homeowners" />
            <FooterLink href="#" text="For Designers" />
            <FooterLink href="#" text="For Business" />
          </div>

          {/* Column 4 - Social */}
          <div className="space-y-4 sm:space-y-6">
            <FooterLink href="#" text="X/Twitter" />
            <FooterLink href="#" text="Instagram" />
            <FooterLink href="#" text="LinkedIn" />
          </div>

          {/* Column 5 - Legal */}
          <div className="space-y-4 sm:space-y-6">
            <FooterLink href="#" text="Terms" />
            <FooterLink href="#" text="Privacy Policy" />
            <FooterLink href="#" text="FAQ" />
            <FooterLink href="#" text="Contact us" />
          </div>
        </div>

        <div className="text-left">
          <p className="font-inter text-black font-light text-xs sm:text-sm tracking-widest uppercase mb-1">
            2025 DESIGNSTUDIO AI, INC
          </p>
          <p className="font-inter text-black font-light text-xs sm:text-sm tracking-widest uppercase">
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-black font-light">›</span>
      <a
        href={href}
        className="font-inter text-black hover:text-gray-600 transition-colors duration-300 font-light text-sm sm:text-base tracking-wide"
      >
        {text}
      </a>
    </div>
  )
}
