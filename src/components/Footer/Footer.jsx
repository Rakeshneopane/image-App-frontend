import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 - Company */}
          <div>
            <h3 className="font-bold text-lg mb-3">Company Name</h3>
            <p className="text-gray-400 text-sm hover:text-gray-900">
              Making great products since 2024.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-900">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="font-bold text-lg mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-gray-900">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-3">Newsletter</h3>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-100 border-gray-700 text-white"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 Company Name. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-900">Twitter</a>
            <a href="#" className="hover:text-gray-900">LinkedIn</a>
            <a href="#" className="hover:text-gray-900">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;