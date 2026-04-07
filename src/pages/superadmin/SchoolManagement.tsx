import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Power,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { schoolService } from '../../api/services';

export const SchoolManagement = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("Basic Plan");


  // ================= 🔥 ACTION FUNCTIONS =================

  const loginAsAdmin = (school: any) => {
    console.log("LOGIN AS:", school);
    alert(`Login as ${school.name}`);
  };

  const openEdit = (school: any) => {
    console.log("EDIT:", school);
    alert(`Edit ${school.name}`);
  };

  const toggleSchoolStatus = async (school: any) => {
    try {
      const newStatus = school.status === "Active" ? "Inactive" : "Active";

      await schoolService.update(school._id, {
        status: newStatus,
      });

      alert("Status Updated ✅");

      const data = await schoolService.getAll();
      setSchools(data);

    } catch (err) {
      console.log("STATUS ERROR:", err);
      alert("Failed ❌");
    }
  };

  // ================= DELETE SCHOOL =================
  const handleDeleteSchool  = async (id: string) => {
    if (!confirm("Are you sure you want to delete this school? This will delete the school and all related data. ⚠️")) return;

    try {
      await schoolService.delete(id);

      alert("Deleted Successfully ✅");

      

      const data = await schoolService.getAll();
      setSchools(data);

    } catch (err) {
      console.log("DELETE ERROR:", err);
      alert("Delete Failed ❌");
    }
  };


  // ================= CREATE SCHOOL =================

  const handleCreateSchool = async () => {

    if (!name || !address || !email) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      await schoolService.create({
        name,
        address,
        email,
        phone,
        plan
      });

      alert("School Created ✅");

      setIsModalOpen(false);

      const data = await schoolService.getAll();
      setSchools(data);

    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };


  // ================= FETCH =================

  useEffect(() => {
    schoolService.getAll().then(data => {
      setSchools(data);
      setIsLoading(false);
    });
  }, []);


  // ================= UI =================

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">School Management</h1>
          <p className="text-slate-500">Manage all registered schools</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Register School
        </Button>
      </div>


      {/* SEARCH */}
      <Input placeholder="Search schools..." />


      {/* TABLE */}
      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['School', 'Plan', 'Status', 'Expiry', 'Actions']}>

            {schools.map((school) => (
              <TableRow key={school._id}>

                <TableCell>
                  <div className="flex gap-2 items-center">
                    <ShieldCheck size={18} />
                    <div>
                      <p>{school.name}</p>
                      <p className="text-xs text-gray-500">{school.address}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge>{school.plan}</Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={school.status === "Active" ? "success" : "neutral"}>
                    {school.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex gap-1 items-center">
                    <Calendar size={14} />
                    {school.expiry || "N/A"}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">

                    {/* LOGIN */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => loginAsAdmin(school)}
                    >
                      <ExternalLink size={16} />
                    </Button>

                    {/* EDIT */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(school)}
                    >
                      <Edit2 size={16} />
                    </Button>

                    {/* STATUS */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className={
                        school.status === "Active"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                      onClick={() => toggleSchoolStatus(school)}
                    >
                      <Power size={16} />
                    </Button>

                    {/* ✅ DELETE BUTTON */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => handleDeleteSchool (school._id)}
                    >
                      🗑
                    </Button>


                  </div>
                </TableCell>

              </TableRow>
            ))}

          </Table>
        )}
      </Card>


      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create School"
      >

        <div className="space-y-3">

          <Input
            placeholder="School Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button onClick={handleCreateSchool}>
            Create
          </Button>

        </div>

      </Modal>

    </div>
  );
};