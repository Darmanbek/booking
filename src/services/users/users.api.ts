import { useQueryClient } from "@tanstack/react-query"
import type { GetParams } from "src/services/shared"
import { usersService } from "src/services/users/users.service"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { useAuth } from "src/shared/hooks"

const useGetMeQuery = (params: GetParams = {}) => {
	const auth = useAuth()
	const queryClient = useQueryClient()
	return useCrudQuery({
		queryFn: () => usersService.getMe(params),
		queryKey: ["users", ...Object.values(params)],
		onError: () => {
			auth.logout()
			queryClient.removeQueries({
				queryKey: ["users"]
			})
		}
	})
}

const useLoginMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.login,
		invalidate: {
			queryKey: ["users"]
		}
	})
}

const useRegisterMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.register,
		invalidate: {
			queryKey: ["users"]
		}
	})
}

const useVerifyMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.verify,
		invalidate: {
			queryKey: ["users"]
		}
	})
}

const useLogoutMutation = () => {
	const queryClient = useQueryClient()
	return useCrudMutation({
		mutationFn: usersService.logout,
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["users"]
			})
		}
	})
}

const useEditUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.editMe,
		renderSuccess: () => ({
			description: "Ваш профиль успешно изменён"
		}),
		invalidate: {
			queryKey: ["users"]
		}
	})
}

const useEditPhoneUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.editMePhone
	})
}

const useVerifyPhoneUsersMutation = () => {
	return useCrudMutation({
		mutationFn: usersService.verifyMePhone,
		invalidate: {
			queryKey: ["users"]
		}
	})
}

const useDeleteUsersMutation = () => {
	const queryClient = useQueryClient()
	return useCrudMutation({
		mutationFn: usersService.deleteMe,
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["users"]
			})
		}
	})
}

export {
	useGetMeQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useEditUsersMutation,
	useEditPhoneUsersMutation,
	useVerifyPhoneUsersMutation,
	useDeleteUsersMutation
}
