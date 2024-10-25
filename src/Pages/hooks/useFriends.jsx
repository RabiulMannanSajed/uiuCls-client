import { useQuery } from "@tanstack/react-query";
import React from "react";

const useFriends = () => {
  const {
    isPending,
    data: friends = [],
    refetch,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await fetch("https://uiuclsserver.onrender.com/friends");
      return res.json();
    },
  });
  return [friends, refetch, isPending];
};

export default useFriends;
