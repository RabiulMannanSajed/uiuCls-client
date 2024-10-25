import { useQuery } from "@tanstack/react-query";
import React from "react";

const useUserLike = () => {
  const {
    isPending,
    data: userLikes = [],
    refetch,
  } = useQuery({
    queryKey: ["userLikes"],
    queryFn: async () => {
      const res = await fetch("https://uiuclsserver.onrender.com/userLikes");
      return res.json();
    },
  });
  return [userLikes, refetch, isPending];
};

export default useUserLike;
