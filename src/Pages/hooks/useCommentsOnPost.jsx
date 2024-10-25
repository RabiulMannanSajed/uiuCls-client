import { useQuery } from "@tanstack/react-query";

const useCommentsOnPost = () => {
  const {
    isPending,
    data: commentsOnPost = [],
    refetch,
  } = useQuery({
    queryKey: ["CommentsOnPost"],
    queryFn: async () => {
      const res = await fetch(
        "https://uiuclsserver.onrender.com/commentsOnPost"
      );
      return res.json();
    },
  });
  return [commentsOnPost, refetch, isPending];
};

export default useCommentsOnPost;
