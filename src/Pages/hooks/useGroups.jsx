import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGroups = () => {
  const {
    isPending,
    data: groups = [],
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await fetch("https://uiuclsserver.onrender.com/groups");
      return res.json();
    },
  });
  return [groups, refetch, isPending];
};

export default useGroups;
