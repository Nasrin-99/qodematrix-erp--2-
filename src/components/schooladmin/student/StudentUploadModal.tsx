import { X } from "lucide-react";

const StudentUploadModal = ({ show, setShow, newMaterial, setNewMaterial, handleSubmit }: any) => {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <div className="flex justify-between mb-4">
          <h2>Upload</h2>
          <X onClick={() => setShow(false)} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input placeholder="Title" className="w-full border p-2"
            value={newMaterial.title || ""}
            onChange={(e)=>setNewMaterial({...newMaterial,title:e.target.value})}
          />

          <input placeholder="URL" className="w-full border p-2"
            value={newMaterial.url || ""}
            onChange={(e)=>setNewMaterial({...newMaterial,url:e.target.value})}
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Submit
          </button>
        </form>

      </div>

    </div>
  );
};

export default StudentUploadModal;