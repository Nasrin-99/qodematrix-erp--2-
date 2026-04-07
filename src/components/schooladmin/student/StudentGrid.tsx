import { FileText, Video, LinkIcon, Download } from "../../Icons";

const StudentGrid = ({ materials }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {materials.map((item: any) => (
        <div key={item.id} className="bg-white p-5 rounded-xl border shadow-sm">

          <div className="mb-3 font-bold">{item.title}</div>

          <p className="text-xs text-gray-500 mb-3">
            Grade {item.targetClass}
          </p>

          <button className="text-indigo-600 flex items-center gap-1">
            Download <Download className="w-3 h-3"/>
          </button>

        </div>
      ))}

    </div>
  );
};

export default StudentGrid;