import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Megaphone, Phone, Mail, Info } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const HelpSupport = () => {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
       const res = await axios.get(`${API_URL}/notices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("HELP NOTICES:", res.data);

      // 👉 sirf superadmin ke notices
      const filtered = res.data.filter(
        (n: any) => n.postedByRole === "superadmin"
      );

      setNotices(filtered);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🔹 HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-slate-500">
          Official updates from QodeMatrix
        </p>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <Card>
        <div className="p-5 space-y-4">

          <div className="flex items-center gap-2">
            <Megaphone className="text-blue-600" />
            <h2 className="font-semibold">Company Notifications</h2>
          </div>

          {/* 🔹 SAMPLE DATA (later backend se aayega) */}
          {notices.length === 0 ? (
            <p className="text-sm text-gray-400">No notifications</p>
          ) : (
            notices.map((n: any) => (
              <div key={n._id} className="border p-3 rounded-lg">
                <p className="font-medium">{n.title}</p>

                <p className="text-sm text-slate-600">
                  {n.message}
                </p>

                <div className="text-xs text-slate-400 mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
          {/* <div className="border p-3 rounded-lg">
            <p className="font-medium">System Update</p>
            <p className="text-sm text-slate-600">
              New features added to dashboard.
            </p>
            <div className="text-xs text-slate-400 mt-1">
              26 Mar 2026
            </div>
          </div>

          <div className="border p-3 rounded-lg">
            <p className="font-medium">Maintenance Notice</p>
            <p className="text-sm text-slate-600">
              Server maintenance at 12 AM.
            </p>
            <div className="text-xs text-slate-400 mt-1">
              25 Mar 2026
            </div>
          </div> */}

        </div>
      </Card>

      {/* ================= CONTACT ================= */}
      <Card>
        <div className="p-5 space-y-4">

          <div className="flex items-center gap-2">
            <Phone className="text-green-600" />
            <h2 className="font-semibold">Contact Support</h2>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Mail size={14} /> qodematrix2025@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} /> +91 9779871949
            </p>
          </div>

        </div>
      </Card>

      {/* ================= HELP INFO ================= */}
      <Card>
        <div className="p-5 space-y-4">

          <div className="flex items-center gap-2">
            <Info className="text-purple-600" />
            <h2 className="font-semibold">Need Help?</h2>
          </div>

          <p className="text-sm text-slate-600">
            If you are facing any issues while using the system,
            please contact our support team. We are available 24/7
            to assist you.
          </p>

          <Badge>Support Available</Badge>

        </div>
      </Card>

    </div>
  );
};

export default HelpSupport;