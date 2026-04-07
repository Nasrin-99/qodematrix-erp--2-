import { Search } from "lucide-react";

const StudentFilters = ({ selectedClass, setSelectedClass, searchTerm, setSearchTerm, classes, isParent }: any) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
      
      <select
        className="p-2 border rounded-lg"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        disabled={isParent}
      >
        <option value="All">All Classes</option>
        {classes.map((c: string) => (
          <option key={c} value={c}>Grade {c}</option>
        ))}
      </select>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"/>
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 p-2 w-full border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    </div>
  );
};

export default StudentFilters;