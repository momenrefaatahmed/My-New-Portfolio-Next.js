'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si'

export default function ContactUs() {
  return (
    <div className="container mx-auto py-16" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2
            className="text-5xl font-bold text-green-400"
            style={{ fontFamily: 'Kablammo' }}
          >
            Let’s connect
          </h2>
          <p className="text-white text-lg">
            Say Hello At{' '}
            <a
              href="mailto:momenrefaat64@gmail.com"
              className="text-green-400 underline"
            >
              momenrefaat64@gmail.com
            </a>
          </p>

          <div className="flex gap-6 mt-4">
            <a
              href="https://www.linkedin.com/in/momen-refaat-451a2629b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiLinkedin
                size={40}
                className="hover:text-blue-500 transition-colors"
              />
            </a>
            <a
              href="https://www.instagram.com/momen_r_ahmed/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiInstagram
                size={40}
                className="hover:text-pink-500 transition-colors"
              />
            </a>
            <a
              href="https://www.facebook.com/momen.refaat.316937"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiFacebook
                size={40}
                className="hover:text-blue-500 transition-colors"
              />
            </a>
            <a
              href="https://github.com/momenrefaatahmed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub
                size={40}
                className="hover:text-gray-500 transition-colors"
              />
            </a>
            <a
              href="https://wa.me/201066935127?text=Hi%20Momen%2C%20I%20want%20to%20contact%20you!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp
                size={40}
                className="hover:text-green-500 transition-colors"
              />
            </a>
          </div>
        </div>

        <div className="p-8 rounded-2xl w-full backdrop-blur-sm bg-black/30">
          <h3 className="text-3xl font-semibold mb-6 text-green-400">
            Send me a message
          </h3>
          <form
            action="https://formspree.io/f/mldpqwwe"
            method="POST"
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-3 rounded bg-black/70 border border-gray-700 focus:border-green-400 outline-none text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              required
              className="p-3 rounded bg-black/70 border border-gray-700 focus:border-green-400 outline-none text-white"
            />
            <button
              type="submit"
              className="bg-green-400 text-black font-bold py-3 rounded-md hover:bg-green-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
