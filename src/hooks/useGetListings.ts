import { useQuery } from "@tanstack/react-query";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";


export default function useGetListings() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["listins"],
		networkMode: "always",
		queryFn: (() => requestHandler("http://localhost:8080/api/v1/listings", {
			method: "GET"
		}))
	});
	return {
		listingData: data?.data,
		listingError: errorHandler(error),
		isLoadingListingsData: isLoading

	}
}
