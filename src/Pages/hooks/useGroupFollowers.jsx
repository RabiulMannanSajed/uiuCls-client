import { useQuery } from "@tanstack/react-query";

const useGroupFollowers = () => {
  const {
    isPending,
    data: groupFollowers = [],
    refetch,
  } = useQuery({
    queryKey: ["groupFollowers"],
    queryFn: async () => {
      const res = await fetch(
        "https://uiuclsserver.onrender.com/groupFollowers"
      );
      return res.json();
    },
  });
  return [groupFollowers, refetch, isPending];
};

export default useGroupFollowers;
