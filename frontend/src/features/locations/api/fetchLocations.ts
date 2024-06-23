import instance from "../../../lib/axios"

export const fetchLocations = async () => {
  console.log("fetching")
  const response = await instance.get("/locations")
  console.log(response)
  return response.data
}