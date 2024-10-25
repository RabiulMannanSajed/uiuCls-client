import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://uiuclsserver.onrender.com/users");
      return res.json();
    },
  });
  return [users, refetch, isPending];
};

export default useUser;
