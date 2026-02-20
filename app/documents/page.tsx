import { documents } from "@/lib/data";

export default function DocumentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer">
          + Upload Document
          <input type="file" className="hidden" accept=".pdf,.doc,.docx,.png,.jpg" />
        </label>
      </div>

      {/* Upload drop zone */}
      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center mb-6 bg-blue-50">
        <p className="text-blue-500 font-medium">Drag & drop files here, or click "Upload Document"</p>
        <p className="text-xs text-gray-400 mt-1">Supports PDF, DOC, PNG, JPG</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Property</th>
              <th className="px-5 py-3 text-left">Type</th>
              <th className="px-5 py-3 text-left">Size</th>
              <th className="px-5 py-3 text-left">Uploaded</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">📄 {doc.name}</td>
                <td className="px-5 py-4 text-gray-600">{doc.property}</td>
                <td className="px-5 py-4 text-gray-600">{doc.type}</td>
                <td className="px-5 py-4 text-gray-600">{doc.size}</td>
                <td className="px-5 py-4 text-gray-600">{doc.uploaded}</td>
                <td className="px-5 py-4 flex gap-3">
                  <button className="text-blue-600 hover:underline text-xs">Download</button>
                  <button className="text-red-500 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
