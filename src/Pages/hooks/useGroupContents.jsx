import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGroupContents = () => {
  const {
    isPending,
    data: groupContents = [],
    refetch,
  } = useQuery({
    queryKey: ["CommentsOnPost"],
    queryFn: async () => {
      const res = await fetch(
        "https://uiuclsserver.onrender.com/groupContents"
      );
      return res.json();
    },
  });
  return [groupContents, refetch, isPending];
};

export default useGroupContents;
