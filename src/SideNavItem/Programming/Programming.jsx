import React from "react";
import useContent from "../../Pages/hooks/useContent";
import { useLocation } from "react-router-dom";

const Programming = () => {
  const location = useLocation();
  const [contents] = useContent();

  // Extract the query parameter (e.g., ?name=Programming)
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("name");

  // Filter contents based on the selected category
  const filteredContents = contents.filter((content) =>
    content.selectedOptions.includes(categoryName)
  );

  return (
    <div className="w-[75%] ml-[20%] contentUpdateScroll">
      <div>
        {filteredContents.length > 0 ? (
          filteredContents.map((content) => (
            <div
              className="bg-slate-500 text-white m-5 rounded-lg p-4"
              key={content._id}
            >
              <p>
                <strong>Posted by:</strong> {content.userName}
              </p>
              <p>{content.uploadedContent}</p>
              {content.img && (
                <img
                  className="w-[10%] h-[10%] mb-6 m-auto"
                  src={content.img}
                  alt="content"
                />
              )}
            </div>
          ))
        ) : (
          <p>No content available for {categoryName}</p>
        )}
      </div>
    </div>
  );
};

export default Programming;
