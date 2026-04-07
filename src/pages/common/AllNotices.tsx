import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Megaphone,
  Plus,
  Calendar,
  Trash2,
  Edit2,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

import { useAuthStore } from "../../store/authStore";

const AllNotices = () => {
  const { user } = useAuthStore();

  // 🔍 USER DEBUG
  console.log("👤 USER FULL:", user);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notices, setNotices] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL + "/notices";

  // 🔍 API DEBUG
  console.log("🌐 API URL:", API);

  const isAdmin =
    user?.role === "superadmin" || user?.role === "schooladmin";

  // ================= FETCH =================
  const fetchNotices = async () => {
    console.log("🚀 FETCH START");
    console.log("👤 ROLE:", user?.role);

    try {
      const token = localStorage.getItem("token");
      console.log("🔑 TOKEN:", token);

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ API RESPONSE:", res);
      console.log("📦 DATA:", res.data);

      setNotices(res.data || []);
      setFiltered(res.data || []);
    } catch (err: any) {
      console.error("❌ FETCH ERROR:", err);
      console.error("❌ ERROR RESPONSE:", err?.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role) {
      console.log("⚡ useEffect RUN");
      fetchNotices();
    }
  }, [user]);

  // ================= SEARCH =================
  useEffect(() => {
    console.log("🔍 SEARCH:", search);

    if (!search) {
      setFiltered(notices);
      return;
    }

    const result = notices.filter((n) =>
      `${n.title || ""} ${n.message || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    console.log("🔎 FILTERED RESULT:", result);

    setFiltered(result);
  }, [search, notices]);

  // ================= DELETE =================
  const deleteNotice = async (id: string) => {
    console.log("🗑 DELETE ID:", id);

    if (!confirm("Delete this notice?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("✅ DELETE SUCCESS");

      fetchNotices();
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  // ================= POST =================
  const postNotice = async () => {
    console.log("📝 POST CLICKED");

    if (!title || !content) {
      console.log("⚠️ EMPTY FIELD");
      return alert("Fill all fields");
    }

    try {
      const token = localStorage.getItem("token");

      console.log("📤 POST DATA:", {
        title,
        message: content,
        schoolId: user?.schoolId,
      });

      const res = await axios.post(
        API,
        {
          title,
          message: content,
          audience: "all",
          targetSchoolId: user?.schoolId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ POST RESPONSE:", res);

      alert("Notice posted ✅");

      setTitle("");
      setContent("");
      setShowModal(false);

      fetchNotices();
    } catch (err: any) {
      console.error("❌ POST ERROR:", err);
      console.error("❌ ERROR RESPONSE:", err?.response);

      alert("Post failed");
    }
  };

  // ================= ICON =================
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <AlertTriangle size={16} className="text-red-500" />;
      case "High":
        return <AlertTriangle size={16} className="text-amber-500" />;
      case "Medium":
        return <Info size={16} className="text-blue-500" />;
      default:
        return <CheckCircle size={16} className="text-emerald-500" />;
    }
  };

  // ================= UI =================
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notice Board</h1>
        </div>

        {isAdmin && (
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Post Notice
          </Button>
        )}
      </div>

      <Input
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <p className="text-center text-red-400 py-6">
          ❌ No notices found (CHECK CONSOLE)
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((notice) => {
            console.log("📌 SINGLE NOTICE:", notice);

            return (
              <Card key={notice._id}>
                <div className="p-6">
                  <h3>{notice.title}</h3>
                  <p>{notice.message}</p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button onClick={postNotice}>Post</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNotices;