import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We'd love to hear from you. Please fill out the form below or use our contact information.
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">Address:</h3>
            <p>123 Jewelry Lane, Gemstone City, 12345</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Phone:</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Email:</h3>
            <p>info@roldgoldjewellery.com</p>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

