import { fetchUserInfo } from "@/apis/userAPIs";
import { useQuery } from "@tanstack/react-query";

export function useGetUserInfo() {
  return useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const res = fetchUserInfo();
      return res;
    },
  });
}
