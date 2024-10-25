import { useQuery } from "@tanstack/react-query";

const useMessages = () => {
  const {
    isPending,
    data: groupMessages = [],
    refetch,
  } = useQuery({
    queryKey: ["groupMessages"],
    queryFn: async () => {
      const res = await fetch(
        "https://uiuclsserver.onrender.com/groupMessages"
      );
      return res.json();
    },
  });
  return [groupMessages, refetch, isPending];
};

export default useMessages;
