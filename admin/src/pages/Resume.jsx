import React, { useState, useEffect } from "react";

export default function Resumes() {
  const [files, setFiles] = useState([]);
  const repoURL = "https://api.github.com/repos/pseudo0244/Resume/contents/";

  useEffect(() => {
    fetch(repoURL)
      .then((res) => res.json())
      .then((data) => {
        const fileList = data
          .filter(file => file.type === "file")
          .map(file => ({
            name: file.name,
            url: file.download_url
          }));
        setFiles(fileList);
      })
      .catch(err => console.error("Error fetching files:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Uploaded Resumes</h1>
      <ul className="border p-4 rounded-lg bg-white">
        {files.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          files.map((file, index) => (
            <li key={index} className="border-b p-2 flex justify-between">
              <span>{file.name}</span>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Resume
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
