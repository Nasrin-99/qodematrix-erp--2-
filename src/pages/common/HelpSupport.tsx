import React, { useEffect, useState } from "react";
import axios from "axios";
import {
Mail,
Phone,
MessageSquare,
FileText,
ExternalLink,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const HelpSupport = () => {

const [faqs, setFaqs] = useState<any[]>([]);
const [docs, setDocs] = useState<any[]>([]);

const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const API = import.meta.env.VITE_API_URL;

// ===============================
// FETCH FAQ + DOCS
// ===============================
useEffect(() => {
const fetchData = async () => {
try {
const faqRes = await axios.get(`${API}/support/faqs`);
const docRes = await axios.get(`${API}/support/docs`);


    setFaqs(faqRes.data);
    setDocs(docRes.data);

  } catch (err) {
    console.error("Support fetch error", err);
  }
};

fetchData();


}, []);

// ===============================
// SEND MESSAGE (SUPPORT TICKET)
// ===============================
const sendMessage = async () => {
if (!message) return;


try {
  setLoading(true);

  await axios.post(`${API}/support/ticket`, {
    message,
  });

  setMessage("");
  alert("Message sent successfully");

} catch (err) {
  alert("Failed to send message");
} finally {
  setLoading(false);
}


};

return ( <div className="space-y-6">


  {/* HEADER */}
  <div>
    <h1 className="text-2xl font-bold text-slate-900">
      Help & Support
    </h1>
    <p className="text-slate-500">
      Need help? Contact us anytime.
    </p>
  </div>

  {/* CONTACT */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <Card className="p-6 text-center space-y-4">
      <Mail className="mx-auto text-indigo-600" size={28} />
      <p className="text-sm">info@qodematrixtechsolutions.com</p>
    </Card>

    <Card className="p-6 text-center space-y-4">
      <Phone className="mx-auto text-emerald-600" size={28} />
      <p className="text-sm">+91 8199824069</p>
    </Card>

    <Card className="p-6 text-center space-y-4">
      <MessageSquare className="mx-auto text-amber-600" size={28} />
      <p className="text-sm">Live Chat Coming Soon</p>
    </Card>

  </div>

  {/* SUPPORT FORM */}
  <Card className="p-6 space-y-4">
    <h3 className="font-semibold">Send us a message</h3>

    <Input
      placeholder="Describe your issue..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <Button onClick={sendMessage} isLoading={loading}>
      Send Message
    </Button>
  </Card>

  {/* FAQ */}
  <Card title="FAQs">
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq._id}>
          <h4 className="font-semibold">{faq.question}</h4>
          <p className="text-sm text-slate-500">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  </Card>

  {/* DOCS */}
  <Card title="Documentation">
    <div className="space-y-3">
      {docs.map((doc) => (
        <a
          key={doc._id}
          href={doc.link}
          target="_blank"
          className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50"
        >
          <div className="flex gap-3 items-center">
            <FileText size={18} />
            <span>{doc.title}</span>
          </div>
          <ExternalLink size={14} />
        </a>
      ))}
    </div>
  </Card>

</div>


);
};
