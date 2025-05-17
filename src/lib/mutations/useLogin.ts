import { useMutation } from '@tanstack/react-query';
import axiosClient from "@/axios/axiosClient";
import { LoginFormData } from '@/lib/schemas/validation';

type LoginResponse = {
  token: string;
  id: number;
  username: string;
  primerNombre: string;
  primerApellido: string;
  email: string;
  rol: "ADMIN" | "PROFESOR" | "PADRE";
};

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await axiosClient.post<{ data: LoginResponse; message: string }>(
        "/v1/api/auth/login",
        data
      );
      return res.data;
    },
  });
}
