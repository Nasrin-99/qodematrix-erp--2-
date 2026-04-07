import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Megaphone,
  Plus,
  Calendar,
  Trash2,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

import { useAuthStore } from "../../store/authStore";

const NoticeBoard = () => {
  const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [notices, setNotices] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  const API = import.meta.env.VITE_API_URL + "/notices";

  // ===============================
  // 🔹 FETCH SCHOOLS (NEW 🔥)
  // ===============================
  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/schools",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("🏫 Schools:", res.data);
      setSchools(res.data);

    } catch (err) {
      console.log("School fetch error:", err);
    }
  };

  // ===============================
  // 🔹 FETCH NOTICES
  // ===============================
  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📄 Notices:", res.data);
      setNotices(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔹 LOAD DATA
  // ===============================
  useEffect(() => {
    if (user) {
      fetchNotices();

      // 🔥 ONLY SUPERADMIN → fetch schools
      if (user.role === "superadmin") {
        fetchSchools();
      }
    }
  }, [user]);

  // ===============================
  // 🔹 POST NOTICE
  // ===============================
  const postNotice = async () => {
    if (!title || !message) return alert("Fill all fields");

    // 🔥 SCHOOL VALIDATION
    if (user?.role === "superadmin" && !selectedSchool) {
      return alert("Select school ❗");
    }

    try {
      const token = localStorage.getItem("token");

      console.log("SELECTED SCHOOL:", selectedSchool);


      await axios.post(
        API,
        {
          title,
          message,
          audience: "schooladmin",

          targetSchoolId: selectedSchool, // 🔥 MAIN FEATURE
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Notice posted ✅");

      setTitle("");
      setMessage("");
      setSelectedSchool("");
      setShowModal(false);
      fetchNotices();

    } catch (err) {
      console.log("POST ERROR:", err);
      alert("Failed ❌");
    }
  };

  // ===============================
  // 🔹 DELETE NOTICE
  // ===============================
  const deleteNotice = async (id: string) => {
    if (!confirm("Delete this notice?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchNotices();
  };

  // ===============================
  // 🔹 FILTER
  // ===============================
  const filtered = notices.filter((n) =>
    `${n.title} ${n.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notice Board</h1>
          <p className="text-slate-500">
            QodeMatrix announcements and updates
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Post Notice
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {filtered.map((notice) => (
            <Card key={notice._id}>
              <div className="p-5 space-y-3">

                <div className="flex justify-between">

                  <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <Megaphone className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{notice.title}</h3>

                      <div className="text-xs text-slate-500 flex gap-2 items-center">
                        <Calendar size={12} />
                        {new Date(notice.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNotice(notice._id)}
                  >
                    <Trash2 size={14} />
                  </Button>

                </div>

                <p className="text-sm text-slate-600">
                  {notice.message}
                </p>

                <Badge>{notice.audience}</Badge>

              </div>
            </Card>
          ))}

        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-4 shadow-lg">

            <h2 className="text-lg font-bold">Post Notice</h2>

            {/* 🔥 SCHOOL DROPDOWN */}
            {user?.role === "superadmin" && (
              <select
                className="w-full border p-2 rounded"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="">Select School</option>

                {schools.map((school: any) => (
                  <option key={school._id} value={school._id}>
                    🏫 {school.name}
                  </option>
                ))}
              </select>
            )}

            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <Button onClick={postNotice}>Post</Button>

              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;