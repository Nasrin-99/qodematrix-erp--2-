import React from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, FileText, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const HelpSupport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
        <p className="text-slate-500">Need assistance? We're here to help you with any issues or questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Email Us</h3>
            <p className="text-sm text-slate-500 mt-1">info@qodematrixtechsolutions.com</p>
          </div>
          <a href="mailto:info@qodematrixtechsolutions.com" className="w-full">
            <Button variant="outline" size="sm" className="w-full">Send Email</Button>
          </a>
        </Card>

        <Card className="p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Call Us</h3>
            <p className="text-sm text-slate-500 mt-1">8199824069</p>
          </div>
          <a href="tel:8199824069" className="w-full">
            <Button variant="outline" size="sm" className="w-full">Call Now</Button>
          </a>
        </Card>

        <Card className="p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Live Chat</h3>
            <p className="text-sm text-slate-500 mt-1">Available 9 AM - 6 PM</p>
          </div>
          <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Frequently Asked Questions">
          <div className="space-y-4">
            {[
              { q: 'How do I reset my password?', a: 'You can reset your password from the Settings page under the Security tab.' },
              { q: 'Where can I see my child\'s attendance?', a: 'Parents can view attendance from the "Child Attendance" link in the sidebar.' },
              { q: 'How do I pay school fees online?', a: 'Go to the "My Fees" section and click on the "Pay Outstanding" button.' },
              { q: 'Can I download my report card?', a: 'Yes, report cards are available in the "Exams" section once results are published.' },
            ].map((faq, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-sm text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Documentation & Guides">
          <div className="space-y-4">
            {[
              { title: 'User Manual for Teachers', type: 'PDF', size: '2.4 MB' },
              { title: 'Parent Portal Guide', type: 'PDF', size: '1.8 MB' },
              { title: 'Student Handbook', type: 'PDF', size: '3.1 MB' },
              { title: 'API Documentation', type: 'Link', size: 'External' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-slate-400" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{doc.title}</h4>
                    <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
