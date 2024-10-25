import { useQuery } from "@tanstack/react-query";
import React from "react";

const useContent = () => {
  const {
    isPending,
    data: contents = [],
    refetch,
  } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const res = await fetch("https://uiuclsserver.onrender.com/contents");
      return res.json();
    },
  });
  return [contents, refetch, isPending];
};

export default useContent;
