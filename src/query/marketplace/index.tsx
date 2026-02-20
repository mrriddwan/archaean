import { useQuery } from "@tanstack/react-query"
import marketplaceService from "../../service/marketplace.service"

export const useFetchProducts = () => useQuery({
 queryKey: ['products'],
 queryFn: marketplaceService.getProducts,
})